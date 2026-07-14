using System.Data;
using System.Text.Json.Nodes;
using Dapper;
using Npgsql;
using PortfolioAPI.Models;

namespace PortfolioAPI.Services
{
    public class PortfolioService
    {
        private readonly string _connectionString;
        private readonly ILogger<PortfolioService> _logger;

        public PortfolioService(IConfiguration configuration, ILogger<PortfolioService> logger)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection") 
                ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");
            _logger = logger;
        }

        private IDbConnection CreateConnection() => new NpgsqlConnection(_connectionString);

        public async Task InitDbAsync()
        {
            using var connection = CreateConnection();
            connection.Open();
            using var transaction = connection.BeginTransaction();
            try
            {
                _logger.LogInformation("PostgreSQL: Initializing database schema...");

                // 1. Create portfolio table
                await connection.ExecuteAsync(@"
                    CREATE TABLE IF NOT EXISTS public.portfolio (
                        id         SERIAL PRIMARY KEY,
                        data       JSONB NOT NULL,
                        updated_at TIMESTAMPTZ DEFAULT NOW()
                    );", transaction: transaction);

                // 2. Create messages table
                await connection.ExecuteAsync(@"
                    CREATE TABLE IF NOT EXISTS public.messages (
                        id         TEXT PRIMARY KEY,
                        name       TEXT NOT NULL,
                        email      TEXT NOT NULL,
                        subject    TEXT NOT NULL,
                        message    TEXT NOT NULL,
                        created_at TIMESTAMPTZ DEFAULT NOW()
                    );", transaction: transaction);

                // 3. Seed portfolio table (truncate and insert to ensure update is applied)
                await connection.ExecuteAsync("TRUNCATE TABLE public.portfolio;", transaction: transaction);
                
                string initialDataPath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "..", "..", "..", "..", "backend", "data", "portfolio.json");
                if (!File.Exists(initialDataPath))
                {
                    initialDataPath = Path.Combine(Directory.GetCurrentDirectory(), "..", "backend", "data", "portfolio.json");
                }

                if (File.Exists(initialDataPath))
                {
                    string initialJson = await File.ReadAllTextAsync(initialDataPath);
                    await connection.ExecuteAsync(
                        "INSERT INTO public.portfolio (data) VALUES (@Data::jsonb);",
                        new { Data = initialJson }, transaction: transaction);
                    _logger.LogInformation($"PostgreSQL: Seeded portfolio table with initial data from: {initialDataPath}");
                }
                else
                {
                    _logger.LogWarning($"Portfolio seed file not found at expected paths.");
                }

                transaction.Commit();
                _logger.LogInformation("PostgreSQL: Database schema ready.");
            }
            catch (Exception ex)
            {
                transaction.Rollback();
                _logger.LogError(ex, "PostgreSQL: Error initializing database schema.");
                throw;
            }
        }

        public async Task<JsonNode?> GetPortfolioAsync()
        {
            using var connection = CreateConnection();
            var dataString = await connection.QueryFirstOrDefaultAsync<string>(
                "SELECT data::text FROM public.portfolio ORDER BY id DESC LIMIT 1;");
            
            if (string.IsNullOrEmpty(dataString))
            {
                return null;
            }

            return JsonNode.Parse(dataString);
        }

        public async Task<ContactMessage> AddMessageAsync(ContactMessage message)
        {
            message.Id = Guid.NewGuid().ToString("N").Substring(0, 12);
            message.Timestamp = DateTime.UtcNow;

            using var connection = CreateConnection();
            await connection.ExecuteAsync(@"
                INSERT INTO public.messages (id, name, email, subject, message, created_at)
                VALUES (@Id, @Name, @Email, @Subject, @Message, @Timestamp);",
                new 
                { 
                    message.Id, 
                    message.Name, 
                    message.Email, 
                    message.Subject, 
                    message.Message, 
                    message.Timestamp 
                });

            return message;
        }

        public async Task<IEnumerable<ContactMessage>> GetMessagesAsync()
        {
            using var connection = CreateConnection();
            var results = await connection.QueryAsync<dynamic>(@"
                SELECT id, name, email, subject, message, created_at AS Timestamp 
                FROM public.messages 
                ORDER BY created_at DESC;");

            return results.Select(r => new ContactMessage
            {
                Id = r.id,
                Name = r.name,
                Email = r.email,
                Subject = r.subject,
                Message = r.message,
                Timestamp = r.timestamp
            }).ToList();
        }
    }
}

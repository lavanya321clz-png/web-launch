using System.Text.Json.Nodes;
using Microsoft.AspNetCore.Mvc;
using PortfolioAPI.Models;
using PortfolioAPI.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Enable CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// Register PortfolioService
builder.Services.AddSingleton<PortfolioService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAll");

// Initialize database schema and seed data
using (var scope = app.Services.CreateScope())
{
    var portfolioService = scope.ServiceProvider.GetRequiredService<PortfolioService>();
    try
    {
        await portfolioService.InitDbAsync();
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Database initialization failed: {ex.Message}");
    }
}

// ─── Health Check ─────────────────────────────────────────────────────────────
app.MapGet("/api/health", async ([FromServices] PortfolioService service) =>
{
    try
    {
        // Simple validation that DB connection works
        var testResult = await service.GetPortfolioAsync();
        return Results.Ok(new { status = "ok", database = "PostgreSQL connected" });
    }
    catch (Exception ex)
    {
        return Results.Json(new { status = "error", database = ex.Message }, statusCode: 503);
    }
});

// ─── Routes ───────────────────────────────────────────────────────────────────

// 1. Get entire portfolio data
app.MapGet("/api/portfolio", async ([FromServices] PortfolioService service) =>
{
    try
    {
        var portfolio = await service.GetPortfolioAsync();
        if (portfolio == null)
        {
            return Results.Json(new { error = "Failed to retrieve portfolio data" }, statusCode: 500);
        }
        return Results.Ok(portfolio);
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Error in GET /api/portfolio: {ex.Message}");
        return Results.Json(new { error = "Failed to retrieve portfolio data" }, statusCode: 500);
    }
});

// 2. Submit a contact message
app.MapPost("/api/contact", async ([FromBody] ContactMessage message, [FromServices] PortfolioService service) =>
{
    try
    {
        if (string.IsNullOrWhiteSpace(message.Name))
            return Results.Json(new { error = "Name is required" }, statusCode: 400);

        if (string.IsNullOrWhiteSpace(message.Email) || !message.Email.Contains("@"))
            return Results.Json(new { error = "Valid email is required" }, statusCode: 400);

        if (string.IsNullOrWhiteSpace(message.Subject))
            return Results.Json(new { error = "Subject is required" }, statusCode: 400);

        if (string.IsNullOrWhiteSpace(message.Message))
            return Results.Json(new { error = "Message cannot be empty" }, statusCode: 400);

        var savedMessage = await service.AddMessageAsync(message);
        
        return Results.Json(new
        {
            success = true,
            message = "Message received and stored successfully",
            data = savedMessage
        }, statusCode: 201);
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Error in POST /api/contact: {ex.Message}");
        return Results.Json(new { error = "Failed to save message" }, statusCode: 500);
    }
});

// 3. Get all contact messages (for admin/verification)
app.MapGet("/api/contacts", async ([FromServices] PortfolioService service) =>
{
    try
    {
        var messages = await service.GetMessagesAsync();
        return Results.Ok(messages);
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Error in GET /api/contacts: {ex.Message}");
        return Results.Json(new { error = "Failed to retrieve messages" }, statusCode: 500);
    }
});

// Run application on port 5000 explicitly
app.Run("http://localhost:5000");

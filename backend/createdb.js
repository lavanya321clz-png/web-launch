// One-time script: creates the "postgresql 17" database if it doesn't exist
import pg from 'pg';
const { Client } = pg;

const client = new Client({
  host: 'localhost',
  port: 5432,
  database: 'postgres',   // connect to default db to run CREATE DATABASE
  user: 'postgres',
  password: 'postgresql17',
});

try {
  await client.connect();
  const res = await client.query(
    `SELECT 1 FROM pg_database WHERE datname = 'postgresql 17'`
  );
  if (res.rowCount === 0) {
    // Database names with spaces must be quoted
    await client.query(`CREATE DATABASE "postgresql 17"`);
    console.log('✅ Database "postgresql 17" created successfully.');
  } else {
    console.log('ℹ️  Database "postgresql 17" already exists.');
  }
} catch (err) {
  console.error('❌ Error creating database:', err.message);
} finally {
  await client.end();
}

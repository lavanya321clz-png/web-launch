import express from 'express';
import cors from 'cors';
import { pool, initDb, getPortfolio, addMessage, getMessages } from './db.js';

const app = express();
const PORT = process.env.PORT || 5000;

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get('/api/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'ok', database: 'PostgreSQL connected' });
  } catch (err) {
    res.status(503).json({ status: 'error', database: err.message });
  }
});

// ─── Routes ───────────────────────────────────────────────────────────────────

// 1. Get entire portfolio data
app.get('/api/portfolio', async (req, res) => {
  try {
    const portfolio = await getPortfolio();
    res.json(portfolio);
  } catch (err) {
    console.error('Error in GET /api/portfolio:', err);
    res.status(500).json({ error: 'Failed to retrieve portfolio data' });
  }
});

// 2. Submit a contact message
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !name.trim())
      return res.status(400).json({ error: 'Name is required' });
    if (!email || !email.trim() || !/\S+@\S+\.\S+/.test(email))
      return res.status(400).json({ error: 'Valid email is required' });
    if (!subject || !subject.trim())
      return res.status(400).json({ error: 'Subject is required' });
    if (!message || !message.trim())
      return res.status(400).json({ error: 'Message cannot be empty' });

    const savedMessage = await addMessage({
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim()
    });

    res.status(201).json({
      success: true,
      message: 'Message received and stored successfully',
      data: savedMessage
    });
  } catch (err) {
    console.error('Error in POST /api/contact:', err);
    res.status(500).json({ error: 'Failed to save message' });
  }
});

// 3. Get all contact messages (for admin/verification)
app.get('/api/contacts', async (req, res) => {
  try {
    const messages = await getMessages();
    res.json(messages);
  } catch (err) {
    console.error('Error in GET /api/contacts:', err);
    res.status(500).json({ error: 'Failed to retrieve messages' });
  }
});

// ─── Start Server ─────────────────────────────────────────────────────────────
async function startServer() {
  try {
    await initDb();
    const server = app.listen(PORT, () => {
      console.log(`✅ Backend server running   → http://localhost:${PORT}`);
      console.log(`✅ PostgreSQL 17 connected  → localhost:5432`);
    });

    // Graceful shutdown
    process.on('SIGTERM', async () => {
      console.log('SIGTERM received. Closing server and DB pool...');
      server.close(async () => {
        await pool.end();
        console.log('PostgreSQL pool closed. Goodbye.');
        process.exit(0);
      });
    });
  } catch (err) {
    console.error('❌ Failed to start backend server:', err.message);
    process.exit(1);
  }
}

startServer();

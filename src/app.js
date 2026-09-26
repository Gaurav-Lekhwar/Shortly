// src/routes/health.routes.js
const express = require('express');
const router = express.Router();
const pool = require('../config/database');   // or whatever you named db.js

// Liveness – “is the process alive?”
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Readiness – “can I serve traffic?” (includes DB check)
router.get('/ready', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.status(200).json({ status: 'ready', database: 'connected' });
  } catch (err) {
    res.status(503).json({ status: 'not ready', database: 'disconnected' });
  }
});

module.exports = router;
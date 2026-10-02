//u25069366
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const postRoutes = require('./routes/posts');
const albumRoutes = require('./routes/albums');
const friendRoutes = require('./routes/friends');

function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get('/', (req, res) => {
    res.json({ message: 'ForkFul backend', version: '2.0.0', status: 'online' });
  });

  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Forkful backend is operational!' });
  });

  app.use('/api/auth', authRoutes);
  app.use('/api/users', userRoutes);
  app.use('/api/posts', postRoutes);
  app.use('/api/albums', albumRoutes);
  app.use('/api/friends', friendRoutes);

  // 404 handler
  app.use((req, res) => {
    res.status(404).json({ success: false, message: 'Route not found.' });
  });

  // Centralised error handler - keeps the process alive and returns JSON on unexpected errors.
  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    console.error('Unhandled route error:', err);
    if (res.headersSent) return next(err);
    res.status(500).json({ success: false, message: 'Unexpected server error.' });
  });

  return app;
}

module.exports = { createApp };

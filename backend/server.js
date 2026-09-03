const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS and JSON body parser
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Forkful backend is operational!' });
});

// Part 5 Requirement (m): Sign-in endpoint that exists and returns dummy data
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Email and password are required.'
    });
  }

  // Return stubbed dummy authentication response
  return res.status(200).json({
    success: true,
    message: 'Login successful! Welcome back to Forkful.',
    token: 'dummy-jwt-token-auth-u25069366-abc123xyz',
    user: {
      id: 1,
      username: 'pasta_maestro',
      email: email,
      avatar: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=400&q=80'
    }
  });
});

// Part 5 Requirement (n): Sign-up endpoint that exists and returns dummy data
app.post('/api/auth/register', (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Username, email, and password are required.'
    });
  }

  // Return stubbed dummy registration response
  return res.status(201).json({
    success: true,
    message: 'Account created successfully! Welcome to Forkful.',
    token: 'dummy-jwt-token-auth-u25069366-reg987zyx',
    user: {
      id: 2,
      username: username,
      email: email
    }
  });
});

// Start Express server
app.listen(PORT, () => {
  console.log(`Forkful Backend Express Server running on http://localhost:${PORT}`);
});

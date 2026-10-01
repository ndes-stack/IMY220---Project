const express = require('express');
const bcrypt = require('bcryptjs');
const { getDB } = require('../db');
const { signToken, requireAuth } = require('../middleware/auth');
const { publicUser } = require('../utils');

const router = express.Router();

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ success: false, message: 'Username, email, and password are required.' });
    }
    if (password.length < 6) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters.' });
    }

    const db = getDB();
    const users = db.collection('users');

    const existing = await users.findOne({ $or: [{ email: email.toLowerCase() }, { username }] });
    if (existing) {
      return res.status(409).json({ success: false, message: 'An account with that username or email already exists.' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = {
      username,
      email: email.toLowerCase(),
      passwordHash,
      name: username,
      subtitle: 'new to Forkful',
      bio: '',
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(username)}&backgroundColor=D9653B`,
      followers: 0,
      following: 0,
      createdAt: new Date().toISOString()
    };

    const result = await users.insertOne(newUser);
    const user = { _id: result.insertedId, ...newUser };
    const token = signToken(user);

    return res.status(201).json({
      success: true,
      message: 'Account created successfully! Welcome to Forkful.',
      token,
      user: publicUser(user)
    });
  } catch (err) {
    console.error('Register error:', err);
    return res.status(500).json({ success: false, message: 'Server error while registering.' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }

    const db = getDB();
    const users = db.collection('users');
    const user = await users.findOne({ $or: [{ email: email.toLowerCase() }, { username: email }] });

    if (!user) {
      return res.status(401).json({ success: false, message: 'No account found with those credentials.' });
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      return res.status(401).json({ success: false, message: 'Incorrect password.' });
    }

    const token = signToken(user);
    return res.status(200).json({
      success: true,
      message: 'Login successful! Welcome back to Forkful.',
      token,
      user: publicUser(user)
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ success: false, message: 'Server error while logging in.' });
  }
});

// GET /api/auth/me - returns the logged-in user from their token
router.get('/me', requireAuth, async (req, res) => {
  try {
    const db = getDB();
    const { ObjectId } = require('mongodb');
    const user = await db.collection('users').findOne({ _id: new ObjectId(req.user.id) });
    if (!user) return res.status(404).json({ success: false, message: 'User not found.' });
    return res.json({ success: true, user: publicUser(user) });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// POST /api/auth/logout - stateless, client just discards the token
router.post('/logout', (req, res) => {
  res.json({ success: true, message: 'Logged out.' });
});

module.exports = router;

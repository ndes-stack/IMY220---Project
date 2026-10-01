// backend/routes/friends.js
const express = require('express');
const { ObjectId } = require('mongodb');
const { getDB } = require('../db');
const { requireAuth } = require('../middleware/auth');
const { publicUser } = require('../utils');

const router = express.Router();

// GET /api/friends/requests - pending friend requests addressed to me
router.get('/requests', requireAuth, async (req, res) => {
  try {
    const db = getDB();
    const pending = await db.collection('friendships').find({
      status: 'pending',
      $or: [{ userA: req.user.id }, { userB: req.user.id }],
      requestedBy: { $ne: req.user.id }
    }).toArray();

    const requesterIds = pending.map((f) => f.requestedBy);
    const requesters = requesterIds.length
      ? await db.collection('users').find({ _id: { $in: requesterIds.map((id) => new ObjectId(id)) } }).toArray()
      : [];

    res.json({
      success: true,
      requests: pending.map((f) => ({
        friendshipId: f._id.toString(),
        from: publicUser(requesters.find((u) => u._id.toString() === f.requestedBy))
      }))
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error fetching friend requests.' });
  }
});

// POST /api/friends/request - send a friend request { targetId }
router.post('/request', requireAuth, async (req, res) => {
  try {
    const { targetId } = req.body;
    if (!targetId) return res.status(400).json({ success: false, message: 'targetId is required.' });
    if (targetId === req.user.id) return res.status(400).json({ success: false, message: 'You cannot friend yourself.' });

    const db = getDB();
    const existing = await db.collection('friendships').findOne({
      $or: [
        { userA: req.user.id, userB: targetId },
        { userA: targetId, userB: req.user.id }
      ]
    });
    if (existing) {
      return res.status(409).json({ success: false, message: 'A friendship or request already exists between these users.' });
    }

    await db.collection('friendships').insertOne({
      userA: req.user.id,
      userB: targetId,
      status: 'pending',
      requestedBy: req.user.id,
      createdAt: new Date().toISOString()
    });

    res.status(201).json({ success: true, message: 'Friend request sent.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error sending friend request.' });
  }
});

// POST /api/friends/accept - accept a request { friendshipId }
router.post('/accept', requireAuth, async (req, res) => {
  try {
    const { friendshipId } = req.body;
    const db = getDB();
    const friendship = await db.collection('friendships').findOne({ _id: new ObjectId(friendshipId) });
    if (!friendship) return res.status(404).json({ success: false, message: 'Friend request not found.' });
    if (friendship.requestedBy === req.user.id) {
      return res.status(403).json({ success: false, message: 'You cannot accept your own request.' });
    }

    await db.collection('friendships').updateOne(
      { _id: new ObjectId(friendshipId) },
      { $set: { status: 'accepted', acceptedAt: new Date().toISOString() } }
    );

    res.json({ success: true, message: 'Friend request accepted.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error accepting friend request.' });
  }
});

// POST /api/friends/decline - decline a pending request { friendshipId }
router.post('/decline', requireAuth, async (req, res) => {
  try {
    const { friendshipId } = req.body;
    const db = getDB();
    const friendship = await db.collection('friendships').findOne({ _id: new ObjectId(friendshipId) });
    if (!friendship) return res.status(404).json({ success: false, message: 'Friend request not found.' });
    if (friendship.requestedBy === req.user.id) {
      return res.status(403).json({ success: false, message: 'You cannot decline your own request.' });
    }

    await db.collection('friendships').deleteOne({ _id: new ObjectId(friendshipId) });

    res.json({ success: true, message: 'Friend request declined.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error declining friend request.' });
  }
});

// POST /api/friends/unfriend - remove a friendship { targetId }
router.post('/unfriend', requireAuth, async (req, res) => {
  try {
    const { targetId } = req.body;
    const db = getDB();
    await db.collection('friendships').deleteOne({
      $or: [
        { userA: req.user.id, userB: targetId },
        { userA: targetId, userB: req.user.id }
      ]
    });
    res.json({ success: true, message: 'Friendship removed.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error removing friendship.' });
  }
});

module.exports = router;
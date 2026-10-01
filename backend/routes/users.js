const express = require('express');
const { ObjectId } = require('mongodb');
const { getDB } = require('../db');
const { requireAuth, optionalAuth } = require('../middleware/auth');
const { publicUser, publicPost } = require('../utils');

const router = express.Router();

// GET /api/users - list/search users (for "find people" / friend search)
router.get('/', async (req, res) => {
  try {
    const db = getDB();
    const { q } = req.query;
    const filter = q
      ? { $or: [{ username: { $regex: q, $options: 'i' } }, { name: { $regex: q, $options: 'i' } }] }
      : {};
    const users = await db.collection('users').find(filter).limit(50).toArray();
    res.json({ success: true, users: users.map(publicUser) });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error fetching users.' });
  }
});

// GET /api/users/:id - view a profile (own or someone else's)
router.get('/:id', optionalAuth, async (req, res) => {
  try {
    const db = getDB();
    const { id } = req.params;
    if (!ObjectId.isValid(id)) return res.status(404).json({ success: false, message: 'User not found.' });

    const user = await db.collection('users').findOne({ _id: new ObjectId(id) });
    if (!user) return res.status(404).json({ success: false, message: 'User not found.' });

    const posts = await db.collection('posts').find({ authorId: id }).sort({ createdAt: -1 }).toArray();

    const friendships = await db.collection('friendships').find({
      status: 'accepted',
      $or: [{ userA: id }, { userB: id }]
    }).toArray();
    const friendIds = friendships.map((f) => (f.userA === id ? f.userB : f.userA));
    const friends = friendIds.length
      ? await db.collection('users').find({ _id: { $in: friendIds.map((fid) => new ObjectId(fid)) } }).toArray()
      : [];

    let friendStatus = 'none';
    if (req.user && req.user.id !== id) {
      const existing = await db.collection('friendships').findOne({
        $or: [
          { userA: req.user.id, userB: id },
          { userA: id, userB: req.user.id }
        ]
      });
      if (existing) {
        friendStatus = existing.status === 'accepted'
          ? 'friends'
          : existing.requestedBy === req.user.id ? 'pending-sent' : 'pending-received';
      }
    }

    res.json({
      success: true,
      profile: publicUser(user),
      posts: posts.map(publicPost),
      friends: friends.map(publicUser),
      friendStatus,
      isOwnProfile: !!(req.user && req.user.id === id)
    });
  } catch (err) {
    console.error('Get profile error:', err);
    res.status(500).json({ success: false, message: 'Server error fetching profile.' });
  }
});

// PUT /api/users/:id - edit own profile
router.put('/:id', requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    if (req.user.id !== id) {
      return res.status(403).json({ success: false, message: 'You can only edit your own profile.' });
    }
    const db = getDB();
    const { name, subtitle, bio, avatar, username } = req.body;
    const update = {};
    if (name !== undefined) update.name = name;
    if (subtitle !== undefined) update.subtitle = subtitle;
    if (bio !== undefined) update.bio = bio;
    if (avatar !== undefined) update.avatar = avatar;
    if (username !== undefined && username.trim().length >= 3) update.username = username.trim();

    await db.collection('users').updateOne({ _id: new ObjectId(id) }, { $set: update });
    const updated = await db.collection('users').findOne({ _id: new ObjectId(id) });
    res.json({ success: true, message: 'Profile updated.', user: publicUser(updated) });
  } catch (err) {
    console.error('Update profile error:', err);
    res.status(500).json({ success: false, message: 'Server error updating profile.' });
  }
});

module.exports = router;

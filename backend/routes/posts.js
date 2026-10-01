const express = require('express');
const { ObjectId } = require('mongodb');
const { getDB } = require('../db');
const { requireAuth, optionalAuth } = require('../middleware/auth');
const { publicPost } = require('../utils');

const router = express.Router();

// GET /api/posts?scope=global|local&search=
// global (default): every post on the platform.
// local: requires auth, only posts authored by the caller or their accepted friends.
router.get('/', optionalAuth, async (req, res) => {
  try {
    const db = getDB();
    const { scope = 'global', search = '' } = req.query;

    let filter = {};
    if (scope === 'local') {
      if (!req.user) return res.status(401).json({ success: false, message: 'Login required for your local feed.' });
      const friendships = await db.collection('friendships').find({
        status: 'accepted',
        $or: [{ userA: req.user.id }, { userB: req.user.id }]
      }).toArray();
      const friendIds = friendships.map((f) => (f.userA === req.user.id ? f.userB : f.userA));
      filter.authorId = { $in: [...friendIds, req.user.id] };
    }

    if (search) {
      const re = { $regex: search, $options: 'i' };
      filter.$and = [
        filter.authorId ? { authorId: filter.authorId } : {},
        { $or: [{ title: re }, { description: re }, { tag: re }] }
      ];
      delete filter.authorId;
    }

    const posts = await db.collection('posts').find(filter).sort({ createdAt: -1 }).toArray();
    res.json({ success: true, count: posts.length, scope, posts: posts.map(publicPost) });
  } catch (err) {
    console.error('List posts error:', err);
    res.status(500).json({ success: false, message: 'Server error fetching posts.' });
  }
});

// GET /api/posts/:id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) return res.status(404).json({ success: false, message: 'Post not found.' });
    const db = getDB();
    const post = await db.collection('posts').findOne({ _id: new ObjectId(id) });
    if (!post) return res.status(404).json({ success: false, message: 'Post not found.' });
    res.json({ success: true, post: publicPost(post) });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error fetching post.' });
  }
});

// POST /api/posts - create a post
router.post('/', requireAuth, async (req, res) => {
  try {
    const { title, description, tag, review, image } = req.body;
    if (!title || title.trim().length < 3) {
      return res.status(400).json({ success: false, message: 'Dish title must be at least 3 characters.' });
    }
    if (!description || description.trim().length < 5) {
      return res.status(400).json({ success: false, message: 'Please provide a description of at least 5 characters.' });
    }

    const db = getDB();
    const author = await db.collection('users').findOne({ _id: new ObjectId(req.user.id) });

    const newPost = {
      title: title.trim(),
      tag: tag && tag.trim() ? (tag.trim().startsWith('#') ? tag.trim() : `#${tag.trim()}`) : '#Food',
      description: description.trim(),
      review: review || '',
      image: image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
      authorId: req.user.id,
      author: author.username,
      authorAvatar: author.avatar,
      likes: 0,
      likedBy: [],
      comments: [],
      createdAt: new Date().toISOString(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };

    const result = await db.collection('posts').insertOne(newPost);
    res.status(201).json({ success: true, message: 'Post created.', post: publicPost({ _id: result.insertedId, ...newPost }) });
  } catch (err) {
    console.error('Create post error:', err);
    res.status(500).json({ success: false, message: 'Server error creating post.' });
  }
});

// PUT /api/posts/:id - edit description/tag/review (creator only)
router.put('/:id', requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const db = getDB();
    const post = await db.collection('posts').findOne({ _id: new ObjectId(id) });
    if (!post) return res.status(404).json({ success: false, message: 'Post not found.' });
    if (post.authorId !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Only the creator can edit this post.' });
    }

    const { title, description, tag, review } = req.body;
    const update = {};
    if (title !== undefined) update.title = title;
    if (description !== undefined) update.description = description;
    if (tag !== undefined) update.tag = tag;
    if (review !== undefined) update.review = review;

    await db.collection('posts').updateOne({ _id: new ObjectId(id) }, { $set: update });
    const updated = await db.collection('posts').findOne({ _id: new ObjectId(id) });
    res.json({ success: true, message: 'Post updated.', post: publicPost(updated) });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error updating post.' });
  }
});

// DELETE /api/posts/:id - creator only
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const db = getDB();
    const post = await db.collection('posts').findOne({ _id: new ObjectId(id) });
    if (!post) return res.status(404).json({ success: false, message: 'Post not found.' });
    if (post.authorId !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Only the creator can delete this post.' });
    }
    await db.collection('posts').deleteOne({ _id: new ObjectId(id) });
    await db.collection('albums').updateMany({}, { $pull: { postIds: id } });
    res.json({ success: true, message: 'Post deleted.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error deleting post.' });
  }
});

// POST /api/posts/:id/like - toggle like
router.post('/:id/like', requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const db = getDB();
    const post = await db.collection('posts').findOne({ _id: new ObjectId(id) });
    if (!post) return res.status(404).json({ success: false, message: 'Post not found.' });

    const likedBy = post.likedBy || [];
    const alreadyLiked = likedBy.includes(req.user.id);
    const newLikedBy = alreadyLiked ? likedBy.filter((u) => u !== req.user.id) : [...likedBy, req.user.id];

    await db.collection('posts').updateOne(
      { _id: new ObjectId(id) },
      { $set: { likedBy: newLikedBy, likes: newLikedBy.length } }
    );
    res.json({ success: true, liked: !alreadyLiked, likes: newLikedBy.length });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error toggling like.' });
  }
});

// POST /api/posts/:id/comments - add a comment
router.post('/:id/comments', requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, body } = req.body;
    if (!body || !body.trim()) {
      return res.status(400).json({ success: false, message: 'Comment text is required.' });
    }

    const db = getDB();
    const author = await db.collection('users').findOne({ _id: new ObjectId(req.user.id) });
    const post = await db.collection('posts').findOne({ _id: new ObjectId(id) });
    if (!post) return res.status(404).json({ success: false, message: 'Post not found.' });

    const comment = {
      id: new ObjectId().toString(),
      title: title || 'Comment',
      body: body.trim(),
      authorId: req.user.id,
      author: author.username,
      authorAvatar: author.avatar,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };

    await db.collection('posts').updateOne({ _id: new ObjectId(id) }, { $push: { comments: comment } });
    res.status(201).json({ success: true, message: 'Comment added.', comment });
  } catch (err) {
    console.error('Add comment error:', err);
    res.status(500).json({ success: false, message: 'Server error adding comment.' });
  }
});

// POST /api/posts/:id/report - report a post { reason }
router.post('/:id/report', requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;
    if (!reason || !reason.trim()) {
      return res.status(400).json({ success: false, message: 'A reason is required to report a post.' });
    }
    const db = getDB();
    const post = await db.collection('posts').findOne({ _id: new ObjectId(id) });
    if (!post) return res.status(404).json({ success: false, message: 'Post not found.' });

    await db.collection('reports').insertOne({
      postId: id,
      reporterId: req.user.id,
      reason: reason.trim(),
      status: 'open',
      createdAt: new Date().toISOString()
    });

    res.status(201).json({ success: true, message: 'Report submitted. Thank you for helping keep Forkful safe.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error submitting report.' });
  }
});

module.exports = router;

const express = require('express');
const { ObjectId } = require('mongodb');
const { getDB } = require('../db');
const { requireAuth } = require('../middleware/auth');
const { publicAlbum, publicPost } = require('../utils');

const router = express.Router();

// GET /api/albums?owner=<userId> - list albums (optionally filtered by owner)
router.get('/', async (req, res) => {
  try {
    const db = getDB();
    const { owner } = req.query;
    const filter = owner ? { ownerId: owner } : {};
    const albums = await db.collection('albums').find(filter).sort({ createdAt: -1 }).toArray();
    res.json({ success: true, albums: albums.map(publicAlbum) });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error fetching albums.' });
  }
});

// GET /api/albums/:id - album detail with its posts resolved
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) return res.status(404).json({ success: false, message: 'Album not found.' });
    const db = getDB();
    const album = await db.collection('albums').findOne({ _id: new ObjectId(id) });
    if (!album) return res.status(404).json({ success: false, message: 'Album not found.' });

    const postIds = (album.postIds || []).filter((pid) => ObjectId.isValid(pid)).map((pid) => new ObjectId(pid));
    const posts = postIds.length ? await db.collection('posts').find({ _id: { $in: postIds } }).toArray() : [];

    res.json({ success: true, album: publicAlbum(album), posts: posts.map(publicPost) });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error fetching album.' });
  }
});

// POST /api/albums - create album { name, description, tag }
router.post('/', requireAuth, async (req, res) => {
  try {
    const { name, description, tag } = req.body;
    if (!name || name.trim().length < 2) {
      return res.status(400).json({ success: false, message: 'Album name must be at least 2 characters.' });
    }
    const db = getDB();
    const owner = await db.collection('users').findOne({ _id: new ObjectId(req.user.id) });

    const newAlbum = {
      name: name.trim(),
      description: description || '',
      tag: tag && tag.trim() ? (tag.trim().startsWith('#') ? tag.trim() : `#${tag.trim()}`) : '#Collection',
      ownerId: req.user.id,
      ownerUsername: owner.username,
      postIds: [],
      createdAt: new Date().toISOString()
    };
    const result = await db.collection('albums').insertOne(newAlbum);
    res.status(201).json({ success: true, message: 'Album created.', album: publicAlbum({ _id: result.insertedId, ...newAlbum }) });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error creating album.' });
  }
});

// PUT /api/albums/:id - edit name/description/tag (owner only)
router.put('/:id', requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const db = getDB();
    const album = await db.collection('albums').findOne({ _id: new ObjectId(id) });
    if (!album) return res.status(404).json({ success: false, message: 'Album not found.' });
    if (album.ownerId !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Only the owner can edit this album.' });
    }
    const { name, description, tag } = req.body;
    const update = {};
    if (name !== undefined) update.name = name;
    if (description !== undefined) update.description = description;
    if (tag !== undefined) update.tag = tag;

    await db.collection('albums').updateOne({ _id: new ObjectId(id) }, { $set: update });
    const updated = await db.collection('albums').findOne({ _id: new ObjectId(id) });
    res.json({ success: true, message: 'Album updated.', album: publicAlbum(updated) });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error updating album.' });
  }
});

// DELETE /api/albums/:id - owner only
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const db = getDB();
    const album = await db.collection('albums').findOne({ _id: new ObjectId(id) });
    if (!album) return res.status(404).json({ success: false, message: 'Album not found.' });
    if (album.ownerId !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Only the owner can delete this album.' });
    }
    await db.collection('albums').deleteOne({ _id: new ObjectId(id) });
    res.json({ success: true, message: 'Album deleted.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error deleting album.' });
  }
});

// POST /api/albums/:id/posts - add a post to an own album { postId }
router.post('/:id/posts', requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { postId } = req.body;
    const db = getDB();
    const album = await db.collection('albums').findOne({ _id: new ObjectId(id) });
    if (!album) return res.status(404).json({ success: false, message: 'Album not found.' });
    if (album.ownerId !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Only the owner can modify this album.' });
    }
    await db.collection('albums').updateOne({ _id: new ObjectId(id) }, { $addToSet: { postIds: postId } });
    const updated = await db.collection('albums').findOne({ _id: new ObjectId(id) });
    res.json({ success: true, message: 'Post added to album.', album: publicAlbum(updated) });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error adding post to album.' });
  }
});

// DELETE /api/albums/:id/posts/:postId - remove a post from an own album
router.delete('/:id/posts/:postId', requireAuth, async (req, res) => {
  try {
    const { id, postId } = req.params;
    const db = getDB();
    const album = await db.collection('albums').findOne({ _id: new ObjectId(id) });
    if (!album) return res.status(404).json({ success: false, message: 'Album not found.' });
    if (album.ownerId !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Only the owner can modify this album.' });
    }
    await db.collection('albums').updateOne({ _id: new ObjectId(id) }, { $pull: { postIds: postId } });
    const updated = await db.collection('albums').findOne({ _id: new ObjectId(id) });
    res.json({ success: true, message: 'Post removed from album.', album: publicAlbum(updated) });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error removing post from album.' });
  }
});

module.exports = router;

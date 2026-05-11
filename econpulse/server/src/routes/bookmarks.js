const express = require('express');
const router = express.Router();
const Bookmark = require('../models/Bookmark');
const fred = require('../services/fred');

router.post('/', async (req, res) => {
  const { seriesId, notes } = req.body;
  if (!seriesId) return res.status(400).json({ error: 'seriesId is required' });
  try {
    const meta = await fred.getSeriesMetadata(seriesId);
    const obs = await fred.getObservations(seriesId);
    const doc = await Bookmark.create({
      seriesId, title: meta.title, frequency: meta.frequency,
      units: meta.units, latestValue: obs[0]?.value,
      latestDate: obs[0]?.date, observations: obs,
      notes: notes || ''
    });
    res.status(201).json(doc);
  } catch (err) {
    res.status(502).json({ error: 'Failed to fetch FRED data' });
  }
});

router.get('/', async (req, res) => {
  try {
    const bookmarks = await Bookmark.find().sort({ createdAt: -1 });
    res.json(bookmarks);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch bookmarks' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const bookmark = await Bookmark.findById(req.params.id);
    if (!bookmark) return res.status(404).json({ error: 'Not found' });
    res.json(bookmark);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch bookmark' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const bookmark = await Bookmark.findByIdAndUpdate(
      req.params.id, { notes: req.body.notes }, { new: true }
    );
    if (!bookmark) return res.status(404).json({ error: 'Not found' });
    res.json(bookmark);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update bookmark' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const bookmark = await Bookmark.findByIdAndDelete(req.params.id);
    if (!bookmark) return res.status(404).json({ error: 'Not found' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete bookmark' });
  }
});

module.exports = router;

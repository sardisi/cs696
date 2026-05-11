const express = require('express');
const router = express.Router();
const fred = require('../services/fred');

router.get('/', async (req, res) => {
  const { q } = req.query;
  if (!q) return res.status(400).json({ error: 'q parameter is required' });
  try {
    const results = await fred.searchSeries(q);
    res.json(results);
  } catch (err) {
    res.status(502).json({ error: 'Failed to search FRED' });
  }
});

module.exports = router;

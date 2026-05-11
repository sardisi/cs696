const express = require('express');
const router = express.Router();
const fred = require('../services/fred');

const INDICATORS = ['UNRATE', 'GDP', 'CPIAUCSL', 'FEDFUNDS', 'DGS10'];

router.get('/', async (req, res) => {
  try {
    const results = await Promise.all(INDICATORS.map(async (id) => {
      const meta = await fred.getSeriesMetadata(id);
      const obs = await fred.getObservations(id);
      return {
        seriesId: id,
        title: meta.title,
        units: meta.units,
        latestValue: obs[0]?.value || 'N/A',
        latestDate: obs[0]?.date || 'N/A'
      };
    }));
    res.json(results);
  } catch (err) {
    res.status(502).json({ error: 'Failed to fetch FRED data' });
  }
});

module.exports = router;

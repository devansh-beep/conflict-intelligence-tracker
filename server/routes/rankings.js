const express = require('express');
const router = express.Router();
const rankings = require('../data/powerRankings.json');

router.get('/', (req, res) => {
  res.json({ count: rankings.length, data: rankings });
});

router.get('/:code', (req, res) => {
  const entry = rankings.find(r => r.countryCode === req.params.code.toUpperCase());
  if (!entry) return res.status(404).json({ message: 'Country not found in rankings' });
  res.json(entry);
});

module.exports = router;

const express = require('express');
const router = express.Router();
const conflicts = require('../data/conflicts.json');

// GET all conflicts
router.get('/', (req, res) => {
  const { type, severity, status } = req.query;
  let filtered = [...conflicts];

  if (type) filtered = filtered.filter(c => c.conflictType === type);
  if (severity) filtered = filtered.filter(c => c.severity >= parseFloat(severity));
  if (status) filtered = filtered.filter(c => c.status === status);

  res.json({ count: filtered.length, data: filtered });
});

// GET single conflict by ID
router.get('/:id', (req, res) => {
  const conflict = conflicts.find(c => c.id === req.params.id);
  if (!conflict) return res.status(404).json({ message: 'Conflict not found' });
  res.json(conflict);
});

// GET conflicts by country code
router.get('/country/:code', (req, res) => {
  const conflict = conflicts.find(c => c.countryCode === req.params.code.toUpperCase());
  if (!conflict) return res.status(404).json({ message: 'No conflict data for this country' });
  res.json(conflict);
});

module.exports = router;

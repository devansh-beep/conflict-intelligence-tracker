const express = require('express');
const cors = require('cors');
const conflictRoutes = require('./routes/conflicts');
const rankingsRoutes = require('./routes/rankings');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/conflicts', conflictRoutes);
app.use('/api/rankings', rankingsRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Conflict Intelligence Tracker API running' });
});

app.listen(PORT, () => {
  console.log(`🌐 Conflict Tracker API running on port ${PORT}`);
});

module.exports = app;

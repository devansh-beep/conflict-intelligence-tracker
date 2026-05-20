const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const conflictRoutes = require('./routes/conflicts');
const rankingsRoutes = require('./routes/rankings');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://devanshjain791:gyanganga123@cluster0.sfdkc9v.mongodb.net/conflictDB?appName=Cluster0')
  .then(() => console.log('✅ MongoDB Atlas Connected!'))
  .catch((err) => console.log('❌ MongoDB Error:', err));

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
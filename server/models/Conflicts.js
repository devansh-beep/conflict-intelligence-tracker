const mongoose = require('mongoose');

const conflictSchema = new mongoose.Schema({
  id: String,
  name: String,
  country: String,
  countryCode: String,
  conflictType: String,
  severity: Number,
  status: String,
  startDate: String,
  casualties: Number,
  description: String,
  coordinates: {
    lat: Number,
    lng: Number
  }
});

module.exports = mongoose.model('Conflict', conflictSchema);
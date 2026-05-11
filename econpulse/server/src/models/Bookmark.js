const mongoose = require('mongoose');

const bookmarkSchema = new mongoose.Schema({
  seriesId: { type: String, required: true },
  title: { type: String, required: true },
  frequency: String,
  units: String,
  latestValue: String,
  latestDate: String,
  observations: {
    type: [{ date: String, value: String }],
    default: []
  },
  notes: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Bookmark', bookmarkSchema);

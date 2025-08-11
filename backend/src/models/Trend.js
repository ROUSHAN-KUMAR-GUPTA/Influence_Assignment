const mongoose = require('mongoose');
const TrendSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: String,
  summary: String,
  sourceUrl: String,
  tags: [String],
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Trend', TrendSchema);

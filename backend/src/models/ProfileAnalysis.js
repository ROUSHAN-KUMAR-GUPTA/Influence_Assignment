const mongoose = require('mongoose');
const ProfileAnalysisSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  rawProfile: Object,
  targetAudience: String,
  keyStrengths: [String],
  tone: String,
  postingFrequency: String,
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('ProfileAnalysis', ProfileAnalysisSchema);

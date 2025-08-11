const mongoose = require('mongoose');
const DraftSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: String,
  body: String,
  hashtags: [String],
  imageUrl: String,
  postType: { type: String, enum: ['text','poll','carousel'], default: 'text' },
  aiMetadata: Object,
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Draft', DraftSchema);

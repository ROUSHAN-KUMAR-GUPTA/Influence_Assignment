const mongoose = require('mongoose');
const ScheduledJobSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  draft: { type: mongoose.Schema.Types.ObjectId, ref: 'Draft', required: true },
  postAt: { type: Date, required: true, index: true },
  status: { type: String, enum: ['scheduled','posted','failed','cancelled'], default: 'scheduled' },
  linkedinPostId: String,
  attempts: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('ScheduledJob', ScheduledJobSchema);

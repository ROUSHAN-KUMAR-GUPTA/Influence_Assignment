const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  email: { type: String },
  name: { type: String },
  linkedin: {
    id: String,
    accessToken: String,
    refreshToken: String,
    expiresAt: Date
  },
  preferences: {
    aiModel: { type: String, default: 'gpt-4' },
    timezone: { type: String, default: 'Asia/Kolkata' }
  },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('User', UserSchema);

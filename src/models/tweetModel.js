const mongoose = require('mongoose');

const tweetSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

tweetSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Tweet', tweetSchema);

// models/VerificationTokenModel.js
const mongoose = require('mongoose');

const verificationTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  isUsed: {
    type: Boolean,
    default: false,
  },
  expiryDate: {
    type: Date,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('VerificationToken', verificationTokenSchema);

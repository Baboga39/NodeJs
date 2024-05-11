const mongoose = require('mongoose');

const accessSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true, strict: false });

const Access = mongoose.model('Access', accessSchema);

module.exports = Access;

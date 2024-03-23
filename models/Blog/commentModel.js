const mongoose = require('mongoose');
const autopopulate = require('mongoose-autopopulate');

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', autopopulate: true }, // Tham chiếu người dùng
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  replyToCommentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment', autopopulate: true },
  replies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment', autopopulate: true }], // Mảng ID các reply
});

commentSchema.pre('save', async function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Comment', commentSchema);

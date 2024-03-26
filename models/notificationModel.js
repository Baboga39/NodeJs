const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    target: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog',
    },
    type: {
        type: String,
        enum: ['Follow', 'Comment', 'Like'],
    },
    isRead: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true,  strict: false });
module.exports = mongoose.model('Notification', NotificationSchema);

const mongoose = require('mongoose');
const autopopulate = require('mongoose-autopopulate');

// Schema cho báo cáo
const reportCommentSchema = new mongoose.Schema({
    userReport: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        autopopulate : true,
        required: true
    },
    comment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
        autopopulate : true,
        required: true
    },
    reason: {
        type: String,
        required: true
    },
});
reportCommentSchema.plugin(autopopulate)
const Report = mongoose.model('ReportComment', reportCommentSchema);

module.exports = Report;

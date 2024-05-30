const mongoose = require('mongoose');
const autopopulate = require('mongoose-autopopulate');

// Schema cho báo cáo
const reportBlogSchema = new mongoose.Schema({
    userReport: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        autopopulate : true,
        required: true
    },
    blogIsReported: {
        type: mongoose.Schema.Types.ObjectId,
        autopopulate : true,
        ref: 'Blog',
        required: true
    },
    message: {
        type: String,
        default: null
    },
    reason: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ReportType',
        autopopulate : true,
    },
}, { timestamps: true });
reportBlogSchema.plugin(autopopulate)
const Report = mongoose.model('ReportBlog', reportBlogSchema);

module.exports = Report;

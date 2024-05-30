const mongoose = require('mongoose');
const autopopulate = require('mongoose-autopopulate');

// Schema cho báo cáo
const reportSchema = new mongoose.Schema({
    userReport: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        autopopulate : true,
        required: true
    },
    userIsReported: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        autopopulate : true,
        required: true
    },
    message: {
        type: String,
        default: null
    },
    reason: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ReportType',
        autopopulate : true
    },
}, { timestamps: true });
reportSchema.plugin(autopopulate)
const Report = mongoose.model('Report', reportSchema);

module.exports = Report;

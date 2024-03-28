const mongoose = require('mongoose');
const autopopulate = require('mongoose-autopopulate');

// Schema cho báo cáo
const reportTagSchema = new mongoose.Schema({
    userReport: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        autopopulate : true,
        required: true
    },
    tagIsReported: {
        type: mongoose.Schema.Types.ObjectId,
        autopopulate : true,
        ref: 'Tag',
        required: true
    },
    reason: {
        type: String,
        required: true
    },
});
reportTagSchema.plugin(autopopulate)
const Report = mongoose.model('ReportTag', reportTagSchema);

module.exports = Report;

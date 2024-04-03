const mongoose = require('mongoose');


const ReportSchema = new mongoose.Schema({
    value: { type: String, required: true }
}); 

module.exports = mongoose.model('ReportType', ReportSchema);

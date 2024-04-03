const mongoose = require('mongoose');

const ReportTypes = {
    Spam: 'Spam',
    Fake_News: 'Fake News',
    Prohibited_Content: 'Prohibited Content',
    Offense: 'Offense',
    Cheat: 'Cheat',
    Violence: 'Violence',
    Lack_of_Sexual_Integrity: 'Lack of Sexual Integrity'
};

const ReportSchema = new mongoose.Schema({
    value: { type: String, required: true }
}); 

module.exports = mongoose.model('ReportType', ReportSchema);

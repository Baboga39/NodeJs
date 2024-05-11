const mongoose = require('mongoose');
const autopopulate = require('mongoose-autopopulate');


const settingBlogSchema = new mongoose.Schema({
    value: {
        type: String,
        required: true
    }
  }, { timestamps: true, strict: false });
  settingBlogSchema.plugin(autopopulate);

module.exports = mongoose.model('SettingBlog', settingBlogSchema);;

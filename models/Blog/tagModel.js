// models/Tag.js
const mongoose = require('mongoose');
const autopopulate = require('mongoose-autopopulate');

if (mongoose.models.Tag) {
    delete mongoose.models.Tag;
  }
const tagSchema = new mongoose.Schema({
  name: String,
  sumBlog: {
    type: Number,
    default: 0
  },
  user: {type: mongoose.Schema.Types.ObjectId, ref:'User',autopopulate : true},

}, { timestamps: true, strict: false });
tagSchema.plugin(autopopulate)


tagSchema.pre('findByIdAndDelete', async function (next) {
  const tagId = this._id;

  const Blog = require('../Blog/blogModel');
  const Category = require('./categoryModel');
  // Xóa tag khỏi blog (sử dụng toán tử `$pull`)
  await Blog.updateMany({}, { $pull: { tags: tagId } });

  // Xóa tag khỏi danh mục (sử dụng toán tử `$pull`)
  await Category.updateMany({}, { $pull: { tags: tagId } });

  next();
});
module.exports = mongoose.model('Tag', tagSchema);;

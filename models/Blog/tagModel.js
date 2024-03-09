// models/Tag.js
const mongoose = require('mongoose');

if (mongoose.models.Tag) {
    delete mongoose.models.Tag;
  }
const tagSchema = new mongoose.Schema({
  name: String,
}, { timestamps: true, strict: false });

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

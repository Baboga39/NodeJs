// models/Category.js
const mongoose = require('mongoose');
const autopopulate = require('mongoose-autopopulate');
const Tag = mongoose.model('Tag');
const categorySchema = new mongoose.Schema({
  name: String,
  description: String,
  avatar: String,
  banner: String,
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag', autopopulate: true }],
}, { timestamps: true, strict: false });

categorySchema.plugin(autopopulate);

categorySchema.methods.addTags = async function (tagIds) {
  // Lọc ra các tagId chưa tồn tại trong mảng tags
  const newTagIds = tagIds.filter(tagId => !this.tags.includes(tagId));

  // Tìm và thêm các tag mới vào mảng tags
  for (const tagId of newTagIds) {
    const existingTag = await Tag.findById(tagId);
    if (existingTag) {
      this.tags.push(existingTag);
    }
  }

  // Lưu thay đổi
  await this.save();
};
categorySchema.pre('findOneAndDelete', async function (next) {

  const Blog = require('../Blog/blogModel');
  const docToDelete = await this.model.findOne(this.getQuery());
  await Blog.deleteMany({ category: docToDelete });

  next();
});

module.exports = mongoose.model('Category', categorySchema);;

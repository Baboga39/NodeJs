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
 
  for (const tagId of tagIds) {
    const existingTag = await Tag.findById(tagId);
    if (existingTag) {
      this.tags.push(existingTag);
    }
  }

  await this.save();
};

categorySchema.pre('findOneAndDelete', async function (next) {

  const Blog = require('../Blog/blogModel');
  const docToDelete = await this.model.findOne(this.getQuery());
  await Blog.deleteMany({ category: docToDelete });

  next();
});

module.exports = mongoose.model('Category', categorySchema);;

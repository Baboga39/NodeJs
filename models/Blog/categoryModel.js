// models/Category.js
const mongoose = require('mongoose');
const autopopulate = require('mongoose-autopopulate');
const Tag = mongoose.model('Tag');
const User = mongoose.model('User');
const categorySchema = new mongoose.Schema({
  name: String,
  description: String,
  type: {
    type: String,
    enum: ['Publish', 'Private'],
    default: 'Publish',
  },
  sumUser: {
    type: Number,
    default: function () {
      return this.users.length;
    },
  },
  isAdmin: {type: mongoose.Schema.Types.ObjectId, ref:'User',autopopulate : false},
  users: [{type: mongoose.Schema.Types.ObjectId, ref:'User',autopopulate : false}],
  avatar: {
    publicId: { type: String, default: null },
    url: { type: String, default: null },
  },
  banner: {
    publicId: { type: String, default: null },
    url: { type: String, default: null },
  },
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag', autopopulate: false }],
}, { timestamps: true, strict: false });

categorySchema.plugin(autopopulate);

categorySchema.methods.addTags = async function (newTagIds) {
  // Tìm và thêm các tag mới vào mảng tags
  for (const tagId of newTagIds) {
     const existingTag = await Tag.findById(tagId);
     if (existingTag) {
      console.log('Found existing');
      const duplicate = this.tags.some(existingTagId => existingTagId.equals(tagId));
        if (!duplicate) { // chỉ thêm tag nếu nó chưa tồn tại 
           this.tags.push(existingTag);
        }
     }
  }
  // Lưu thay đổi
  await this.save();
};
categorySchema.methods.addUsers = async function (newUsers) {
  const addAdmin = this.users.some(existingUserId => existingUserId.equals(this.isAdmin))
  if (!addAdmin) {

    this.users.push(this.isAdmin)
  }
  // Tìm và thêm các tag mới vào mảng tags
  for (const userId of newUsers) {
     const existingUser = await User.findById(userId);
     if (existingUser) {
      console.log('Found existing');
      const duplicate = this.users.some(existingUserId => existingUserId.equals(userId));
        if (!duplicate) { // chỉ thêm tag nếu nó chưa tồn tại 
           this.users.push(existingUser);
        }
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
categorySchema.methods.removeTags = async function (tagIdsToRemove) {
  const updatedTags = [];

  this.tags.forEach(tagId => {
    if (!tagIdsToRemove.includes(tagId._id.toString())) {
      updatedTags.push(tagId);
    }
  });

  this.tags = updatedTags;

  // Lưu thay đổi
  await this.save();
};
categorySchema.methods.removeUsers = async function (userIdsToRemove) {
  const updatedUsers = [];

  this.users.forEach(userId => {
    if (!userIdsToRemove.includes(userId._id.toString())) {
  
      updatedUsers.push(userId);
    }
  });

  this.users = updatedUsers;
  
  // Lưu thay đổi
  await this.save();
};
module.exports = mongoose.model('Category', categorySchema);;

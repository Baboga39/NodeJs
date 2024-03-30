// models/Category.js
const mongoose = require('mongoose');
const autopopulate = require('mongoose-autopopulate');
const Tag = require('./tagModel')
const User = mongoose.model('User');
const { v4: uuidv4 } = require('uuid');
const Blog = require('../Blog/blogModel')
const UserRequest = require('../Blog/userRequestModel')
const categorySchema = new mongoose.Schema({
  name: String,
  description: String,
  status: {
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
  banner: String,
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag', autopopulate: false }],
  invitationCode: { type: String, unique: true } 
}, { timestamps: true, strict: false });
categorySchema.pre('save', function (next) {
  if (!this.invitationCode) {
    this.invitationCode = uuidv4(); // Sử dụng uuidv4() để tạo mã mời ngẫu nhiên
  }
  next();
});
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
  const addAdmin = !this.users.some(existingUserId => existingUserId.equals(this.isAdmin));
  if (addAdmin) {
    this.users.push(this.isAdmin);
  }

  if (typeof newUsers === 'object' && !Array.isArray(newUsers)) {
    const userId = newUsers;
    const existingUser = await User.findById(userId);
    if (existingUser) {
      const duplicate = this.users.some(existingUserId => existingUserId.equals(userId));
      if (!duplicate) { 
        this.users.push(existingUser);
      }
    }
  } else {
    // Nếu `newUsers` là một mảng, lặp qua và thêm từng người dùng
    for (const userId of newUsers) {
      const existingUser = await User.findById(userId);
      if (existingUser) {
        console.log('Found existing');
        const duplicate = this.users.some(existingUserId => existingUserId.equals(userId));
        if (!duplicate) { // chỉ thêm người dùng nếu chưa tồn tại trong danh sách 
          this.users.push(existingUser);
        }
      }
    }
  }
  
  // Lưu thay đổi
  await this.save();
};

categorySchema.pre('findOneAndDelete', async function (next) {
  try {
    const docToDelete = await this.model.findOne(this.getQuery());
    if (docToDelete) {
      const blogs = await Blog.find({ category: docToDelete._id }).populate('tags');
      console.log(blogs);
      for (const blog of blogs) {
        if (blog.tags && blog.tags.length > 0) {
          for (const tag of blog.tags) {
            await Tag.findByIdAndUpdate(tag._id, { $inc: { sumBlog: -1 } });
          }
        }
      }      
    }
    await UserRequest.deleteMany({
      Category: docToDelete._id
    })
    await Blog.deleteMany({ category: docToDelete._id });
    next();
  } catch (error) {
    console.error("Error in pre 'findOneAndDelete' middleware for category:", error);
    next(error);
  }
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

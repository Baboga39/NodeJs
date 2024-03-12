// models/Blog.js
const mongoose = require('mongoose');
const autopopulate = require('mongoose-autopopulate');
const Tag = require('./tagModel');
if (mongoose.models.Blog) {
    delete mongoose.models.Blog;
  }
const blogSchema = new mongoose.Schema({
  title: String,
  content: String,
  description: String,
  avatar: {
    type: String,
    default: null,
  },
  status: {
    type: String,
    enum: ['Published', 'Draft'],
    default: 'Published',
  },
  likes:{
    type:Number,
    default:0
  },
  sumComment :{
    type:Number,
    default:0
  },
  user: {type: mongoose.Schema.Types.ObjectId, ref:'User',autopopulate : true},
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' ,autopopulate: false},
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag', autopopulate : true }],
  // listUserLike: [{type: mongoose.Schema.Types.ObjectId, ref:'User',autopopulate : false}],

}, { timestamps: true, strict: false });
blogSchema.plugin(autopopulate)

blogSchema.methods.addTags = async function (tagIds) {
  for (const tagId of tagIds) {
      // Kiểm tra xem tag đã tồn tại trong blog hay chưa
      const tagExists = this.tags.some(existingTag => existingTag.equals(tagId));

      // Nếu tag không tồn tại, thêm vào mảng tags
      if (!tagExists) {
          const existingTag = await Tag.findById(tagId);
          if (existingTag) {
              this.tags.push(existingTag);
          }
      }
  }

  await this.save();
};
module.exports = mongoose.model('Blog', blogSchema);;

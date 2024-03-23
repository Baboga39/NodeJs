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
  views:{
    type:Number,
    default:0
  },
  sumComment :{
    type:Number,
    default:0
  },
  isSave: { 
    type: Boolean,
    default:false},
  isLiked: {
    type: Boolean,
    default:false
  },
  user: {type: mongoose.Schema.Types.ObjectId, ref:'User',autopopulate : true},
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' ,autopopulate: false},
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag', autopopulate : true }],
  listUserLikes: [{type: mongoose.Schema.Types.ObjectId, ref:'User',autopopulate : true}],
  savedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', autopopulate : false}],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment', autopopulate: true }],
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
blogSchema.post('save', async function () {

  const count = await this.model('Blog').countDocuments({ tags: { $in: this.tags } });

  await Tag.updateMany({ _id: { $in: this.tags } }, { sumBlog: count });
});
module.exports = mongoose.model('Blog', blogSchema);;

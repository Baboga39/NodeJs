const Blog = require('../models/Blog/blogModel')
const Comment = require('../models/Blog/commentModel')
class CategoryService {

    static addComment = async (blogId, userId, content, replyToCommentId = null) => {
    const newComment = new Comment();
    if(!replyToCommentId)
    {
        newComment.content = content;
        newComment.user = userId;
    }
    else{
        newComment.content = content;
        newComment.user = userId;
        newComment.replyToCommentId = replyToCommentId;
    }
    if (replyToCommentId) {
    const parentComment = await Comment.findById(replyToCommentId);
    if (!parentComment) {
        return null;
    }
    parentComment.replies.push(newComment._id);
    await parentComment.save();
    }
    await newComment.save();
    const blog = await Blog.findById(blogId);
    blog.comments.push(newComment._id);
    blog.sumComment++;
    await blog.save();
    return newComment;
    };
}

module.exports = CategoryService;
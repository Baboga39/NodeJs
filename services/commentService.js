const Blog = require('../models/Blog/blogModel')
const Comment = require('../models/Blog/commentModel')
class CategoryService {

    static addComment = async (blogId, userId, content, replyToCommentId = null) => {
    const newComment = new Comment();
    const blog = await Blog.findById(blogId);
    if(!blog)
    {
        return 1;
    }
    if(!replyToCommentId)
    {
        newComment.content = content;
        newComment.user = userId;
        newComment.replyToCommentId = null;
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
    blog.comments.push(newComment._id);
    blog.sumComment++;
    await blog.save();
    return newComment;
    };
    static deleteComment = async (commentId, userId, blogId) => {
        try {
            const comment = await Comment.findById(commentId);
            if (!comment) {
                return 1; 
            }
    
            const blog = await Blog.findById(blogId);
            if (!blog) {
                return 2; 
            }
    
            if (
                blog.user.equals(userId) ||
                comment.user.equals(userId) || 
                req.user.role ==="Admin"){
                await this.deleteChildComments(commentId);
                const index = blog.comments.indexOf(commentId);
                if (index > -1) {
                    blog.comments.splice(index, 1);
                    blog.sumComment--;
                    await blog.save();
                }
    
                await Comment.findByIdAndDelete(commentId);
                return comment;
            } else {
                return null; 
            }
        } catch (error) {
            console.error('Error deleting comment:', error);
            throw error;
        }
    };
    
    // Helper function to delete child comments recursively
    static deleteComment = async (commentId, userId, blogId) => {
        try {
            const comment = await Comment.findById(commentId);
            if (!comment) {
                return 1; 
            }
            const blog = await Blog.findById(blogId);
            if (!blog) {
                return 2;
            }
    
            if (
                blog.user.equals(userId) ||
                comment.user.equals(userId) ||
                req.user.roles==="Admin"){
                await deleteChildComments(commentId);
                    const index = blog.comments.indexOf(commentId);
                if (index > -1) {
                    blog.comments.splice(index, 1);
                    blog.sumComment--;
                    await blog.save();
                }
                await Comment.findByIdAndDelete(commentId);
                return comment;
            } else {
                return 3; 
            }
        } catch (error) {
            console.error('Error deleting comment:', error);
            throw error;
        }
    };
    
    static deleteChildComments = async (commentId) => {
        const comment = await Comment.findById(commentId).populate('replies');
        if (!comment) return;
    
        for (const reply of comment.replies) {
            await deleteChildComments(reply._id);
            await Comment.findByIdAndDelete(reply._id);
        }
    };
    
    
}

module.exports = CategoryService;
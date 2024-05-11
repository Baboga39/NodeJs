const Blog = require('../models/Blog/blogModel')
const Comment = require('../models/Blog/commentModel');
const usermodel = require('../models/usermodel');
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
            const userAuthenticated = await usermodel.findById(userId);
            const blog = await Blog.findById(blogId);
            if (!blog) {
                return 2;
            }
            if (
                blog.user.equals(userId) ||
                comment.user.equals(userId) ||
                userAuthenticated.roles==="Admin"
            ){
                await CategoryService.deleteChildComments(comment._id, blog); // Thay đổi dòng này
                const index = blog.comments.findIndex(comment => comment.equals(commentId));
                if (index !== -1) {
                    blog.comments.splice(index, 1); // Xóa comment cụ thể khỏi mảng
                    const sumComment = blog.sumComment - 1;
                    blog.sumComment = sumComment;
                    await blog.save();
                }
                await Comment.findByIdAndDelete(commentId);
                return comment;
            } else {
                return 3; 
            }
        } catch (error) {
            console.error('Lỗi khi xóa bình luận:', error);
            throw error;
        }
    };
    static deleteCommentAuto = async (commentId, blogId) => {
        try {
            const comment = await Comment.findById(commentId);
            if (!comment) {
                return 1; 
            }
            const blog = await Blog.findById(blogId);
            if (!blog) {
                return 2;
            }
                await CategoryService.deleteChildComments(comment._id, blog); // Thay đổi dòng này
                const index = blog.comments.findIndex(comment => comment.equals(commentId));
                if (index !== -1) {
                    blog.comments.splice(index, 1); // Xóa comment cụ thể khỏi mảng
                    const sumComment = blog.sumComment - 1;
                    blog.sumComment = sumComment;
                    await blog.save();
                }
                await Comment.findByIdAndDelete(commentId);
                return comment;
        } catch (error) {
            console.error('Lỗi khi xóa bình luận:', error);
            throw error;
        }
    };
    static deleteChildComments = async (commentId, blog = null) => {
        const comment = await Comment.findById(commentId).populate('replies');
        if (!comment) return;
        for (const reply of comment.replies) {
            await CategoryService.deleteChildComments(reply._id, blog); 
            blog.sumComment = blog.sumComment - 1; 
            await blog.save();
            await Comment.findByIdAndDelete(reply._id);
        }
    }
    static editComment = async (commentId, userId,content) => {
        try {
            const comment = await Comment.findById(commentId);
            if (!comment) {
                return 1; 
            }
            if (
                comment.user.equals(userId)
            ){
                comment.content = content;
                comment.save();
                return comment;
            } else {
                return 3; 
            }
        } catch (error) {
            console.error('Lỗi khi xóa bình luận:', error);
            throw error;
        }
    };
}

module.exports = CategoryService;
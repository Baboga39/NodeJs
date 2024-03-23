const Blog = mongoose.model('Blog');
const Comment = mongoose.model('Comment');

const addComment = async (blogId, userId, content, replyToCommentId = null) => {
    const newComment = new Comment({
    content,
    user: userId,
    replyToCommentId,
    });

    if (replyToCommentId) {
    const parentComment = await Comment.findById(replyToCommentId);
    if (!parentComment) {
        throw new Error('ID comment không hợp lệ để reply');
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
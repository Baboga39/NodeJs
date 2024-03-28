const Blog = require('../models/Blog/blogModel');
const User = require('../models/usermodel');
const Tag = require('../models/Blog/tagModel');
const ReportUser = require('../models/reportUserModel')
const ReportBlog = require('../models/retportBlogModel')
const ReportTag = require('../models/reportTagModel')
class ReportService {
    static reportUser = async (userId, userAuthentication,reason)=>{
        const user = await User.findById(userId);
        if(!user) return 0;
        const userAuthenticated = await User.findById(userAuthentication._id);
        const reportCheck = await ReportUser.findOne({userReport: userAuthentication._id, userIsReported: user._id})
        if(reportCheck){
            return 2;
        }
        if(!userAuthentication) return 1;
        const reportUser = new ReportUser({
            userReport: userAuthenticated._id,
            reason: reason,
            userIsReported: user._id,
        });
        return await reportUser.save();
    }
    static reportBlog = async (blogId, userAuthentication,reason)=>{
        const blog = await Blog.findById(blogId);
        const user = await User.findById(userAuthentication._id);
        if(!blog) return 0;
        const userAuthenticated = await User.findById(userAuthentication._id);
        if(!userAuthenticated) return 1;
        const reportCheck = await ReportUser.findOne({userReport: userAuthentication._id, blogIsReported: blog._id})
        if(!reportCheck) return 2;
        const reportBlog = new ReportBlog({
            userReport: user._id,
            reason: reason,
            blogIsReported: blog._id,
        });
        return await reportBlog.save();
    }
    static reportTag = async (tagId, userAuthentication,reason)=>{
        const tag = await Tag.findById(tagId);
        const user = await User.findById(userAuthentication._id);
        if(!tag) return 0;
        const userAuthenticated = await User.findById(userAuthentication._id);
        if(!userAuthenticated) return 1;
        const reportTag = new ReportTag({
            userReport: user._id,
            reason: reason,
            tagIsReported: tag._id,
        });
        return await reportTag.save();
    }
}
module.exports = ReportService;
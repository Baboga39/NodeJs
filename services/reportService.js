const Blog = require('../models/Blog/blogModel');
const User = require('../models/usermodel');
const Tag = require('../models/Blog/tagModel');
const Comment = require('../models/Blog/commentModel')
const ReportUser = require('../models/reportUserModel')
const ReportBlog = require('../models/retportBlogModel')
const ReportTag = require('../models/reportTagModel')
const ReportComment  = require('../models/reportCommentModel')
const ReportType = require('../models/enumReportModel')
class ReportService {
    static reportUser = async (userId, userAuthentication,message,reason)=>{
        const user = await User.findById(userId);
        if(!user) return 0;
        const userAuthenticated = await User.findById(userAuthentication._id);
        const reportCheck = await ReportUser.findOne({userReport: userAuthentication._id, userIsReported: user._id,})
        if(reportCheck){
            return 2;
        }
        const reasonFind = await ReportType.findById(reason);
        if(!reasonFind)
        {
            return 3;
        }
        if(!userAuthentication) return 1;
        const reportUser = new ReportUser({
            userReport: userAuthenticated._id,
            message: message,
            reason: reason,
            userIsReported: user._id,
        });
        return await reportUser.save();
    }

    static reportBlog = async (blogId, userAuthentication,message,reason)=>{
        const blog = await Blog.findById(blogId);
        const user = await User.findById(userAuthentication._id);
        if(!blog) return 0;
        const reasonFind = await ReportType.findById(reason);
        if(!reasonFind)
        {
            return 3;
        }
        const userAuthenticated = await User.findById(userAuthentication._id);
        if(!userAuthenticated) return 1;
        const reportCheck = await ReportUser.findOne({userReport: userAuthentication._id, blogIsReported: blog._id})
        if(reportCheck) return 2;
        const reportBlog = new ReportBlog({
            userReport: user._id,
            message: message,
            reason: reason,
            blogIsReported: blog._id,
        });
        return await reportBlog.save();
    }
    static reportTag = async (tagId, userAuthentication,message,reason)=>{
        const tag = await Tag.findById(tagId);
        const user = await User.findById(userAuthentication._id);
        if(!tag) return 0;
        const reasonFind = await ReportType.findById(reason);
        if(!reasonFind)
        {
            return 3;
        }
        const userAuthenticated = await User.findById(userAuthentication._id);
        const reportCheck = await ReportTag.findOne({userReport: user._id, tagIsReported: tag._id})
        if(reportCheck) return 2;
        if(!userAuthenticated) return 1;
        const reportTag = new ReportTag({
            userReport: user._id,
            message: message,
            reason: reason,
            tagIsReported: tag._id,
        });
        return await reportTag.save();
    }
    static reportComment = async (commentId, userAuthentication, message, reason)=>{
        const user = await User.findById(userAuthentication._id);
        if(!user) return 1;
        const reasonFind = await ReportType.findById(reason);
        if(!reasonFind)
        {
            return 3;
        }
        const CommentFind = await Comment.findById(commentId);
        if(!CommentFind) return 0;
        const reportCheck = await ReportComment.findOne({userReport: userAuthentication._id, comment: commentId})
        if(reportCheck){
            return 2;
        }
        const reportComment = new ReportComment({
            userReport: user._id,
            message: message,
            reason: reason,
            comment: CommentFind._id,
        });
        return await reportComment.save();
    }
    static getAllReportType = async ()=>{
        const reportType = await ReportType.find();
        return reportType;
    }
    static addTypeReport = async (value)=>{
        value = value.trim();
        const reportCheck = await ReportType.findOne({value: value});
        if(reportCheck){
            return 1;
        }
        const reportType = new ReportType({
            value: value,
        })
        return reportType.save();
    };
    static editTypeReport = async (reportTypeId, value)=>{
        value = value.trim();
        const report = await ReportType.findById(reportTypeId);
        if(!report) return 1;
        const listReportType = await ReportType.find();
        for(const reportType of listReportType){
            if(reportType._id.equals(report._id))
            {
                continue;
            }
            else {
                if(reportType.value.toLowerCase() === value.toLowerCase()){
                    return 2;
                }
            }
        }
        report.value = value;
        return report.save();
    };
    static deleteTypeReport = async (reportTypeId)=>{
        const report = await ReportType.findById(reportTypeId);
        if(!report) return 1;
        const reportUser = await ReportUser.deleteMany({reason: report._id});
        const reportBlog = await ReportBlog.deleteMany({reason: report._id});
        const reportTag = await ReportTag.deleteMany({reason: report._id});
        const reportComment = await ReportComment.deleteMany({reason: report._id});
        await report.deleteOne();
        return 0;
    }
}
module.exports = ReportService;
const Setting = require('../models/settingModel')
const reportBlog = require('../models/retportBlogModel')
const reportUser = require('../models/reportUserModel')
const reportComment = require('../models/reportCommentModel')
const reportTag = require('../models/reportTagModel')
const Blog = require('../models/Blog/blogModel')
const Category = require('../models/Blog/categoryModel')
const Comment = require('../models/Blog/commentModel')
const Tag = require('../models/Blog/tagModel')
const User = require('../models/usermodel')
const Access = require('../models/accessModel')


const mailService = require('../services/mailService')
const blogService = require('../services/blogService')
const tagService = require('../services/tagService')
const commentService = require('../services/commentService')
const categoryService = require('../services/categoryService')

class AdminService{
    static addSettingsBlog= async (value) =>{
    value = value.trim();
    const checkSetting = await Setting.findOne({value: value});
    if(checkSetting)
    {
        return 1;
    }
    const setting = new Setting({
        value: value
    });
    return setting.save();
    }
    static editSettingBlog = async (settingId, value) =>{
    const setting = await Setting.findById(settingId);
    const settingList = await Setting.find();
    for(const settingCheck of settingList){
        if(settingCheck._id.equals(setting._id)){
            continue;
        }
        if(settingCheck.value.toLowerCase() === value.toLowerCase())
        {
            return 1;
        }
    }
    setting.value = value;
    await setting.save();
    return setting;
    }
    static deleteSettingBlog = async (settingId) =>{
    const setting = await Setting.findById(settingId);
    if(!setting) return 1;
    await setting.deleteOne();
    return setting;
    }
    static getAllSettingBlog = async () => {
        const settings = await Setting.find(); // Truy vấn tất cả settings
        const results = settings.map(setting => {
            // Tạo một đối tượng Date từ thời điểm hiện tại
            const currentDate = new Date();
    
            // Điều chỉnh thời gian cho múi giờ Việt Nam (UTC+7)
            currentDate.setUTCHours(16); // Đặt giờ là 23 giờ theo múi giờ UTC+7
            currentDate.setMinutes(59);
            currentDate.setSeconds(59);
            currentDate.setMilliseconds(999);
    
            // Thêm trường dueDate vào mỗi đối tượng setting
            return {
                ...setting.toObject(), // Chuyển document Mongoose thành plain object
                dueDate: currentDate.toISOString() // Định dạng ISO 8601
            };
        });
        return results;
    }
    
    static getReportByType (type){
    if(type==='Blog'){
        return reportBlog.find().sort({ createdAt: -1 });
    }
    if(type==='User'){
        return reportUser.find().sort({ createdAt: -1 });
    }
    if(type==='Comment'){
        return reportComment.find().sort({ createdAt: -1 });
    }
    if(type==='Tag'){
        return reportTag.find().sort({ createdAt: -1 });
    }
    }
    static evaluateReport = async ( reportId,type,status,authenticatedUser) =>{
        const userAuthenticated = await User.findById(authenticatedUser._id);
        try{
            if(type==='Blog'){
                const report = await reportBlog.findById(reportId);
                if(!report) return 1;
                if(status===true){
                    const blog = await Blog.findById(report.blogIsReported._id);
                    await blogService.deleteBlogById(blog._id,userAuthenticated);
                    await mailService.sendInformDeleteBlog(report.blogIsReported.user.email,report.blogIsReported.title);
                    await reportBlog.deleteMany({blogIsReported: blog._id});        
                    return ;        
                }
                else{
                    await report.deleteOne();
                }
                return 0;
            }
            if(type==='Tag'){
                if(status===true){
                    const tagReport = await reportTag.findById(reportId);
                    await tagService.deleteTag(tagReport.tagIsReported._id,userAuthenticated);
                    await reportTag.deleteMany({tagIsReported: tagReport.tagIsReported._id})
                    const userTag = await User.findById(tagReport.tagIsReported.user._id)
                    await mailService.sendInformDeleteTag(userTag.email,tagReport.tagIsReported.name)
                    await tagReport.deleteOne();
                }
                else{
                    await reportTag.deleteOne();
                }
                return;
            }
            if(type==='User'){
                const report = await reportUser.findById(reportId);
                if(!report) return 1;
                if(status===true){
                    const user = await User.findById(report.userIsReported._id);
                    if(user.sumViolating=10){
                        user.status = 'locked';
                        await reportUser.deleteMany({userIsReported: report.userIsReported._id});
                        await user.save();
                        await mailService.sendInformBlockUser(user.email);
                    }
                    else{
                        user.sumViolating = user.sumViolating + 1;
                        await user.save();
                        await mailService.sendInformWarningUser(user.email,report.reason.value);
                        await report.deleteOne();
                    }
                    return;
                }
                else{
                    await report.deleteOne();
                }
                return 0;
            }
            if(type==='Comment')
            {
                const report = await reportComment.findById(reportId);
                if(!report) return 1;
                if(status===true){
                    const blog = await Blog.findOne({ comments: report.comment._id }).populate('comments');
                    const comment = await Comment.findById(report.comment._id);
                    await commentService.deleteComment(comment._id,userAuthenticated._id,blog._id)
                    await mailService.sendInformDeleteComment(report.comment.user.email,report.comment.content);
                    await reportComment.deleteMany({comment: comment._id})        
                    return ;        
                }
                else{
                    await report.deleteOne();
                }
                return 0;
            }
        }
        catch(err){
            console.log(err);
        }
    }
    static deleteBlogById= async (blogId,authenticatedUser)=>{
        const blog = await Blog.findById(blogId);
        const userAuthenticated = await User.findById(authenticatedUser._id);
        if(!blog) return 1;
        await mailService.sendInformDeleteBlog(blog.user.email,blog.title);
        await blogService.deleteBlogById(blog._id, userAuthenticated);
        return 0;
    }
    static getAllUserIsBlock = async ()=>{
        const users = await User.find({status: 'locked'});
        return users;
    }
    static openAccount = async (userId)=>{
        const user = await User.findById(userId);
        if(!user) return 1;
        user.status = 'completed';
        if(user.sumViolating===10){
            user.sumViolating = 0;
        }
        await user.save();
        await mailService.sendInformOpenAccount(user.email, user.name);
        return 0;
    }
    static decentralization = async (userId, role )=>{
        const user = await User.findById(userId);
        if(!user) return 1;
        user.roles = role;
        await user.save();
        return User.findById(user._id);
    }
    static autoFilterBlog = async ()=>{
        const settingBlog = await Setting.find();
        for(const setting of settingBlog){
            const regex = new RegExp(setting.value, 'i');
            const query = await Blog.find({
                        $or: [
                            { title: regex },
                            { description: regex },
                            { content: regex }
                        ]
            })
            if(query.length>0){
                for(const blog of query){
                    console.log('Da gui')
                    await blogService.deleteBlogByIdAuto(blog._id);
                    await mailService.sendInformDeleteBlog(blog.user.email,blog.title);
                }
            }
        }
    }
    static deleteTag = async (tagId,authenticatedUser)=>{
        const tag = await Tag.findById(tagId);
        if(!tag) return 1;
        await mailService.sendInformDeleteTag(tag.user.email,tag.name);
        await tagService.deleteTag(tag._id,authenticatedUser);
        return 0;
    }
    static deleteCategory = async (categoryId, authenticatedUser) => {
        const category = await Category.findById(categoryId).populate();
        if(!category) return 1;
        await mailService.sendInformDeleteGroup(category.isAdmin.email,category.name);
        await categoryService.deleteCategoryById(category._id, authenticatedUser);
        return 0;
    }
    static blockedUser = async (userId) => {
        const user = await User.findById(userId);
        if(!user) return 1;
        user.status = 'locked';
        await user.save();
        await mailService.sendInformBlockUser(user.email);
        return user;
    }


    ///Chart data///
    static chartAccess = async (month) => {
        const currentYear = new Date().getFullYear();
        const currentMonthStart = new Date(Date.UTC(currentYear, month - 1, 1));
        const currentMonthEnd = new Date(Date.UTC(currentYear, month, 0));
        const previousMonthStart = new Date(Date.UTC(currentYear, month - 2, 1));
        const previousMonthEnd = new Date(Date.UTC(currentYear, month - 1, 0));
        // Tính tổng số lượng truy cập của tháng hiện tại
        const currentMonthResult = await Access.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: currentMonthStart,
                        $lte: currentMonthEnd,
                    },
                },
            },
            {
                $group: {
                    _id: null,
                    totalAccesses: { $sum: 1 },
                },
            },
        ]);
        // Tính tổng số lượng truy cập của tháng trước
        const previousMonthResult = await Access.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: previousMonthStart,
                        $lte: previousMonthEnd,
                    },
                },
            },
            {
                $group: {
                    _id: null,
                    totalAccesses: { $sum: 1 },
                },
            },
        ]);
    
        const currentMonthTotalAccesses = currentMonthResult.length > 0 ? currentMonthResult[0].totalAccesses : 0;
        const previousMonthTotalAccesses = previousMonthResult.length > 0 ? previousMonthResult[0].totalAccesses : 0;
    
        const formattedResult = {};
        const daysInMonth = new Date(new Date().getFullYear(), month, 0).getDate();
        for (let i = 1; i <= daysInMonth; i++) {
            formattedResult[`Day ${i}`] = 0;
        }
        // Sử dụng aggregation framework để lấy số lượng truy cập của từng ngày trong tháng
        const result = await Access.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: currentMonthStart,
                        $lte: currentMonthEnd,
                    },
                },
            },
            {
                $group: {
                    _id: {
                        dayOfMonth: { $dayOfMonth: '$createdAt' },
                    },
                    totalAccesses: { $sum: 1 },
                },
            },
        ]);
    
        result.forEach((item) => {
            formattedResult[`Day ${item._id.dayOfMonth}`] = item.totalAccesses;
        });
    
    
        let percentWithLastMonth = (currentMonthTotalAccesses - previousMonthTotalAccesses) / 100;
        percentWithLastMonth = parseFloat(percentWithLastMonth.toFixed(2));

    
        return { accessByDay: formattedResult, totalAccessesInMonth: currentMonthTotalAccesses, percentWithLastMonth };
    }
    static chartGeneralBlog = async ()=>{
        const currentDate = new Date();
        const currentMonthStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const currentMonthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        const previousMonthStart = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
        const previousMonthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
        const sumBlog = await Blog.countDocuments();
        // Tính tổng số lượng blog của tháng hiện tại
        const currentMonthBlogCount = await Blog.countDocuments({
            createdAt: {
                $gte: currentMonthStart,
                $lte: currentMonthEnd
            }
        });
        // Tính tổng số lượng blog của tháng trước
        const previousMonthBlogCount = await Blog.countDocuments({
            createdAt: {
                $gte: previousMonthStart,
                $lte: previousMonthEnd
            }
        });
        // Tính % chênh lệch so với tháng trước
        let percentChange = 0;
        if (previousMonthBlogCount !== 0) {
            percentChange = ((currentMonthBlogCount / previousMonthBlogCount)-1) * 100;
        }
        return { 
            sumBlog,
            percentChange: percentChange.toFixed(2)
        };
    }
    static chartGeneralTag = async ()=>{
        const currentDate = new Date();
        const currentMonthStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const currentMonthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        const previousMonthStart = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
        const previousMonthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
        const sumTag = await Tag.countDocuments();
        // Tính tổng số lượng tag của tháng hiện tại
        const currentMonthTagCount = await Tag.countDocuments({
            createdAt: {
                $gte: currentMonthStart,
                $lte: currentMonthEnd
            }
        });
    
        // Tính tổng số lượng tag của tháng trước
        const previousMonthTagCount = await Tag.countDocuments({
            createdAt: {
                $gte: previousMonthStart,
                $lte: previousMonthEnd
            }
        });
    
        // Tính % chênh lệch so với tháng trước
        let percentChange = 0;
        if (previousMonthTagCount !== 0) {
            percentChange = ((currentMonthTagCount / previousMonthTagCount)-1) * 100;
        }
        return {
            sumTag,
            percentChange: percentChange.toFixed(2)
        };
    }
    static chartGeneralCategory = async ()=>{
        const currentDate = new Date();
        const currentMonthStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const currentMonthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        const previousMonthStart = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
        const previousMonthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
    
        const sumCategory = await Category.countDocuments();

        // Tính tổng số lượng category của tháng hiện tại
        const currentMonthCategoryCount = await Category.countDocuments({
            createdAt: {
                $gte: currentMonthStart,
                $lte: currentMonthEnd
            }
        });
    
        // Tính tổng số lượng category của tháng trước
        const previousMonthCategoryCount = await Category.countDocuments({
            createdAt: {
                $gte: previousMonthStart,
                $lte: previousMonthEnd
            }
        });
    
        // Tính % chênh lệch so với tháng trước
        let percentChange = 0;
        if (previousMonthCategoryCount !== 0) {
            percentChange = ((currentMonthCategoryCount / previousMonthCategoryCount) -1) * 100;
        }
    
        return {
            sumCategory,
            percentChange: percentChange.toFixed(2)
        };
    };
    static chartGeneralUser = async ()=>{
        const currentDate = new Date();
        const currentMonthStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const currentMonthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        const previousMonthStart = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
        const previousMonthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
        // Tính tổng số lượng người dùng của tháng hiện tại
        const currentMonthUserCount = await User.countDocuments({
            createdAt: {
                $gte: currentMonthStart,
                $lte: currentMonthEnd
            }
        });
        const sumUser = await User.countDocuments();
        // Tính tổng số lượng người dùng của tháng trước
        const previousMonthUserCount = await User.countDocuments({
            createdAt: {
                $gte: previousMonthStart,
                $lte: previousMonthEnd
            }
        });
        // Tính % chênh lệch so với tháng trước
        let percentChange = 0;

        if (previousMonthUserCount !== 0) {
            percentChange = ((currentMonthUserCount / previousMonthUserCount)-1) * 100;
        }
        return {
            sumUser,
            percentChange: percentChange.toFixed(2)
        };
    }
    static chartBlogInWeed = async()=>{
        const currentDate = new Date();
        const currentDay = currentDate.getDay(); // Lấy ngày hiện tại trong tuần (0: Chủ nhật, 1: Thứ 2, ..., 6: Thứ 7)
        const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday ', 'Saturday', 'Sunday '];
        const startOfWeek = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - currentDay + 1);
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(endOfWeek.getDate() + 6);
        const blogStatsByDay = {};
        for (let i = 0; i < 7; i++) {
            const currentDate = new Date(startOfWeek);
            currentDate.setDate(currentDate.getDate() + i);
            
            const dayOfWeek = daysOfWeek[i];
            
            const blogCount = await Blog.countDocuments({
                createdAt: {
                    $gte: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()),
                    $lte: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1)
                }
            });
            
            blogStatsByDay[dayOfWeek] = blogCount;
        }
        return blogStatsByDay;
    }
    static charBlogInCurrentMonth = async() => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1; // Lấy tháng hiện tại (lưu ý tháng bắt đầu từ 0)
        
        const monthStart = new Date(year, month - 1, 1); // Lấy ngày đầu tiên của tháng
        const monthEnd = new Date(year, month, 0); // Lấy ngày cuối cùng của tháng
        
        const blogStatsByDay = {};
        
        for (let i = 1; i <= monthEnd.getDate(); i++) {
            const currentDate = new Date(year, month - 1, i);
            
            // Tính số lượng bài viết của ngày hiện tại trong tháng
            const blogCount = await Blog.countDocuments({
                createdAt: {
                    $gte: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()),
                    $lte: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1)
                }
            });
            blogStatsByDay[`Day ${i}`] = blogCount;
        }
        return blogStatsByDay;
    }
    static chartBlogInYear = async () => {
        const users = await User.find();
        for(const user of users){
            user.isLogin = true;
            await user.save();
        }
        const year = new Date().getFullYear();
        const blogStatsByMonth = {};
    
        for (let month = 1; month <= 12; month++) {
            const monthStart = new Date(year, month - 1, 1); // Lấy ngày đầu tiên của tháng
            const monthEnd = new Date(year, month, 0); // Lấy ngày cuối cùng của tháng
        
            const blogCount = await Blog.countDocuments({
                createdAt: {
                    $gte: monthStart,
                    $lte: monthEnd
                }
            });
            const monthName = this.getMonthName(month);
            blogStatsByMonth[monthName] = blogCount;
        }
        return blogStatsByMonth;
    }
    static getMonthName(month) {
        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        return monthNames[month - 1];
    }
}
module.exports = AdminService;
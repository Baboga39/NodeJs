const User = require('../models/usermodel')
const Setting = require('../models/settingModel')
const Service = require('../services');

const addSettingsBlog = async(req, res)=>{
    try{
        const value = req.body.value;
        if(!value)
        {
            console.log('Value is required');
            console.log('--------------------------------------------------------------------------------------------------------------------');
            return res.status(400).json({
                success: false,
                statusCode: 400,
                message: 'Value is required',
                result: null,
            });
        }
        const setting = await Service.adminService.addSettingsBlog(value);
        if(setting===1)
        {
            console.log('Value is existing');
            console.log('--------------------------------------------------------------------------------------------------------------------')
            return res.status(400).json({
                success: false,
                statusCode: 400,
                message: 'Value is existing',
                result: null,
            });
        }
        console.error('Add Setting Success');
        console.log('--------------------------------------------------------------------------------------------------------------------')
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Add Setting Success',
            result: setting,
        });
    }
    catch (error) {
        console.error('Error verifying user:', error);
        console.log('--------------------------------------------------------------------------------------------------------------------')
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: 'Internal server error',
            result: error.message,
        });
    }
}
const editSettingsBlog = async(req, res)=>{
    try{
        const {settingId,value} = req.body;
        if(!value)
        {
            console.log('Value is required');
            console.log('--------------------------------------------------------------------------------------------------------------------');
            return res.status(400).json({
                success: false,
                statusCode: 400,
                message: 'Value is required',
                result: null,
            });
        }
        const setting = await Service.adminService.editSettingBlog(settingId,value);
        if(setting===1)
        {
            console.log('Value is existing');
            console.log('--------------------------------------------------------------------------------------------------------------------')
            return res.status(400).json({
                success: false,
                statusCode: 400,
                message: 'Value is existing',
                result: null,
            });
        }
        console.error('Edit Setting Success');
        console.log('--------------------------------------------------------------------------------------------------------------------')
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Edit Setting Success',
            result: setting,
        });
    }
    catch (error) {
        console.error('Error verifying user:', error);
        console.log('--------------------------------------------------------------------------------------------------------------------')
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: 'Internal server error',
            result: error.message,
        });
    }
}
const deleteSettingBlog = async(req, res) => {
    const settingId = req.body.settingId;
    if(!settingId) {
        console.log('SettingId is required');
        console.log('--------------------------------------------------------------------------------------------------------------------');
        return res.status(400).json({
            success: false,
            statusCode: 400,
            message: 'SettingId is required',
            result: null,
        });
    }
    const deleteSettingBLog = await Service.adminService.deleteSettingBlog(settingId);
    if(deleteSettingBLog===1){
        console.log('Not found Setting');
        console.log('--------------------------------------------------------------------------------------------------------------------')
        return res.status(400).json({
            success: false,
            statusCode: 400,
            message: 'Not found Setting',
            result: null,
        });
    }
    console.error('Delete Setting Success');
    console.log('--------------------------------------------------------------------------------------------------------------------')
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Delete Setting Success',
        result: null,
    });
}
const getAllBlogSettings = async (req, res) => {
    const result = await Service.adminService.getAllSettingBlog();
    console.error('Get All Settings Success');
    console.log('--------------------------------------------------------------------------------------------------------------------')
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Get All Settings Success',
        result: result,
    });
}
const addTypeReport = async(req, res)=>{
    try{
        const value = req.body.value;
        if(!value)
        {
            console.log('Value is required');
            console.log('--------------------------------------------------------------------------------------------------------------------');
            return res.status(400).json({
                success: false,
                statusCode: 400,
                message: 'Value is required',
                result: null,
            });
        }
        const setting = await Service.reportService.addTypeReport(value);
        if(setting===1)
        {
            console.log('Value is existing');
            console.log('--------------------------------------------------------------------------------------------------------------------')
            return res.status(400).json({
                success: false,
                statusCode: 400,
                message: 'Value is existing',
                result: null,
            });
        }
        console.error('Add Setting Success');
        console.log('--------------------------------------------------------------------------------------------------------------------')
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Add Setting Success',
            result: setting,
        });
    }
    catch (error) {
        console.error('Error verifying user:', error);
        console.log('--------------------------------------------------------------------------------------------------------------------')
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: 'Internal server error',
            result: error.message,
        });
    }
}
const editTypeReport = async(req, res)=>{
    try{
        const {reportId,value} = req.body;
        if(!value)
        {
            console.log('Value is required');
            console.log('--------------------------------------------------------------------------------------------------------------------');
            return res.status(400).json({
                success: false,
                statusCode: 400,
                message: 'Value is required',
                result: null,
            });
        }
        if(!reportId)
        {
            console.log('ReportId is required');
            console.log('--------------------------------------------------------------------------------------------------------------------');
            return res.status(400).json({
                success: false,
                statusCode: 400,
                message: 'ReportId is required',
                result: null,
            });
        }
        const setting = await Service.reportService.editTypeReport(reportId,value);
        if(setting===1)
        {
            console.log('Not found report');
            console.log('--------------------------------------------------------------------------------------------------------------------')
            return res.status(400).json({
                success: false,
                statusCode: 400,
                message: 'Not found report',
                result: null,
            });
        }
        if(setting===2)
        {
            console.log('Value is existing');
            console.log('--------------------------------------------------------------------------------------------------------------------')
            return res.status(400).json({
                success: false,
                statusCode: 400,
                message: 'Value is existing',
                result: null,
            });
        }
        console.error('Edit Setting Success');
        console.log('--------------------------------------------------------------------------------------------------------------------')
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Edit Setting Success',
            result: setting,
        });
    }
    catch (error) {
        console.error('Error verifying user:', error);
        console.log('--------------------------------------------------------------------------------------------------------------------')
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: 'Internal server error',
            result: error.message,
        });
    }
}
const deleteTypeReport = async (req, res) => {
    const reportId = req.body.reportId;
    if(!reportId) {
        console.log('ReportId is required');
        console.log('--------------------------------------------------------------------------------------------------------------------');
        return res.status(400).json({
            success: false,
            statusCode: 400,
            message: 'ReportId is required',
            result: null,
        });
    }
    const deleteReport = await Service.reportService.deleteTypeReport(reportId);
    if(deleteReport===1){
        console.log('Not found report');
        console.log('--------------------------------------------------------------------------------------------------------------------')
        return res.status(400).json({
            success: false,
            statusCode: 400,
            message: 'Not found report',
            result: null,
        });
    }
    console.error('Delete Type Report Success');
    console.log('--------------------------------------------------------------------------------------------------------------------')
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Delete Type Report Success',
        result: null,
    });
}
const getListReportByType = async(req,res) =>{
    const type = req.params.type;
    const listReport = await Service.adminService.getReportByType(type);
    if(type==='Blog')
    {
        console.log('List report blog');
        console.log('--------------------------------------------------------------------------------------------------------------------');
        return res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'List report blog',
            result: listReport,
        });
    }
    if(type==='User')
    {
        console.log('List report user');
        console.log('--------------------------------------------------------------------------------------------------------------------');
        return res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'List report user',
            result: listReport,
        });
    }
    if(type==='Tag'){
        console.log('List report tag');
        console.log('--------------------------------------------------------------------------------------------------------------------');
        return res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'List report tag',
            result: listReport,
        });
    }
    if(type==='Comment'){
        console.log('List report comment');
        console.log('--------------------------------------------------------------------------------------------------------------------');
        return res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'List report comment',
            result: listReport,
        });
    }
}
const getALlBlog = async (req, res) => {
    const listBlog = await Service.blogService.getAllBlog();
    console.log('List all blog');
    console.log('--------------------------------------------------------------------------------------------------------------------');
    return res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'List all blog',
        result: listBlog,
    });
}
const getAllTag = async (req, res) => {
    const listTag = await Service.tagService.getAllTags();
    console.log('List all tag');
    console.log('--------------------------------------------------------------------------------------------------------------------');
    return res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'List all tag',
        result: listTag,
    });
}
const getAllCategory = async (req, res) => {
    const listCategory = await Service.categoryService.getAllCategory();
    console.log('List all category');
    console.log('--------------------------------------------------------------------------------------------------------------------');
    return res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'List all category',
        result: listCategory,
    });
}
const getAllUser = async (req, res) => {
    const listUser = await Service.userService.getAllUser();
    console.log('List all user');
    console.log('--------------------------------------------------------------------------------------------------------------------');
    return res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'List all user',
        result: listUser,
    });
}
const evaluateReport = async (req, res) => {
    const {reportId,type,status} = req.body;
    const authenticatedUser = req.user;
    if(!reportId)
    {
        console.log('ReportId is required');
        console.log('--------------------------------------------------------------------------------------------------------------------');
        return res.status(400).json({
            success: false,
            statusCode: 400,
            message: 'ReportId is required',
            result: null,
        });
    }
    if(!type)
    {
        console.log('Value is required');
        console.log('--------------------------------------------------------------------------------------------------------------------');
        return res.status(400).json({
            success: false,
            statusCode: 400,
            message: 'Value is required',
            result: null,
        });
    }
    if(status===null){
        console.log('Status is required');
        console.log('--------------------------------------------------------------------------------------------------------------------');
        return res.status(400).json({
            success: false,
            statusCode: 400,
            message: 'Status is required',
            result: null,
        });
    }
    try {
    const evaluate = await Service.adminService.evaluateReport(reportId,type,status, authenticatedUser.user);
    if(evaluate===1)
    {
        console.log('Not found report');
        console.log('--------------------------------------------------------------------------------------------------------------------');
        return res.status(400).json({
            success: false,
            statusCode: 400,
            message: 'Not found report',
            result: null,
        });
    }
    console.log('Evaluate successfully');
    console.log('--------------------------------------------------------------------------------------------------------------------');
    return res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Evaluate successfully',
        result: null,
    });
    } catch (error) {
        console.log('Internal Server Error: ', error);
        console.log('--------------------------------------------------------------------------------------------------------------------');
        return res.status(500).json({
            success: false,
            statusCode: 500,
            message: 'Internal Server Error',
            result: null,
        });
    }
}
const deleteBlogById = async (req,res) => {
    const blogId = req.params.blogId;
    const user = req.user;
    if(!blogId) {
        console.log('BlogId is required');
        console.log('--------------------------------------------------------------------------------------------------------------------');
        return res.status(400).json({
            success: false,
            statusCode: 400,
            message: 'BlogId is required',
            result: null,
        });
    }
    const deleteBlog = await Service.adminService.deleteBlogById(blogId,user.user);
    if(deleteBlog===1){
        console.log('Not found blog');
        console.log('--------------------------------------------------------------------------------------------------------------------');
        return res.status(400).json({
            success: false,
            statusCode: 400,
            message: 'Not found blog',
            result: null,
        });
    }
    console.log('Delete blog successfully');
    console.log('--------------------------------------------------------------------------------------------------------------------');
    return res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Delete blog successfully',
        result: null,
    });
}
const getAllUserBlocked = async (req, res) => {
    const listUser = await Service.adminService.getAllUserIsBlock();
    console.log('List all user blocked');
    console.log('--------------------------------------------------------------------------------------------------------------------');
    return res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'List all user blocked',
        result: listUser,
    });
}
const openAccount = async (req, res) => {
    const userId = req.body.userId;
    if(!userId) {
        console.log('UserId is required');
        console.log('--------------------------------------------------------------------------------------------------------------------');
        return res.status(400).json({
            success: false,
            statusCode: 400,
            message: 'UserId is required',
            result: null,
        });
    }
    const openAccount = await Service.adminService.openAccount(userId);
    if(openAccount===1){
        console.log('Not found user');
        console.log('--------------------------------------------------------------------------------------------------------------------');
        return res.status(400).json({
            success: false,
            statusCode: 400,
            message: 'Not found user',
            result: null,
        });
    }
    console.log('Open account successfully');
    console.log('--------------------------------------------------------------------------------------------------------------------');
    return res.status(200).json(
        {
            success: true,
            statusCode: 200,
            message: 'Open account successfully',
            result: null,
        });
}
const decentralization = async (req, res) => {
    const {userId,role} = req.body;
    if(!userId) {
        console.log('UserId is required');
        console.log('--------------------------------------------------------------------------------------------------------------------');
        return res.status(400).json({
            success: false,
            statusCode: 400,
            message: 'UserId is required',
            result: null,
        });
    }
    if(!role){
        console.log('Role is required');
        console.log('--------------------------------------------------------------------------------------------------------------------');
        return res.status(400).json({
            success: false,
            statusCode: 400,
            message: 'Role is required',
            result: null,
        });
    }
    const decentralization = await Service.adminService.decentralization(userId,role);
    if(decentralization===1){
        console.log('Not found user');
        console.log('--------------------------------------------------------------------------------------------------------------------');
        return res.status(400).json({
            success: false,
            statusCode: 400,
            message: 'Not found user',
            result: null,
        });
    }
    console.log('Decentralization successfully');
    console.log('--------------------------------------------------------------------------------------------------------------------');
    return res.status(200).json(
        {
            success: true,
            statusCode: 200,
            message: 'Decentralization successfully',
            result: decentralization,
        });
}




////////////////////////////////////////////////////////////////   Tags //////////////////////////////////////////////////////////////////
const deleteTags = async (req, res, next) => {
    const tagId = req.params.tagId;
    const authenticatedUser = req.user;
    if(!tagId){
        console.log('TagId is required');
        console.log('--------------------------------------------------------------------------------------------------------------------');
        return res.status(400).json({
            success: false,
            statusCode: 400,
            message: 'TagId is required',
            result: null,
        });
    }
    const deleteTag = await Service.adminService.deleteTag(tagId,authenticatedUser.user);
    if(deleteTag===1){
        console.log('Not found tag');
        console.log('--------------------------------------------------------------------------------------------------------------------');
        return res.status(400).json({
            success: false,
            statusCode: 400,
            message: 'Not found tag',
            result: null,
        });
    }
    console.log('Delete tag successfully');
    console.log('--------------------------------------------------------------------------------------------------------------------');
    return res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Delete tag successfully',
        result: null,
    });
}   
const deleteCategory = async (req, res) => {
    const categoryId = req.params.categoryId;
    const authenticatedUser = req.user;
    if(!categoryId){
        console.log('CategoryId is required');
        console.log('--------------------------------------------------------------------------------------------------------------------');
        return res.status(400).json({
            success: false,
            statusCode: 400,
            message: 'CategoryId is required',
            result: null,
        });
    }
    const deleteCategory = await Service.adminService.deleteCategory(categoryId,authenticatedUser.user);
    if(deleteCategory===1){
        console.log('Not found category');
        console.log('--------------------------------------------------------------------------------------------------------------------');
        return res.status(400).json({
            success: false,
            statusCode: 400,
            message: 'Not found category',
            result: null,
        });
    }
    console.log('Delete category successfully');
    console.log('--------------------------------------------------------------------------------------------------------------------');
    return res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Delete category successfully',
        result: null,
    });
}
const blockedUser= async (req, res) => {
    const userId = req.body.userId;
    if(!userId){
        console.log('UserId is required');
        console.log('--------------------------------------------------------------------------------------------------------------------');
        return res.status(400).json({
            success: false,
            statusCode: 400,
            message: 'UserId is required',
            result: null,
        });
    }
    const blockedUser = await Service.adminService.blockedUser(userId);
    if(blockedUser===1){
        console.log('Not found user');
        console.log('--------------------------------------------------------------------------------------------------------------------');
        return res.status(400).json({
            success: false,
            statusCode: 400,
            message: 'Not found user',
            result: null,
        });
    }
    console.log('Blocked user successfully');
    console.log('--------------------------------------------------------------------------------------------------------------------');
    return res.status(200).json(
        {
            success: true,
            statusCode: 200,
            message: 'Blocked user successfully',
            result: blockedUser,
        });
}


///////////////////////////////////////////////////////////////  Chart API //////////////////////////////////////////////////////////////

const access = async (req, res) => {
    const month = req.params.month;
    if(!month){
        console.log('Month is required');
        console.log('--------------------------------------------------------------------------------------------------------------------');
        return res.status(400).json({
            success: false,
            statusCode: 400,
            message: 'Month is required',
            result: null,
        });
    }
    const result = await Service.adminService.chartAccess(month);
    console.log('Get chart access successfully');
    console.log('--------------------------------------------------------------------------------------------------------------------');
    return res.status(200).json(
        {
            success: true,
            statusCode: 200,
            message: 'Get chart access successfully',
            result: result,
        });
}
const generalBlog = async (req, res) => {
    const result= await Service.adminService.chartGeneralBlog();
    console.log('Get chart general blog successfully');
    console.log('--------------------------------------------------------------------------------------------------------------------');
    return res.status(200).json(
        {
            success: true,
            statusCode: 200,
            message: 'Get chart general blog successfully',
            result: result,
        });
}
const generalTag = async (req, res) => {
    const result= await Service.adminService.chartGeneralTag();
    console.log('Get chart general blog successfully');
    console.log('--------------------------------------------------------------------------------------------------------------------');
    return res.status(200).json(
        {
            success: true,
            statusCode: 200,
            message: 'Get chart general blog successfully',
            result: result,
        });
}
const generalCategory = async (req, res) => {
    const result= await Service.adminService.chartGeneralCategory();
    console.log('Get chart general blog successfully');
    console.log('--------------------------------------------------------------------------------------------------------------------');
    return res.status(200).json(
        {
            success: true,
            statusCode: 200,
            message: 'Get chart general blog successfully',
            result: result,
        });
}
const generalUser = async (req, res) => {
    const result= await Service.adminService.chartGeneralUser();
    console.log('Get chart general blog successfully');
    console.log('--------------------------------------------------------------------------------------------------------------------');
    return res.status(200).json(
        {
            success: true,
            statusCode: 200,
            message: 'Get chart general blog successfully',
            result: result,
        });
}
const blogInChartWeek = async (req, res) => {
    const result= await Service.adminService.chartBlogInWeed();
    console.log('Get chart blog in week successfully');
    console.log('--------------------------------------------------------------------------------------------------------------------');
    return res.status(200).json(
        {
            success: true,
            statusCode: 200,
            message: 'Get chart blog in week successfully',
            result: result,
        })
}
const blogInChartMonth = async (req, res) => {
    const month = req.params.month;
    if(!month){
        console.log('Month is required');
        console.log('--------------------------------------------------------------------------------------------------------------------');
        return res.status(400).json({
            success: false,
            statusCode: 400,
            message: 'Month is required',
            result: null,
        });
    }
    const result= await Service.adminService.charBlogInMonth(month);
    console.log('Get chart blog in month successfully');
    console.log('--------------------------------------------------------------------------------------------------------------------');
    return res.status(200).json(
        {
            success: true,
            statusCode: 200,
            message: 'Get chart blog in mothn successfully',
            result: result,
        })
}
const blogInChartYear = async (req, res) => {
    const year = req.params.year;
    if(!year){
        console.log('Year is required');
        console.log('--------------------------------------------------------------------------------------------------------------------');
        return res.status(400).json({
            success: false,
            statusCode: 400,
            message: 'Year is required',
            result: null,
        });
    }
    const result= await Service.adminService.chartBlogInYear(year);
    console.log('Get chart blog in year successfully');
    console.log('--------------------------------------------------------------------------------------------------------------------');
    return res.status(200).json(
        {
            success: true,
            statusCode: 200,
            message: 'Get chart blog in year successfully',
            result: result,
        })
}
module.exports = {
    addSettingsBlog,
    addTypeReport,editSettingsBlog,
    editTypeReport,
    deleteSettingBlog,
    deleteTypeReport,
    getListReportByType,
    getALlBlog,
    getAllTag,
    getAllCategory,getAllUser,
    evaluateReport,getAllUserBlocked,
    deleteBlogById,openAccount,
    decentralization,deleteTags,deleteCategory,blockedUser,access,generalBlog,generalTag,generalCategory,generalUser,blogInChartWeek,
    blogInChartMonth,blogInChartYear,getAllBlogSettings
}
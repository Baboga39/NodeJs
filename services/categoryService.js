const categoryModel = require('../models/Blog/categoryModel')
const Category = require('../models/Blog/categoryModel')
const User = require('../models/usermodel')
const cloudinary = require('cloudinary').v2;
const UserRequest = require('../models/Blog/userRequestModel')
const Notify = require('../services/notificationService');
const Notification = require('../models/notificationModel')
const blogModel = require('../models/Blog/blogModel');
const usermodel = require('../models/usermodel');
const blogService = require('../services/blogService')

class CategoryService {
    static async getAllCategories(userId, index) {
        try {
            const pageSize = 6;
            const skip = (index - 1) * pageSize; 
    
            // Lấy thông tin người dùng
            const user = await User.findById(userId);
            if (!user) {
                console.log('Not found user');
                return 1;
            }
    
            // Truy vấn lấy tất cả các category mà người dùng không phải là thành viên và không phải là admin
            const excludedCategories = await Category.find({
                users: { $ne: userId },
                isAdmin: { $ne: userId }
            })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(pageSize)
            .populate('tags')
            .populate('users')
            .exec();
    
            // Thêm trạng thái người dùng vào mỗi category
            const categoriesWithUserStatusPromises = excludedCategories.map(async category => {
                const statusUser = await this.getUserStatusInCategory1(category, user._id);
                return { ...category.toObject(), statusUser };
            });
            
            const categoriesWithUserStatus = await Promise.all(categoriesWithUserStatusPromises);
            const size = await Category.countDocuments({
                users: { $ne: userId },
                isAdmin: { $ne: userId }
            });
    
            return { categories: categoriesWithUserStatus, size: size };
    
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    static async getAllCategory() {
        const categories = await Category.find().sort({createdAt: -1});
        if(!categories)
        {
            return null;
        }
        return categories;
    }
    static async countDocumentsCategory() {
        const count = await Category.countDocuments();
        const totalPages = Math.ceil(count / 6); // Tính số lượng trang
        return totalPages;
    }
    static getUserStatusInCategory = async (category, userId) => {
        if (category.users.some(user => user._id === userId)) {
            return 'Join';
        } else {
            const request = await UserRequest.findOne({ Category: category._id });
            if (request) {
                if (!request.Users || !request.Users.some(user =>  user.equals(userId))) {
                    return 'UnJoin';
                } else {
                    return 'Pending';
                }
            } else {
                return 'UnJoin';
            }
        }
    };
    static getUserStatusInCategory1 = async (category, userId) => {
        if (category.users.some(user => user.equals(userId))) {
            return 'Join';
        } else {
            const request = await UserRequest.findOne({ Category: category._id });
            if (request) {
                if (!request.Users || !request.Users.some(user => user.equals(userId))) {
                    return 'UnJoin';
                } else {
                    return 'Pending';
                }
            } else {
                return 'UnJoin';
            }
        }
    };
    
    static async addCategory(name, description,tagIds, status, userIds, authenticationUser,banner,isApproved) {
    const user = await User.findById(authenticationUser._id);
    
    const exitsCategory = await categoryModel.findOne({ name });
    if (exitsCategory) {
        return null;
    }
    const newCategory = new categoryModel({
        name,
        description,
        status,
        banner,
        isAdmin: user._id,
        isApproved:isApproved
    });
    if(tagIds!=null)
    {
        await newCategory.addTags(tagIds);
    }
    if(userIds!=null){
        await newCategory.addUsers(userIds);
    }
    await newCategory.addUsers(user._id);
    const userCount = await User.countDocuments({ _id: { $in: newCategory.users } });
    newCategory.sumUser = userCount;
    await newCategory.save();
    const populatedCategory = await categoryModel.findById(newCategory._id)
        .populate('users')
        .populate('tags');
    return populatedCategory;
    }
    static async editCategory(newName, newDescription, newStatus, authenticationUser,categoryId,isApproved) {
        
        let categoryToEdit = await categoryModel.findById(categoryId).populate('users').populate('tags');

        if (!categoryToEdit) {
            return null;
        }
        const listCategory = await categoryModel.find();
        for(const category of listCategory)
        {
            if(category._id.equals(categoryToEdit._id)){
                continue;
            }
            if (category.name.toLowerCase() === newName.toLowerCase()) {
                return 3;
            }
        }
        if (categoryToEdit.isAdmin._id == authenticationUser._id  || authenticationUser.roles == 'Admin' ) {
            categoryToEdit.name = newName || categoryToEdit.name;
            categoryToEdit.description = newDescription || categoryToEdit.description;
            categoryToEdit.status = newStatus || categoryToEdit.status;
            categoryToEdit.isApproved = isApproved;
            await categoryToEdit.save();
            return categoryToEdit;
        }
        return 1;
    }
    static async addTagsToCategory (categoryId, tagIds, authenticationUser)  {

        const category = await categoryModel.findById(categoryId).populate('users')
        .populate('tags');;
        if (!category) {
            return null;
        }
        if (category.isAdmin._id == authenticationUser._id || authenticationUser.roles == 'Admin') {
            await category.addTags(tagIds);
            category.save();
            return category;
        }
        return 1;
    }
    static async getCategoryById(categoryId, user_id) {
        const listBlog = await usermodel.find()
        for(const blog of listBlog) {
            blog.sumViolating = 0; 
            await blog.save();
        }
        const category = await categoryModel.findById(categoryId).populate('users')
        .populate('tags')
        .populate('isAdmin');;
        const user = await User.findById(user_id);
        if (!user) {
            console.log('------------------------------------------------------------------------------------------------')
            console.log('Not found user');
            return 1;
        }
        if (!category) {
            return null;
        }
        const statusUser = await this.getUserStatusInCategory1(category, user._id); 
        return { ...category.toObject(), statusUser };    }
    static async deleteCategoryById(categoryId, authenticationUser) {
        const category = await Category.findById(categoryId);
        await Notification.deleteMany({category: category._id})
        if (!category) {
            return null;
        }
        if (category.isAdmin._id == authenticationUser._id  || authenticationUser.roles == 'Admin' ) {
            const listBlog = await blogModel.find({category: category._id})
            for(const blog of listBlog){
                blogService.deleteBlogById(blog._id,authenticationUser)
            }
            await Category.findOneAndDelete({ _id: categoryId });
            return category;
        }
        return 1;
    }
    static async removeTagsFromCategory(tagIds,categoryId,authenticationUser) {
        const category = await categoryModel.findById(categoryId).populate('users')
        .populate('tags')
        .populate('isAdmin');
        if (!category) {
            return null;
        }
        if (category.isAdmin._id.equals(authenticationUser._id)  || authenticationUser.roles == 'Admin' ) {
            await category.removeTags(tagIds);
            return category;
        }
        if (!category) {
            return null;
        }
        return 1;
    }
    static async addUsersToCategory(categoryId,userIds,authenticationUser) {
        const UserAdd = await User.findById(userIds);
        const category = await categoryModel.findById(categoryId).populate('users')
        .populate('tags')
        .populate('isAdmin');;
        if (!category) {
            return null;
        }
        if(!authenticationUser){
            await category.addUsers(UserAdd._id);
            const categoryUpdate = await categoryModel.findById(categoryId).populate('users')
            const userCount = await User.countDocuments({ _id: { $in: categoryUpdate.users } });
            categoryUpdate.sumUser = userCount;
            console.log()
            await categoryUpdate.save();
            const categoryUpdate2 = await categoryModel.findById(categoryId).populate('users')
            return categoryUpdate2;
        }
        else if (category.isAdmin._id == authenticationUser._id  || authenticationUser.roles == 'Admin' ) {
            await category.addUsers(userIds);
            const categoryUpdate = await categoryModel.findById(categoryId).populate('users')
            const userCount = await User.countDocuments({ _id: { $in: categoryUpdate.users } });
            categoryUpdate.sumUser = userCount;
            await categoryUpdate.save();
            const categoryUpdate2 = await categoryModel.findById(categoryId).populate('users')
            return categoryUpdate2;
        }
        if (!category) {
            return null;
        }
        return 1;
    }
    static async removeUsersFromCategory(userIds,categoryId,authenticationUser) {
        const category = await categoryModel.findById(categoryId).populate('users')
        .populate('tags')
        .populate('isAdmin');;
        if (!category) {
            return null;
        }
        if (category.isAdmin._id == authenticationUser._id  || authenticationUser.roles == 'Admin' ) {
            await category.removeUsers(userIds);
            const userCount = await User.countDocuments({ _id: { $in: category.users } });
            category.sumUser = userCount;
            category.save();
            return category;
        }
        if (!category) {
            return null;
        }
        return 1;
    }
    static uploadAvatar = async(authenticatedUser,categoryId, fileData) =>{
        try {
        const category = await Category.findById(categoryId);
        if(!category) {
            return null;
        }
        if (category.isAdmin._id == authenticatedUser._id  || authenticatedUser.roles == 'Admin' ) {
            if (category.avatar!=null)
            {
                cloudinary.uploader.destroy(category.avatar.publicId);
            }
            category.avatar.url = fileData.path; 
            category.avatar.publicId = fileData.filename;
            await category.save();
            return category.avatar; 
        }
        console.log('User do not have permission to edit this category');
        console.log('--------------------------------------------------------------------------------------------------------------------')
        return 1;
        } catch (error) {
        console.error(error);
        throw error;
        }
    }
    static uploadBanner = async(authenticatedUser,categoryId, fileData) =>{
        try {
        const category = await Category.findById(categoryId);
        if(!category) {
            return null;
        }
        if (category.isAdmin._id == authenticatedUser._id  || authenticatedUser.roles == 'Admin' ) {
            if (category.avatar!=null)
            {
                cloudinary.uploader.destroy(category.avatar.publicId);
            }
            category.banner.url = fileData.path; 
            category.banner.publicId = fileData.filename;
            await category.save();
            return category.avatar; 
        }
        return 1;
        } catch (error) {
        console.error(error);
        throw error;
        }
    }
    static getCategoryFromUser = async (userId, index) => {
        try {
            const user = await User.findById(userId);
            const pageSize = 6;
            const skip = (index - 1) * pageSize; 
    
            // Lấy các danh mục mà người dùng là thành viên nhưng không phải là admin
            const categories = await Category.find({
                users: userId,
                isAdmin: { $ne: userId } // Loại trừ trường hợp người dùng là admin của danh mục
            })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(pageSize)
            .populate('tags')
            .populate('users')
            .exec();
    
            if (categories.length === 0) {
                return null;
            }
    
            // Thêm trạng thái người dùng vào mỗi danh mục
            const categoriesWithUserStatusPromises = categories.map(async category => {
                const statusUser = await this.getUserStatusInCategory1(category, user._id);  
                return { ...category.toObject(), statusUser };
            });
    
            const categoriesWithUserStatus = await Promise.all(categoriesWithUserStatusPromises);
    
            // Tính toán kích thước của kết quả
            const size = await Category.countDocuments({
                users: userId,
                isAdmin: { $ne: userId }
            });
    
            return { categories: categoriesWithUserStatus, size: size };
    
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    
    static getCategoryFromUserIsAdmin = async (userId, index) => {
        try {
            const user = await User.findById(userId);
            const pageSize = 6;
            const skip = (index - 1) * pageSize; 
            const categories = await Category.find({ isAdmin: userId })
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(pageSize)
                .populate('tags')
                .populate('users')
                .exec();
            
            if (categories.length === 0) {
                return null;
            }
            
            const categoriesWithUserStatusPromises = categories.map(async category => {
                const statusUser = await this.getUserStatusInCategory1(category, user._id);  
                return { ...category.toObject(), statusUser };
            });
    
            const categoriesWithUserStatus = await Promise.all(categoriesWithUserStatusPromises);
            const size = await this.sizeGetALlByUser(categoriesWithUserStatusPromises);
            return { categories: categoriesWithUserStatus, size: size };
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    static listCategorySearch = async (authenticatedUser, key)=>{
        try {
            const regex = new RegExp(key, 'i');
            const user = await User.findById(authenticatedUser._id);
            const query = await Category.find({
               $and:[
              {
                $or: [
                    { name: regex },
                    { description: regex }
                ]
              },
              {
                status: 'Publish'
              }
               ]
            }).sort({ updatedAt: -1 });;
            const categoriesWithUserStatusPromises = query.map(async category => {
                const statusUser = await this.getUserStatusInCategory1(category, user._id);  
                return { ...category.toObject(), statusUser };
            });
    
            const categoriesWithUserStatus = await Promise.all(categoriesWithUserStatusPromises);
            return categoriesWithUserStatus;            
        } catch (error) {
            console.error("Error fetching most active posts:", error);
            return null;
        }
    }
    static getCategoryFromUserNotPaging = async (userId) => {
        try {
            const user = await User.findById(userId);
            const categories = await Category.find({ users: userId })
                .populate('tags')
                .sort({ createdAt: -1 })
                .exec();
            
            if (categories.length === 0) {
                return null;
            }
            
            const categoriesWithUserStatusPromises = categories.map(async category => {
                const statusUser = await this.getUserStatusInCategory1(category, user._id);  
                return { ...category.toObject(), statusUser };
            });
    
            const categoriesWithUserStatus = await Promise.all(categoriesWithUserStatusPromises);
            const result = [];
            for(const category of categoriesWithUserStatus)
            {
                if(!category.isAdmin._id.equals(userId))
                {
                    result.push(category);
                }
                
            }
            return  result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    static sizeGetALlByUser = async (result) =>{
        const countDocuments = result.length;
        const totalPages = Math.ceil(countDocuments / 6); // Tính số lượng trang
        return totalPages;
    }
    static checkInvitationCode = async (authenticatedUser, invitationCode) =>{
        try {
        const category = await Category.findOne({ invitationCode: invitationCode }).populate('users').populate('tags');
        if (!category) {
            return null;
        }
        return category;
        } catch (error) {
        console.error(error);
        throw error;
        }
    }
    static evaluateRequest = async (categoryId, user_id, authenticatedUser, status)=>{
        try {
        const category = await categoryModel.findById(categoryId);
        const user = await User.findById(user_id);
        if (!category) {
            return 1;
        }
        if(!user) {
            return 2;
        }
        const request = await UserRequest.findOne({ Category: category._id });  
        if(status === 0)
        {
            await request.removeUsers(user._id);
            return 4;
        }
        if (category.isAdmin._id == authenticatedUser._id  || authenticatedUser.roles == 'Admin' ) {
            await Notify.notifyAccept(authenticatedUser,user_id,categoryId)
            await category.addUsers(user._id)
            await request.removeUsers(user._id)
            const categoryUpdate = await categoryModel.findById(categoryId).populate('users')
            const userCount = await User.countDocuments({ _id: { $in: categoryUpdate.users } });
            categoryUpdate.sumUser = userCount;
            await categoryUpdate.save();
            return 4;
        }
        return 3;
        } catch (error) {
        console.error(error);
        throw error;
        }
    }
    static listBlogIsApproved = async (categoryId, authenticatedUser) => {
        try {
            const category = await Category.findById(categoryId);
            const user = await usermodel.findById(authenticatedUser._id)
            if (!category) {
                return null;
            }
            if (category.isAdmin._id.equals(user._id)  || user.roles === 'Admin' ) {
                const blogs = await blogModel.find({ category: categoryId, isApproved: true });
                return blogs;
            }
            return 3;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    static approvedBlog = async (blogId, authenticatedUser,status) => {
        const blog = await blogModel.findById(blogId);
        if(!blog){
            return null;
        }
        const user = await usermodel.findById(blog.user._id);
        if(status ===true)
        {
            blog.isApproved = false;
            blog.createdAt =new Date();
            await blog.save();
            user.totalBlog = user.totalBlog + 1;
            await user.save();
            return blog;
        }
        if(status ===false)
        {
            await blog.deleteOne();
            return blog;
        }
    }
}

module.exports = CategoryService
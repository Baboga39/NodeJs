const categoryModel = require('../models/Blog/categoryModel')
const Category = require('../models/Blog/categoryModel')
const User = require('../models/usermodel')
const { v4: uuidv4 } = require('uuid');
const cloudinary = require('cloudinary').v2;
const UserRequest = require('../models/Blog/userRequestModel')


class CategoryService {
    static async getAllCategories(user_id,index) {
        const pageSize = 6;
        const skip = (index - 1) * pageSize; 
        const categories = await categoryModel.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(pageSize)
        .populate('tags')
        .populate('users')
        .exec();
        const user = await User.findById(user_id);
        if (!user) {
            console.log('------------------------------------------------------------------------------------------------')
            console.log('Not found user');
            return 1;
        }
        const categoriesWithUserStatusPromises = categories.map(async category => {
            const statusUser = await this.getUserStatusInCategory(category, user._id);  
            return { ...category.toObject(), statusUser };
        });
        
        // Sử dụng Promise.all để chờ tất cả các lời hứa hoàn thành
        const categoriesWithUserStatus = await Promise.all(categoriesWithUserStatusPromises);
        return categoriesWithUserStatus
    }
    static getUserStatusInCategory = async (category, userId) => {
        if (category.users.some(user => user.equals(userId))) {
            return 'Join';
        } else {
            const request = await UserRequest.findOne({ Category: category._id });
            if (request) {
                return 'Pending';
            } else {
                return 'UnJoin';
            }
        }
     };
    static async addCategory(name, description,tagIds, status, userIds, authenticationUser,banner) {
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
    });
    await newCategory.addTags(tagIds);
    await newCategory.addUsers(userIds);
    await newCategory.addUsers(user._id);
    const userCount = await User.countDocuments({ _id: { $in: newCategory.users } });
    newCategory.sumUser = userCount;
    await newCategory.save();
    const populatedCategory = await categoryModel.findById(newCategory._id)
        .populate('users')
        .populate('tags');
    return populatedCategory;
    }
    static async editCategory(newName, newDescription, newStatus, authenticationUser,categoryId) {
        
        let categoryToEdit = await categoryModel.findById(categoryId);

        if (!categoryToEdit) {
            return null;
        }
    
        if (categoryToEdit.isAdmin._id == authenticationUser._id  || authenticationUser.roles == 'Admin' ) {
            categoryToEdit.name = newName || categoryToEdit.name;
            categoryToEdit.description = newDescription || categoryToEdit.description;
            categoryToEdit.status = newStatus || categoryToEdit.status;
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
        const statusUser = await this.getUserStatusInCategory(category, user._id); 
        return { ...category.toObject(), statusUser };    }
    static async deleteCategoryById(categoryId, authenticationUser) {
        const category = await Category.findById(categoryId);
        if (!category) {
            return null;
        }
        console.log( authenticationUser.roles)
        if (category.isAdmin._id == authenticationUser._id  || authenticationUser.roles == 'Admin' ) {
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
        if (category.isAdmin._id == authenticationUser._id  || authenticationUser.roles == 'Admin' ) {
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
        const pageSize = 6;
        const skip = (index - 1) * pageSize; 
        const categories = await Category.find({ users: userId })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(pageSize)
        .populate('tags')
        .populate('users')
        .exec();
        if ((await categories).length===0) {
            return null;
        }
        return categories;
    }
        catch (error) {
            console.error(error);
            throw error;
        }
    }
    static checkInvitationCode = async (authenticatedUser, invitationCode) =>{
        try {
        const category = await Category.findOne({ invitationCode: invitationCode });
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
}

module.exports = CategoryService
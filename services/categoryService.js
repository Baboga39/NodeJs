const categoryModel = require('../models/Blog/categoryModel')
const Category = require('../models/Blog/categoryModel')
const User = require('../models/usermodel')
const cloudinary = require('cloudinary').v2;

class CategoryService {
    static async getAllCategories() {
        const categories = await categoryModel.find();
        return categories
    }
    static async addCategory(name, description,tagIds, status, userIds, authenticationUser) {
    const user = await User.findById(authenticationUser._id);
    
    const exitsCategory = await categoryModel.findOne({ name });
    if (exitsCategory) {
        return null;
    }
    const newCategory = new categoryModel({
        name,
        description,
        status,
        isAdmin: user._id,
    });
    await newCategory.addTags(tagIds);
    await newCategory.addUsers(userIds);
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
    
        if (categoryToEdit.isAdmin._id == authenticationUser._id  || authenticationUser.roles == 'admin' ) {
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
        if (category.isAdmin._id == authenticationUser._id || authenticationUser.roles == 'admin') {
            await category.addTags(tagIds);
            category.save();
            return category;
        }
        return 1;
    }
    static async getCategoryById(categoryId) {
        const category = await categoryModel.findById(categoryId).populate('users')
        .populate('tags')
        .populate('isAdmin');;
        if (!category) {
            return null;
        }
        return category;
    }
    static async getAllCategories() {
        const categories = await Category.find();
        return categories;
    }
    static async deleteCategoryById(categoryId, authenticationUser) {
        const category = await Category.findById(categoryId);
        if (!category) {
            return null;
        }
        if (category.isAdmin._id == authenticationUser._id  || authenticationUser.roles[0] == 'admin' ) {
            await Category.findOneAndDelete(categoryId)
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
        if (category.isAdmin._id == authenticationUser._id  || authenticationUser.roles == 'admin' ) {
            await category.removeTags(tagIds);
            return category;
        }
        if (!category) {
            return null;
        }
        return 1;
    }
    static async addUsersToCategory(categoryId,userIds,authenticationUser) {
        const category = await categoryModel.findById(categoryId).populate('users')
        .populate('tags')
        .populate('isAdmin');;
        if (!category) {
            return null;
        }
        if (category.isAdmin._id == authenticationUser._id  || authenticationUser.roles == 'admin' ) {
            await category.addUsers(userIds);
            return category;
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
        if (category.isAdmin._id == authenticationUser._id  || authenticationUser.roles == 'admin' ) {
            await category.removeUsers(userIds);
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
        if (category.isAdmin._id == authenticatedUser._id  || authenticatedUser.roles == 'admin' ) {
            if (category.avatar!=null)
            {
                cloudinary.uploader.destroy(category.avatar.publicId);
            }
            category.avatar.url = fileData.path; 
            category.avatar.publicId = fileData.filename;
            await category.save();
            return category.avatar; 
        }
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
        if (category.isAdmin._id == authenticatedUser._id  || authenticatedUser.roles == 'admin' ) {
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
    static getCategoryFromUser = async (userId) => {
        try {const Categories = Category.find({ users: userId }).populate('users')
        .populate('tags')
        .populate('isAdmin');
        if ((await Categories).length===0) {
            return null;
        }
        return Categories;
    }
        catch (error) {
            console.error(error);
            throw error;
        }
    }
}

module.exports = CategoryService
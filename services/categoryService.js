const categoryModel = require('../models/Blog/categoryModel')
const Category = require('../models/Blog/categoryModel')
const User = require('../models/usermodel')

class CategoryService {
    static async getAllCategories() {
        const categories = await categoryModel.find();
        return categories
    }
    static async addCategory(name, description, tagIds, status, userIds, authenticationUser) {
    const user = await User.findById(authenticationUser._id);
    console.log(user);
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
    return newCategory;
    }
    static async addTagsToCategory (categoryId, tagIds, authenticationUser)  {

        const category = await categoryModel.findById(categoryId);
        console.log(category.isAdmin._id)
        if (category.isAdmin._id == authenticationUser._id || authenticationUser.roles == 'admin') {
            await category.addTags(tagIds);
            category.save();
            return category;
        }
        if (!category) {
            return null;
        }
        return 1;
    }
    static async getCategoryById(categoryId) {
        const category = await categoryModel.findById(categoryId);
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
        const category = await categoryModel.findById(categoryId);
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
        const category = await categoryModel.findById(categoryId);
        if (!category) {
            return null;
        }
        console.log(category.isAdmin);
        if (category.isAdmin == authenticationUser._id  || authenticationUser.roles == 'admin' ) {
            await category.addUsers(userIds);
            return category;
        }
        if (!category) {
            return null;
        }
        return 1;
    }
    static async removeUsersFromCategory(userIds,categoryId,authenticationUser) {
        const category = await categoryModel.findById(categoryId);
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
}

module.exports = CategoryService
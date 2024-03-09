const categoryModel = require('../models/Blog/categoryModel')
const Category = require('../models/Blog/categoryModel')

class CategoryService {
    static async getAllCategories() {
        const categories = await categoryModel.find();
        return categories
    }
    static async addCategory(name, description, tagIds) {
    const exitsCategory = await categoryModel.findOne({ name });
    if (exitsCategory) {
        return null;
    }
    const newCategory = new categoryModel({
        name,
        description,

    });
    await newCategory.addTags(tagIds);
    return newCategory;
    }
    static async addTagsToCategory (categoryId, tagIds)  {
        const category = await categoryModel.findById(categoryId);
        if (!category) {
            return null;
        }
        await category.addTags(tagIds);
        
        category.save();
        return category;
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
    static async deleteCategoryById(categoryId) {
        const category = await Category.findById(categoryId);
        if (!category) {
            return null;
        }
        await Category.findOneAndDelete(categoryId)
        return 1;
    }
}

module.exports = CategoryService
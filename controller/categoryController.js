const Service = require('../services/')

const addCategory = async (req,res) =>{

    try {
        const authenticationUser = req.user;
        const {name, description, tagIds, status, userIds} = req.body;
        const category = await Service.categoryService.addCategory(name, description,tagIds, status, userIds,authenticationUser.user);
        if (category==null) {
            console.log('Exits category')
            console.log('--------------------------------------------------------------------------------------------------------------------')
            return res.status(400).json({
                success: false,
                statusCode: 400,
                message: 'Exits Category',
                result: null,
            })
        }
        console.log('Add category successfully')
        console.log('--------------------------------------------------------------------------------------------------------------------')
        return res.status(200).json({
                success: true,
                statusCode: 200,
                message: 'Add Category Success',
                result: category
            })
    } catch (error) {
        console.log('Internal Server Error:'+ error.message)
        console.log('--------------------------------------------------------------------------------------------------------------------')
        return res.status(500).json({
            success: false,
            statusCode: 500,
            message: 'Add Category Failed',
            error: error
        })
    }
}
const addTagsToCategory = async (req, res) => {
    try {
        const authenticationUser = req.user;
        const {categoryId, tagIds} = req.body;
        const category = await  Service.categoryService.addTagsToCategory(categoryId, tagIds, authenticationUser.user);
        if (category==1) {
            console.log('User do not have permission to add tags');
            console.log('--------------------------------------------------------------------------------------------------------------------')
            return res.status(400).json({
                success: false,
                statusCode: 401,
                message: 'User do not have permission to add tags',
                result: null,
            })
        }
        if (category==null) {
            console.log('Not found category')
            console.log('--------------------------------------------------------------------------------------------------------------------')
            return res.status(400).json({
                success: false,
                statusCode: 400,
                message: 'Not found category',
                result: null,
            })
        }
        console.log('Add Tags to Category Success')
        console.log('--------------------------------------------------------------------------------------------------------------------')
            return res.status(200).json({
                success: true,
                statusCode: 200,
                message: 'Add Tags to Category Success',
                result: category
            })
    } catch (error) {
        console.log('Internal Server Error: '+ error.message)
        console.log('--------------------------------------------------------------------------------------------------------------------')
        return res.status(500).json({
            success: false,
            statusCode: 500,
            message: 'Add Tags to Category Failed',
            error: error
        })
    }
}
const getCategoryById = async (req, res) => {
    const categoryId = req.query.categoryId;
    console.log(categoryId);
    const category = await Service.categoryService.getCategoryById(categoryId);
    if (category==null) {
        console.log('Not found category')
        console.log('--------------------------------------------------------------------------------------------------------------------')
        return res.status(400).json({
            success: false,
            statusCode: 400,
            message: 'Not found category',
            result: null,
        })
    }
    console.log('Get Category Success')
    console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Category By Id',
        result: category,
    })
}
const getAllCategory = async (req, res) => {
    const categories = await Service.categoryService.getAllCategories();
    return res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Add Tags to Category Success',
        result: categories
    })
}
const deleteCategoryById = async (req, res) => {
    const authenticationUser = req.user;
    const categoryId = req.params.categoryId;
    console.log(categoryId);
    const category = await Service.categoryService.deleteCategoryById(categoryId, authenticationUser.user);
    if (category==null) {
        console.log('Not found category')
        console.log('--------------------------------------------------------------------------------------------------------------------')
        return res.status(400).json({
            success: false,
            statusCode: 400,
            message: 'Not found category',
            result: null,
        })
    }
    if (category==1) {
        console.log('User do not have permission to delete category')
        console.log('--------------------------------------------------------------------------------------------------------------------')
        return res.status(400).json({
            success: false,
            statusCode: 400,
            message: 'User do not have permission to delete category',
            result: null,
        })
    }
    console.log('Delete Category Success')
    console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Delete Category Success',
        result: null,
    })
}
const removeTags = async (req, res) => {
    const {tagIds, categoryId} = req.body;
    const authenticationUser = req.user;
    const category = await Service.categoryService.removeTagsFromCategory(tagIds, categoryId, authenticationUser.user);
    if (category==1) {
        console.log('User do not have permission to remove tags');
        console.log('--------------------------------------------------------------------------------------------------------------------')
        return res.status(400).json({
            success: false,
            statusCode: 401,
            message: 'User do not have permission to remove tags',
            result: null,
        })
    }
    if (category==null) {
        console.log('Not found category')
        console.log('--------------------------------------------------------------------------------------------------------------------')
        return res.status(400).json({
            success: false,
            statusCode: 400,
            message: 'Not found category',
            result: null,
        })
    }
    return res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Remove Tag From Category Success',
        result: category,
    })
}
const addUsersToCategory = async (req, res) => {
    try {
    const authenticationUser = req.user;
    const {categoryId, userIds} = req.body;
    const category = await  Service.categoryService.addUsersToCategory(categoryId, userIds, authenticationUser.user);
    if (category==1) {
        console.log('User do not have permission to add users');
        console.log('--------------------------------------------------------------------------------------------------------------------')
        return res.status(400).json({
            success: false,
            statusCode: 401,
            message: 'User do not have permission to add users',
            result: null,
        })
    }
    if (category==null) {
        console.log('Not found category')
        console.log('--------------------------------------------------------------------------------------------------------------------')
        return res.status(400).json({
            success: false,
            statusCode: 400,
            message: 'Not found category',
            result: null,
        })
    }
    return res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Add User Success',
        result: category,
    })
    } catch (error) {
        return res.status(500).json({
            success: false,
            statusCode: 500,
            message: 'Internal Server Error',
            result: error.message,
        });
    }
}

const removeUser = async (req, res) => {
    const {userIds, categoryId} = req.body;
    const authenticationUser = req.user;
    const category = await Service.categoryService.removeUsersFromCategory(userIds, categoryId, authenticationUser.user);
    if (category==1) {
        console.log('User do not have permission to remove users');
        console.log('--------------------------------------------------------------------------------------------------------------------')
        return res.status(400).json({
            success: false,
            statusCode: 401,
            message: 'User do not have permission to remove users',
            result: null,
        })
    }
    if (category==null) {
        console.log('Not found category')
        console.log('--------------------------------------------------------------------------------------------------------------------')
        return res.status(400).json({
            success: false,
            statusCode: 400,
            message: 'Not found category',
            result: null,
        })
    }
    return res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Remove users From Category Success',
        result: category,
    })
}
module.exports = {
    addCategory,
    addTagsToCategory,
    getCategoryById,
    getAllCategory,
    deleteCategoryById,
    removeTags,
    addUsersToCategory,
    removeUser,
}
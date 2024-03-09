const Service = require('../services/')

const addCategory = async (req,res) =>{

    try {
        const {name, description, tagIds} = req.body;
        const category = await Service.categoryService.addCategory(name, description,tagIds);
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
        const {categoryId, tagIds} = req.body;
        const category = await  Service.categoryService.addTagsToCategory(categoryId, tagIds);
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
    const categoryId = req.params.categoryId;
    console.log(categoryId);
    const category = await Service.categoryService.deleteCategoryById(categoryId);
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
    console.log('Delete Category Success')
    console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Delete Category Success',
        result: null,
    })
}
module.exports = {
    addCategory,
    addTagsToCategory,
    getCategoryById,
    getAllCategory,
    deleteCategoryById,
}
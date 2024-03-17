
const Service = require('../services/index')

const addTAg = async (req, res) => {
    try {
        const authenticatedUser = req.user;
        const {name,categoryId} = req.body;
        const tag = await Service.tagService.addTag(name,categoryId,authenticatedUser);
        if (tag==null) {
            console.log('Exits Tag')
            console.log('--------------------------------------------------------------------------------------------------------------------')
            return res.status(400).json({
                success: false,
                statusCode: 400,
                message: 'Exits Tag',
                result: null
            })
        }
        console.log('Add tag successfully')
        console.log('--------------------------------------------------------------------------------------------------------------------')
        return res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Add tag successfully',
            result: tag
        })
    } catch (error) {
        console.log('Internal Server Error '+ error.message)
        console.log('--------------------------------------------------------------------------------------------------------------------')
        return res.status(500).json({
            success: false,
            statusCode: 500,
            message: 'Internal Server Error',
            result: error.message
        })
    }
}
const getAllTags = async (req, res) =>{
    const tags = await Service.tagService.getAllTags();
        console.log('Get All tags')
        console.log('--------------------------------------------------------------------------------------------------------------------')
        return res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'All tags',
            result: tags,
        })
}
const getTagById = async (req, res) =>{
    const id = req.params.tagId;
    const tag = await Service.tagService.getTagById(id);
        console.log('Get Tag By Id')
        console.log('--------------------------------------------------------------------------------------------------------------------')
        return res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Tag By Id',
            result: tag,
        })
}
const deleteTagById = async (req, res) =>{
    const id = req.params.tagId;

    await Service.tagService.deleteTag(id);
        console.log('Delete Tag Successfully')
        console.log('--------------------------------------------------------------------------------------------------------------------')
        return res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Delete Tag Successfully',
            result: null,
        })
};
module.exports = {addTAg,getAllTags,getTagById, deleteTagById,}
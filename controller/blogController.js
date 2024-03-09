const BlogDTO = require('../dto/request/BlogDTO');
const BlogModel = require('../models/Blog/blogModel');
const Service = require('../services');
const createBlog = async (req, res) => {
    try {
        const authenticatedUser = req.user;
        console.log(authenticatedUser);
        const blogDTO = BlogDTO.fromRequest(req.body);

        const blog = await Service.blogService.createBlog(blogDTO,authenticatedUser);
        console.log('Create Blog successfully')
        console.log('--------------------------------------------------------------------------------------------------------------------')
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Create Blog Success',
            result: blog
        });
        
    }
    catch (error) {
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: 'Internal Server Error',
            result: error.message,
        });
    }
};
const createBlogDraft = async (req, res) => {
  try {
      const authenticatedUser = req.user;
      console.log(authenticatedUser);
      const blogDTO = BlogDTO.fromRequest(req.body);

      const blog = await Service.blogService.createBlogDraft(blogDTO,authenticatedUser);
      console.log('Create Blog Draft successfully')
      console.log('--------------------------------------------------------------------------------------------------------------------')
      res.status(200).json({
          success: true,
          statusCode: 200,
          message: 'Create Blog Draft Success',
          result: blog
      });
      
  }
  catch (error) {
      res.status(500).json({
          success: false,
          statusCode: 500,
          message: 'Internal Server Error',
          result: error.message,
      });
  }
};
const getBlogById = async (req, res) => {
    try {
        const blogId = req.params.blogId;
        const blog = await Service.blogService.getBlogById(blogId);
        if(!blog) {
           return res.status(400).json({
                success: false,
                statusCode: 400,
                message: 'Not found blog',
                result: null,
            });
        }
        return res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Get Blog Success',
            result: blog
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: 'Internal Server Error',
            result: error.message,
        });
    }
}

const uploadImage = async (req,res) => {
    try {
      const authenticatedUser = req.user;
      const fileData  = req.file;
      
      await Service.blogService.uploadImage(fileData, authenticatedUser);
      
      console.log('Upload Image successfully')
      console.log('--------------------------------------------------------------------------------------------------------------------')
      res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Upload Image successfully',
        result: fileData.path,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        statusCode: 500,
        message: 'Internal server error',
        result: error.message,
      });
    }
  }
    const uploadAvatar = async (req,res) => {
      try {
        const fileData  = req.file;
        console.log('Upload Image successfully')
        console.log('--------------------------------------------------------------------------------------------------------------------')
        res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Upload Image successfully',
        result: fileData.path,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        statusCode: 500,
        message: 'Internal server error',
        result: error.message,
      });
    }
  }
  const editBlog = async (req,res) => {
    try {
      const authenticatedUser = req.user;
      const blogId = req.params.blogId;
      const blogDTO = BlogDTO.fromRequest(req.body);
      const blog = await Service.blogService.editBlog(blogDTO,authenticatedUser,blogId);
      console.log('Edit Blog successfully')
      console.log('--------------------------------------------------------------------------------------------------------------------')
      return res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Edit Blog successfully',
        result: blog,
      });
    }
    catch (error) {
      res.status(500).json({
        success: false,
        statusCode: 500,
        message: 'Internal server error',
        result: error.message,
      });
    }
  }
  const deleteBlogById = async (req, res) => {
    try {
      const blogId = req.params.blogId;
      await Service.blogService.deleteBlogById(blogId);
      console.log('Delete Blog successfully')
      console.log('--------------------------------------------------------------------------------------------------------------------')
      return res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Delete Blog successfully',
        result: null,
      });
    }
    catch (error) {
      res.status(500).json({
        success: false,
        statusCode: 500,
        message: 'Internal server error',
        result: error.message,
      });
    }
  }
module.exports = {createBlog,getBlogById,uploadImage,uploadAvatar, createBlogDraft, editBlog, deleteBlogById};
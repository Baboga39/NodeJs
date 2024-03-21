const BlogDTO = require('../dto/request/BlogDTO');
const BlogModel = require('../models/Blog/blogModel');
const Service = require('../services');
const { Types } = require('mongoose');


function isValidObjectId(id) {
  return Types.ObjectId.isValid(id);
}

const createBlog = async (req, res) => {
    try {
        const authenticatedUser = req.user;
        const blogDTO = BlogDTO.fromRequest(req.body);
        const blog = await Service.blogService.createBlog(blogDTO,authenticatedUser);
        if(!blogDTO.title)
        {
          return res.status(400).json({
              success: false,
              statusCode: 400,
              message: 'Title is required',
              result: null
          });
        }
        if(!blogDTO.content){
          return res.status(400).json({
              success: false,
              statusCode: 400,
              message: 'Content is required',
              result: null
          });
        }
        if(!blogDTO.avatar){
          return res.status(400).json({
              success: false,
              statusCode: 400,
              message: 'Avatar is required',
              result: null
          });
        }
        if(blog === 1)
        {
        console.log('Not found Category')
        console.log('--------------------------------------------------------------------------------------------------------------------')
        return res.status(400).json({
            success: true,
            statusCode: 400,
            message: 'Not found Category',
            result: null
        });
        }
        console.log('Create Blog successfully')
        console.log('--------------------------------------------------------------------------------------------------------------------')
        return res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Create Blog Success',
            result: blog
        });
        
    }
    catch (error) {
        return res.status(500).json({
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
       return res.status(200).json({
          success: true,
          statusCode: 200,
          message: 'Create Blog Draft Success',
          result: blog
      });
      
  }
  catch (error) {
      return res.status(500).json({
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
        return res.status(500).json({
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
      return res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Upload Image successfully',
        result: fileData.path,
      });
    } catch (error) {
      return res.status(500).json({
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
        return res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Upload Image successfully',
        result: fileData.path,
      });
    } catch (error) {
      return res.status(500).json({
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
      if (blog==null) {
      console.log('Not found Blog')
      console.log('--------------------------------------------------------------------------------------------------------------------')
        return res.status(400).json({
            success: false,
            statusCode: 400,
            message: 'Not found blog',
            result: null,
        });
      }
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
     return  res.status(500).json({
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
      const authenticatedUser = req.user;
      const result =await Service.blogService.deleteBlogById(blogId,authenticatedUser.user);
      if (result===1){
        console.log('User do not have permission to delete')
        console.log('--------------------------------------------------------------------------------------------------------------------')
        return res.status(400).json({
            success: false,
            statusCode: 400,
            message: 'User do not have permission to delete',
            result: null,
        });
      }
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
     return res.status(500).json({
        success: false,
        statusCode: 500,
        message: 'Internal server error',
        result: error.message,
      });
    }
  }
  const getAllBlogByUserId = async (req, res) => {
    try {
        const user = req.user;
        const blogs = await Service.blogService.getAllBlogByUserId(user);
      
        if(!blogs) {
          console.log('Not Found User');
          console.log('--------------------------------------------------------------------------------------------------------------------')
          return res.status(400).json({
                success: false,
                statusCode: 400,
                message: 'Not found User',
                result: null,
            });
        }
        console.log('Get All Blog Success')
        console.log('--------------------------------------------------------------------------------------------------------------------')
        return res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Get All Blog Success',
            result: blogs
        });
    }
    catch (error) {
      console.log('Internal Server Error', error);
      console.log('--------------------------------------------------------------------------------------------------------------------')
        return res.status(500).json({
            success: false,
            statusCode: 500,
            message: 'Internal Server Error',
            result: error.message,
        });
    }
  }
const listBlogNew = async (req, res) => {
  try {
    const { index } = req.query; 
    const blogs = await Service.blogService.listBlogNew(req.user, index);
    console.log('Get Blogs New Success');
    console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Get Blogs New Success',
      result: blogs
    });
  } catch (error) {
    console.log('Internal Server Error');
    console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: 'Internal Server Error',
      result: error.message,
    });
  }
}
const listBlogPopularity = async (req, res) => {
  try {
    const { index } = req.query; 
    const blogs = await Service.blogService.listBlogPopularity(req.user, index);
    console.log('Get All Blog Popularity Success');
    console.log('---------------------------------------------- ----------------------------------------------------------------------')
    if(blogs==null){
      return res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Get All Blog Success',
        result: null
      });
    }
    console.log('Get All Blog Popularity Success');
    console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Get All Blog Success',
      result: blogs
    });
  } catch (error) {
    console.log('Internal Server Error');
    console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: 'Internal Server Error',
      result: error.message,
    });
  }
}
const listBlogByCategory = async (req, res) => {
  try {
    const { index,categoryId } = req.query; 
    if (!isValidObjectId(categoryId)) {
      console.log('Invalid category ID');
      console.log('--------------------------------------------------------------------------------------------------------------------');
      return res.status(400).json({
          success: false,
          statusCode: 400,
          message: 'Invalid category ID',
          result: null,
      });
    }
    const blogs = await Service.blogService.getAllBlogByCategory(categoryId,req.user, index);
    console.log('Not found category');
    console.log('---------------------------------------------- ----------------------------------------------------------------------')
    if(blogs===1){
      return res.status(400).json({
        success: true,
        statusCode: 400,
        message: 'Not found category',
        result: null
      });
    }
    console.log('Get All Blog By Category Success');
    console.log('---------------------------------------------- ----------------------------------------------------------------------')
    if(blogs==null){
      return res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Get All Blog By Category Success',
        result: null
      });
    }
    console.log('Get All Blog By Category Success');
    console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Get All Blog By Category Success',
      result: blogs
    });
  } catch (error) {
    console.log('Internal Server Error');
    console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: 'Internal Server Error',
      result: error.message,
    });
  }
}
const sizeAllBlogByCategory = async (req, res) => {
  const categoryId = req.params.categoryId;
  const sizeAllBlogByCategory = await Service.blogService.sizeGetAllBlogByCategory(categoryId);
  return res.status(200).json({
    success: true,
    statusCode: true,
    message: 'Size All Blog By Category',
    result: sizeAllBlogByCategory,
})
}
module.exports = {createBlog,getBlogById,uploadImage,uploadAvatar, createBlogDraft, editBlog, deleteBlogById,getAllBlogByUserId

  ,listBlogNew,listBlogPopularity,listBlogByCategory
  ,sizeAllBlogByCategory

};
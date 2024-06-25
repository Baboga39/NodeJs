const BlogDTO = require('../dto/request/BlogDTO');
const Service = require('../services');
const { Types } = require('mongoose');


function isValidObjectId(id) {
  return Types.ObjectId.isValid(id);
}

const createBlog = async (req, res) => {
    try {
        const authenticatedUser = req.user;
        const blogDTO = BlogDTO.fromRequest(req.body);
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
        const blog = await Service.blogService.createBlog(blogDTO,authenticatedUser);
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
        if(blog===2){
          console.log('Title required 10 characters');
          console.log('--------------------------------------------------------------------------------------------------------------------')
          return res.status(400).json({
            success:false,
            statusCode: 400,
            message: 'Title required 10 characters',
            result: null,
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
        const authenticatedUser =req.user;
        const blog = await Service.blogService.getBlogById(blogId,authenticatedUser);
        if(blog===null) {
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
const editBlog = async (req,res) => {
    try {
      const authenticatedUser = req.user;
      const blogId = req.params.blogId;
      const blogDTO = BlogDTO.fromRequest(req.body);
      if(blogDTO.status === "Published")
      {
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
        const blog = await Service.blogService.editBlog(blogDTO,authenticatedUser,blogId);
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
        console.log('Edit Blog successfully')
        console.log('--------------------------------------------------------------------------------------------------------------------')
        return res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Edit Blog Success',
            result: blog
        });
      }
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
        message: 'Get All Blog Popularity Success',
        result: null
      });
    }
    console.log('Get All Blog Popularity Popularity Success');
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
const listBlogDiscussions = async (req, res) => {
  try {
    const { index } = req.query; 
    const blogs = await Service.blogService.listBlogDiscussions(req.user, index);
    console.log('Get All Blog Popularity Success');
    console.log('---------------------------------------------- ----------------------------------------------------------------------')
    if(blogs==null){
      return res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Get All Blog Discussions Success',
        result: null
      });
    }
    console.log('Get All Blog Discussions Success');
    console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Get All Blog Discussions Success',
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
const listBlogSaveByUser = async (req, res) => {
  try {
    const user = req.user;
    const listBlog  = await Service.blogService.listBlogSaveByUser(user.user);
    console.log('List Blog By User successfully')
    console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'List Blog By User successfully',
      result: listBlog,
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
const listBlogDraftByUser = async (req, res) => {
  try {
    const authenticatedUser = req.user;
    const listBlog  = await Service.blogService.getBlogDraftByUser(authenticatedUser.user);
    console.log('List Blog Draft by User')
    console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'List Blog Draft by User',
      result: listBlog,
    });
  } catch (error) {
    console.log('Internal server error')
    console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: 'Internal server error',
      result: error.message,
    });
  }
}
// const listBlogInFeed = async (req, res) => {
//   try {
//     const authenticatedUser = req.user;
//     const  index  = req.params.index;
//     if(!index)
//     {
//       console.log('Index is missing')
//       console.log('--------------------------------------------------------------------------------------------------------------------')
//       return res.status(400).json({
//         success: false,
//         statusCode: 400,
//         message: 'Index is missing',
//         result: null,
//       });
//     }
//     const listBlog  = await Service.blogService.listBlogInFeed(authenticatedUser.user,index);
//     console.log('List Blog In Feed')
//     console.log('--------------------------------------------------------------------------------------------------------------------')
//     return res.status(200).json({
//       success: true,
//       statusCode: 200,
//       message: 'List Blog In Feed',
//       result: listBlog,
//     });
//   } catch (error) {
//     console.log('Internal server error')
//     console.log('--------------------------------------------------------------------------------------------------------------------')
//     return res.status(500).json({
//       success: false,
//       statusCode: 500,
//       message: 'Internal server error',
//       result: error.message,
//     });
//   }
// }
static listBlogInFeed = async (authenticatedUser, pageIndex) => {
  try {
      const userId = authenticatedUser._id;
      
      // Đảm bảo Access được ghi nhận
      const today = new Date();
      today.setHours(0, 0, 0, 0); 
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);

      const access = new Access({ user: userId });
      const checkAccess = await Access.findOne({ user: userId, createdAt: { $gte: today, $lt: tomorrow } });

      if (!checkAccess) {
          await access.save();
      }

      const pageSize = 6;
      const startIndex = (pageIndex - 1) * pageSize;

      // Lấy danh sách categories
      const categories = await Category.find({ users: userId }).select('_id');
      const categoryIds = categories.map(category => category._id);

      // Lấy danh sách người theo dõi
      const follow = await followModel.findOne({ user: userId }).select('following');
      const followingIds = follow ? follow.following.map(follow => follow._id) : [];

      // Kết hợp truy vấn category và user
      const queryConditions = [
          { category: { $in: categoryIds }, status: 'Published', isApproved: false },
          { user: { $in: followingIds }, status: 'Published', isApproved: false }
      ];

      const blogs = await Blog.find({ $or: queryConditions })
          .sort({ createdAt: -1 })
          .skip(startIndex)
          .limit(pageSize)
          .populate('tags')
          .populate('user')
          .populate('category')
          .exec();

      // Lấy danh sách blogs được chia sẻ
      const sharedBlogs = await Share.find({ user: { $in: followingIds } }).populate('listBlog').exec();

      for (const share of sharedBlogs) {
          if (share.listBlog) {
              const posts = await this.findAndUpdateLikeAndSave(share.listBlog, userId);
              const postsWithPermissions = await this.findAndUpdatePermissions(posts, userId);
              for (const post of postsWithPermissions) {
                  post.isShare = true;
                  post.shareBy = share.user;
                  blogs.push(post);
              }
          }
      }

      // Loại bỏ các bài viết trùng lặp
      const uniqueBlogs = Array.from(new Set(blogs.map(blog => blog._id))).map(id => blogs.find(blog => blog._id.toString() === id.toString()));

      // Sắp xếp theo createdAt và updatedAt
      uniqueBlogs.sort((a, b) => {
          if (a.createdAt > b.createdAt) return -1;
          if (a.createdAt < b.createdAt) return 1;
          if (a.updatedAt > b.updatedAt) return -1;
          if (a.updatedAt < b.updatedAt) return 1;
          return 0;
      });

      const size = Math.ceil(uniqueBlogs.length / pageSize);
      const paginatedPosts = uniqueBlogs.slice(startIndex, startIndex + pageSize);

      return { size, posts: paginatedPosts };
  } catch (error) {
      console.error("Error fetching most active posts:", error);
      return null;
  }
}

const listBlogShareBy = async (req, res) => {
  try {
    const userId = req.params.userId;
    const authenticatedUser = req.user;
    const listBlog  = await Service.blogService.listBlogShareByUSer(authenticatedUser.user,userId);
    if (listBlog===1){
      console.log('List Blog Share By User')
      console.log('--------------------------------------------------------------------------------------------------------------------')
      return res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'List Blog Share By User',
        result: null,
      });
    }
    if(listBlog.length===0){
      console.log('List Blog Share By User')
      console.log('--------------------------------------------------------------------------------------------------------------------')
      return res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'List Blog Share By User',
        result: null,
      });
    }
    console.log('List Blog Share By User')
    console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'List Blog Share By User',
      result: listBlog,
    });
  }
  catch (error) {
    console.log('Internal server error')
    console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: 'Internal server error',
      result: error.message,
    });
  }
}
module.exports = {createBlog,getBlogById,uploadImage, createBlogDraft, editBlog, deleteBlogById,getAllBlogByUserId

  ,listBlogNew,listBlogPopularity,listBlogByCategory
  ,sizeAllBlogByCategory,
  listBlogSaveByUser,
  listBlogDraftByUser,
  listBlogDiscussions,
  listBlogInFeed,
  listBlogShareBy
};
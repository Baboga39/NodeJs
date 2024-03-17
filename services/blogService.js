const Blog = require('../models/Blog/blogModel')
const User = require('../models/usermodel')
const Tag = require('../models/Blog/tagModel')
const temporaryImageModel = require('../models/Blog/temporaryImageModel');
const mongoose = require('mongoose');
const Category = require('../models/Blog/categoryModel')
const cloudinary = require('cloudinary').v2;

class BlogService{
    static createBlog =  async (blogDTO, authenticatedUser) =>{
        const user = await User.findById(authenticatedUser.user._id)
        if(blogDTO.categoryId){
        const category = await Category.findById(blogDTO.categoryId);
        if(!category)
        {
            return 1;
        }}
        const blog = new Blog({
            title: blogDTO.title,
            content: blogDTO.content,
            category: blogDTO.categoryIds,
            description: blogDTO.description,
            avatar: blogDTO.avatar,
            user: user,
        });
        await blog.save();
        await blog.addTags(blogDTO.tagIds);

        await temporaryImageModel.findOneAndDelete({user: authenticatedUser.user._id})
        return blog;
    }
    
    static createBlogDraft =  async (blogDTO, authenticatedUser) =>{
        const user = await User.findById(authenticatedUser.user._id)
        const blog = new Blog({
            title: blogDTO.title,
            content: blogDTO.content,
            category: blogDTO.categoryIds,
            description: blogDTO.description,
            avatar: blogDTO.avatar,
            status: 'Draft',
            user: user,
        });
        await blog.save();
        await blog.addTags(blogDTO.tagIds);

        await temporaryImageModel.findOneAndDelete({user: authenticatedUser.user._id})
        return blog;
    }
    static editBlog =  async (blogDTO, authenticatedUser,blogId) =>{
        const blog = await Blog.findById(blogId);
        blog.title = blogDTO.title;
        blog.content = blogDTO.content;
        blog.category = blogDTO.categoryIds;
        blog.description = blogDTO.description;
        blog.avatar = blogDTO.avatar;
        blog.status = blogDTO.status;
        await blog.save();
        await blog.addTags(blogDTO.tagIds);
        if(blogDTO.status == 'published'){
        await temporaryImageModel.findOneAndDelete({user: authenticatedUser.user._id})
        }
        return blog;
    }
    static uploadImage = async (fileData, authenticatedUser) =>{
        const temporaryImage = await temporaryImageModel.findOne({user: authenticatedUser.user._id});
        if (temporaryImage ==null){
            const newTemporaryImage = new temporaryImageModel({
                user: authenticatedUser.user._id,
                image: fileData.filename,
            });
            await newTemporaryImage.save();
            return newTemporaryImage;
        }
        else{
            temporaryImage.image.push(fileData.filename);
            await temporaryImage.save();
            return temporaryImage;
        }
    }
    static getBlogById= async (blogId) =>{
        let blog = await Blog.findById(blogId);
        blog.views++;
        blog.save();
        return Blog.findById(blogId);
    }
    static deleteBlogById = async (blogId) => {
        try {
            // Tìm blog dựa trên ID
            const blog = await Blog.findById(blogId);
    
            // Kiểm tra xem blog có tồn tại không
            if (!blog) {
                throw new Error('Blog not found');
            }
    
            // Lấy danh sách các tag của blog
            const tagIds = blog.tags;
    
            // Giảm sumBlog của các tag đi 1
            await Tag.updateMany(
                { _id: { $in: tagIds } },
                { $inc: { sumBlog: -1 } }
            );
    
            // Xóa blog
            const deletedBlog = await Blog.findOneAndDelete({ _id: blogId });
            
            return deletedBlog;
        } catch (error) {
            throw new Error(error.message);
        }
    }
    
      
    static getAllBlogByUserId = async (authenticatedUsers)=> {
        const result = await Blog.updateMany({ isSave: { $exists: false } }, { $set: { isSave: false } });

        const user = await User.findById(authenticatedUsers.user._id);
        if (!user) {
            return null;
          }
        const blog = await Blog.find({user: user._id});
        return blog;
    }

    //////////////////////////////// Interaction with blog //////////////////////////////////////////////////////////////////
    static getUserLikesBlog(blogId){
        return Blog.findById(blogId).select('listUserLikes')
                                    .populate('listUserLikes');
    }
    









        ////////////////////////////////////////// List blog  //////////////////////////////////////////////////////////////////

        static findAndUpdateLikeAndSave = async (listBlog, userId) => {
            try {
                for (let i = 0; i < listBlog.length; i++) {
                    const blog = listBlog[i];
                    const isUserInSavedBy = Array.isArray(blog.savedBy) && blog.savedBy.some(user => user._id.equals(userId));
                    const isUserInListUserLikes = Array.isArray(blog.listUserLikes) && blog.listUserLikes.some(user => user._id.equals(userId));
        
                    const updateFields = {
                        isSave: isUserInSavedBy || false,
                        isLiked: isUserInListUserLikes || false
                    };
        
                    await Blog.findByIdAndUpdate(blog._id, updateFields);
                }
                return listBlog;
            } catch (error) {
                console.error("Error updating blogs:", error);
            }
        }
        static listBlogNew = async (authenticatedUser, index) => {
            const pageSize = 6;
            const skip = (index - 1) * pageSize; // Số bài viết sẽ bỏ qua
            try {
              const query = await Blog.find({ status: 'Published' }) // Tạo query
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(pageSize)
                .populate('tags')
                .populate('user')
                .populate('category')
                .exec();
        
            const posts = await this.findAndUpdateLikeAndSave(query,authenticatedUser.user._id)

            if (posts.length === 0) {
                return null;
            }
            return posts;
            } catch (error) {
            return null;
            }
        };
        static listBlogPopularity = async (authenticatedUser, index) => {
            const pageSize = 6;
            const skip = (index - 1) * pageSize; // Số bài viết sẽ bỏ qua
            try {
            const query = await Blog.find({ status: 'Published' })
                .sort({ likes: -1, views: -1, updatedAt: -1 }) // Sắp xếp theo lượt like, views và ngày update
                .skip(skip)   
                .limit(pageSize) 
                .populate('tags') 
                .populate('category') 
                .exec();
            const posts = await this.findAndUpdateLikeAndSave(query, authenticatedUser.user._id)
            return posts;
            } catch (error) {
            console.error("Error fetching most active posts:", error);
            return null;
            }
        };
        static getAllBlogByCategory = async (categoryId, authenticatedUser,index) =>{
            const category = Category.findById(categoryId);
            if(!category){
                console.log(category);
                return 1;
            }
            const pageSize = 6;
            const skip = (index - 1) * pageSize; // Số bài viết sẽ bỏ qua
            try {
            const query = await Blog.find({ category: categoryId })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(pageSize)
            .populate('tags')
            .populate('user')
            .populate('category')
            .exec();
            const posts = await this.findAndUpdateLikeAndSave(query,authenticatedUser.user._id)
            return posts;
            } catch (error) {
            console.error("Error fetching most active posts:", error);
            return null;
            }
        }
}

module.exports = BlogService;
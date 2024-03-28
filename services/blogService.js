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
        if(blogDTO.categoryIds){
        const category = await Category.findById(blogDTO.categoryIds);
        if(!category)
        {
            return 1;
        }}
        const blog = new Blog({
            title: blogDTO.title,
            content: blogDTO.content,
            category: blogDTO.categoryIds || null,
            description: blogDTO.description,
            avatar: blogDTO.avatar,
            user: user,
        });
        await blog.save();
        if(blogDTO.tagIds!=null){
        await blog.addTags(blogDTO.tagIds);
        }
        await temporaryImageModel.findOneAndDelete({user: authenticatedUser.user._id})
        return blog;
    }
    
    static createBlogDraft =  async (blogDTO, authenticatedUser) =>{
        const user = await User.findById(authenticatedUser.user._id)
        const blog = new Blog({
            title: blogDTO.title,
            content: blogDTO.content,
            category: blogDTO.categoryIds|| null,
            description: blogDTO.description,
            avatar: blogDTO.avatar,
            status: 'Draft',
            user: user,
        });
        await blog.save();
        if(blogDTO.tagIds!=null){
            await blog.addTags(blogDTO.tagIds);
            }
        await temporaryImageModel.findOneAndDelete({user: authenticatedUser.user._id})
        return blog;
    }
    static editBlog =  async (blogDTO, authenticatedUser,blogId) =>{    
        const blog = await Blog.findById(blogId);
        if(!blog) return null;
        blog.title = blogDTO.title|| blogDTO.title;
        blog.content = blogDTO.content;
        blog.category = blogDTO.categoryIds;
        blog.description = blogDTO.description;
        blog.avatar = blogDTO.avatar;
        blog.status = blogDTO.status;
        await blog.save();
        if(blogDTO.tagIds!=null){
            await blog.addTags(blogDTO.tagIds);
            }
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
        const category = await blog.category;                        
        let updateFields;
        if(category!=null){
        const isPermission = await category.users.some(user => user._id.equals());
        if((category.status === 'Publish' && isPermission) || (category.status === 'Private' && isPermission) || (category.status === 'Publish' && !isPermission))
                        updateFields = {
                            isPermission: true
                        }
                        if(category.status === 'Private' && !isPermission)
                        {
                            updateFields = {
                                isPermission: false
                            };
                        }
                    }else{  
                    updateFields = {
                        isPermission: true
                    };}
                    console.log(updateFields);
                    await Blog.findByIdAndUpdate(blog._id, updateFields);
        return Blog.findById(blogId);
    }
    static deleteBlogById = async (blogId,authenticatedUser) => {
        try {
            const blog = await Blog.findById(blogId);
            if(blog.user._id == authenticatedUser._id || authenticatedUser.roles === 'Admin'){
            const tagIds = blog.tags;

            await Tag.updateMany(
                { _id: { $in: tagIds } },
                { $inc: { sumBlog: -1 } }
            );
                const deletedBlog = await Blog.findOneAndDelete({ _id: blogId });
            
            return deletedBlog;}
            else{
                return 1;
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }
    static getAllBlogByUserId = async (authenticatedUsers)=> {
        const user = await User.findById(authenticatedUsers.user._id);
        if (!user) {
            return null;
        }
        const blog = await Blog.find({user: user._id});
        return blog;
    }
    static getBlogDraftByUser = async (authenticatedUser) =>{
        try {
        const draftBlogs = await Blog.find({ user: authenticatedUser._id, status: 'Draft' }).populate('tags')
        .populate('user')
        .populate('category').exec();
        const posts = await this.findAndUpdateLikeAndSave(draftBlogs,authenticatedUser._id)
        const posts2 = await this.findAndUpdatePermissions(posts,authenticatedUser._id)
        if (posts2.length === 0) {
            return null;
        }
        return posts2;
        } catch (error) {
        console.error("Error fetching most active posts:", error);
        return null;
        }
    }

    //////////////////////////////// Interaction with blog //////////////////////////////////////////////////////////////////
    static getUserLikesBlog(blogId){
        return Blog.findById(blogId).select('listUserLikes')
                                    .populate('listUserLikes');
    }
    









        ////////////////////////////////////////// List blog  //////////////////////////////////////////////////////////////////

        static findAndUpdateLikeAndSave = async (listBlog, userId) => {
            try {
                const promises = listBlog.map(async (blog, index) => {
                    const isUserInSavedBy = await blog.savedBy.some(user => user._id.equals(userId));
                    const isUserInListUserLikes = await blog.listUserLikes.some(user => user._id.equals(userId));
                    const updateFields = {
                        isSave: isUserInSavedBy || false,
                        isLiked: isUserInListUserLikes || false
                    };
                    await Blog.findByIdAndUpdate(blog._id, updateFields);
                });
                await Promise.all(promises);
                return listBlog;
            } catch (error) {
                console.error("Error updating blogs:", error);
                throw error;
            }
        }
        static findAndUpdatePermissions = async (listBlog, userId) =>{
            try {
                const promises = listBlog.map(async (blog, index) => {
                    const category = await blog.category;                        
                    let updateFields;
                    if(category!=null){
                        const isPermission = await category.users.some(user => user._id.equals(userId));
                        if((category.status === 'Publish' && isPermission) || (category.status === 'Private' && isPermission) || (category.status === 'Publish' && !isPermission))
                        updateFields = {
                            isPermission: true
                        }
                        if(category.status === 'Private' && !isPermission)
                        {
                            updateFields = {
                                isPermission: false
                            };
                        }
                    }else{  
                    updateFields = {
                        isPermission: true
                    };}
                    await Blog.findByIdAndUpdate(blog._id, updateFields);
                });
                await Promise.all(promises);
                return listBlog;
            } catch (error) {
                console.error("Error updating blogs:", error);
                throw error;
            }
        }
        static listBlogNew = async (authenticatedUser, index) => {
            const pageSize = 6;
            const skip = (index - 1) * pageSize;
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
            const posts2 = await this.findAndUpdatePermissions(posts,authenticatedUser.user._id)
            if (posts2.length === 0) {
                return null;
            }
            return posts2;
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
            const posts = await this.findAndUpdateLikeAndSave(query,authenticatedUser.user._id)
            const posts2 = await this.findAndUpdatePermissions(posts,authenticatedUser.user._id)
            if (posts2.length === 0) {
                    return null;
            }
            return posts2;
            } catch (error) {
            console.error("Error fetching most active posts:", error);
            return null;
            }
        };
        static listBlogDiscussions = async (authenticatedUser, index) => {
            const pageSize = 6;
            const skip = (index - 1) * pageSize;
            try {
            const query = await Blog.find({ status: 'Published' })
                .sort({ sumComment: -1, views: -1, updatedAt: -1 }) 
                .skip(skip)   
                .limit(pageSize) 
                .populate('tags') 
                .populate('category') 
                .exec();
            const posts = await this.findAndUpdateLikeAndSave(query,authenticatedUser.user._id)
            const posts2 = await this.findAndUpdatePermissions(posts,authenticatedUser.user._id)
            if (posts2.length === 0) {
                return null;
            }
            return posts2;
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
            const size = await this.sizeGetAllBlogByCategory(categoryId);
            console.log(size);
            try {
            const query = await Blog.find({ category: categoryId, status:'Published' })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(pageSize)
            .populate('tags')
            .populate('user')
            .populate('category')
            .exec();
            const posts = await this.findAndUpdateLikeAndSave(query,authenticatedUser.user._id)
            const posts2 = await this.findAndUpdatePermissions(posts,authenticatedUser.user._id)
            return {posts : posts2, size: size};
            } catch (error) {
            console.error("Error fetching most active posts:", error);
            return null;
            }
        }
        static sizeGetAllBlogByCategory = async(categoryId) =>{
            const countDocuments = await Blog.countDocuments({ category: categoryId });
            const totalPages = Math.ceil(countDocuments / 6);
            return totalPages;
        }
        static listBlogSaveByUser = async (userId)=>{
            try {
                const query = await Blog.find({ savedBy: userId._id })
                    .sort({ createdAt: -1 })
                    .populate('tags')
                    .populate('user')
                    .populate('category')
                    .exec();
                const posts = await this.findAndUpdateLikeAndSave(query,userId._id)
                const posts2 = await this.findAndUpdatePermissions(posts,userId._id)
                if (posts2.length === 0) {
                    return null;
                }
                return posts2;            
            } catch (error) {
                console.error("Error fetching most active posts:", error);
                return null;
            }
        }
        static listBlogByUserId = async (userId,authenticatedUser)=>{
            try {
                const query = await Blog.find({ user: userId , status: 'Published'})
                    .sort({ createdAt: -1 })
                    .populate('tags')
                    .populate('user')
                    .populate('category')
                    .exec();
                const posts = await this.findAndUpdateLikeAndSave(query,authenticatedUser._id)
                const posts2 = await this.findAndUpdatePermissions(posts,authenticatedUser._id)
                if (posts2.length === 0) {
                    return null;
                }
                return posts2;
            } catch (error) {
                console.error("Error fetching most active posts:", error);
                return null;
            }
        }
}

module.exports = BlogService;
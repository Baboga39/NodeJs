const Blog = require('../models/Blog/blogModel')
const User = require('../models/usermodel')
const temporaryImageModel = require('../models/Blog/temporaryImageModel');
const cloudinary = require('cloudinary').v2;

class BlogService{
    static createBlog =  async (blogDTO, authenticatedUser) =>{
        const user = await User.findById(authenticatedUser.user._id)
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
    static getBlogById(blogId){
        return Blog.findById(blogId);
    }
    static deleteBlogById(blogId){
        return Blog.findByIdAndDelete(blogId);
    }
}

module.exports = BlogService;
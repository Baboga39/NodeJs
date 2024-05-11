const Blog = require('../models/Blog/blogModel')
const User = require('../models/usermodel')
const Tag = require('../models/Blog/tagModel')
const temporaryImageModel = require('../models/Blog/temporaryImageModel');
const Category = require('../models/Blog/categoryModel');
const followModel = require('../models/followModel');
const Share = require('../models/Blog/shareModel');
const Notification= require('../models/notificationModel')
const reportBlogModel = require('../models/retportBlogModel');
const shareModel = require('../models/Blog/shareModel')
const commentService = require('../services/commentService')
const Access = require('../models/accessModel')

class BlogService{
    static createBlog =  async (blogDTO, authenticatedUser) =>{
        const user = await User.findById(authenticatedUser.user._id)
        if(blogDTO.categoryIds){
        const category = await Category.findById(blogDTO.categoryIds);
        if(!category)
        {
            return 1;
        }
        if(category.isAdmin.equals(user._id)){
            const blog = new Blog({
                title: blogDTO.title,
                content: blogDTO.content,
                category: blogDTO.categoryIds || null,
                description: blogDTO.description,
                avatar: blogDTO.avatar,
                user: user,
                isApproved: false
            });
            await blog.save();
            if(blogDTO.tagIds!=null){
            await blog.addTags(blogDTO.tagIds);
            }
            await temporaryImageModel.findOneAndDelete({user: authenticatedUser.user._id})
            user.totalBlog = user.totalBlog + 1;
            await user.save();
            return blog;
        }
        const blog = new Blog({
            title: blogDTO.title,
            content: blogDTO.content,
            category: blogDTO.categoryIds || null,
            description: blogDTO.description,
            avatar: blogDTO.avatar,
            user: user,
            isApproved: category.isApproved
        });
        await blog.save();
        if(blogDTO.tagIds!=null){
        await blog.addTags(blogDTO.tagIds);
        }
        await temporaryImageModel.findOneAndDelete({user: authenticatedUser.user._id})
        if(blog.isApproved===false){
            user.totalBlog = user.totalBlog + 1;
        }
        return blog;
    }
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
        user.totalBlog = user.totalBlog + 1;
        await user.save();
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
        const user = await User.findById(authenticatedUser.user._id)
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
            user.totalBlog = user.totalBlog + 1;
            await user.save();
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
    static deleteBlogById = async (blogId,authenticatedUser) => {
        try {
            const blog = await Blog.findById(blogId);
            await Notification.deleteMany({blog: blog._id})
            if(blog.user._id == authenticatedUser._id || authenticatedUser.roles === 'Admin'){
            const tagIds = blog.tags;

            await Tag.updateMany(
                { _id: { $in: tagIds } },
                { $inc: { sumBlog: -1 } }
            );
            const listReportBlog = await reportBlogModel.deleteMany({blogIsReported: blog._id});
            const listComment = blog.comments;
            for(const comment of listComment){
                await commentService.deleteComment(comment._id,authenticatedUser,blog._id);
            }
            const listShareBlog = await shareModel.find({listBlog: blog._id})
            const updatedShare = await Share.findOneAndUpdate(
                { listBlog: blogId },
                { $pull: { listBlog: blogId } }, 
                { new: true } // Trả về bản ghi Share đã được cập nhật
            );
            let user = await User.findById(blog.user._id);
            if(blog.status==='Published'){
                user.totalBlog = user.totalBlog - 1;
                await user.save();
            }
            const deletedBlog = await Blog.findOneAndDelete({ _id: blogId });
            return deletedBlog;}
            else{
                return 1;
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }
    static deleteBlogByIdAuto = async (blogId) => {
        try {
            const blog = await Blog.findById(blogId);
            await Notification.deleteMany({blog: blog._id})
            const tagIds = blog.tags;

            await Tag.updateMany(
                { _id: { $in: tagIds } },
                { $inc: { sumBlog: -1 } }
            );
            const listReportBlog = await reportBlogModel.deleteMany({blogIsReported: blog._id});
            const listComment = blog.comments;
            for(const comment of listComment){
                await commentService.deleteCommentAuto(comment._id,blog._id);
            }
            const listShareBlog = await shareModel.find({listBlog: blog._id})
            const updatedShare = await Share.findOneAndUpdate(
                { listBlog: blogId },
                { $pull: { listBlog: blogId } }, 
                { new: true } // Trả về bản ghi Share đã được cập nhật
            );
            let user = await User.findById(blog.user._id);
            if(blog.status==='Published'){
                user.totalBlog = user.totalBlog - 1;
                await user.save();
            }
            const deletedBlog = await Blog.findOneAndDelete({ _id: blogId });
            return deletedBlog;
        } catch (error) {
            throw new Error(error.message);
        }
    }
    static getAllBlogByUserId = async (authenticatedUsers)=> {
        const user = await User.findById(authenticatedUsers.user._id);
        if (!user) {
            return null;
        }
        const blog = await Blog.find({user: user._id, status: 'Published', isApproved:false});
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
                    if(category && category.users){
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
        static sizeAllBlogPublish= async ()=>{
            const countDocuments = await Blog.countDocuments({ status: 'Published',isApproved:false });
            const totalPages = Math.ceil(countDocuments / 6);
            return totalPages;
        }
        static listBlogNew = async (authenticatedUser, index) => {
            const pageSize = 6;
            const skip = (index - 1) * pageSize;
            try {
            const size = await this.sizeAllBlogPublish();
              const query = await Blog.find({ status: 'Published',isApproved:false }) // Tạo query
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
            return {posts : posts2, size: size};
            } catch (error) {
            return null;
            }
        };
        static getBlogById= async (blogId,authenticatedUser) =>{
            let blog = await Blog.findById(blogId);
            if(!blog) return null;
            blog.views++;
            blog.save();
            const result = [];
            result.push(blog);
            const posts = await this.findAndUpdateLikeAndSave(result,authenticatedUser.user._id)
            const posts2 = await this.findAndUpdatePermissions(posts,authenticatedUser.user._id);
            return result[0];
        }
        static listBlogPopularity = async (authenticatedUser, index) => {
            const pageSize = 6;
            const skip = (index - 1) * pageSize; // Số bài viết sẽ bỏ qua
            try {
            const size = await this.sizeAllBlogPublish();
            const query = await Blog.find({ status: 'Published',isApproved: false })
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
            return {posts : posts2, size: size};
            } catch (error) {
            console.error("Error fetching most active posts:", error);
            return null;
            }
        };
        static listBlogDiscussions = async (authenticatedUser, index) => {
            const pageSize = 6;
            const skip = (index - 1) * pageSize;
            try {
            const size = await this.sizeAllBlogPublish();
            const query = await Blog.find({ status: 'Published' ,isApproved: false})
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
            return {posts : posts2, size: size};
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
            const query = await Blog.find({ category: categoryId, status:'Published', isApproved: false})
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
        //Blog search
        static listBlogSearch = async (authenticatedUser, key)=>{
            try {
                const regex = new RegExp(key, 'i');
                const query = await Blog.find({
                    $and: [
                        {
                            $or: [
                                { title: regex },
                                { description: regex },
                                { content: regex }
                            ]
                        },
                        { isApproved: false },
                        {
                            status:'Published'
                        } // Điều kiện mới: isApproved phải là true
                    ]
                }).populate('tags')
                .populate('user')
                .populate('category')
                .sort({ updatedAt: -1 });
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
        static listBlogByUserId = async (userId,authenticatedUser)=>{
            try {
                const query = await Blog.find({ user: userId , status: 'Published',isApproved: false})
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
        static listBlogInFeed = async (authenticatedUser,pageIndex) =>{
        try{
            const access = new Access({
                user: authenticatedUser._id,
            })
            const today = new Date();
            today.setHours(0, 0, 0, 0); 
            const tomorrow = new Date(today);
            tomorrow.setDate(today.getDate() + 1); 
            const checkAccess = await Access.findOne({
                user: authenticatedUser._id,
                createdAt: { $gte: today, $lt: tomorrow }
            })
            if(!checkAccess){
                access.save();
            }
            const pageSize = 6;
            const startIndex = (pageIndex - 1) * pageSize; 
            const endIndex = pageIndex * pageSize; 
            const listBlog = [];
            const uniquePostIds = new Set();
            const categories = await Category.find({users: authenticatedUser._id})
            for (const category of categories) {
                const query = await Blog.find({ category: category._id, status: 'Published',isApproved: false})
                    .sort({ createdAt: -1 })
                    .populate('tags')
                    .populate('user')
                    .populate('category')
                    .exec();
                const posts = await this.findAndUpdateLikeAndSave(query,authenticatedUser._id)
                const posts2 = await this.findAndUpdatePermissions(posts,authenticatedUser._id)
                if (posts2.length>0) {
                    for (const post of posts2) {
                        if (!uniquePostIds.has(post._id)) { 
                            listBlog.push(post);
                            uniquePostIds.add(post._id);
                        }
                    }
            }
        }
        const follow = await followModel.findOne({user: authenticatedUser._id})
        if(follow){
            const users = follow.following;
            for (const user of users) {
                const query = await Blog.find({ user: user._id, status: 'Published',isApproved:false})
                                        .sort({ createdAt: -1 })
                                        .populate('tags')
                                        .populate('user')
                                        .populate('category')
                                        .exec()
                const posts = await this.findAndUpdateLikeAndSave(query,authenticatedUser._id)
                const posts2 = await this.findAndUpdatePermissions(posts,authenticatedUser._id)
                if (posts2.length>0) {
                    for (const post of posts2) {
                        if (!uniquePostIds.has(post._id)) {
                            listBlog.push(post);
                            uniquePostIds.add(post._id);
                        }
                    }
                }
            }   
            for (const user of users) {
                const shareBlog = await Share.findOne({ user: user._id})
                    if(shareBlog)
                    {
                    const blogFindShare = shareBlog.listBlog;
                    if(blogFindShare){
                    const posts = await this.findAndUpdateLikeAndSave(blogFindShare,authenticatedUser._id)
                    const posts2 = await this.findAndUpdatePermissions(posts,authenticatedUser._id)
                    if (posts2.length>0) {
                    const UserFind = await User.findById(user._id)
                    for (const post of posts2) {
                        post.isShare = true;
                        post.shareBy = UserFind;
                        listBlog.push(post);
                        }
                        }
                    }
                    continue;
                }
            }
        }
        // const query = await Blog.find({ user: authenticatedUser._id, status: 'Published'})
        //                             .sort({ createdAt: -1 }) 
        //                             .populate('tags')
        //                             .populate('user')
        //                             .populate('category')
        //                             .exec();
        //     const posts = await this.findAndUpdateLikeAndSave(query,authenticatedUser._id)
        //     const posts2 = await this.findAndUpdatePermissions(posts,authenticatedUser._id)
        //     if (posts2.length>0) {
        //         for (const post of posts2) {
        //             if (!uniquePostIds.has(post._id)) {
        //                 listBlog.push(post);
        //                 uniquePostIds.add(post._id);
        //             }
        //         }
        //     }
            listBlog.sort((a, b) => {
                if (a.createdAt > b.createdAt) {
                    return -1; 
                } else if (a.createdAt < b.createdAt) {
                    return 1;
                } else {
                    if (a.updatedAt > b.updatedAt) {
                        return -1;
                    } else if (a.updatedAt < b.updatedAt) {
                        return 1;
                    } else {
                        return 0;
                    }
                }
            });
        const size = Math.ceil(listBlog.length / 6);
        const paginatedPosts = listBlog.slice(startIndex, endIndex);
        return {size: size, posts: paginatedPosts};
    }
        catch (error) {
                console.error("Error fetching most active posts:", error);
                return null;
            }
        }
        static listBlogShareByUSer = async (authenticatedUser,userId)=>{
            try {
                const query = await Share.findOne({ user: userId})
                if(!query){
                    return 1;
                }
                let listBlog = query.listBlog;         
                let result = []
               for (const blog of listBlog) {
                if(blog)
                {
                    result.push(blog)
                }
               }
                const posts = await this.findAndUpdateLikeAndSave(result,authenticatedUser._id)
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
        static getAllBlog = async ()=>{
            try {
                const query = await Blog.find()
                    .sort({ createdAt: -1 })
                if(!query) return null;
                return query;
            } catch (error) {
                console.error("Error fetching most active posts:", error);
                return null;
            }
        }
}

module.exports = BlogService;
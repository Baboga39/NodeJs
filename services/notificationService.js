const Notification = require('../models/notificationModel')
const Blog = require('../models/Blog/blogModel')
const User = require('../models/usermodel')
const Category = require('../models/Blog/categoryModel')

class NotificationService{
    static notifyComment = async (blogId, userAuthentication)=>{
        const blog  = await Blog.findById(blogId)
        if(blog.user._id.equals(userAuthentication.id)){
            return 3;
        }
        const notificationFind = await Notification.findOne({
            sender: userAuthentication._id,
            blog: blogId,
            type: 'Comment',
            recipient: blog.user._id
        });
        if(notificationFind)
        {
            await notificationFind.deleteOne();
        }
        const notification = new Notification({
            sender: userAuthentication._id,
            blog: blogId,
            type: 'Comment',
            recipient: blog.user._id,
        });
        return notification.save();
    }
    static notifyFollow = async (userId, userAuthentication)=>{
        const user = await User.findById(userId);
        const userAuthenticated = await User.findById(userAuthentication);
        if(user._id.equals(userAuthenticated.id)){
            return 3;
        }
        const notificationFind = await Notification.findOne({
            sender: userAuthenticated._id,
            type: 'Follow',
            recipient: user._id,
        }
        )
        if(notificationFind)
        {
            await notificationFind.deleteOne();
        }
        const notification = new Notification({
            sender: userAuthenticated._id,
            type: 'Follow',
            recipient: user._id,
        });
        return notification.save();
    }
    static notifyLike = async (blogId, userId) =>{
        const blog = await Blog.findById(blogId);
        const user = await User.findById(userId);
        if(blog.user._id.equals(user.id)){
            return 3;
        }
        const notificationFind = await Notification.findOne({
            sender: user._id,
            blog: blogId,
            type: 'Like',   
            recipient: blog.user._id,
        })
        if(notificationFind)
        {
            await notificationFind.deleteOne();
        }
        const notification = new Notification({
            sender: user._id,
            blog: blogId,
            type: 'Like',   
            recipient: blog.user._id,
        });
        return notification.save();
    }
    static notifyInvite = async (userIds, userAuthentication, categoryId) => {
        const userAuthenticated = await User.findById(userAuthentication._id);
        const user = await User.findById(userIds);
        const category = await Category.findById(categoryId);
        const notification = await Notification.findOne({
            sender: userAuthenticated._id,
            category: category._id,
            type: 'Invite',
            recipient: user._id,
        })
        if(notification)
        {
            await notification.deleteOne();
        }
            return new Notification({
                sender: userAuthenticated._id,
                blog: null,
                category: category._id,
                type: 'Invite',
                recipient: user._id,
            }).save();
        ;
    }
    static listNotifyByUser = async (userId) =>{
        const user = await User.findById(userId);
        if(!user)  return 1;
        const notification = await Notification.find({recipient: user._id}).sort({ isRead: 1, createdAt: -1 });;
        return notification;
    }
    static notifyAccept = async (authenticatedUser, userId, categoryId) =>{
        const userAuthenticated = await User.findById(authenticatedUser);
        const category = await Category.findById(categoryId);
        const user = await User.findById(userId);
        if(category.isAdmin._id.equals(user.id)){
            return 5;
        }
        const notification = await Notification.findOne({
            sender: userAuthenticated._id,
            blog: null,
            category: category._id,
            type: 'Accept',
            recipient: user._id,
        })
        if(notification)
        {
            await notification.deleteOne();
        }
            return new Notification({
                sender: userAuthenticated._id,
                blog: null,
                category: category._id,
                type: 'Accept',
                recipient: user._id,
            }).save();
        ;
    }
    static checkIsRead = async (notifyId) =>{
        const notification = await Notification.findById(notifyId);
        if(!notification) return null;
        notification.isRead = true;
        await notification.save();
        return notification;
    }
    static listNotifyByType = async (type,user_id) =>{
        const notification = await Notification.find({type: type, recipient: user_id});
        return notification;
    }
}

module.exports = NotificationService;
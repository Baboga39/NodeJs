// controllers/userController.js
const userService = require('../services/UserService');
const bcryptjs = require('bcryptjs');
const User = require('../models/usermodel');
const AuthService = require('../services/authService');
const ProfileDTO = require('../dto/request/ProfileUserDTO')
const Service = require('../services/index')
const getUserInfo = async (req, res) => {
  try {
    const userId = req.query.userId;
    if (!userId){
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: 'User not found',
        result: null,
      });
    }
    const user = await userService.getUserInfo(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: 'User not found',
        result: null,
      });
    }
    return res.status(200).json({
      success: false,
      statusCode: 200,
      message: 'User information',
      result: user,
    });
  } catch (error) {
     return res.status(500).json({
      success: false,
      statusCode: 500,
      message: 'Internal server error',
      result: error.message,
    });
  }
};
const updatedUserInfo = async (req, res) => {
  try {
    const authenticatedUser = req.user;
    const inputProfileDTO = ProfileDTO.fromRequest(req.body);
    console.log(inputProfileDTO);
    const userUpdate= await userService.updateUserInfo(authenticatedUser, inputProfileDTO,res)
  } catch (error) {
    console.log('Error updating user')
    console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: 'Internal server error',
      result: error.message,
    });
  }
}
const updateAvatar = async (req,res) => { 
  try {
    const authenticatedUser = req.user;
    const fileData  = req.file;
    const userUpdate= await userService.uploadAvatar(authenticatedUser, fileData)
    console.log('Updated Avatar successfully')
    console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Change avatar updated successfully',
      result: userUpdate,
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
const removeAvatar= async(req,res) =>{
  try {
    const authenticatedUser = req.user;
    const userUpdate= await userService.removeAvatar(authenticatedUser)
    console.log('Remove Avatar successfully')
    console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Remove avatar updated successfully',
      result: null,
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

const newPassword = async (req, res) => {
  const authenticatedUser = req.user;
  const { oldPassword, password, confirmPassword } = req.body;
  const email = authenticatedUser.user.email;
  if (!oldPassword || !password || !confirmPassword) {
    console.log('Not found information')
    console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: 'Please enter full information',
      result: null,
    });
  }

  if (password!== confirmPassword) {
    console.log('Password do not match')
    console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: 'Passwords do not match. Try again',
      result: null,
    });
  }
  const user = await User.findOne({email});
  const isOldPasswordValid = await bcryptjs.compare(oldPassword,String(user.password).trim());
  if (!isOldPasswordValid) {
    console.log('Old password do not match')
    console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: 'Old password do not match. Try again',
      result: null,
    });
  }
  if (!user) {
    console.log('Not found user in database')
    console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(401).json({
      success: false,
      statusCode: 400,
      message: 'Not found. Please try again',
      result: null,
    });
  }
  await AuthService.resetPassword(user, password)
  console.log('Reset password successfully')
  console.log('--------------------------------------------------------------------------------------------------------------------')
  return res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Reset password successfully',
    result: null,
  });
} 

//--------------------------------------------------------INTERACT WITH BLOG --------------------------------------------------------

const likeBlog = async (req, res) => {
  const authenticatedUser = req.user;
  const blogId = req.params.blogId;
  if (blogId==':blogId') {
    console.log('BlogId is missing');
    console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: 'BlogId is missing',
      result: null,
    });
  }
  try {
    const blog = await Service.userService.likeBlog(authenticatedUser.user, blogId);
    if (!blog) {
      console.log('Blog not found');
      console.log('--------------------------------------------------------------------------------------------------------------------')
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: 'Blog not found',
        result: null,
      });
    }
    if(!blog.isLiked)
    {
      console.log('--------------------------------------------------------------------------------------------------------------------')
      console.log('Dislike Blog successfully');
      return res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Dislike Blog successfully',
        result: blog,
      });
    }
    await Service.notificationService.notifyLike(blog._id,authenticatedUser.user._id)
    console.log('--------------------------------------------------------------------------------------------------------------------')
    console.log('Like Blog successfully');
    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Like Blog successfully',
      result: blog,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: 'MongoDB Error: ' + error.message,
      result: null,
    });
  }
};
const saveBlog = async (req, res) => {
  const authenticatedUser = req.user;
  const blogId = req.params.blogId;
  if (blogId==':blogId') {
    console.log('BlogId is missing');
    console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: 'BlogId is missing',
      result: null,
    });
  }
  try {
    const blog = await Service.userService.saveBlog(authenticatedUser.user, blogId);
    if (!blog) {
      console.log('Blog not found');
      console.log('--------------------------------------------------------------------------------------------------------------------')
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: 'Blog not found',
        result: null,
      });
    }
    if(!blog.isSave)
    {
      console.log('--------------------------------------------------------------------------------------------------------------------')
      console.log('Unsave Blog successfully');
      return res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Unsave Blog successfully',
        result: blog,
      });
    }
    console.log('--------------------------------------------------------------------------------------------------------------------')
    console.log('Save Blog successfully');
    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Save Blog successfully',
      result: blog,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: 'MongoDB Error: ' + error.message,
      result: null,
    });
  }
};
const addComment = async (req, res) => {
 try {
  const authenticatedUser = req.user;
  const {blogId,replyToCommentId,content} = req.body
  if (!blogId) {
    console.log('BlogId is missing');
    console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: 'BlogId is missing',
      result: null,
    });
  }
  if(!content) {
    console.log('Content is missing');
    console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: 'Content is missing',  
      result: null,
    });
  }
  const comment = await Service.commentService.addComment(blogId,authenticatedUser.user._id,content,replyToCommentId);
  if(comment == null){
    console.log('Not found Parent Category ID');
    console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: 'Not found Parent Category ID',
      result: null,
    });
  }
  if(comment == 1){
    console.log('Not found blog');
    console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: 'Not found blog',
      result: null,
    });
  }
  await Service.notificationService.notifyComment(blogId,authenticatedUser.user)
  console.log('Add Comment Success');
  console.log('--------------------------------------------------------------------------------------------------------------------')
  return res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Add Comment Success',
    result: comment,
  });
 } catch (error) {
  console.log('Server Internal Error');
  console.log('--------------------------------------------------------------------------------------------------------------------')
  return res.status(500).json({
    success: true,
    statusCode: 500,
    message: 'Server Internal Error',
    result: error.message,
  });
 }
};
const deleteComment = async (req, res) => {
  try {
    const authenticatedUser = req.user;
    const {commentId,blogId} = req.body;
    const comment = await Service.commentService.deleteComment(commentId,authenticatedUser.user._id,blogId);
    if(comment===1)
    {
      console.log('Not found comment');
      console.log('--------------------------------------------------------------------------------------------------------------------')
      return res.status(400).json({
        success:false,
        statusCode: 400,
        message: 'Not found comment',
        result: null,
      });
    }
    if(comment===2)
    {
      console.log('Not found blog');
      console.log('--------------------------------------------------------------------------------------------------------------------')
      return res.status(400).json({
        success:false,
        statusCode: 400,
        message: 'Not found blog',
        result: null,
      });
    }
    if(comment===3){
      console.log('User do not have permission');
      console.log('--------------------------------------------------------------------------------------------------------------------')
      return res.status(401).json({
        success:false,
        statusCode: 401,
        message: 'User do not have permission',
        result: null,
      });
    }
    console.log('Delete comment successfully');
    console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(200).json({
      success:true,
      statusCode: 200,
      message: 'Delete comment successfully',
      result: null,
    });
  } catch (error) {
    console.log('Server Internal Error');
    console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: 'Server Internal Error',
      result: error.message,
    });
  }
};
const editComment = async (req, res) => {
  try {
    const authenticatedUser = req.user;
    const {commentId,content} = req.body;
    const comment = await Service.commentService.editComment(commentId,authenticatedUser.user._id,content);
    if(comment===1)
    {
      console.log('Not found comment');
      console.log('--------------------------------------------------------------------------------------------------------------------')
      return res.status(400).json({
        success:false,
        statusCode: 400,
        message: 'Not found comment',
        result: null,
      });
    }
    if(comment===3){
      console.log('User do not have permission');
      console.log('--------------------------------------------------------------------------------------------------------------------')
      return res.status(401).json({
        success:false,
        statusCode: 401,
        message: 'User do not have permission',
        result: null,
      });
    }
    console.log('Edit comment successfully');
    console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(200).json({
      success:true,
      statusCode: 200,
      message: 'Edit comment successfully',
      result: comment,
    });
  } catch (error) {
    console.log('Server Internal Error');
    console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(500).json({
      success: true,
      statusCode: 500,
      message: 'Server Internal Error',
      result: error.message,
    });
  }
};
const shareBlog = async (req, res) => {
  try {
  const user = req.user;
  const blogId = req.params.blogId;
  if(!blogId) {
    console.log('BlogId is missing');
    console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: 'BlogId is missing',
      result: null,
    });
  }
  const share = await Service.userService.shareBlog(user.user,blogId);
  if(share === null) {
    console.log('Not found blog');
    console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: 'Not found blog',
      result: null,
    });
  }
  if(share===2)
  {
    console.log('User have been share this blog');
    console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(200).json({
      success:true,
      statusCode: 200,
      message: 'User have been share this blog',
      result: null,
    });
  }
  console.log('Share blog Success');
  console.log('--------------------------------------------------------------------------------------------------------------------')
  return res.status(200).json({
    success:true,
    statusCode: 200,
    message: 'Share blog Success',
    result: share,
  });
  }
  catch (error) {
    console.log('Server Internal Error');
    console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(500).json({
      success: true,
      statusCode: 500,
      message: 'Server Internal Error',
      result: error.message,
    });
  }
};



//--------------------------------------------------------INTERACT WITH USER --------------------------------------------------------
const followUser = async (req, res) => {
  const authenticatedUser =req.user;
  const userId = req.params.userId;
  if (userId==':userId') {
    console.log('UserId is missing');
    console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: 'UserId is missing',
      result: null,
    });
  }
  const follow = await Service.userService.followUser(userId,authenticatedUser.user)

  if(follow===1){
    console.log('Not found User');
    console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(400).json({
      success:false,
      statusCode: 400,
      message: 'Not found User',
      result: null,
    });
  }
  if(follow ===2)
  {
    console.log('Unfollow User Successfully');
    console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(200).json({
      success:true,
      statusCode: 200,
      message: 'Unfollow User Successfully',
      result: null,
    });
  }
    await Service.notificationService.notifyFollow(userId, authenticatedUser.user._id)
    console.log('Follow User Successfully');
    console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(200).json({
      success:true,
      statusCode: 200,
      message: 'Follow User Successfully',
      result: follow,
  })
}
const listUserFollower = async (req,res) => {
  const authenticatedUser = req.user;
  const userId = req.params.userId;
  if (userId==':userId') {
    console.log('UserId is missing');
    console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: 'UserId is missing',
      result: null,
    });
  }
  const listUserFollower = await Service.userService.listUserFollower(userId,authenticatedUser.user);
  if(listUserFollower===1){
    console.log('List User Follower');
    console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(200).json({
      success:true,
      statusCode: 200,
      message: 'List User Follower',
      result: null,
    });
  }
  console.log('List User Follower');
  console.log('--------------------------------------------------------------------------------------------------------------------')
  return res.status(200).json({
    success:true,
    statusCode: 200,
    message: 'List User Follower',
    result: listUserFollower,
  });
}
const listUserFollowing = async (req,res) => {
  const authenticatedUser = req.user;
  const userId = req.params.userId;
  if (userId==':userId') {
    console.log('UserId is missing');
    console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: 'UserId is missing',
      result: null,
    });
  }
  const listUserFollower = await Service.userService.listUserFollowing(userId,authenticatedUser.user);
  if(listUserFollower===1){
    console.log('List user following');
    console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(200).json({
      success:true,
      statusCode: 200,
      message: 'List user following',
      result: null,
    });
  }
  console.log('List User Following');
  console.log('--------------------------------------------------------------------------------------------------------------------')
  return res.status(200).json({
    success:true,
    statusCode: 200,
    message: 'List User Following',
    result: listUserFollower,
  });
}
const getWallUsers = async (req, res) => {
  const userId = req.params.userId;
  const authenticatedUser = req.user;
  if (userId==':userId') {
    console.log('UserId is missing');
    console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: 'UserId is missing',
      result: null,
    });
  }
  const wallUsers = await Service.userService.getWallUsers(userId, authenticatedUser.user);
  if(wallUsers===1){
    console.log('Not found User');
    console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(400).json({
      success:false,
      statusCode: 400,
      message: 'Not found  User',
      result: null,
    });
  }
  console.log('Get Wall Users');
  console.log('--------------------------------------------------------------------------------------------------------------------')
  return res.status(200).json({
    success:true,
    statusCode: 200,
    message: 'Get Wall Users',
    result: wallUsers,
  });
}
const listBlogByUserId = async (req, res) => {
  const userId = req.params.userId;
  const authenticatedUser = req.user;
  const listBlogByUserId = await Service.blogService.listBlogByUserId(userId, authenticatedUser.user);
  if(!listBlogByUserId || listBlogByUserId.length === 0) {
    console.log('Get Blog By Users Successfully');
    console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(200).json({
      success:true,
      statusCode: 200,
      message: 'Get Blog By Users Successfully',
      result: null,
    });
  }
  console.log('Get Blog By Users Successfully');
  console.log('--------------------------------------------------------------------------------------------------------------------')
  return res.status(200).json({
    success:true,
    statusCode: 200,
    message: 'Get Blog By Users Successfully',
    result: listBlogByUserId,
  });
}
const listNotifyByUser = async (req, res) => {
  const authenticatedUser = req.user;
  const listNotifyByUser = await Service.notificationService.listNotifyByUser(authenticatedUser.user._id);
  if(listNotifyByUser===1){
    console.log('Not found User');
    console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(400).json({
      success:false,
      statusCode: 400,
      message: 'Not found Entity User',
      result: null,
    });
  }
  if(listNotifyByUser.length===0){
    console.log('List Notify by User');
    console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(200).json({
      success:true,
      statusCode: 200,
      message: 'List Notify by User',
      result: null,
    });
  }
  console.log('List Notify by User');
  console.log('--------------------------------------------------------------------------------------------------------------------')
  return res.status(200).json({
    success:true,
    statusCode: 200,
    message: 'List Notify by User',
    result: listNotifyByUser,
  });
}
const listNotifyByType = async (req, res) => {
  try{
  const authenticatedUser = req.user;
  const type = req.params.type;  
  const listNotifyByUser = await Service.notificationService.listNotifyByType(type,authenticatedUser.user._id);
  if(listNotifyByUser.length===0){
    console.log('List Notify by User');
    console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(200).json({
      success:true,
      statusCode: 200,
      message: 'List Notify by User',
      result: null,
    });
  }
  console.log('List Notify by User');
  console.log('--------------------------------------------------------------------------------------------------------------------')
  return res.status(200).json({
    success:true,
    statusCode: 200,
    message: 'List Notify by User',
    result: listNotifyByUser,
  });
  }catch(error){
    console.log('Internal Server Error');
    console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(500).json({
      success:false,
      statusCode: 500,
      message: 'Internal Server Error',
      result: error.message,
    });
  }
}
const checkIsRead = async (req, res) => {
  const notifyId = req.params.notifyId;
  const notification = await Service.notificationService.checkIsRead(notifyId)
  if(!notifyId){
  console.log('Not found notification');
  console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(400).json({
      success:true,
      statusCode: 400,
      message: 'Not found notification',
      result: null,
    });
  }
  console.log('Check is read success');
  console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(200).json({
      success:true,
      statusCode: 200,
      message: 'Check is read success',
      result: notification,
    });
};
const listFriends = async (req, res) => {
  const authenticatedUser = req.user;
  const listFriends = await Service.userService.listFriend(authenticatedUser.user._id);
  if(listFriends===null) {
    console.log('List Friends');
    console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(200).json({
      success:true,
      statusCode: 200,
      message: 'List Friends',
      result: null,
    });
  }

  console.log('List Friends');
  console.log('--------------------------------------------------------------------------------------------------------------------')
  return res.status(200).json({
    success:true,
    statusCode: 200,
    message: 'List Friends',
    result: listFriends,
  });
}
//--------------------------------------------------------Report  --------------------------------------------------------
const reportUser = async (req, res) => {
  const authenticatedUser = req.user;
  const {userId, message, reason} = req.body;
  if(!reason)
  {
    console.log('Reason is required');
    console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(400).json({
      success:false,
      statusCode: 400,
      message: 'Reason is required',
      result: null,
    });
  }
  const reportUser = await Service.reportService.reportUser(userId,authenticatedUser.user,message,reason);
  if(reportUser===3)
  {
    console.log('Reason not found');
    console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(400).json({
      success:false,
      statusCode: 400,
      message: 'Reason not found',
      result: null,
    });
  }
  if(reportUser===0){
    console.log('Not found User');
    console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(400).json({
      success:false,
      statusCode: 400,
      message: 'Not found User',
      result: null,
    });
  }
  if(reportUser===2)
  {
    console.log('You have been reported this user');
    console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(200).json({
      success:true,
      statusCode: 200,
      message: 'You have been reported this user',
      result: null,
    });
  }
  console.log('Report User Successfully');
  console.log('--------------------------------------------------------------------------------------------------------------------')
  return res.status(200).json({
    success:true,
    statusCode: 200,
    message: 'Report User Successfully',
    result: reportUser,
  });
}
const reportBlog = async (req, res) => {
  const authenticatedUser = req.user;
  const {blogId, message,reason} = req.body;
  if(!reason)
  {
    console.log('Reason is required');
    console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(400).json({
      success:false,
      statusCode: 400,
      message: 'Reason is required',
      result: null,
    });
  }
  const reportBlog = await Service.reportService.reportBlog(blogId,authenticatedUser.user,message,reason);
  if(reportUser===3)
  {
    console.log('Reason not found');
    console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(400).json({
      success:false,
      statusCode: 400,
      message: 'Reason not found',
      result: null,
    });
  }
  if(reportBlog===0){
    console.log('Not found Blog');
    console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(400).json({
      success:false,
      statusCode: 400,
      message: 'Not found Blog',
      result: null,
    });
  }
  if(reportBlog===2)
  {
    console.log('You have been reported this blog');
    console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(200).json({
      success:true,
      statusCode: 200,
      message: 'You have been reported this blog',
      result: null,
    });
  }
  console.log('Report User');
  console.log('--------------------------------------------------------------------------------------------------------------------')
  return res.status(200).json({
    success:true,
    statusCode: 200,
    message: 'Report Blog Successfully',
    result: reportBlog,
  });
}
const reportTag = async (req, res) => {
  const authenticatedUser = req.user;
  const {tagId, message,reason} = req.body;
  if(!reason)
  {
    console.log('Reason is required');
    console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(400).json({
      success:false,
      statusCode: 400,
      message: 'Reason is required',
      result: null,
    });
  }
  const reportTag = await Service.reportService.reportTag(tagId,authenticatedUser.user,message,reason);
  if(reportUser===3)
  {
    console.log('Reason not found');
    console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(400).json({
      success:false,
      statusCode: 400,
      message: 'Reason not found',
      result: null,
    });
  }
  if(reportTag===0){
    console.log('Not found Tag');
    console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(400).json({
      success:false,
      statusCode: 400,
      message: 'Not found Tag',
      result: null,
    });
  }
  if(reportTag===2)
  {
    console.log('You have been reported this tag');
    console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(200).json({
      success:true,
      statusCode: 200,
      message: 'You have been reported this tag',
      result: null,
    });
  }
  console.log('Report User');
  console.log('--------------------------------------------------------------------------------------------------------------------')
  return res.status(200).json({
    success:true,
    statusCode: 200,
    message: 'Report tag Successfully',
    result: reportTag,
  });
}
const reportComment = async (req, res) => {
  const authenticatedUser = req.user;
  const {commentId, message,reason} = req.body;
  if(!reason)
  {
    console.log('Reason is required');
    console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(400).json({
      success:false,
      statusCode: 400,
      message: 'Reason is required',
      result: null,
    });
  }
  const reportTag = await Service.reportService.reportComment(commentId,authenticatedUser.user,message,reason);
  if(reportTag===3)
  {
    console.log('Reason not found');
    console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(400).json({
      success:false,
      statusCode: 400,
      message: 'Reason not found',
      result: null,
    });
  }
  if(reportTag===0){
    console.log('Not found Comment');
    console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(400).json({
      success:false,
      statusCode: 400,
      message: 'Not found Comment',
      result: null,
    });
  }
  if(reportTag===2)
  {
    console.log('You have been reported this comment');
    console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(200).json({
      success:true,
      statusCode: 200,
      message: 'You have been reported this comment',
      result: null,
    });
  }
  console.log('Report User');
  console.log('--------------------------------------------------------------------------------------------------------------------')
  return res.status(200).json({
    success:true,
    statusCode: 200,
    message: 'Report cpmment Successfully',
    result: reportTag,
  });
}
const getAllReportTypes = async (req, res) =>{
  const reportTypes = await Service.reportService.getAllReportType();
  console.log('All Report Types');
  console.log('--------------------------------------------------------------------------------------------------------------------')
  return res.status(200).json({
    success:true,
    statusCode: 200,
    message: 'All Report Types',
    result: reportTypes,
  });
}





//--------------------------------------------------------Chat  --------------------------------------------------------
const groupChat = async (req, res) => {
  const authenticatedUser = req.user;
  const {chatName,userIds} = req.body;
  const groupChat = await Service.chatService.groupChat(authenticatedUser.user,chatName,userIds);
  if(groupChat==null)
  {
    console.log('Not found User');
    console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(400).json({
      success:false,
      statusCode: 400,
      message: 'Not found User',
      result: null,
    });
  }
  console.log('Group Chat');
  console.log('--------------------------------------------------------------------------------------------------------------------')
  return res.status(200).json({
    success:true,
    statusCode: 200,
    message: 'Group Chat',
    result: groupChat
  });
}
const singleChat = async (req, res) => {
  const authenticatedUser = req.user;
  const userId = req.body.userId;
  const singleChat = await Service.chatService.singleChat(authenticatedUser.user,userId);
  if(singleChat==null)
  {
    console.log('Not found User');
    console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(400).json({
      success:false,
      statusCode: 400,
      message: 'Not found User',
      result: null,
    });
  }
  console.log('Single Chat');
  console.log('--------------------------------------------------------------------------------------------------------------------')
  return res.status(200).json({
    success:true,
    statusCode: 200,
    message: 'Single Chat',
    result: singleChat,
  });
}
const findChatById = async (req, res) => {
  const chatId = req.params.chatId;
  if(!chatId)
  {
    console.log('Chat Id is required');
    console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(400).json({
      success:false,
      statusCode: 400,
      message: 'Chat Id is required',
      result: null,
    });
  }
  const chat = await Service.chatService.findById(chatId);
  if(chat ===null)
  {
    console.log('Not found Chat');
    console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(400).json({
      success:false,
      statusCode: 400,
      message: 'Not found Chat',
      result: null,
    });
  }
  console.log('Chat By Id');
  console.log('--------------------------------------------------------------------------------------------------------------------')
  return res.status(200).json({
    success:true,
    statusCode: 200,
    message: 'Chat By Id',
    result: chat,
  });
}
const addUserToGroup = async (req, res) =>{
  try {
    const authenticatedUser = req.user;
    const {userIds,chatId} = req.body;
    if(!chatId){
      console.log('Chat Id is required');
      console.log('--------------------------------------------------------------------------------------------------------------------')
      return res.status(400).json({
        success:false,
        statusCode: 400,
        message: 'Chat Id is required',
        result: null,
      });
    }
    if(!userIds)
    {
      console.log('User Id is required');
      console.log('--------------------------------------------------------------------------------------------------------------------')
      return res.status(400).json({
        success:false,
        statusCode: 400,
        message: 'User Id is required',
        result: null,
      });
    }
    const addUserToGroup = await Service.chatService.addUserToGroup(authenticatedUser.user,userIds,chatId);
    if(addUserToGroup===3)
    {
      console.log('You do not have permission to add users to group');
      console.log('--------------------------------------------------------------------------------------------------------------------')
      return res.status(401).json({
        success:false,
        statusCode: 401,
        message: 'You do not have permission to add users to group',
        result: null,
      });
    }
    if(addUserToGroup==null)
    {
      console.log('Not found User');
      console.log('--------------------------------------------------------------------------------------------------------------------')
      return res.status(400).json({
        success:false,
        statusCode: 400,
        message: 'Not found User',
        result: null,
      });
    }
    if(addUserToGroup === 1)
    {
      console.log('Not found Chat');
      console.log('--------------------------------------------------------------------------------------------------------------------')
      return res.status(400).json({
        success:false,
        statusCode: 400,
        message: 'Not found Chat',
        result: null,
      });
    }
    console.log('Add User To Group Successfully');
    console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(200).json({
      success:true,
      statusCode: 200,
      message: 'Add User To Group Successfully',
      result: addUserToGroup,
    });

  } 
  catch (error) {
    console.log('Server Internal Error');
    console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: 'Server Internal Error',
      result: error.message,
    });
  }
}
const removeUserToGroup = async (req, res) =>{
  try {
    const authenticatedUser = req.user;
    const {userIds,chatId} = req.body;
    if(!chatId){
      console.log('Chat Id is required');
      console.log('--------------------------------------------------------------------------------------------------------------------')
      return res.status(400).json({
        success:false,
        statusCode: 400,
        message: 'Chat Id is required',
        result: null,
      });
    }
    if(!userIds)
    {
      console.log('User Id is required');
      console.log('--------------------------------------------------------------------------------------------------------------------')
      return res.status(400).json({
        success:false,
        statusCode: 400,
        message: 'User Id is required',
        result: null,
      });
    }
    const addUserToGroup = await Service.chatService.removeUserFromGroup(authenticatedUser.user,userIds,chatId);
    if(addUserToGroup===3)
    {
      console.log('You do not have permission to remove users to group');
      console.log('--------------------------------------------------------------------------------------------------------------------')
      return res.status(401).json({
        success:false,
        statusCode: 401,
        message: 'You do not have permission to remove users to group',
        result: null,
      });
    }
    if(addUserToGroup==null)
    {
      console.log('Not found User');
      console.log('--------------------------------------------------------------------------------------------------------------------')
      return res.status(400).json({
        success:false,
        statusCode: 400,
        message: 'Not found User',
        result: null,
      });
    }
    if(addUserToGroup === 1)
    {
      console.log('Not found Chat');
      console.log('--------------------------------------------------------------------------------------------------------------------')
      return res.status(400).json({
        success:false,
        statusCode: 400,
        message: 'Not found Chat',
        result: null,
      });
    }
    console.log('Remove User To Group Successfully');
    console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(200).json({
      success:true,
      statusCode: 200,
      message: 'Remove User To Group Successfully',
      result: addUserToGroup,
    });

  } 
  catch (error) {
    console.log('Server Internal Error');
    console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: 'Server Internal Error',
      result: error.message,
    });
  }
}
const leaveGroup = async (req, res) =>{
  try {
    const authenticatedUser = req.user;
    const {chatId} = req.body;
    if(!chatId){
      console.log('Chat Id is required');
      console.log('--------------------------------------------------------------------------------------------------------------------')
      return res.status(400).json({
        success:false,
        statusCode: 400,
        message: 'Chat Id is required',
        result: null,
      });
    }
    const leaveGroup = await Service.chatService.leaveGroup(authenticatedUser.user,chatId);
    if(leaveGroup === 1)
    {
      console.log('Not found Chat');
      console.log('--------------------------------------------------------------------------------------------------------------------')
      return res.status(400).json({
        success:false,
        statusCode: 400,
        message: 'Not found Chat',
        result: null,
      });
    }
    console.log('Leave Group Successfully');
    console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(200).json({
      success:true,
      statusCode: 200,
      message: 'Leave Group Successfully',
      result: addUserToGroup,
    });

  } 
  catch (error) {
    console.log('Server Internal Error');
    console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: 'Server Internal Error',
      result: error.message,
    });
  }
}
const listChatUsers = async (req, res) =>{
  try {
    const authenticatedUser = req.user;
    const listChat = await Service.chatService.listChatUsers(authenticatedUser.user);
    if(listChat===null)
    {
      console.log('List Chat By User');
      console.log('--------------------------------------------------------------------------------------------------------------------')
      return res.status(200).json({
        success:true,
        statusCode: 200,
        message: 'List Chat By User',
        result: null,
      });
    }
    console.log('List Chat By User');
    console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(200).json({
      success:true,
      statusCode: 200,
      message: 'List Chat By User',
      result: listChat,
    });
  } catch (error) {
    console.log('Server Internal Error');
    console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: 'Server Internal Error',
      result: error.message,
    });
  }
}
const checkIsReadChat = async (req, res) => {
  const chatId = req.body.chatId;
  const authenticated = req.user;
  if(!chatId) {
    console.log('Chat Id is required');
    console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(400).json({
      success:false,
      statusCode: 400,
      message: 'Chat Id is required',
      result: null,
    });
  }
  const checkIsRead = await Service.chatService.checkIsReadChat(authenticated.user,chatId);
  console.log('Check is Read Success');
  console.log('--------------------------------------------------------------------------------------------------------------------')
  return res.status(200).json({
    success:true,
    statusCode: 200,
    message: 'Check is Read Success',
    result: checkIsRead,
  });
}
const listChatUsersIsWait = async (req, res) =>{
  try {
    const authenticatedUser = req.user;
    const listChat = await Service.chatService.listChatUsersIsWait(authenticatedUser.user);
    if(listChat===null)
    {
      console.log('List Chat By User');
      console.log('--------------------------------------------------------------------------------------------------------------------')
      return res.status(200).json({
        success:true,
        statusCode: 200,
        message: 'List Chat By User',
        result: null,
      });
    }
    console.log('List Chat By User');
    console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(200).json({
      success:true,
      statusCode: 200,
      message: 'List Chat By User',
      result: listChat,
    });
  } catch (error) {
    console.log('Server Internal Error');
    console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: 'Server Internal Error',
      result: error.message,
    });
  }
}
const deleteChatByUser = async (req, res) => {
  try {
    const authenticatedUser = req.user;
    const chatId = req.params.chatId;
    if(!chatId) {
      console.log('Chat Id is required');
      console.log('--------------------------------------------------------------------------------------------------------------------')
      return res.status(400).json({
        success:false,
        statusCode: 400,
        message: 'Chat Id is required',
        result: null,
      });
    }
    const deleteChat = await Service.chatService.deleteChatByUser(authenticatedUser.user, chatId);
    if(deleteChat===null) {
      console.log('Not found Chat');
      console.log('--------------------------------------------------------------------------------------------------------------------')
      return res.status(400).json({
        success:false,
        statusCode: 400,
        message: 'Not found Chat',
        result: null,
      });
    }
    if(deleteChat===3)
    {
      console.log('Not found User');
      console.log('--------------------------------------------------------------------------------------------------------------------')
      return res.status(400).json({
        success:false,
        statusCode: 400,
        message: 'Not found User',
        result: null,
      });
    }
    if(deleteChat===5) {
      console.log('You do not have permission to delete chat');
      console.log('--------------------------------------------------------------------------------------------------------------------')
      return res.status(401).json({
        success:false,
        statusCode: 401,
        message: 'You do not have permission to delete chat',
        result: null,
      });
    }
    if(deleteChat===2) {
      console.log('Delete Group Successful');
      console.log('--------------------------------------------------------------------------------------------------------------------')
      return res.status(200).json({
        success:true,
        statusCode: 200,
        message: 'Delete Group Successful',
        result: null,
      });
    }
      console.log('Delete Chat Successful');
      console.log('--------------------------------------------------------------------------------------------------------------------')
      return res.status(200).json({
        success:true,
        statusCode: 200,
        message: 'Delete Chat Successful',
        result: null,
      });
  } catch (error) {
    console.log('Server Internal Error');
    console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: 'Server Internal Error',
      result: error.message,
    });
  }
}
const sendMessage = async (req, res) => {
  try{
    const {message, chatId,type} = req.body;
    const authenticatedUser = req.user;
    if(!message)
    {
      console.log('Message is required');
      console.log('--------------------------------------------------------------------------------------------------------------------')
      return res.status(400).json({
        success:false,
        statusCode: 400,
        message: 'Message is required',
        result: null,
      });
    }
    const sendMessage = await Service.chatService.sendMessage(authenticatedUser.user,message,chatId,type);
    if(sendMessage===null)
    {
      console.log('Not found Chat');
      console.log('--------------------------------------------------------------------------------------------------------------------')
      return res.status(400).json({
        success:false,
        statusCode: 400,
        message: 'Not found Chat',
        result: null,
      });
    }
    await Service.notificationService.notifyChat(sendMessage,authenticatedUser.user)
    console.log('Send message success');
    console.log('--------------------------------------------------------------------------------------------------------------------')
      return res.status(200).json({
        success:true,
        statusCode: 200,
        message: 'Send message success',
        result: sendMessage
      });
  }
  catch (error) {
    console.log('Server Internal Error');
    console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: 'Server Internal Error',
      result: error.message,
    });
  }
}
const getAllMessageByChatId = async (req,res) =>{
  try {
    const chatId = req.params.chatId;
    const authenticatedUser = req.user;
    const listMessage = await Service.chatService.getAllMessageInChat(authenticatedUser.user,chatId);
    console.log('List message in chat');
    console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'List message in chat',
      result: listMessage,
    });
  } catch (error) {
    console.log('Server Internal Error');
    console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: 'Server Internal Error',
      result: error.message,
    });
  }
}
const deleteMessage = async (req, res) => {
 try {
  const messageId = req.params.messageId;
  const authenticatedUser = req.user;
  const deleteMessage =  await Service.chatService.deleteMessage(messageId,authenticatedUser.user);
  if(deleteMessage===null) 
  {
    console.log('Not found Message');
    console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(400).json({
      success:false,
      statusCode: 400,
      message: 'Not found Message',
      result: null,
    });
  }
  if(deleteMessage===1)
  {
    console.log('You do not have permission to delete message');
    console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(401).json({
      success:false,
      statusCode: 401,
      message: 'You do not have permission to delete message',
      result: null,
    });
  }
  console.log('Delete message success');
  console.log('--------------------------------------------------------------------------------------------------------------------')
  return res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Delete message success',
    result: null,
  });
 } catch (error) {
  console.log('Server Internal Error');
  console.log('--------------------------------------------------------------------------------------------------------------------')
  return res.status(500).json({
    success: false,
    statusCode: 500,
    message: 'Server Internal Error',
    result: error.message,
  });
 }
}
const editChatName = async (req, res) => {
  const {chatName,chatId} = req.body;
  if (!chatName){
    console.log('Chat Name is required');
    console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(400).json({
      success:false,
      statusCode: 400,
      message: 'Chat Name is required',
      result: null,
    });
  }
  const authenticatedUser = req.user;
  const chat = await Service.chatService.editChatName(chatId, authenticatedUser.user, chatName)
  if(chat===null){
    console.log('Not found Chat');
    console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(400).json({
      success:false,
      statusCode: 400,
      message: 'Not found Chat',
      result: null,
    });
  }
    console.log('Edit chat name success');
    console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Edit chat name success',
      result: chat,
    });
}
const evaluateChat = async (req, res) => {
  const {chatId, status} = req.body;
  const authenticatedUser = req.user;
  if (!chatId){
    console.log('Chat Id is required');
    console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(400).json({
      success:false,
      statusCode: 400,
      message: 'Chat Id is required',
      result: null,
    });
  }
  const chat = await Service.chatService.evaluteChat(chatId,authenticatedUser,status);
  if(chat===null){
    console.log('Not found Chat');
    console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(400).json({
      success:false,
      statusCode: 400,
      message: 'Not found Chat',
      result: null,
    });
  }
  if(chat===1)
  {
    console.log('Delete Chat Successfully');
    console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(200).json({
      success:true,
      statusCode: 200,
      message: 'Delete Chat Successfully',
      result: null,
    });
  }
  console.log('Accept Chat Successfully');
  console.log('--------------------------------------------------------------------------------------------------------------------')
  return res.status(200).json({
    success:true,
    statusCode: 200,
    message: ' Accept Successfully',
    result: chat,
  });
}
const uploadImageMessage = async (req,res) => { 
  try {
    const authenticatedUser = req.user;
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
const search = async (req, res) => {
  const {key,type} =req.body;
  if(!key)
  {
    console.log('Key is required');
    console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: 'Key is required',
      result: null,
    });
  }
  const authenticatedUser = req.user;
  const result = await Service.userService.search(key,type, authenticatedUser.user);
  if(type==='Blog'){
    console.log('List blog results');
    console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'List blog results',
      result: result,
    });
  }
  if(type==='Category'){
    console.log('List category results');
    console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'List category results',
      result: result,
    });
  }
  if(type==='User'){
    console.log('List User results');
    console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'List user results',
      result: result,
    });
  }
}
const listFiveFollowerMost= async(req, res)=>{
  const listUser = await Service.userService.listFiveUser();
  console.log('List five user follower most');
  console.log('--------------------------------------------------------------------------------------------------------------------')
  return res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'List five user follower most',
    result: listUser,
  });
}
const updateStatusLogin = async (req, res) => {
  const user = req.user;
  const userUpdate =  await Service.userService.updateStatusUser(user.user);
  console.log('Update status login success');
  console.log('--------------------------------------------------------------------------------------------------------------------')
  return res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Update status login success',
    result: null,
  })
};
module.exports = {
  updateStatusLogin,
  getUserInfo,
  updatedUserInfo,
  updateAvatar,
  removeAvatar,
  newPassword,
  likeBlog,
  saveBlog,
  addComment,
  editComment,
  deleteComment,
  followUser,
  listUserFollower,
  listUserFollowing,
  getWallUsers,
  listBlogByUserId,listNotifyByUser,checkIsRead,
  reportUser,
  reportBlog,
  reportTag,
  reportComment,
  listFriends,
  getAllReportTypes,
  shareBlog,
  listNotifyByType,
  singleChat,groupChat,
  findChatById,addUserToGroup,removeUserToGroup,
  listChatUsers,deleteChatByUser,
  sendMessage,getAllMessageByChatId,deleteMessage,
  listChatUsersIsWait,
  leaveGroup,
  editChatName,evaluateChat,
  uploadImageMessage,
  search,
  checkIsReadChat,listFiveFollowerMost
}
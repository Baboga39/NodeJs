// services/userService.js
const UserModel = require('../models/usermodel')
const cloudinary = require('cloudinary').v2;
const Category = require('../models/Blog/categoryModel')
const Blog = require('../models/Blog/blogModel')
const UserRequest = require('../models/Blog/userRequestModel')
class UserService {
static getUserInfo = async (userId) => {
  const user = await UserModel.findById(userId);
  if (!user) {
    return null;
  }
  return user;
};
static updateUserInfo = async (authenticatedUser, profileDTO,res ) =>{

    const user_id = authenticatedUser.user._id
    const user = await UserModel.findById(user_id);
    const existingUser = await UserModel.findOne({ email: profileDTO.email });
    const existingUsername = await UserModel.findOne({ username : profileDTO.username});
    if (existingUser && existingUser._id.toString() !== user_id.toString()) {
      console.log('Email already exists')
      console.log('--------------------------------------------------------------------------------------------------------------------')
        return res.status(400).json({
          success: false,
          statusCode: 400,
          message: 'Email already exists',
          result: null,
        });
    }
    if (existingUsername && existingUsername._id.toString() !== user_id.toString()) {
    console.log('Username already exists')
    console.log('--------------------------------------------------------------------------------------------------------------------')
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: 'Username already exists',
        result: null,
      });
  }
    // Update user information with data from the profileDTO
    user.name = profileDTO.name;
    user.phone = profileDTO.phone;
    user.secondName = profileDTO.secondName;
    user.gender = profileDTO.gender;
    user.descriptions = profileDTO.descriptions;
    user.address = profileDTO.address;
    user.country = profileDTO.country;
    user.username = profileDTO.username;
    // Save the updated user to the database
    await user.save();
    console.log('Updated user info successfully')
    console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'User information updated successfully',
      result: user,
    });
}
static uploadAvatar = async(authenticatedUser, fileData) =>{
  try {
    const user = await UserModel.findById(authenticatedUser.user._id);
    if (user.avatar!=null)
    {
      cloudinary.uploader.destroy(user.avatar.publicId);
    }
    user.avatar.url = fileData.path; 
    user.avatar.publicId = fileData.filename;
    await user.save();
    return user.avatar;
    
  } catch (error) {
    console.error(error);
    throw error;
  }
}
static removeAvatar = async(authenticatedUser) =>{
  const user = await UserModel.findById(authenticatedUser.user._id);
  if (user.avatar!=null)
  {
    cloudinary.uploader.destroy(user.avatar.publicId);
  }
  user.avatar.publicId = null;
  user.avatar.url = null;
  user.save();
}
static newPassword = async(req, res) =>{

  const { password, confirmPassword, email } = req.body;

  if (!password || !confirmPassword || !email) {
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


//////////////////////////////// Interaction with Categories //////////////////////////////////////////////////////////////////
static joinCategory = async (authenticatedUser, categoryId) => {
  const category = await Category.findById(categoryId);
  if(!category)
  {
    return null;
  }
  await category.addUsers(authenticatedUser._id);
  const userCount = await UserModel.countDocuments({ _id: { $in: category.users } });
  category.sumUser = userCount;
  return category;
}
static leaveCategory = async (authenticatedUser, categoryId) => { 
  const category = await Category.findById(categoryId);
  if(!category)
  {
    return null;
  }
  console.log(authenticatedUser._id)
  await category.removeUsers(authenticatedUser._id);
  const userCount = await UserModel.countDocuments({ _id: { $in: category.users } });
  category.sumUser = userCount;
  return await category.save();
}
static requestJoin = async (userId, categoryId) =>{
  const user = await UserModel.findById(userId);
  const category = await Category.findById(categoryId);
  const userRequestFind = await UserRequest.findOne({Category: category})
  if (!user) {
    console.log('-------------------------------------------------------------------------------------------------');
    console.log('Not found user');
    return 1;
  }
  if (!category) {
    console.log('-------------------------------------------------------------------------------------------------');
    console.log('Not found category');
    return 2;
  }
  if(userRequestFind){
    if (!userRequestFind.Users.includes(user._id)) {
      userRequestFind.Users.push(user._id);
      await userRequestFind.save();
    }
    console.log(userRequestFind);
    return userRequestFind;
  }
  const userRequest = new UserRequest({
      Users: [user._id],
      Category: category._id
  });
  await userRequest.save();
  return userRequest;
}
static listUserRequest = async(categoryId) =>{
  console.log(categoryId);
  const category = await Category.findById(categoryId);
  if (!category) {
    console.log('Not found category');
    return 1;
  }
  const userRequest = await UserRequest.findOne({Category: category});
  if(userRequest.Users==null){
    console.log('This category do not have any users request');
    return 2;
  }
  return userRequest;
}






//////////////////////////////// Interaction with blog //////////////////////////////////////////////////////////////////
static likeBlog = async (authenticatedUser, blogId) => {
  const blog = await Blog.findById(blogId);
  if(!blog)
  {
    return null;
  }
  blog.likes++;
  blog.listUserLikes.push(authenticatedUser._id);
  await blog.save();
  return blog;
}

static saveBlog = async (authenticatedUser, blogId) => {
  const blog = await Blog.findById(blogId);
  if(!blog)
  {
    return null;
  }
  blog.savedBy.push(authenticatedUser._id);
  await blog.save();
  return blog;
}
static listBlogSaveByUser(authenticatedUser) {
  return Blog.find({savedBy: authenticatedUser._id}).select('savedBy')
  .populate('savedBy');;
}

}
module.exports = UserService
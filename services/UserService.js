// services/userService.js
const UserModel = require('../models/usermodel')
const cloudinary = require('cloudinary').v2;
class UserService {
static getUserInfo = async (userId) => {
  // Implement get user info logic here
};
static updateUserInfo = async (authenticatedUser, profileDTO,res ) =>{

    const user_id = authenticatedUser.user._id
    const user = await UserModel.findById(user_id);
    const existingUser = await UserModel.findOne({ email: profileDTO.email });

    if (existingUser && existingUser._id.toString() !== user_id.toString()) {
        return res.status(400).json({
          success: false,
          statusCode: 400,
          message: 'Email already exists',
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
    user.company = profileDTO.company;
    user.country = profileDTO.country;
    user.school = profileDTO.school;
    user.email = profileDTO.email;
    // Save the updated user to the database
    await user.save();
    return user;
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
}
module.exports = UserService
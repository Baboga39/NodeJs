// services/userService.js
const UserModel = require('../models/usermodel')
const cloudinary = require('cloudinary').v2;
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

}
module.exports = UserService
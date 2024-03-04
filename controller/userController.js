// controllers/userController.js
const userService = require('../services/UserService');
const bcryptjs = require('bcryptjs');
const User = require('../models/usermodel');
const profileDTO = require('../dto/ProfileUserDTO');
const AuthService = require('../services/authService');
const getUserInfo = async (req, res) => {
    res.send('User Info');
};
const updatedUserInfo = async (req, res) => {
  try {
    const authenticatedUser = req.user;
    let inputProfileDTO = req.body;
    const userUpdate= await userService.updateUserInfo(authenticatedUser, inputProfileDTO,res)
    console.log('Updated user info successfully')
    console.log('--------------------------------------------------------------------------------------------------------------------')
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'User information updated successfully',
      result: userUpdate,
    });
  } catch (error) {
    console.log('Error updating user')
    console.log('--------------------------------------------------------------------------------------------------------------------')
    res.status(500).json({
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
    const fildeData  = req.file;
    const userUpdate= await userService.uploadAvatar(authenticatedUser, fildeData)
    console.log('Updated Avatar successfully')
    console.log('--------------------------------------------------------------------------------------------------------------------')
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Change avatar updated successfully',
      result: userUpdate,
    });
  } catch (error) {
    res.status(500).json({
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
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Remove avatar updated successfully',
      result: null,
    });
  } catch (error) {
    res.status(500).json({
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
module.exports = {
  getUserInfo,
  updatedUserInfo,
  updateAvatar,
  removeAvatar,
  newPassword,
}
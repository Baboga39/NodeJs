// controller/authController.js
const User = require('../models/usermodel');
const AuthService= require('../services/authService');
const bcryptjs = require('bcryptjs');
const VerificationToken = require('../models/VerificationTokenModel');
const UserDTO = require('../dto/request/UserDTO');

// Register function
const register = async (req, res) => {
  try {

    const userData = UserDTO.fromRequest(req.body);  
    // Create user
    const user = new User({
      ...userData,
    });
    if(userData.roles==='Client' || !userData.roles){
      user.status='unverified';
    }
    // Save user to database
    await user.save();
    if(userData.roles==='Client'){
      await AuthService.generateOTP(user);
    }
    if(!userData.roles){
      await AuthService.generateOTP(user);
    }
    console.log('Register user successfully')
    console.log('--------------------------------------------------------------------------------------------------------------------')
    // Return success response
    res.status(201).json({
      success: true,
      statusCode: 201,
      message: 'User registered successfully. Please check your email for verification.',
      result: user,
    });
  } catch (error) {
    if (error.code === 11000) {
      let errorMessage;
      if (error.keyPattern && error.keyPattern.username) {
        console.log('Username is already taken')
        console.log('--------------------------------------------------------------------------------------------------------------------')
        errorMessage = 'Username is already taken';
      }  
    console.log('Updated user info successfully')
    console.log('--------------------------------------------------------------------------------------------------------------------')
      if (error.keyPattern && error.keyPattern.email) {
        console.log('Email is already taken')
        console.log('--------------------------------------------------------------------------------------------------------------------')
        errorMessage = 'Email is already taken';
      }
      res.status(400).json({
        success: false,
        statusCode: 400,
        message: errorMessage,
        result: null,
      });
    } else {
      console.log('Error registering user: '+ error)
      console.log('--------------------------------------------------------------------------------------------------------------------')
      res.status(500).json({
        success: false,
        statusCode: 500,
        message: 'Internal server error',
        result: error.message,
      });
    }
  }
};
const registerAdmin = async (req, res) => {
  try {

    const userData = UserDTO.fromRequest(req.body);  
    // Create user
    const user = new User({
      ...userData,
    });
    user.status='completed';
    // Save user to database
    await user.save();
    console.log('Register user successfully')
    console.log('--------------------------------------------------------------------------------------------------------------------')
    // Return success response
    res.status(201).json({
      success: true,
      statusCode: 201,
      message: 'User registered successfully.',
      result: user,
    });
  } catch (error) {
    if (error.code === 11000) {
      let errorMessage;
      if (error.keyPattern && error.keyPattern.username) {
        console.log('Username is already taken')
        console.log('--------------------------------------------------------------------------------------------------------------------')
        errorMessage = 'Username is already taken';
      }  
    console.log('Updated user info successfully')
    console.log('--------------------------------------------------------------------------------------------------------------------')
      if (error.keyPattern && error.keyPattern.email) {
        console.log('Email is already taken')
        console.log('--------------------------------------------------------------------------------------------------------------------')
        errorMessage = 'Email is already taken';
      }
      res.status(400).json({
        success: false,
        statusCode: 400,
        message: errorMessage,
        result: null,
      });
    } else {
      console.log('Error registering user: '+ error)
      console.log('--------------------------------------------------------------------------------------------------------------------')
      res.status(500).json({
        success: false,
        statusCode: 500,
        message: 'Internal server error',
        result: error.message,
      });
    }
  }
};
const verify = async (req, res) => {
  try {
    const token = req.query.token;
    const verificationToken = await VerificationToken.findOne({ token });
    if (!verificationToken) {
      console.log('Invalid token')
      console.log('--------------------------------------------------------------------------------------------------------------------')
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: 'Invalid token',
        result: null,
      });
    }
    
    if(AuthService.isTokenExpired(verificationToken.expiryDate))
    {
      console.log('Token Expired')
      console.log('--------------------------------------------------------------------------------------------------------------------')
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: 'Token Expired',
        result: null,
      });
    }
    const user = await User.findOne({ _id: verificationToken.user_id });    

    if (user._id.toString() !== verificationToken.user_id.toString()) {
      console.log('Wrong. Try again')
      console.log('--------------------------------------------------------------------------------------------------------------------')
      res.status(400).json({
        success: false,
        statusCode: 400,
        message: 'Wrong. Try again',
        result: null,
      });
    } else {
      user.status = 'completed';
      await VerificationToken.deleteOne({ token: token });
      await user.save();
      console.log('User verified successfully')
      console.log('--------------------------------------------------------------------------------------------------------------------')
      return res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'User verified successfully',
        result: null,
      });
    }
  } catch (error) {
    console.error('Error verifying user:', error);
    console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: 'Internal server error',
      result: error.message,
    });
  }
};
const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    // Tìm người dùng bằng username
    const user = await User.findOne({username});
    if (!user) {
      console.log('Not found user')
      console.log('--------------------------------------------------------------------------------------------------------------------')
      return res.status(401).json({
        success: false,
        statusCode: 401,
        message: 'Not found user',
        result: null,
      });
    }

    // Kiểm tra trạng thái người dùng
    if (user.status === 'unverified') {
      console.log('Account not verified. Please check your email for verification.')
      console.log('--------------------------------------------------------------------------------------------------------------------');
      await AuthService.generateOTP(user);
      return res.status(401).json({
        success: false,
        statusCode: 401,
        message: 'Account not verified. Please check your email for verification.',
        result: user.status,
      });
    } else if (user.status === 'locked') {
      console.log('Account has been locked. Please contact support.')
      console.log('--------------------------------------------------------------------------------------------------------------------')
      return res.status(401).json({
        success: false,
        statusCode: 401,
        message: 'Account has been locked. Please contact support.',
        result: user.status,
      });
    }

    // Kiểm tra mật khẩu
    const isPasswordValid = await bcryptjs.compare(password,String(user.password).trim());

    if (!isPasswordValid) {
      // Nếu mật khẩu không đúng, tăng số lần đăng nhập sai
      user.loginAttempts += 1;
      await user.save();
    
      return handleFailedLogin(user, res);
    }
    // Nếu mật khẩu đúng, reset số lần đăng nhập sai
    user.loginAttempts = 0;
    await user.save();

    // Tạo một token JWT
    const token = AuthService.generateToken({user})
    console.log('Login successful')
    console.log('--------------------------------------------------------------------------------------------------------------------')
    // Gửi token về cho client
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Login successful',
      result: token,
    });
  } catch (error) {
    console.error('Error logging in:', error);
    console.log('--------------------------------------------------------------------------------------------------------------------')
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: 'Internal server error',
      result: error.message,
    });
  }
};
const handleFailedLogin = async (user, res) => {
  if (user.loginAttempts >= 5) {

    user.status = 'locked';

    await user.save();
    console.log('Account is locked')
    console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(401).json({
      success: false,
      statusCode: 401,
      message: 'Account has been locked. Please contact support.',
      result: "Wrong password.",
    });
  }
  console.log('Wrong password')
  console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(401).json({
      success: false,
      statusCode: 401,
      message: 'Wrong password. Please try again',
      result: 'Wrong password',
    });
};
const forgotPassword = async (req, res) => {
  const email = req.body.email;
  if(!email) {
    console.log('Please enter your email address')
    console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: 'Please enter your email address',
      result: null,
    });
  }
  const user= await User.findOne({email});
  if (!user) {
    console.log('Not found. Please try again')
    console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(401).json({
      success: false,
      statusCode: 400,
      message: 'Not found. Please try again',
      result: null,
    });
  }
  const OTP  = await  AuthService.generateOTP(user)
  console.log('Send mail successfully')
  console.log('--------------------------------------------------------------------------------------------------------------------')
  return res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Please check your email',
    result: OTP,
  });
}
const resetPassword = async (req, res) => {
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
module.exports = {
  register,
  verify,
  login,
  forgotPassword,
  resetPassword,
  registerAdmin
};

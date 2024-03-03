// controller/authController.js
const jwt = require('jsonwebtoken');
const User = require('../models/usermodel');
const AuthService= require('../services/authService');
const VerificationToken = require('../models/VerificationTokenModel');
const UserDTO = require('../dto/UserDTO');

// Register function
const register = async (req, res) => {
  try {

    const userData = UserDTO.fromRequest(req.body);  
    // Create user
    const user = new User({
      ...userData,
    });

    // Save user to database
    await user.save();

    await AuthService.generateOTP(user);
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
        errorMessage = 'Username is already taken';
      }  
      if (error.keyPattern && error.keyPattern.email) {
        errorMessage = 'Email is already taken';
      }
      res.status(400).json({
        success: false,
        statusCode: 400,
        message: errorMessage,
        result: null,
      });
    } else {
      console.error('Error registering user:', error);
      res.status(500).json({
        success: false,
        statusCode: 500,
        message: 'Internal server error',
        result: null,
      });
    }
  }
};

const verify = async (req, res) => {
  try {
    const token = req.query.token;
    const verificationToken = await VerificationToken.findOne({ token });
    if (!verificationToken) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: 'Invalid token',
        result: null,
      });
    }
    
    if(AuthService.isTokenExpired(verificationToken.expiryDate))
    {
      res.status(400).json({
        success: false,
        statusCode: 400,
        message: 'Token Expired',
        result: null,
      });
    }
    const user = await User.findOne({ _id: verificationToken.user_id });    

    if (user._id.toString() !== verificationToken.user_id.toString()) {
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
      res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'User verified successfully',
        result: null,
      });
    }
  } catch (error) {
    console.error('Error verifying user:', error);
    res.status(500).json({
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
      return res.status(401).json({
        success: false,
        statusCode: 401,
        message: 'Not found user',
        result: null,
      });
    }

    // Kiểm tra trạng thái người dùng
    if (user.status === 'unverified') {
      return res.status(401).json({
        success: false,
        statusCode: 401,
        message: 'Account not verified. Please check your email for verification.',
        result: null,
      });
    } else if (user.status === 'locked') {
      return res.status(401).json({
        success: false,
        statusCode: 401,
        message: 'Account has been locked. Please contact support.',
        result: null,
      });
    }

    // Kiểm tra mật khẩu
    const isPasswordValid = await bcrypt.compare(password,String(user.password).trim());
    console.log(isPasswordValid)
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
    const token = AuthService.generateToken({userId: user._id})

    // Gửi token về cho client
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Login successful',
      token: token,
    });
  } catch (error) {
    console.error('Error logging in:', error);
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

    return res.status(401).json({
      success: false,
      statusCode: 401,
      message: 'Account has been locked. Please contact support.',
      result: null,
    });
  }
    return res.status(401).json({
      success: false,
      statusCode: 401,
      message: 'Wrong password. Please try again',
      result: null,
    });
};
const forgotPassword = async (req, res) => {
  const email = req.body.email;
  if(!email) {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: 'Please enter your email address',
      result: null,
    });
  }
  const user= await User.findOne({email});
  if (!user) {
    return res.status(401).json({
      success: false,
      statusCode: 400,
      message: 'Not found. Please try again',
      result: null,
    });
  }
  const OTP  = await  AuthService.generateOTP(user)
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
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: 'Please enter full information',
      result: null,
    });
  }
  if (password!== confirmPassword) {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: 'Passwords do not match. Try again',
      result: null,
    });
  }
  const user = await User.findOne({email});
  if (!user) {
    return res.status(401).json({
      success: false,
      statusCode: 400,
      message: 'Not found. Please try again',
      result: null,
    });
  }
  AuthService.resetPassword(user, password)
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
};

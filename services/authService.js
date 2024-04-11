const jwt = require('jsonwebtoken');
const mailService = require('../services/mailService');
const VerificationToken = require('../models/VerificationTokenModel');
class AuthService {
  static generateToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1m' });
  }
  static isTokenExpired = (expiryDate) => {
    const currentTime = new Date();
    return currentTime > expiryDate;
  };
  static generateOTP = async (user) => {
    const OTP = Math.floor(100000 + Math.random() * 900000).toString();
    const verificationToken = new VerificationToken({
      token: OTP,
      user_id: user._id,
      expiryDate: new Date(Date.now() + 10 * 60 * 1000), // Set expiry date to 10 minutes from now
    });

    // Save verification token to database
    await verificationToken.save();
    
    // Send verification email
    await mailService.sendVerificationEmail(user.email,OTP);

    return OTP;
  };
  static resetPassword = async(user, password) =>{
  user.password = password;
  user.status ="completed";
  await VerificationToken.findOneAndDelete({ user_id: user._id });
  await user.save();
  }
}

module.exports = AuthService;
// models/UserModel.js
const mongoose = require('mongoose');
const validator = require('validator');
//const bcrypt = require('bcrypt');
const bcrypt = require('bcryptjs');

if (mongoose.models.User) {
  delete mongoose.models.User;
}
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: 'Invalid email format',
    },
  },
  password: {
    type: String,
    required: true,
  },
  roles: {
    type: String,
    enum: ['Client', 'Admin','Editor'],
    default: 'Client',
  },
  createDate: {
    type: Date,
    default: Date.now,
  },
  updateDate: {
    type: Date,
    default: Date.now,
  },
  phone: {
    type: String,
    validate: {
      validator: (value) => {
        const phoneRegex = /^\d{10}$/;
        return validator.matches(value, phoneRegex);
      },
      message: 'Invalid phone number format',
    },
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
    default: 'male',
  },
  second_name: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    enum: ['completed', 'unverified', 'locked'],
    default: 'unverified',
  },
  descriptions: {
    type: String,
    trim: true,
  },
  loginAttempts: {
    type: Number,
    default: 0,
  },
  address:{
    type: String,
    trim: true,
    default: null,
  },
  avatar: {
    publicId: { type: String, default: null },
    url: { type: String, default: null },
  },
  totalFollower: { 
    type: Number, 
    default:0},
  totalFollowing: { 
    type: Number, 
    default:0
  },
  totalBlog:{
    type: Number, 
    default:0
  },
  isfollow:{
    type:Boolean,
    default:false
  }
}, { timestamps: true,  strict: false });
userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  }
  next();
});
module.exports = mongoose.model('User', userSchema);

// models/UserModel.js
const mongoose = require('mongoose');
const validator = require('validator');
//const bcrypt = require('bcrypt');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid')


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
  phone: {
    type: String
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
  },
  sumViolating: { 
    type: Number, 
    default:0},
  isLogin: {
    type: Boolean,
    default: false
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  jti: {
    type: String,
  },

}, { timestamps: false,  strict: false });
userSchema.index({
  name: 'text',
  email: 'text',
  descriptions: 'text',
  second_name: 'text',
  address: 'text'
});
userSchema.pre('save', async function (next) {
  const user = this;

  if (user.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  }
  next();
});
userSchema.post('save', function() {
  const fieldsToCheck = ['sumViolating', 'totalBlog', 'totalFollowing', 'totalFollower'];
  let needsSave = false;

  fieldsToCheck.forEach(field => {
    if (this[field] < 0) {
      this[field] = 0;
      needsSave = true;
    }
  });

  if (needsSave) {
    this.save();
  }
});

module.exports = mongoose.model('User', userSchema);

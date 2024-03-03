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
    type: [String],
    default: [],
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
  status: {
    type: String,
    enum: ['completed', 'unverified', 'locked'],
    default: 'unverified',
  },
  second_name: {
    type: String,
    trim: true,
  },
  gender: {
    type: String,
  },
  Descriptions: {
    type: String,
    trim: true,
  },
  loginAttempts: {
    type: Number,
    default: 0,
  },
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

const mongoose = require('mongoose');
const autopopulate = require('mongoose-autopopulate');


const userRequestSchema = new mongoose.Schema({
    Users: [{type: mongoose.Schema.Types.ObjectId, ref:'User',autopopulate : true}],
    Category: {type: mongoose.Schema.Types.ObjectId, ref:'Category',autopopulate : true},
  }, { timestamps: true, strict: false });
userRequestSchema.plugin(autopopulate);
userRequestSchema.methods.removeUsers = async function (userIdsToRemove) {
  const updatedUsers = [];
  this.Users.forEach(userId => {
    if (Array.isArray(userIdsToRemove) && !userIdsToRemove.includes(userId._id.toString())) {
      updatedUsers.push(userId);
    } 
    else if (userId._id.toString() !== userIdsToRemove.toString()) {
      updatedUsers.push(userId);
    }
  });
  this.Users = updatedUsers;
  await this.save();
};

module.exports = mongoose.model('UserRequest', userRequestSchema);;

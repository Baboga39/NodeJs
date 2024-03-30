const mongoose = require('mongoose');
const autopopulate = require('mongoose-autopopulate');


const inviteSchema = new mongoose.Schema({
    userInvite: {type: mongoose.Schema.Types.ObjectId, ref:'User',autopopulate : true},
    userIsInvited: {type: mongoose.Schema.Types.ObjectId, ref:'User',autopopulate : true},
    Category: {type: mongoose.Schema.Types.ObjectId, ref:'Category',autopopulate : true},
  }, { timestamps: true, strict: false });
  inviteSchema.plugin(autopopulate);

module.exports = mongoose.model('Ivitation', inviteSchema);;

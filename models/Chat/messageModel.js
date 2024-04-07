const mongoose = require('mongoose');
const autopopulate = require('mongoose-autopopulate');
const Schema = mongoose.Schema;


const messageSchema = new Schema({
    user:{ type: Schema.Types.ObjectId, ref: 'User',autopopulate : true},
    message: String,
    chat:{ type: Schema.Types.ObjectId, ref: 'Group',autopopulate : true},
}, { timestamps: true ,  strict: false }); 

messageSchema.plugin(autopopulate)

module.exports = mongoose.model('Message', messageSchema);

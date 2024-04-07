const mongoose = require('mongoose');
const autopopulate = require('mongoose-autopopulate');
const Schema = mongoose.Schema;


const groupSchema = new Schema({
    createBy:{ type: Schema.Types.ObjectId, ref: 'User',autopopulate : true},
    admins: [{ type: Schema.Types.ObjectId, ref: 'User',autopopulate : true}],
    listUser:[{ type: Schema.Types.ObjectId, ref: 'User',autopopulate : true}],
    avatar: {
        publicId: { type: String, default: null },
        url: { type: String, default: null },
      },
    chatName: { type: String, default: null},
    isGroup: Boolean,
    listLastUser:[{ type: Schema.Types.ObjectId, ref: 'User',autopopulate : true}]
}, { timestamps: true,  strict: false  }); 

groupSchema.plugin(autopopulate)

module.exports = mongoose.model('Group', groupSchema);

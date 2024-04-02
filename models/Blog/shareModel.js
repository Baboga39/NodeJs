const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autopopulate = require('mongoose-autopopulate');

const shareSchema = new Schema({
    user:{ type: Schema.Types.ObjectId, ref: 'User',autopopulate : true},
    listBlog: [{ type: Schema.Types.ObjectId, ref: 'Blog',autopopulate : true }]
}, { timestamps: true });
shareSchema.plugin(autopopulate)

module.exports = mongoose.model('Share', shareSchema);

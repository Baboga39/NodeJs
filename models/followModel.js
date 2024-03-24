    const mongoose = require('mongoose');
    const Schema = mongoose.Schema;
    const autopopulate = require('mongoose-autopopulate');

    const followSchema = new Schema({
        user:{ type: Schema.Types.ObjectId, ref: 'User',autopopulate : true},
        follower: [{ type: Schema.Types.ObjectId, ref: 'User',autopopulate : true }],
        following: [{ type: Schema.Types.ObjectId, ref: 'User',autopopulate : true }]
    }, { timestamps: true });
    followSchema.plugin(autopopulate)

    module.exports = mongoose.model('Follow', followSchema);

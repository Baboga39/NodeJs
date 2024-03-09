const mongoose = require('mongoose');

if (mongoose.models.temporaryImageSchema) {
    delete mongoose.models.temporaryImageSchema;
  }
  const temporaryImageSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref:'User',autopopulate : true},
    image: [{type: String}]
  }, { timestamps: true, strict: false });
   
  module.exports = mongoose.model('TemporaryImage', temporaryImageSchema);;
  
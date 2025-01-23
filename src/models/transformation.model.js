const mongoose = require('mongoose');

const transformationSchema = new mongoose.Schema({
  imageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Image',
    required: true
  },
  transformedPath: {
    type: String,
    required: true
  },
  parameters: {
    type: Object,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Transformation', transformationSchema);
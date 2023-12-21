const mongoose = require('mongoose');

const MediaSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, // The correct property name is 'required', not 'require'
    },
    video: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Media = mongoose.model('Media', MediaSchema);

module.exports = Media;

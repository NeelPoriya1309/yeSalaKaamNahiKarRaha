const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title for the video!'],
    },
    description: {
      type: String,
    },
    gDriveID: {
      type: String,
      required: [true, 'The video must be uploaded to Google Drive!'],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    categories: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Category',
      },
    ],
    uploader: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

let Video;
try {
  Video = mongoose.model('Video');
} catch (err) {
  Video = mongoose.model('Video', videoSchema);
}
// Video = mongoose.model('Video', videoSchema);
// const User = mongoose.model('User') || mongoose.model('User', userSchema);
module.exports = Video;

const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
  video: {
    type: String,
    required: true
  },
  comment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  },
  tweet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tweet'
  },
  likedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true });


module.exports = mongoose.model("Like", likeSchema);  
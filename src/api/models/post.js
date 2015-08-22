import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({

  _user: {
    type: String,
    ref: 'User',
    required: true,
  },

  _photo: {
    type: String,
    ref: 'Photo',
  },

  _video: {
    type: String,
    ref: 'Video',
  },

  _song: {
    type: String,
    ref: 'Song',
  },

  likes: {
    type: Number,
    'default': 0,
  },

  date: {
    type: Date,
    'default': Date.now,
  },
});

module.exports = mongoose.model('Post', PostSchema);

import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({

  _user: {
    type: String,
    ref: 'User',
    required: true,
  },

  _posted_by: {
    type: String,
    ref: 'User',
  },

  type: {
    type: String,
    required: true,
  },

  _text: {
    type: String,
    ref: 'Text',
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

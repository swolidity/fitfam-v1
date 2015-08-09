import mongoose from 'mongoose';

const VideoSchema = new mongoose.Schema({

  _user: {
    type: String,
    ref: 'User',
    required: true,
  },

  title: {
    type: String,
    required: true,
  },

  url: {
    type: String,
    required: true,
  },

  provider: {
    type: String,
    required: true,
  },

  provider_id: {
    type: String,
    required: true,
  },

  thumbnails: {
    type: Object,
    required: true,
  },

  date: {
    type: Date,
    'default': Date.now,
  },

});

module.exports = mongoose.model('Video', VideoSchema);

import mongoose from 'mongoose';

const SongSchema = new mongoose.Schema({

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

  _genre: {
    type: String,
    ref: 'Genre',
    required: true,
  },

  tags: {
    type: Array,
  },

  date: {
    type: Date,
    'default': Date.now,
  },

});

module.exports = mongoose.model('Song', SongSchema);

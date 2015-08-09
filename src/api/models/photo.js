import mongoose from 'mongoose';

const PhotoSchema = new mongoose.Schema({

  _user: {
    type: String,
    ref: 'User',
    required: true,
  },

  url: {
    type: String,
    required: true,
  },

  caption: {
    type: String,
  },

  date: {
    type: Date,
    'default': Date.now,
  },

});

module.exports = mongoose.model('Photo', PhotoSchema);

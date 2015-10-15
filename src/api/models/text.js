import mongoose from 'mongoose';

const TextSchema = new mongoose.Schema({

  _user: {
    type: String,
    ref: 'User',
    required: true,
  },

  _posted_by: {
    type: String,
    ref: 'User',
  },

  content: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    'default': Date.now,
  },
});

module.exports = mongoose.model('Text', TextSchema);

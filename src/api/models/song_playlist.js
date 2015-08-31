import mongoose from 'mongoose';

const SongPlaylistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  _user: {
    type: String,
    ref: 'User',
    required: true,
  },

  date: {
    type: Date,
    'default': Date.now,
  },
});

module.exports = mongoose.model('SongPlaylist', SongPlaylistSchema);

import mongoose from 'mongoose';

const SongPlaylistXrefSchema = new mongoose.Schema({
  _song: {
    type: String,
    ref: 'Song',
    required: true,
  },

  _playlist: {
    type: String,
    ref: 'SongPlaylist',
    required: true,
  },

  date: {
    type: Date,
    'default': Date.now,
  },

});

module.exports = mongoose.model('SongPlaylistXref', SongPlaylistXrefSchema);

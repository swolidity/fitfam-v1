import mongoose from 'mongoose';

const GenreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Genre', GenreSchema);

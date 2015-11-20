import mongoose from 'mongoose';

const SupplementReview = new mongoose.Schema({

  _supplement: {
    type: String,
    ref: 'Supplement',
    required: true,
  },

  text: {
    type: String,
  },

  rating: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model()

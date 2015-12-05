import mongoose from 'mongoose';

const SupplementReviewSchema = new mongoose.Schema({

  _supplement: {
    type: String,
    ref: 'Supplement',
    required: true,
  },

  _user: {
    type: String,
    ref: 'User',
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

module.exports = mongoose.model('SupplementReview', SupplementReviewSchema);

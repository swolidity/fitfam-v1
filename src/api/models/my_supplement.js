import mongoose from 'mongoose';

const MySupplementSchema = new mongoose.Schema({
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

});

module.exports = mongoose.model('MySupplement', MySupplementSchema);

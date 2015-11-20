import mongoose from 'mongoose';

const SupplementSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
  },

  photo: {
    type: String,
    required: true,
  },

});

module.exports = mongoose.model('Supplement', SupplementSchema);

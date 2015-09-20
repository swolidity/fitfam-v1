import mongoose from 'mongoose';

const ExerciseSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
    unique: true,
  },

});

module.exports = mongoose.model('Exercise', ExerciseSchema);

import mongoose from 'mongoose';

const WorkoutSchema = new mongoose.Schema({
  _user: {
    type: String,
    ref: 'User',
    required: true,
  },

  name: {
    type: String,
  },

  date: {
    type: Date,
    'default': Date.now,
  },

});

module.exports = mongoose.model('Workout', WorkoutSchema);

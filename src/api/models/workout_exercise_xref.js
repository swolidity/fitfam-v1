import mongoose from 'mongoose';

const WorkoutExerciseXrefSchema = new mongoose.Schema({
  _workout: {
    type: String,
    ref: 'Workout',
    required: true,
  },

  _exercise: {
    type: String,
    ref: 'Exercise',
    required: true,
  },

  _user: {
    type: String,
    ref: 'User',
    required: true,
  },

  weight: {
    type: Number,
    required: true,
  },

  reps: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('WorkoutExerciseXref', WorkoutExerciseXrefSchema);

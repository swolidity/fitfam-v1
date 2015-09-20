import { Router } from 'express';
import authenticateToken from './middleware/authenticate-token';
import Post from './models/post';
import Workout from './models/workout';
import Exercise from './models/exercise';
import WorkoutExerciseXref from './models/workout_exercise_xref';

const router = new Router();

// post: /api/track/workout
router.post('/workout', authenticateToken, (req, res, next) => {
  const workoutName = req.body.workout_name;
  const workoutDate = req.body.workout_date;

  const exerciseMap = req.body.exercises;
  const exercises = [];

  for (let id in exerciseMap) {
    exercises.push(exerciseMap[id]);
  }

  const workout = new Workout({
    _user: req.user._id,
    name: workoutName,
    date: workoutDate,
  });

  workout.save();

  let savesPending = exercises.length;

  exercises.forEach((exercise) => {
    const we = new WorkoutExerciseXref({
      _workout: workout._id,
      _exercise: exercise._id,
      _user: req.user._id,
      weight: exercise.weight,
      reps: exercise.reps,
    });

    we.save((err) => {
      if (err) return next(err);

      if (--savesPending === 0) {
        res.send(true);
      }
    });
  });
});

module.exports = router;

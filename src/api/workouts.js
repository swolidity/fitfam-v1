import { Router } from 'express';
import Workout from './models/workout';
import WorkoutExerciseXref from './models/workout_exercise_xref';


const router = new Router();

// get: /api/workouts/:id
router.get('/:id', (req, res, next) => {
  const workoutID = req.params.id;

  Workout
    .findOne({_id: workoutID})
    .populate('_user')
    .exec((err, workout) => {
      if (err) return next(err);

      WorkoutExerciseXref
        .find({_workout: workoutID})
        .populate('_exercise')
        .exec((err, exercises) => {
          if (err) return next(err);

          res.send({
            workout: workout,
            exercises: exercises,
          });
        });
    });
});

module.exports = router;

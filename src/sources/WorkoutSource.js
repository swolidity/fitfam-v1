import WorkoutActions from '../actions/WorkoutActions';
import http from 'axios';

const WorkoutSource = {
  fetchWorkout: {
    remote(state, workoutID) {
      return http.get('/api/workouts/' + workoutID)
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    local() {
      return null;
    },
    success: WorkoutActions.fetchWorkoutSuccess,
    error: WorkoutActions.fetchWorkoutFailed,
  },
};

module.exports = WorkoutSource;

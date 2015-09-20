import WorkoutTrackerActions from '../actions/WorkoutTrackerActions';
import LoginStore from '../stores/LoginStore';
import http from 'axios';

const WorkoutTrackerSource = {
  trackWorkout: {
    remote(state) {
      const token = LoginStore.getToken();

      return http.post('/api/track/workout', {
        workout_name: state.workoutName,
        workout_date: state.workoutDate,
        exercises: state.exercises,
      },
      {
        headers: { 'Authorization': 'JWT ' + token },
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return Promise.reject(err.data);
      });
    },
    local() {
      return null;
    },
    success: WorkoutTrackerActions.trackWorkoutSuccess,
    error: WorkoutTrackerActions.trackWorkoutFailed,
  },

  fetchExerciseSuggestions: {
    remote(state, q) {
      return http.get('/api/exercises?q=' + q)
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          return Promise.reject(err.data);
        });
    },
    local() {
      return null;
    },
    success: WorkoutTrackerActions.fetchExerciseSuggestionsSuccess,
    error: WorkoutTrackerActions.fetchExerciseSuggestionsFailed,
  },
};

module.exports = WorkoutTrackerSource;

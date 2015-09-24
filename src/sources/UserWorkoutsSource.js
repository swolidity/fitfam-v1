import UserWorkoutsActions from '../actions/UserWorkoutsActions';
import http from 'axios';

const UserWorkoutsSource = {
  fetchWorkouts: {
    remote(state, userID) {
      return http.get('/api/users/' + userID + '/workouts')
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
    success: UserWorkoutsActions.fetchWorkoutsSuccess,
    error: UserWorkoutsActions.fetchWorkoutsFailed,
  },
};

module.exports = UserWorkoutsSource;

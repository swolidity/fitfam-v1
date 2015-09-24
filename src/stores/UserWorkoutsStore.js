import alt from '../alt';
import UserWorkoutsActions from '../actions/UserWorkoutsActions';
import UserWorkoutsSource from '../sources/UserWorkoutsSource';

class UserWorkoutsStore {
  constructor() {
    this.userID = null;
    this.workouts = null;
    this.err = null;

    this.bindActions(UserWorkoutsActions);
    this.exportAsync(UserWorkoutsSource);
  }

  onFetchWorkoutsSuccess(res) {
    this.userID = res.user_id;
    this.workouts = res.workouts;
  }

  onFetchWorkoutsFailed(err) {
    this.err = err;
  }
}

module.exports = alt.createStore(UserWorkoutsStore, 'UserWorkoutsStore');

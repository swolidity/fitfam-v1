import alt from '../alt';

class UserWorkoutsActions {
  fetchWorkoutsSuccess(res) {
    this.dispatch(res);
  }

  fetchWorkoutsFailed(err) {
    this.dispatch(err);
  }
}

module.exports = alt.createActions(UserWorkoutsActions);

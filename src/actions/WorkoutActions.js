import alt from '../alt';

class WorkoutActions {
  fetchWorkoutSuccess(res) {
    this.dispatch(res);
  }

  fetchWorkoutFailed(err) {
    this.dispatch(err);
  }
}

module.exports = alt.createActions(WorkoutActions);

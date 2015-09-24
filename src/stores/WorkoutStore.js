import alt from '../alt';
import WorkoutActions from '../actions/WorkoutActions';
import WorkoutSource from '../sources/WorkoutSource';

class WorkoutStore {
  constructor() {
    this.workout = null;
    this.exercises = null;
    this.err = null;

    this.bindActions(WorkoutActions);
    this.exportAsync(WorkoutSource);
  }

  onFetchWorkoutSuccess(res) {
    this.workout = res.workout;
    this.exercises = res.exercises;
  }

  onFetchWorkoutFailed(err) {
    this.err = err;
  }
}

module.exports = alt.createStore(WorkoutStore, 'WorkoutStore');

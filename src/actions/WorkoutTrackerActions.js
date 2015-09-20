import alt from '../alt';

class WorkoutTrackerActions {

  addExercise(exercise) {
    this.dispatch(exercise);
  }

  updateExercise(exercise) {
    this.dispatch(exercise);
  }

  updateWorkoutName(workoutName) {
    this.dispatch(workoutName);
  }

  updateWorkoutDate(workoutDate) {
    this.dispatch(workoutDate);
  }

  fetchExerciseSuggestionsSuccess(exerciseSuggestions) {
    this.dispatch(exerciseSuggestions);
  }

  fetchExerciseSuggestionsFailed(err) {
    this.dispatch(err);
  }

  trackWorkoutSuccess(workout) {

  }

  trackWorkoutFailed(err) {
    this.dispatch(err);
  }
}

module.exports = alt.createActions(WorkoutTrackerActions);

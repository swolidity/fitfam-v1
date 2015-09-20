import alt from '../alt';
import WorkoutTrackerActions from '../actions/WorkoutTrackerActions';
import WorkoutTrackerSource from '../sources/WorkoutTrackerSource';
import moment from 'moment';

class WorkoutTrackerStore {
  constructor() {
    this.workoutName = null;
    this.workoutDate = moment().format('YYYY-MM-DD');
    this.exercises = {};
    this.exerciseSuggestions = [];
    this.err = null;

    this.bindActions(WorkoutTrackerActions);
    this.exportAsync(WorkoutTrackerSource);
  }

  onAddExercise(exercise) {
    this.exercises[exercise.id] = exercise;
  }

  onUpdateWorkoutName(workoutName) {
    this.workoutName = workoutName;
  }

  onUpdateWorkoutDate(workoutDate) {
    this.workoutDate = workoutDate;
  }

  onUpdateExercise(exercise) {
    this.exercises[exercise.id] = exercise;
  }

  onFetchExerciseSuggestionsSuccess(exerciseSuggestions) {
    this.exerciseSuggestions = exerciseSuggestions;
  }

  onFetchExerciseSuggestionsFailed(err) {
    this.err = err;
  }

  onTrackWorkoutFailed(err) {
    this.err = err;
  }

  static getWorkoutDate() {
    return this.getState().workoutDate;
  }

  static getExercises() {
    const exercisesArr = [];
    const exercisesMap = this.getState().exercises;

    for (let id in exercisesMap) {
      exercisesArr.push(exercisesMap[id]);
    }

    return exercisesArr;
  }

  static getErr() {
    return this.getState().err;
  }
}

module.exports = alt.createStore(WorkoutTrackerStore, 'WorkoutTrackerStore');

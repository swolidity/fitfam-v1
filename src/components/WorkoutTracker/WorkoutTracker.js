import React from 'react';
import WorkoutTrackerActions from '../../actions/WorkoutTrackerActions';
import WorkoutTrackerStore from '../../stores/WorkoutTrackerStore';
import ExerciseInputRow from '../ExerciseInputRow/ExerciseInputRow';
import { Input, Button, ButtonInput } from 'react-bootstrap';

require('./WorkoutTracker.scss');

class WorkoutTracker extends React.Component {
  constructor(props) {
    super(props);

    this.state = this._getState();
  }

  componentDidMount() {
    WorkoutTrackerStore.listen(this._onChange);
  }

  componentWillUnmount() {
    WorkoutTrackerStore.unlisten(this._onChange);
  }

  _getState() {
    return {
      workoutDate: WorkoutTrackerStore.getWorkoutDate(),
      exercises: WorkoutTrackerStore.getExercises(),
      err: WorkoutTrackerStore.getErr(),
    };
  }

  _onChange = () => {
    this.setState(this._getState());
  }

  _addWorkout = () => {
  }

  _addExercise = () => {
    const exerciseID = 'ex_' + Date.now();
    WorkoutTrackerActions.addExercise({id: exerciseID, weight: 0, reps: 1});
  }

  _getExerciseInputRow = (exercise) => {
    return (
      <ExerciseInputRow key={exercise.id} exercise={exercise} />
    );
  }

  _onNameChange = (e) => {
    WorkoutTrackerActions.updateWorkoutName(e.target.value);
  }

  _onDateChange = (e) => {
    WorkoutTrackerActions.updateWorkoutDate(e.target.value);
  }

  _totalWeight = () => {
    let total = 0;

    this.state.exercises.forEach((exercise) => {
      total = total + (exercise.weight * exercise.reps);
    });

    return total;
  }

  _trackWorkout = (e) => {
    e.preventDefault();

    WorkoutTrackerStore.trackWorkout();
  }

  render() {
    console.log(this.state);
    let exerciseInputRows;

    if (this.state.exercises.length) {
      exerciseInputRows = this.state.exercises.map(this._getExerciseInputRow);
    }

    return (
      <div className="workout-tracker">
        <div className="container-fluid-5">
          <Button onClick={this._addExercise} className="add-exercise-btn">Add Exercise</Button>

          <div className="total-weight">
            Total Weight Lifted: {this._totalWeight()}lbs
          </div>

          <form className="workout-tracker__form">
            <div className="workout-tracker__info">
              <div className="row">
                <Input type="text" onChange={this._onNameChange} placeholder="Name your workout" wrapperClassName="col-xs-4" standalone />
                <Input type="date" onChange={this._onDateChange} defaultValue={this.state.workoutDate} ref="date" wrapperClassName="col-xs-4" standalone />
              </div>
            </div>

            {exerciseInputRows}

            <div className="row">
              <ButtonInput onClick={this._trackWorkout} type="submit" bsStyle="primary" value="Track Workout" className="btn-block" wrapperClassName="col-xs-12" standalone />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

module.exports = WorkoutTracker;

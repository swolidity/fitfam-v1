import React from 'react';
import WorkoutTrackerActions from '../../actions/WorkoutTrackerActions';
import WorkoutTrackerStore from '../../stores/WorkoutTrackerStore';
import { Input } from 'react-bootstrap';
import { Typeahead } from 'react-typeahead';

require('./ExerciseInputRow.scss');

class ExerciseInputRow extends React.Component {
  static propTypes = { exercise: React.PropTypes.object };

  constructor(props) {
    super(props);
    this.state = WorkoutTrackerStore.getState();
  }

  componentDidMount() {
    WorkoutTrackerStore.listen(this._onChange);
  }

  componentWillUnmount() {
    WorkoutTrackerStore.unlisten(this._onChange);
  }

  _onChange = (state) => {
    this.setState(state);
  }

  _onNameChange = (e) => {
    const exerciseName = e.target.value;

    WorkoutTrackerStore.fetchExerciseSuggestions(exerciseName);

    const exercise = this.props.exercise;
    exercise.name = exerciseName;

    WorkoutTrackerActions.updateExercise(exercise);
  }

  _onWeightChange = (e) => {
    const exercise = this.props.exercise;
    exercise.weight = Number(e.target.value);

    WorkoutTrackerActions.updateExercise(exercise);
  }

  _onRepsChange = (e) => {
    const exercise = this.props.exercise;
    exercise.reps = Number(e.target.value);

    WorkoutTrackerActions.updateExercise(exercise);
  }

  _onOptionSelected = (option) => {
    const exercise = this.props.exercise;
    exercise._id = option._id;
    exercise.name = option.name;

    WorkoutTrackerActions.updateExercise(exercise);
  }

  render() {
    return (
      <div className="exercise-input-row">
        <div className="row">
          <div className="col-xs-8">
            <Typeahead
              options={this.state.exerciseSuggestions}
              placeholder="exercise" defaultValue={this.props.exercise.name}
              customClasses={{
                input: 'form-control',
              }}
              onChange={this._onNameChange}
              onOptionSelected={this._onOptionSelected}
              filterOption="name"
              displayOption="name"/>
          </div>
          <Input type="number" placeholder="lbs" onChange={this._onWeightChange} value={this.props.exercise.weight} ref="weight" wrapperClassName="col-xs-2" standalone />
          <Input type="number" placeholder="reps" onChange={this._onRepsChange} value={this.props.exercise.reps} ref="reps" wrapperClassName="col-xs-2" standalone />
        </div>
      </div>
    );
  }
}

module.exports = ExerciseInputRow;

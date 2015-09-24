import React from 'react';
import ExerciseRow from '../ExerciseRow/ExerciseRow';

class ExerciseTable extends React.Component {
  static propTypes = { exercises: React.PropTypes.array.isRequired };

  _getExerciseRow = (exercise, i) => {
    return <ExerciseRow key={exercise._id} set={i + 1} exercise={exercise} />;
  }
  render() {
    const exerciseRows = this.props.exercises.map(this._getExerciseRow);

    return (
      <table className="exercise-list table table-bordered table-hover">
        <tr>
          <th>Set</th>
          <th>Exercise</th>
          <th>Weight</th>
          <th>Reps</th>
        </tr>
        {exerciseRows}
      </table>
    );
  }
}

module.exports = ExerciseTable;

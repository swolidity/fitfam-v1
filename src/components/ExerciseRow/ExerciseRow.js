import React from 'react';

require('./ExerciseRow.scss');

class ExerciseRow extends React.Component {
  static propTypes = {
    set: React.PropTypes.number.isRequired,
    exercise: React.PropTypes.object.isRequired,
   };

  render() {
    return (
      <tr className="exercise-row">
        <td className="exercise-row__set">
          {this.props.set}
        </td>

        <td className="exercise-row__name">
          {this.props.exercise._exercise.name}
        </td>

        <td className="exercise-row__weight">
          {this.props.exercise.weight}lbs
        </td>

        <td className="exercise-row__reps">
          {this.props.exercise.reps}
        </td>
      </tr>
    );
  }
}

module.exports = ExerciseRow;

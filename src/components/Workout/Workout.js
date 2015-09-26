import React from 'react';
import WorkoutStore from '../../stores/WorkoutStore';
import Spinner from '../Spinner/Spinner';
import ProfilePhoto from '../ProfilePhoto/ProfilePhoto';
import moment from 'moment';
import ExerciseTable from '../ExerciseTable/ExerciseTable';
import WorkoutLineChart from '../WorkoutLineChart/WorkoutLineChart';

require('./Workout.scss');

class Workout extends React.Component {
  static propTypes = { params: React.PropTypes.object.isRequired };

  constructor(props) {
    super(props);
    this.state = WorkoutStore.getState();
  }

  componentDidMount() {
    WorkoutStore.listen(this._onChange);
    WorkoutStore.fetchWorkout(this.props.params.workout_id);
  }

  componentWillUnmount() {
    WorkoutStore.unlisten(this._onChange);
  }

  _onChange = (state) => {
    this.setState(state);
  }

  render() {
    if (this.state.workout === null) {
      return <Spinner />;
    }

    return (
      <div className="workout">
        <div className="workout-header center">
          <div className="workout-header__user-photo">
            <ProfilePhoto width="120" className="img-circle" user={this.state.workout._user} />
          </div>

          <div className="workout-header__name">
            {this.state.workout.name}
          </div>

          <div className="workout-header__date">
            {moment(this.state.workout.date).format('MMMM Do YYYY, h:mm:ss a')}
          </div>
        </div>

        <WorkoutLineChart exercises={this.state.exercises} />

        <div className="workout__exercises">
          <ExerciseTable exercises={this.state.exercises} />
        </div>
      </div>
    );
  }
}

module.exports = Workout;

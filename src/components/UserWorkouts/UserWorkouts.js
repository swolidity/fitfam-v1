import React from 'react';
import UserWorkoutsStore from '../../stores/UserWorkoutsStore';
import Spinner from '../Spinner/Spinner';
import { Link } from 'react-router';

class UserWorkouts extends React.Component {
  static propTypes = { user: React.PropTypes.object.isRequired };

  constructor(props) {
    super(props);

    this.state = UserWorkoutsStore.getState();
  }

  componentDidMount() {
    UserWorkoutsStore.listen(this._onChange);
    UserWorkoutsStore.fetchWorkouts(this.props.user._id);
  }

  componentWillUnmount() {
    UserWorkoutsStore.unlisten(this._onChange);
  }

  _onChange = (state) => {
    this.setState(state);
  }

  _getWorkoutListItem = (workout) => {
    return (
      <li><Link to="workout" params={{ workout_id: workout._id }}>{workout.name}</Link></li>
    );
  }

  render() {
    if (this.state.workouts === null) {
      return <Spinner />;
    }

    const workoutListItems = this.state.workouts.map(this._getWorkoutListItem);

    return (
      <div className="user-workouts">
        <ul>
          {workoutListItems}
        </ul>
      </div>
    );
  }
}

module.exports = UserWorkouts;

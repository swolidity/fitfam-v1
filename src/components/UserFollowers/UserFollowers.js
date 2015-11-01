import React from 'react';
import UserFollowersStore from '../../stores/UserFollowersStore';
import FollowersList from '../FollowersList/FollowersList';

require('./UserFollowers.scss');

class UserFollowers extends React.Component {
  static propTypes = { user: React.PropTypes.object.isRequired };

  constructor(props) {
    super(props);

    this.state = UserFollowersStore.getState();
  }

  componentDidMount() {
    UserFollowersStore.listen(this._onChange);
    UserFollowersStore.fetchFollowers(this.props.user._id);
  }

  componentWillUnmount() {
    UserFollowersStore.unlisten(this._onChange);
  }

  _onChange = (state) => {
    this.setState(state);
  }

  render() {
    return (
      <div className="user-followers row">
        <div className="col-xs-12">
          <FollowersList followers={this.state.followers} />
        </div>
      </div>
    );
  }
}

module.exports = UserFollowers;

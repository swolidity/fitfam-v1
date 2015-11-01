import React from 'react';
import UserFollowingStore from '../../stores/UserFollowingStore';
import FollowingList from '../FollowingList/FollowingList';

require('./UserFollowing.scss');

class UserFollowing extends React.Component {
  static propTypes = { user: React.PropTypes.object.isRequired };

  constructor(props) {
    super(props);

    this.state = UserFollowingStore.getState();
  }

  componentDidMount() {
    UserFollowingStore.listen(this._onChange);
    UserFollowingStore.fetchFollowing(this.props.user._id);
  }

  componentWillUnmount() {
    UserFollowingStore.unlisten(this._onChange);
  }

  _onChange = (state) => {
    this.setState(state);
  }

  render() {
    return (
      <div className="user-following row">
        <div className="col-xs-12">
          <FollowingList user={this.props.user} following={this.state.following} />
        </div>
      </div>
    );
  }
}

module.exports = UserFollowing;

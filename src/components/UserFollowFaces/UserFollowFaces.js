import React from 'react';
import UserFollowersStore from '../../stores/UserFollowersStore';
import UserFollowingStore from '../../stores/UserFollowingStore';
import ProfilePhoto from '../ProfilePhoto/ProfilePhoto';

require('./UserFollowFaces.scss');

class UserFollowFaces extends React.Component {
  static propTypes = { user: React.PropTypes.object.isRequired };

  constructor(props) {
    super(props);
    this.state = this._getStateFromStores();
  }

  componentDidMount() {
    UserFollowersStore.listen(this._onChange);
    UserFollowingStore.listen(this._onChange);
    UserFollowersStore.fetchFollowers(this.props.user._id);
    UserFollowingStore.fetchFollowing(this.props.user._id);
  }

  componentWillUnmount() {
    UserFollowersStore.unlisten(this._onChange);
    UserFollowingStore.unlisten(this._onChange);
  }

  _getStateFromStores = () => {
    return {
      followers: UserFollowersStore.getFollowers(),
      following: UserFollowingStore.getFollowing(),
    };
  }

  _onChange = () => {
    this.setState(this._getStateFromStores);
  }

  _getFollowerFaces = () => {
    return this.state.followers.map((follow) => {
      return (
        <li><ProfilePhoto className="img-circle" width="45" height="45" user={follow._follower} /></li>
      );
    });
  }

  render() {
    return (
      <div className="user-follow-faces">
        <div className="user-follow-faces__followers row">
          <div className="col-xs-12">
            <h5>Followers <span className="count">{this.state.followers.length}</span></h5>
            <ul className="follow-faces-list">
              {this._getFollowerFaces()}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = UserFollowFaces;

import React from 'react';
import UserFollowersStore from '../../stores/UserFollowersStore';
import UserFollowingStore from '../../stores/UserFollowingStore';
import ProfilePhoto from '../ProfilePhoto/ProfilePhoto';

require('./UserFollowFaces.scss');

class UserFollowFaces extends React.Component {
  static propTypes = {
    user: React.PropTypes.object.isRequired,
    followFaceSize: React.PropTypes.string,
  };

  static defaultProps = {
    followFaceSize: '40',
  }

  constructor(props) {
    super(props);
    this.state = this._getStateFromStores();
  }

  componentWillMount() {
    if (this.state.userID && this.props.user._id !== this.state.userID) {
      this.setState({
        followers: null,
      });
    }
  }


  componentDidMount() {
    UserFollowersStore.listen(this._onChange);

    UserFollowersStore.fetchFollowers(this.props.user._id);
  }

  componentWillUnmount() {
    UserFollowersStore.unlisten(this._onChange);
  }

  _getStateFromStores = () => {
    return {
      followers: UserFollowersStore.getFollowers(),
      userID: UserFollowingStore.getUserID(),
    };
  }

  _onChange = () => {
    this.setState(this._getStateFromStores);
  }

  _getFollowerFaces = () => {
    return this.state.followers.map((follow) => {
      return (
        <li><ProfilePhoto width={this.props.followFaceSize} height={this.props.followFaceSize} user={follow._follower} /></li>
      );
    });
  }

  render() {
    if (!this.state.followers) {
      return <div></div>;
    }

    return (
      <div className="user-follow-faces">
        <div className="user-follow-faces__followers">
          <ul className="follow-faces-list">
            {this._getFollowerFaces()}
          </ul>
        </div>
      </div>
    );
  }
}

module.exports = UserFollowFaces;

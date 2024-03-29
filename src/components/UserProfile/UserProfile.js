import React from 'react';
import UserStore from '../../stores/UserStore';
import UserPhotosStore from '../../stores/UserPhotosStore';
import UserSongsStore from '../../stores/UserSongsStore';
import UserVideosStore from '../../stores/UserVideosStore';
import UserFollowersStore from '../../stores/UserFollowersStore';
import UserFollowingStore from '../../stores/UserFollowingStore';
import { RouteHandler } from 'react-router';
import UserProfileHeader from '../UserProfileHeader/UserProfileHeader';
import UserProfileNav from '../UserProfileNav/UserProfileNav';

require('./UserProfile.scss');

class UserProfile extends React.Component {

  static propTypes = {
    params: React.PropTypes.object.isRequired,
    query: React.PropTypes.object,
  };

  constructor(props, context) {
    super(props, context);

    this.state = UserStore.getState();
  }

  componentDidMount() {
    UserStore.listen(this.handleChange);
    UserStore.fetchUser(this.props.params.username);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.username !== this.props.params.username) {
      UserStore.fetchUser(nextProps.params.username);
    }
  }

  /* don't think I need this anymore
  componentWillUpdate(nextProps, nextState) {
    if (this.state.user && nextState.user && this.state.user._id !== nextState.user._id) {
      this._preFetchUserStores(nextState.user._id);
    }
  }
  */

  componentWillUnmount() {
    UserStore.unlisten(this.handleChange);
  }

  handleChange = (state) => {
    this.setState(state);
  }

  _preFetchUserStores(userID) {
    UserPhotosStore.fetchPhotos(userID);
    UserVideosStore.fetchVideos(userID);
    UserSongsStore.fetchSongs(userID);
    UserFollowersStore.fetchFollowers(userID);
    UserFollowingStore.fetchFollowing(userID);
  }

  render() {
    if (!this.state.user || UserStore.isLoading()) {
      return (
        <div></div>
      );
    }

    return (
      <div className="UserProfile clearfix" ref="userProfile">

        <UserProfileHeader user={this.state.user} />
        <UserProfileNav user={this.state.user} />

        <div className="container-fluid-5">
          <RouteHandler user={this.state.user} query={this.props.query} />
        </div>
      </div>
    );
  }
}

module.exports = UserProfile;

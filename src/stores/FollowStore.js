import alt from '../alt';
import FollowActions from '../actions/FollowActions';
import FollowSource from '../sources/FollowSource';

class FollowStore {
  constructor() {
    this.isFollowing = {};
    this.err = null;

    this.bindActions(FollowActions);
    this.exportAsync(FollowSource);
  }

  onFetchIsFollowingSuccess(followedID) {
    this.isFollowing[followedID] = true;
  }

  onFetchIsFollowingFailed(err) {
    this.err = err;
  }

  onFollowSuccess(followedID) {
    this.isFollowing[followedID] = true;
  }

  onFollowFailed(err) {
    this.err = err;
  }

  onUnfollowSuccess(unfollowedID) {
    this.isFollowing[unfollowedID] = false;
  }

  onUnfollowFailed(err) {
    this.err = err;
  }

  static getIsFollowing(followedID) {
    return this.getState().isFollowing[followedID];
  }
}

module.exports = alt.createStore(FollowStore, 'FollowStore');

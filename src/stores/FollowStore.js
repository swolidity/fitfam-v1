import alt from '../alt';
import FollowActions from '../actions/FollowActions';
import FollowSource from '../sources/FollowSource';

class FollowStore {
  constructor() {
    this.isFollowing = false;
    this.err = null;

    this.bindActions(FollowActions);
    this.exportAsync(FollowSource);
  }

  onFetchIsFollowingSuccess(isFollowing) {
    this.isFollowing = isFollowing;
  }

  onFetchIsFollowingFailed(err) {
    this.err = err;
  }

  onFollowSuccess() {
    this.isFollowing = true;
  }

  onFollowFailed(err) {
    this.err = err;
  }

  onUnfollowSuccess() {
    this.isFollowing = false;
  }

  onUnfollowFailed(err) {
    this.err = err;
  }

  static getIsFollowing() {
    return this.getState().isFollowing;
  }
}

module.exports = alt.createStore(FollowStore, 'FollowStore');

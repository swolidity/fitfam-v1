import alt from '../alt';
import UserFollowingActions from '../actions/UserFollowingActions';
import UserFollowingSource from '../sources/UserFollowingSource';

class UserFollowingStore {
  constructor() {
    this.following = [];
    this.err = null;

    this.bindActions(UserFollowingActions);
    this.exportAsync(UserFollowingSource);
  }

  onReceiveFollowing(following) {
    this.following = following;
  }

  onReceiveFollowingFailed(err) {
    this.err = err;
  }

  static getFollowing() {
    return this.getState().following;
  }
}

module.exports = alt.createStore(UserFollowingStore, 'UserFollowingStore');

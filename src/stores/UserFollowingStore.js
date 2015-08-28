import alt from '../alt';
import UserFollowingActions from '../actions/UserFollowingActions';
import UserFollowingSource from '../sources/UserFollowingSource';

class UserFollowingStore {
  constructor() {
    this.userID = null;
    this.following = [];
    this.err = null;

    this.bindActions(UserFollowingActions);
    this.exportAsync(UserFollowingSource);
  }

  onFetchFollowing() {
    this.following = null;
  }

  onReceiveFollowing(res) {
    this.following = res.following;
    this.userID = res.user_id;
  }

  onReceiveFollowingFailed(err) {
    this.err = err;
  }

  static getFollowing() {
    return this.getState().following;
  }

  static getUserID() {
    return this.getState().userID;
  }
}

module.exports = alt.createStore(UserFollowingStore, 'UserFollowingStore');

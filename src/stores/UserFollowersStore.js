import alt from '../alt';
import UserFollowersActions from '../actions/UserFollowersActions';
import UserFollowersSource from '../sources/UserFollowersSource';

class UserFollowersStore {
  constructor() {
    this.userID = null;
    this.followers = [];
    this.err = null;

    this.bindActions(UserFollowersActions);
    this.exportAsync(UserFollowersSource);
  }

  onFetchFollowers() {
    this.followers = null;
  }

  onReceiveFollowers(res) {
    this.followers = res.followers;
    this.userID = res.userID;
  }

  onReceiveFollowersFailed(err) {
    this.err = err;
  }

  static getFollowers() {
    return this.getState().followers;
  }
}

module.exports = alt.createStore(UserFollowersStore, 'UserFollowersStore');

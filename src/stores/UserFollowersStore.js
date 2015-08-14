import alt from '../alt';
import UserFollowersActions from '../actions/UserFollowersActions';
import UserFollowersSource from '../sources/UserFollowersSource';

class UserFollowersStore {
  constructor() {
    this.followers = [];
    this.err = null;

    this.bindActions(UserFollowersActions);
    this.exportAsync(UserFollowersSource);
  }

  onReceiveFollowers(followers) {
    this.followers = followers;
  }

  onReceiveFollowersFailed(err) {
    this.err = err;
  }
}

module.exports = alt.createStore(UserFollowersStore, 'UserFollowersStore');

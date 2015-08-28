import alt from '../alt';

class UserFollowersActions {
  fetchFollowers() {
    this.dispatch();
  }

  receiveFollowers(followers) {
    this.dispatch(followers);
  }

  receiveFollowersFailed(err) {
    this.dispatch(err);
  }
}

module.exports = alt.createActions(UserFollowersActions);

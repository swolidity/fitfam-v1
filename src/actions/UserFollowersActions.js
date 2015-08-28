import alt from '../alt';

class UserFollowersActions {
  fetchFollowers() {
    this.dispatch();
  }

  receiveFollowers(res) {
    this.dispatch(res);
  }

  receiveFollowersFailed(err) {
    this.dispatch(err);
  }
}

module.exports = alt.createActions(UserFollowersActions);

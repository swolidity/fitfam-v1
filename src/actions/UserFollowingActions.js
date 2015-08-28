import alt from '../alt';

class UserFollowingActions {
  fetchFollowing() {
    this.dispatch();
  }

  receiveFollowing(res) {
    this.dispatch(res);
  }

  receiveFollowingFailed(err) {
    this.dispatch(err);
  }
}

module.exports = alt.createActions(UserFollowingActions);

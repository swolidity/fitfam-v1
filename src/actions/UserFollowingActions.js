import alt from '../alt';

class UserFollowingActions {
  receiveFollowing(following) {
    this.dispatch(following);
  }

  receiveFollowingFailed(err) {
    this.dispatch(err);
  }
}

module.exports = alt.createActions(UserFollowingActions);

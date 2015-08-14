import alt from '../alt';

class UserFollowersActions {
  receiveFollowers(followers) {
    this.dispatch(followers);
  }

  receiveFollowersFailed(err) {
    this.dispatch(err);
  }
}

module.exports = alt.createActions(UserFollowersActions);

import alt from '../alt';

class FollowActions {
  fetchIsFollowingSuccess(isFollowing) {
    this.dispatch(isFollowing);
  }

  fetchIsFollowingFailed(err) {
    this.dispatch(err);
  }

  followSuccess() {
    console.log('following');
    this.dispatch();
  }

  followFailed(err) {
    this.dispatch(err);
  }

  unfollowSuccess() {
    console.log('unfollow');
    this.dispatch();
  }

  unfollowFailed(err) {
    this.dispatch(err);
  }
}

module.exports = alt.createActions(FollowActions);

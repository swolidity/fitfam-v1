import alt from '../alt';

class FollowActions {
  fetchIsFollowingSuccess(followedID) {
    this.dispatch(followedID);
  }

  fetchIsFollowingFailed(err) {
    this.dispatch(err);
  }

  followSuccess(followedID) {
    this.dispatch(followedID);
  }

  followFailed(err) {
    this.dispatch(err);
  }

  unfollowSuccess(unfollowedID) {
    this.dispatch(unfollowedID);
  }

  unfollowFailed(err) {
    this.dispatch(err);
  }
}

module.exports = alt.createActions(FollowActions);

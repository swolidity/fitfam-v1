import alt from '../alt';

class UserPostsActions {
  fetchPostsSuccess(posts) {
    this.dispatch(posts);
  }

  fetchPostsFailed(err) {
    this.dispatch(err);
  }
}

module.exports = alt.createActions(UserPostsActions);

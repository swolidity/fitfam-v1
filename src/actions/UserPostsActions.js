import alt from '../alt';

class UserPostsActions {

  fetchPosts() {
    this.dispatch();
  }

  fetchPostsSuccess(posts) {
    this.dispatch(posts);
  }

  fetchPostsFailed(err) {
    this.dispatch(err);
  }
}

module.exports = alt.createActions(UserPostsActions);

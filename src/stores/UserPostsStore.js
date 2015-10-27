import alt from '../alt';
import UserPostsActions from '../actions/UserPostsActions';
import UserPostsSource from '../sources/UserPostsSource';

class UserPostsStore {
  constructor() {
    this.user = null;
    this.userID = null;
    this.posts = [];
    this.skip = 0;
    this.limit = 20;

    this.bindActions(UserPostsActions);
    this.exportAsync(UserPostsSource);
  }

  onFetchPosts() {
    this.posts = null;
  }

  onFetchPostsSuccess(res) {
    if (this.userID !== res.user_id) {
      this.posts = res.posts;
      this.skip = 0;
    } else {
      this.posts = this.posts.concat(res.posts);
      this.skip = parseInt(res.skip);
    }

    this.userID = res.user_id;
  }

  onFetchPostsFailed(err) {
    this.err = err;
  }
}

module.exports = alt.createStore(UserPostsStore, 'UserPostsStore');

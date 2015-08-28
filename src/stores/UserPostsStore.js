import alt from '../alt';
import UserPostsActions from '../actions/UserPostsActions';
import UserPostsSource from '../sources/UserPostsSource';

class UserPostsStore {
  constructor() {
    this.user = null;
    this.posts = [];

    this.bindActions(UserPostsActions);
    this.exportAsync(UserPostsSource);
  }

  onFetchPosts() {
    this.posts = null;
  }

  onFetchPostsSuccess(res) {
    this.posts = res.posts;
    this.userID = res.user_id;
  }

  onFetchPostsFailed(err) {
    this.err = err;
  }
}

module.exports = alt.createStore(UserPostsStore, 'UserPostsStore');

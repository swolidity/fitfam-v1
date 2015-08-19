import alt from '../alt';
import UserPostsActions from '../actions/UserPostsActions';
import UserPostsSource from '../sources/UserPostsSource';

class UserPostsStore {
  constructor() {
    this.posts = [];

    this.bindActions(UserPostsActions);
    this.exportAsync(UserPostsSource);
  }

  onFetchPostsSuccess(posts) {
    this.posts = posts;
  }

  onFetchPostsFailed(err) {
    this.err = err;
  }
}

module.exports = alt.createStore(UserPostsStore, 'UserPostsStore');

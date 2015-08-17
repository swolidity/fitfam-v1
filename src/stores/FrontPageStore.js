import alt from '../alt';
import FrontPageActions from '../actions/FrontPageActions';
import FrontPageSource from '../sources/FrontPageSource';

class FrontPageStore {
  constructor() {
    this.posts = [];

    this.bindActions(FrontPageActions);
    this.exportAsync(FrontPageSource);
  }

  onFetchPostsSuccess(posts) {
    this.posts = posts;
  }

  onFetchPostsFailed(err) {
    this.err = err;
  }
}

module.exports = alt.createStore(FrontPageStore, 'FrontPageStore');

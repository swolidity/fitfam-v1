import alt from '../alt';

class FrontPageActions {
  fetchPostsSuccess(posts) {
    this.dispatch(posts);
  }

  fetchPostsFailed(err) {
    this.dispatch(err);
  }
}

module.exports = alt.createActions(FrontPageActions);

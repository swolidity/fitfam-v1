import alt from '../alt';

class VideosActions {
  fetchVideosSuccess(videos) {
    this.dispatch(videos);
  }

  fetchVideosFailed(err) {
    this.dispatch(err);
  }
}

module.exports = alt.createActions(VideosActions);

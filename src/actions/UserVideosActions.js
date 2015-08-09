import alt from '../alt';

class UserVideosActions {
  receiveVideos(videos) {
    this.dispatch(videos);
  }

  receiveVideosFailed(err) {
    this.dispatch(err);
  }

  addVideo(video) {
    this.dispatch(video);
  }

  addVideoFailed(err) {
    this.dispatch(err);
  }
}

module.exports = alt.createActions(UserVideosActions);

import alt from '../alt';
import UserVideosActions from '../actions/UserVideosActions';
import UserVideosSource from '../sources/UserVideosSource';

class UserVideosStore {
  constructor() {
    this.videos = [];
    this.err = null;

    this.bindActions(UserVideosActions);
    this.exportAsync(UserVideosSource);
  }

  onReceiveVideos(videos) {
    this.videos = videos;
  }

  onReceiveVideosFailed(err) {
    this.err = err;
  }

  onAddVideo(video) {
    this.videos.unshift(video);
  }

  onAddVideoFailed(err) {
    this.err = err;
  }

  static getVideos() {
    return this.getState().videos;
  }
}

module.exports = alt.createStore(UserVideosStore, 'UserVideosStore');

import alt from '../alt';
import VideosActions from '../actions/VideosActions';
import VideosSource from '../sources/VideosSource';

class VideosStore {
  constructor() {
    this.videos = [];
    this.err = null;

    this.bindActions(VideosActions);
    this.exportAsync(VideosSource);
  }

  onFetchVideosSuccess(videos) {
    this.videos = videos;
  }

  onFetchVideosFailed(err) {
    this.err = err;
  }

  static getVideos() {
    return this.getState().videos;
  }
}

module.exports = alt.createStore(VideosStore, 'VideosStore');

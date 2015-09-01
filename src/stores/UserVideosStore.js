import alt from '../alt';
import UserVideosActions from '../actions/UserVideosActions';
import UserVideosSource from '../sources/UserVideosSource';

class UserVideosStore {
  constructor() {
    this.userID = null;
    this.videos = null;
    this.err = null;

    this.bindActions(UserVideosActions);
    this.exportAsync(UserVideosSource);
  }

  onFetchVideos() {
    this.videos = null;
  }

  onReceiveVideos(res) {
    this.videos = res.videos;
    this.userID = res.user_id;
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

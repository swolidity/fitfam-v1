import alt from '../alt';
import YouTubePlayerActions from '../actions/YouTubePlayerActions';

class YouTubePlayerStore {
  constructor() {
    this.player = null;
    this.playing = null;
    this.autoplay = false;

    this.bindActions(YouTubePlayerActions);
  }

  onUpdatePlaying(video) {
    this.autoplay = true;
    this.playing = video;
  }

  onUpdatePlayer(player) {
    this.player = player;
  }
}

module.exports = alt.createStore(YouTubePlayerStore, 'YouTubePlayerStore');

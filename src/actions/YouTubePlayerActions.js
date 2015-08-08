import alt from '../alt';

class YouTubePlayerActions {
  updatePlaying(video) {
    this.dispatch(video);
  }

  updatePlayer(player) {
    this.dispatch(player);
  }
}

module.exports = alt.createActions(YouTubePlayerActions);

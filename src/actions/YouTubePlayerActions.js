import alt from '../alt';
import AppActions from './AppActions';

class YouTubePlayerActions {
  updatePlaying(video) {
    this.dispatch(video);
    AppActions.toggleSidebar(true);
  }

  updatePlayer(player) {
    this.dispatch(player);
  }
}

module.exports = alt.createActions(YouTubePlayerActions);

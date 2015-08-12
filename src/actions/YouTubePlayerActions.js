import alt from '../alt';
import AppStore from '../stores/AppStore';
import AppActions from './AppActions';
import UserActions from './UserActions';

class YouTubePlayerActions {
  updatePlaying(video) {
    this.dispatch(video);

    const sidebarState = AppStore.getSidebarState();

    if (sidebarState === false) {
      AppActions.toggleSidebar(true);
    }
  }

  updatePlayer(player) {
    this.dispatch(player);
  }
}

module.exports = alt.createActions(YouTubePlayerActions);

import alt from '../alt';
import AppActions from '../actions/AppActions';

class AppStore {
  constructor() {
    this.sidebar = false;

    this.bindActions(AppActions);
  }

  onToggleSidebar(sidebar) {
    if (this.sidebar === sidebar) return;
    this.sidebar = sidebar;
  }
}

module.exports = alt.createStore(AppStore, 'AppStore');

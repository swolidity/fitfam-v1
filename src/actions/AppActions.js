import alt from '../alt';

class AppActions {
  toggleSidebar(sidebar) {
    this.dispatch(sidebar);
  }
}

module.exports = alt.createActions(AppActions);

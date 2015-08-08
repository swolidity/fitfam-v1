import alt from '../alt';
import UserActions from '../actions/UserActions';
import UserSource from '../sources/UserSource';

class UserStore {
  constructor() {
    this.user = null;
    this.shouldScroll = true;
    this.err = null;

    this.bindActions(UserActions);
    this.exportAsync(UserSource);
  }

  onUpdateUser(user) {
    this.user = user;
  }

  onFetchUser() {
    this.user = null;
  }

  onUserFailed(err) {
    this.err = err;
  }

  onToggleShouldScroll(shouldScroll) {
    this.shouldScroll = shouldScroll;
  }
}

module.exports = alt.createStore(UserStore, 'UserStore');

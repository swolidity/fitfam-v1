import alt from '../alt';

class UserActions {

  updateUser(user) {
    this.dispatch(user);
  }

  fetchUser() {
    this.dispatch();
  }

  userFailed(err) {
    this.dispatch(err);
  }

  toggleShouldScroll(shouldScroll) {
    this.dispatch(shouldScroll);
  }
}

module.exports = alt.createActions(UserActions);

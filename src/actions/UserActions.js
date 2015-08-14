import alt from '../alt';

class UserActions {

  updateUser(user) {
    this.dispatch(user);
  }

  loadingUser() {
    this.dispatch();
  }

  userFailed(err) {
    this.dispatch(err);
  }
}

module.exports = alt.createActions(UserActions);

import alt from '../alt';

class UserActions {

  updateUser(user) {
    this.dispatch(user);
  }

  userFailed(err) {
    this.dispatch(err);
  }
}

module.exports = alt.createActions(UserActions);

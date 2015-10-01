import alt from '../alt';
import LoginActions from './LoginActions';

class AccountSettingsActions {
  saveChangesSuccess(token) {
    LoginActions.updateToken(token);
    this.dispatch();
  }

  savingChanges() {
    this.dispatch();
  }

  saveChangesFailed(err) {
    this.dispatch(err);
  }
}

module.exports = alt.createActions(AccountSettingsActions);

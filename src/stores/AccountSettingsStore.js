import alt from '../alt';
import AccountSettingsActions from '../actions/AccountSettingsActions';
import AccountSettingsSource from '../sources/AccountSettingsSource';

class AccountSettingsStore {
  constructor() {
    this.success = null;
    this.saving = null;
    this.err = null;

    this.bindActions(AccountSettingsActions);
    this.exportAsync(AccountSettingsSource);
  }

  onSaveChangesSuccess() {
    this.success = true;
    this.saving = null;
  }

  onSavingChanges() {
    this.success = null;
    this.saving = true;
  }

  onSaveChangesFailed(err) {
    this.err = err;
    this.saving = null;
  }
}

module.exports = alt.createStore(AccountSettingsStore, 'AccountSettingsStore');

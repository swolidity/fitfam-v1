import AccountSettingsActions from '../actions/AccountSettingsActions';
import LoginStore from '../stores/LoginStore';
import http from 'axios';

const AccountSettingsSource = {
  saveChanges: {
    remote(state, account) {
      const token = LoginStore.getToken();
      return http.post('/api/settings/account', {
        account: account,
      }, {
        headers: { 'Authorization': 'JWT ' + token },
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return Promise.reject(err.data);
      });
    },
    local() {
      return null;
    },
    success: AccountSettingsActions.saveChangesSuccess,
    error: AccountSettingsActions.saveChangesFailed,
  },
};

module.exports = AccountSettingsSource;

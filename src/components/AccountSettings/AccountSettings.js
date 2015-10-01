import React from 'react';
import AccountSettingsActions from '../../actions/AccountSettingsActions';
import AccountSettingsStore from '../../stores/AccountSettingsStore';
import ProfilePhoto from '../ProfilePhoto/ProfilePhoto';
import { Input, ButtonInput } from 'react-bootstrap';
import Spinner from '../Spinner/Spinner';

require('./AccountSettings.scss');

class AccountSettings extends React.Component {
  static propTypes = { user: React.PropTypes.object.isRequired };

  constructor(props) {
    super(props);

    this.state = AccountSettingsStore.getState();
  }

  componentDidMount() {
    AccountSettingsStore.listen(this._onChange);
  }

  componentWillUnmount() {
    AccountSettingsStore.unlisten(this._onChange);
  }

  _onChange = (state) => {
    this.setState(state);
  }

  _onSubmit = (e) => {
    e.preventDefault();

    const account = {};
    account.username = this.refs.username.getValue();
    account.full_name = this.refs.full_name.getValue();
    account.bio = this.refs.bio.getValue();
    account.email = this.refs.email.getValue();
    account.password = this.refs.password.getValue();

    AccountSettingsActions.savingChanges();
    AccountSettingsStore.saveChanges(account);
  }

  render() {
    const successMsg = this.state.success ? <div className="success center">Your changes were saved successfully!</div> : '';
    const errorMsg = this.state.err ? <div className="error">{this.state.err}</div> : '';
    const savingChanges = this.state.saving ? <div><Spinner /></div> : '';

    return (
      <div className="account-settings">
        <div className="row">
          <div className="col-xs-12 col-md-6 col-md-offset-3">
            <div className="user-photo-container center">
              <ProfilePhoto width="135" user={this.props.user} />
            </div>

            {successMsg}
            {savingChanges}
            {errorMsg}

            <form className="form-horizontal">
              <Input type="text" label="Username" labelClassName="col-xs-2" wrapperClassName="col-xs-10" placeholder="Username" ref="username" defaultValue={this.props.user.username} />
              <Input type="text" label="Full Name" labelClassName="col-xs-2" wrapperClassName="col-xs-10" placeholder="Full Name" ref="full_name" defaultValue={this.props.user.full_name} />
              <Input type="textarea" label="Bio" labelClassName="col-xs-2" wrapperClassName="col-xs-10" placeholder="Bio" ref="bio" defaultValue={this.props.user.bio} />
              <Input type="email" label="Email" labelClassName="col-xs-2" wrapperClassName="col-xs-10" placeholder="Email" ref="email" defaultValue={this.props.user.email} />
              <Input type="password" label="Password" labelClassName="col-xs-2" wrapperClassName="col-xs-10" placeholder="Password" ref="password" />
              <ButtonInput type="submit" bsStyle="primary" wrapperClassName="col-xs-12" className="btn-block" value="Save changes" onClick={this._onSubmit} />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = AccountSettings;

import React from 'react';
import UserStore from '../../stores/UserStore';
import { RouteHandler } from 'react-router';
import UserProfileHeader from '../UserProfileHeader/UserProfileHeader';
import UserProfileNav from '../UserProfileNav/UserProfileNav';


require('./UserProfile.scss');

class UserProfile extends React.Component {

  static contextTypes = {
    router: React.PropTypes.func.isRequired,
  }

  static willTransitionTo(transition) {
    // TODO: redirect if user not found
  }

  constructor(props, context) {
    super(props, context);

    this.state = UserStore.getState();
  }

  componentDidMount() {
    UserStore.listen(this.handleChange);
    UserStore.fetchUser(this.props.params.username);
  }

  componentWillReceiveProps(nextProps) {
    UserStore.fetchUser(nextProps.params.username);
  }

  componentWillUnmount() {
    UserStore.unlisten(this.handleChange);
  }

  handleChange = (state) => {
    this.setState(state);
  }

  _getActiveRouteName = (router) => {
    const currentRoutes = router.getCurrentRoutes();
    const activeRouteName = currentRoutes[currentRoutes.length - 1].name;
    return activeRouteName;
  }

  render() {
    if (this.state.err) {
      return (
        <div className="container">Error: {this.state.err}</div>
        );
    }

    if(UserStore.isLoading()) {
      return (
        <div className="container center">
          <i className="fa fa-spinner fa-spin"></i>
        </div>
      );
    }

    if (!this.state.user) {
      return (
        <div className="container"></div>
      );
    }

    return (
      <div className="UserProfile" ref="userProfile">
        <UserProfileHeader user={this.state.user} />
        <UserProfileNav username={this.state.user.username} activeTab={this._getActiveRouteName(this.context.router)} />

        <div className="col-xs-10 col-xs-offset-1">

            <div className="hello-bar row">
              Hey there! FITFAM is in it's early alpha stages and we need your support to make it grow into an awesome fitness community.
              Pre-order a <a href="/beta">beta account</a> or donate at <a href="https://www.cash.me/fitfam" target="_blank">https://ww.cash.me/fitfam</a>
            </div>

          <RouteHandler user={this.state.user} />
        </div>
      </div>
    );
  }
}

module.exports = UserProfile;

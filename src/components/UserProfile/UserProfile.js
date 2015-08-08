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
    window.onload = this._scrollDown;
  }

  componentWillUnmount() {
    UserStore.unlisten(this.handleChange);
  }

  handleChange = (state) => {
    this.setState(state);
  }

  _getActiveRouteName = () => {
    const currentRoutes = this.context.router.getCurrentRoutes();
    const activeRouteName = currentRoutes[currentRoutes.length - 1].name;
    return activeRouteName;
  }

  _scrollDown = () => {
    window.scrollTo(0, 0);
  }

  render() {
    if (this.state.err) {
      return (
        <div className="container">Error: {this.state.err}</div>
        );
    }

    if(UserStore.isLoading()) {
      return (
        <div className="container">
          <img src="/spinner.gif" />
        </div>
      );
    }

    if (!this.state.user) {
      return (
        <div className="container"></div>
      );
    }

    this._scrollDown();

    return (
      <div className="UserProfile" ref="userProfile">
        <UserProfileHeader user={this.state.user} />
        <UserProfileNav username={this.state.user.username} activeTab={this._getActiveRouteName()} />

        <RouteHandler user={this.state.user} />
      </div>
    );
  }
}

module.exports = UserProfile;

import React from 'react';
import UserStore from '../../stores/UserStore';
import { Link, RouteHandler } from 'react-router';
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
    window.scrollTo(0, 510);
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
        <div className="user-profile-header">
          <div className="container">

            <div className="user-profileheader--container">
              <div className="user-info-bottom">
                <div className="profile-photo">
                  <Link to="user-profile" params={{username: this.state.user.username}}>
                    <img className="img-circle" src={this.state.user.photo} alt={this.state.user.username} />
                  </Link>
                </div>
                <div className="username">@{this.state.user.username}</div>
              </div>
            </div>

          </div>
        </div>

        <UserProfileNav username={this.state.user.username} activeTab={this._getActiveRouteName()} />

        <RouteHandler user={this.state.user} />
      </div>
    );
  }
}

module.exports = UserProfile;

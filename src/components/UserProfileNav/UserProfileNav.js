import React from 'react';
import { Nav } from 'react-bootstrap';
import { NavItemLink } from 'react-router-bootstrap';

require('./UserProfileNav.scss');

class UserProfileNav extends React.Component {
  static propTypes = {
    username: React.PropTypes.string,
    activeTab: React.PropTypes.string,
   };

   _isActive = (tab) => {
     return (this.props.activeTab === tab) ? true : false;
   }

  render() {
    return (
      <div className="user-profile-nav">
        <div className="container">
          <Nav bsStyle="pills">
            <NavItemLink active={this._isActive('user-profile')} to="user-profile" params={{username: this.props.username}}>
              Profile
            </NavItemLink>
            <NavItemLink active={this._isActive('user-phots')} to="user-profile" params={{username: this.props.username}}>
              Photos
            </NavItemLink>
            <NavItemLink active={this._isActive('user-videos')} to="user-profile" params={{username: this.props.username}}>
              Videos
            </NavItemLink>
            <NavItemLink active={this._isActive('user-songs')} to="user-songs" params={{username: this.props.username}}>
              Songs
            </NavItemLink>
            <NavItemLink active={this._isActive('user-followers')} to="user-profile" params={{username: this.props.username}}>
              Followers
            </NavItemLink>
            <NavItemLink active={this._isActive('user-following')} to="user-profile" params={{username: this.props.username}}>
              Following
            </NavItemLink>
          </Nav>
        </div>
      </div>
    );
  }
}

module.exports = UserProfileNav;

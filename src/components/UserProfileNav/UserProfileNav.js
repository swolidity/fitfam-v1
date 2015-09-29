import React from 'react';
import { Nav } from 'react-bootstrap';
import { NavItemLink } from 'react-router-bootstrap';

require('./UserProfileNav.scss');

class UserProfileNav extends React.Component {
  static propTypes = {
    user: React.PropTypes.object.isRequired,
    activeTab: React.PropTypes.string.isRequired,
   };

   _isActive = (tab) => {
     return (this.props.activeTab === tab) ? true : false;
   }

  render() {
    return (
      <div className="user-profile-nav row">
        <div className="col-xs-12">
          <Nav bsStyle="pills">
            <NavItemLink active={this._isActive('user-posts')} to="user-profile" params={{username: this.props.user.username}}>
              Posts
            </NavItemLink>
            <NavItemLink active={this._isActive('user-workouts')} to="user-workouts" params={{username: this.props.user.username}}>
              Workouts
            </NavItemLink>
            <NavItemLink active={this._isActive('user-photos')} to="user-photos" params={{username: this.props.user.username}}>
              Photos
            </NavItemLink>
            <NavItemLink active={this._isActive('user-videos')} to="user-videos" params={{username: this.props.user.username}}>
              Videos
            </NavItemLink>
            <NavItemLink active={this._isActive('user-songs')} to="user-songs" params={{username: this.props.user.username}}>
              Songs
            </NavItemLink>
          </Nav>
        </div>
      </div>
    );
  }
}

module.exports = UserProfileNav;

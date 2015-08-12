import React from 'react';
import { Nav, ButtonInput } from 'react-bootstrap';
import { NavItemLink } from 'react-router-bootstrap';
import UserActions from '../../actions/UserActions';

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
      <div className="user-profile-nav clearfix">
        <div className="row">
          <div className="col-xs-10 col-xs-offset-1">
            <div className="row">
              <div className="col-xs-10">
                <Nav bsStyle="pills">
                  <NavItemLink active={this._isActive('user-info')} to="user-profile" params={{username: this.props.username}}>
                    Profile
                  </NavItemLink>
                  <NavItemLink active={this._isActive('user-photos')} to="user-photos" params={{username: this.props.username}}>
                    Photos
                  </NavItemLink>
                  <NavItemLink active={this._isActive('user-videos')} to="user-videos" params={{username: this.props.username}}>
                    Videos
                  </NavItemLink>
                  <NavItemLink active={this._isActive('user-songs')} to="user-songs" params={{username: this.props.username}}>
                    Songs
                  </NavItemLink>
                  <NavItemLink active={this._isActive('user-followers')} to="user-followers" params={{username: this.props.username}}>
                    Followers
                  </NavItemLink>
                  <NavItemLink active={this._isActive('user-following')} to="user-following" params={{username: this.props.username}}>
                    Following
                  </NavItemLink>
                </Nav>
              </div>

              <div className="col-xs-2">
                <ButtonInput bsStyle="primary" className="follow-btn btn-block" standalone >Follow</ButtonInput>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = UserProfileNav;

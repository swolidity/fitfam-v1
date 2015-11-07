import React from 'react';
import { Nav, Dropdown, MenuItem } from 'react-bootstrap';
import { NavItemLink } from 'react-router-bootstrap';
import { Link } from 'react-router';

require('./UserProfileNav.scss');

class UserProfileNav extends React.Component {
  static propTypes = {
    user: React.PropTypes.object.isRequired,
   };

   static contextTypes = {
     router: React.PropTypes.func.isRequired,
   };


   _isActive = (tab) => {
     return (this.activeTab === tab) ? true : false;
   }

   _getActiveRouteName = (router) => {
     const currentRoutes = router.getCurrentRoutes();
     const activeRouteName = currentRoutes[currentRoutes.length - 1].name;
     return activeRouteName;
   }

  _onMenuItemClick = (e) => {
    e.preventDefault();
    console.log('MenuItemClick');
  }

  render() {
    this.activeTab = this._getActiveRouteName(this.context.router);

    return (
      <div className="user-profile-nav">
        <div className="container-fluid-5">
          <div className="user-profile-nav__inner">
            <div className="row">
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

                  <li>
                    <Dropdown className="more">
                      <Dropdown.Toggle noCaret bsStyle="">
                        <i className="fa fa-circle"></i>
                        <i className="fa fa-circle"></i>
                        <i className="fa fa-circle"></i>
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <MenuItem eventKey="1">Supplements</MenuItem>
                        <MenuItem eventKey="2">Comments</MenuItem>
                        <li><Link active={this._isActive('user-followers')} to="user-followers" params={{username: this.props.user.username}}>Followers</Link></li>
                        <li><Link active={this._isActive('user-following')} to="user-following" params={{username: this.props.user.username}}>Following</Link></li>
                      </Dropdown.Menu>
                    </Dropdown>
                  </li>
                </Nav>


              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = UserProfileNav;

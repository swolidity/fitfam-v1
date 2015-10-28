import React from 'react';
import { Nav } from 'react-bootstrap';
import { NavItemLink } from 'react-router-bootstrap';
import http from 'axios';

require('./UserProfileNav.scss');

class UserProfileNav extends React.Component {
  static propTypes = {
    user: React.PropTypes.object.isRequired,
   };

   static contextTypes = {
     router: React.PropTypes.func.isRequired,
   };

   constructor(props) {
     super(props);
     this.state = {
       postCounts: null,
       err: null,
     };
   }

   componentDidMount() {
     http.get('/api/users/' + this.props.user._id + '/post_counts')
     .then((res) => {
       this.setState({ postCounts: res.data });
     })
     .catch((err) => {
       this.setState({ err: err.data });
     });
   }


   _isActive = (tab) => {
     return (this.activeTab === tab) ? true : false;
   }

   _getActiveRouteName = (router) => {
     const currentRoutes = router.getCurrentRoutes();
     const activeRouteName = currentRoutes[currentRoutes.length - 1].name;
     return activeRouteName;
   }

  render() {
    this.activeTab = this._getActiveRouteName(this.context.router);

    if (this.state.postCounts === null) {
      return (
        <div className="user-profile-nav row">
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
      );
    }

    return (
      <div className="user-profile-nav row">
        <Nav bsStyle="pills">
          <NavItemLink active={this._isActive('user-posts')} to="user-profile" params={{username: this.props.user.username}}>
            <span className="post-count">{this.state.postCounts.post_count}</span> Posts
          </NavItemLink>
          <NavItemLink active={this._isActive('user-workouts')} to="user-workouts" params={{username: this.props.user.username}}>
            <span className="post-count">{this.state.postCounts.workout_count}</span> Workouts
          </NavItemLink>
          <NavItemLink active={this._isActive('user-photos')} to="user-photos" params={{username: this.props.user.username}}>
            <span className="post-count">{this.state.postCounts.photo_count}</span> Photos
          </NavItemLink>
          <NavItemLink active={this._isActive('user-videos')} to="user-videos" params={{username: this.props.user.username}}>
            <span className="post-count">{this.state.postCounts.video_count}</span> Videos
          </NavItemLink>
          <NavItemLink active={this._isActive('user-songs')} to="user-songs" params={{username: this.props.user.username}}>
            <span className="post-count">{this.state.postCounts.song_count}</span> Songs
          </NavItemLink>
        </Nav>
      </div>
    );
  }
}

module.exports = UserProfileNav;

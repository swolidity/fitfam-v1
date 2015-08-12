import React from 'react';
import YouTubePlayerActions from '../../actions/YouTubePlayerActions';
import { ButtonInput } from 'react-bootstrap';

require('./UserProfileHeader.scss');

class UserProfileHeader extends React.Component {
  static propTypes = { user: React.PropTypes.object };

  _onPhotoCick = (e) => {
    e.preventDefault();

    if (this.props.user.profile_song) {
      YouTubePlayerActions.updatePlaying(this.props.user.profile_song);
    }
  }

  render() {
    return (
      <div className="user-profile-header">
        <div className="row">

          <div className="col-xs-10 col-xs-offset-1">
            <div className="row">

              <div className="col-xs-10">
                <div className="profile-photo">
                  <a href="#" onClick={this._onPhotoCick}>
                    <img className="img-circle" src={this.props.user.photo} alt={this.props.user.username} />
                  </a>
                </div>

                <div className="username-bio">
                  <div className="username">{this.props.user.username}</div>
                  <div className="bio">{this.props.user.bio}</div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = UserProfileHeader;

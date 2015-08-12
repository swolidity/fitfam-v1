import React from 'react';
import { Link } from 'react-router';
import { ButtonInput } from 'react-bootstrap';

require('./UserProfileHeader.scss');

class UserProfileHeader extends React.Component {
  static propTypes = { user: React.PropTypes.object };

  render() {
    return (
      <div className="user-profile-header">
        <div className="row">

          <div className="col-xs-10 col-xs-offset-1">
            <div className="row">

              <div className="col-xs-10">
                <div className="profile-photo">
                  <Link to="user-profile" params={{username: this.props.user.username}}>
                    <img className="img-circle" src={this.props.user.photo} alt={this.props.user.username} />
                  </Link>
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

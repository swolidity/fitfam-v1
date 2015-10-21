import React from 'react';
import ProfilePhoto from '../ProfilePhoto/ProfilePhoto';
import FollowButton from '../FollowButton/FollowButton';
import { Link } from 'react-router';

require('./UserListItem.scss');

class FollowListItem extends React.Component {
  static propTypes = { user: React.PropTypes.object.isRequired };

  render() {
    return (
      <li className="user-list-item row">
        <div className="col-xs-12 col-sm-10">
          <div className="user-list-item__user-photo-container">
            <ProfilePhoto width="75" height="75" className="img-circle" user={this.props.user} />
          </div>

          <div className="user-list-item__user-info">
            <div className="v-align">
              <div className="user-list-item__username">
                <Link to="user-profile" params={{ username: this.props.user.username }}>{this.props.user.username}</Link>
              </div>
              <div className="user-list-item__user-bio">{this.props.user.bio}</div>
            </div>
          </div>
        </div>

        <div className="col-xs-12 col-sm-2">
          <div className="user-list-item__follow-btn">
            <div className="v-align">
              <FollowButton followedID={this.props.user._id} className="btn-block" />
            </div>
          </div>
        </div>
      </li>
    );
  }
}

module.exports = FollowListItem;

import React from 'react';
import ProfilePhoto from '../ProfilePhoto/ProfilePhoto';

require('./UserListItem.scss');

class FollowListItem extends React.Component {
  static propTypes = { user: React.PropTypes.object.isRequired };

  render() {
    return (
      <li className="user-list-item row">
        <div className="col-xs-1">
          <ProfilePhoto width="75" height="75" className="img-circle" user={this.props.user} />
        </div>
        <div className="col-xs-11">
          <div className="user-list-item__user-info">
            <div className="v-align">
              <div className="user-list-item__username">{this.props.user.username}</div>
              <div className="user-list-item__user-bio">{this.props.user.bio}</div>
            </div>
          </div>
        </div>
      </li>
    );
  }
}

module.exports = FollowListItem;

import React from 'react';
import UserFollowFaces from '../UserFollowFaces/UserFollowFaces';

require('./UserInfo.scss');

class UserInfo extends React.Component {
  static propTypes = { user: React.PropTypes.object };

  render() {
    return (
      <div className="user-info">
        <UserFollowFaces user={this.props.user} />
      </div>
    );
  }
}

module.exports = UserInfo;

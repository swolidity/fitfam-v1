import React from 'react';
import UserListItem from '../UserListItem/UserListItem';

require('./FollowersList.scss');

class FollowList extends React.Component {
  static propTypes = { followers: React.PropTypes.array.isRequired }

  _getUserListItem = (follow) => {
    return (
      <UserListItem
        key={follow._follower._id}
        user={follow._follower}
      />
    );
  }

  render() {
    const followersListItems = this.props.followers.map(this._getUserListItem);

    return (
      <ul className="followers-list">
        {followersListItems}
      </ul>
    );
  }
}

module.exports = FollowList;

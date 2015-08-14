import React from 'react';
import UserListItem from '../UserListItem/UserListItem';

require('./FollowingList.scss');

class FollowingList extends React.Component {
  static propTypes = { following: React.PropTypes.array.isRequired }

  _getUserListItem = (follow) => {
    return (
      <UserListItem
        key={follow._followed._id}
        user={follow._followed}
      />
    );
  }

  render() {
    const followingListItems = this.props.following.map(this._getUserListItem);

    return (
      <ul className="following-list">
        {followingListItems}
      </ul>
    );
  }
}

module.exports = FollowingList;

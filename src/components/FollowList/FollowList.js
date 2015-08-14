import React from 'react';
import UserListItem from '../UserListItem/UserListItem';

require('./FollowList.scss');

class FollowList extends React.Component {
  static propTypes = { follows: React.PropTypes.array.isRequired }

  _getUserListItem = (follow) => {
    return (
      <UserListItem
        key={follow._followed._id}
        user={follow._followed}
      />
    );
  }

  render() {
    const followListItems = this.props.follows.map(this._getUserListItem);

    return (
      <ul className="follow-list">
        {followListItems}
      </ul>
    );
  }
}

module.exports = FollowList;

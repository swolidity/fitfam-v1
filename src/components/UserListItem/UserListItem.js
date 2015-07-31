import React from 'react';
import { Link } from 'react-router';

class UserListItem extends React.Component {
  render() {
    const user = this.props.user;

    return (
      <div>
        <Link to="user-profile" params={{ username: user.username }}>
          <img width="35" className="img-circle" src={ user.photo } alt={ user.username } />
        </Link>

        <Link to="user-profile" params={{ username: user.username }}>
          {user.username}
        </Link>
      </div>
    );
  }
}

UserListItem.propTypes = { user: React.PropTypes.object };

module.exports = UserListItem;

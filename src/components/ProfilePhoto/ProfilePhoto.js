import React from 'react';
import { Link } from 'react-router';

class ProfilePhoto extends React.Component {
  static propTypes = { user: React.PropTypes.object };

  render() {
    return (
      <Link onClick={this._onClick} to="user-profile" params={{username: this.props.user.username}}>
        <img {...this.props} src={this.props.user.photo} alt={this.props.user.username} />
      </Link>
    );
  }
}

module.exports = ProfilePhoto;

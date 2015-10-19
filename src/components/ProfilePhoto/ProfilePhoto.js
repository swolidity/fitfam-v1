import React from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';

class ProfilePhoto extends React.Component {
  static propTypes = { user: React.PropTypes.object.isRequired };

  render() {
    return (
      <Link to="user-profile" params={{username: this.props.user.username}}>
        <img {...this.props} className={classNames(this.props.className, 'img-circle')} src={this.props.user.photo} alt={this.props.user.username} />
      </Link>
    );
  }
}

module.exports = ProfilePhoto;

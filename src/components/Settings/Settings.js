import React from 'react';
import { RouteHandler } from 'react-router';
import authenticated from '../../decorators/Authenticated';

class Settings extends React.Component {
  static propTypes = { user: React.PropTypes.object.isRequired };

  render() {
    return (
      <RouteHandler user={this.props.user} />
    );
  }
}

module.exports = authenticated(Settings);

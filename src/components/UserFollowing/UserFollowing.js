import React from 'react';

require('./UserFollowing.scss');

class UserFollowing extends React.Component {
  render() {
    return (
      <div className="user-following">
        <div className="row">
          <div className="col-xs-12">
            0 following
          </div>
        </div>
      </div>
    );
  }
}

module.exports = UserFollowing;

import React from 'react';

require('./UserFollowers.scss');

class UserFollowers extends React.Component {
  render() {
    return (
      <div className="user-followers">
        <div className="row">
          <div className="col-xs-12">
            0 followers
          </div>
        </div>
      </div>
    );
  }
}

module.exports = UserFollowers;

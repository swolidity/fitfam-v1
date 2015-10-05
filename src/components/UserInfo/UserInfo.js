import React from 'react';
import LatestProgressPic from '../LatestProgressPic/LatestProgressPic';

require('./UserInfo.scss');

class UserInfo extends React.Component {
  static propTypes = { user: React.PropTypes.object };

  render() {
    return (
      <div className="user-info">
        <LatestProgressPic userID={this.props.user._id} />
      </div>
    );
  }
}

module.exports = UserInfo;

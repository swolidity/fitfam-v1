import React from 'react';
import SongListItem from '../SongListItem/SongListItem';
import YouTubePlayerStore from '../../stores/YouTubePlayerStore';

require('./UserInfo.scss');

class UserInfo extends React.Component {
  static propTypes = { user: React.PropTypes.object };

  render() {
    return (
      <div className="user-info">
        <div className="user-info--bio row">
          <div className="col-xs-12">
            <h3>Bio</h3>
            {this.props.user.bio}
          </div>
        </div>
      </div>


    );
  }
}

module.exports = UserInfo;

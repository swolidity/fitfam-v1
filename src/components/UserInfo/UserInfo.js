import React from 'react';
import SongListItem from '../SongListItem/SongListItem';
import YouTubePlayerStore from '../../stores/YouTubePlayerStore';

require('./UserInfo.scss');

class UserInfo extends React.Component {
  static propTypes = { user: React.PropTypes.object };

  constructor(props) {
    super(props);
    this.state = this._getStateFromStores();
  }

  componentDidMount() {
    YouTubePlayerStore.listen(this._onChange);
  }

  componentWillUnmount() {
    YouTubePlayerStore.unlisten(this._onChange);
  }

  _onChange = () => {
    this.setState(this._getStateFromStores);
  }

  _getStateFromStores = () => {
    return {
      youtube: YouTubePlayerStore.getState(),
    };
  }

  render() {
    return (
      <div className="user-info">
        <div className="user-info--bio row">
          <div className="col-xs-12">
            <h3>Bio</h3>
            {this.props.user.bio}
          </div>
        </div>

        <div className="user-info--profile-song row">
          <div className="col-xs-12">
            <h3>Favorite Workout Song</h3>
            <ul>
              <SongListItem song={this.props.user.profileSong} youtube={this.state.youtube} />
            </ul>
          </div>
        </div>
      </div>


    );
  }
}

module.exports = UserInfo;

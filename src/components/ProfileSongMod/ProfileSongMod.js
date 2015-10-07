import React from 'react';
import YouTubePlayerActions from '../../actions/YouTubePlayerActions';
import YouTubePlayerStore from '../../stores/YouTubePlayerStore';

require('./ProfileSongMod.scss');

class ProfileSongMod extends React.Component {
  static propTypes = { profileSong: React.PropTypes.object.isRequired };

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

  _getStateFromStores = () => {
    return {
      youtube: YouTubePlayerStore.getState(),
    };
  }

  _onChange = () => {
    this.setState(this._getStateFromStores());
  }

  _onPhotoClick = (e) => {
    e.preventDefault();

    if (this.props.profileSong) {
      const playing = this.state.youtube.playing;
      const player = this.state.youtube.player;

      if (player === null) {
        YouTubePlayerActions.updatePlaying(this.props.profileSong);
        return;
      }

      const playerState = player.getPlayerState();

      if (this.props.profileSong._id === playing._id) {
        if (playerState === 1) {
          // if player is playing, then pause
          player.pauseVideo();
        } else {
          // player is not playing around yo, but we gonna play anyway
          player.playVideo();
        }
      } else {
        YouTubePlayerActions.updatePlaying(this.props.profileSong);
      }
    }
  }

  _getIcon = () => {
    if (!this.props.profileSong) {
      return;
    }

    const song = this.props.profileSong;
    const player = this.state.youtube.player;
    const playing = this.state.youtube.playing;
    const playIcon = <i className="yt-thumb-icon play fa fa-play-circle"></i>;
    const pauseIcon = <i className="yt-thumb-icon pause fa fa-pause"></i>;

    if (player === null || playing === null) {
      return playIcon;
    }

    if ( (song._id === playing._id) && (player.getPlayerState() === 1) ) {
      return pauseIcon;
    }

    if ( (song._id === playing._id) && (player.getPlayerState() === 3) ) {
      return pauseIcon;
    }

    return playIcon;
  }

  render() {
    const thumbnail = this.props.profileSong.thumbnails.maxres ? this.props.profileSong.thumbnails.maxres : this.props.profileSong.thumbnails.medium;

    return (
      <div className="profile-song-mod col-xs-12">
        <div className="sidebar-title">Profile Song</div>

        <div className="profile-song-mod__thumbnail">
          <div className="yt-thumb embed-responsive embed-responsive-16by9">
            <img className="embed-responsive-item" src={thumbnail.url} alt={this.props.profileSong.title} />
            <div className="yt-thumb--icon-wrapper" onClick={this._onPhotoClick}>
              {this._getIcon()}
            </div>
          </div>
        </div>

        <div className="profile-song-mod__title">
          {this.props.profileSong.title}
        </div>
      </div>
    );
  }
}

module.exports = ProfileSongMod;

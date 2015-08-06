import React from 'react';
import UserSongsActions from '../../actions/UserSongsActions';
import moment from 'moment';

require('./SongListItem.scss');

class SongListItem extends React.Component {

  constructor(props) {
    super(props);
    this.song = props.song;
  }

  _onClick = () => {
    const playing = this.props.playing;
    const ytPlayer = this.props.ytPlayer;
    const playerState = ytPlayer.getPlayerState();

    if (this.song._id === playing._id) {
      if (playerState === 1) {
        // if player is playing, then pause
        ytPlayer.pauseVideo();
      } else {
        // player is not playing around yo, but we gonna play anyway
        ytPlayer.playVideo();
      }
    } else {
      UserSongsActions.updatePlaying(this.song);
    }
  }

  _getIcon = () => {
    const song = this.song;
    const playing = this.props.playing;
    const ytPlayer = this.props.ytPlayer;
    const playIcon = <i className="yt-thumb-icon play fa fa-youtube-play"></i>;
    const pauseIcon = <i className="yt-thumb-icon pause fa fa-pause"></i>;

    if (ytPlayer === null) {
      return playIcon;
    }

    if ( (song._id === playing._id) && (ytPlayer.getPlayerState() === 1) ) {
      return pauseIcon;
    }

    return playIcon;
  }

  render() {
    const thumbnail = this.song.thumbnails.medium;

    return (
      <li className="song-list-item row">
        <div className="song-list-item--thumbnail col-xs-3">
          <div className="yt-thumb embed-responsive embed-responsive-16by9">
            <img className="embed-responsive-item" src={thumbnail.url} alt={this.song.title} />
            <div className="yt-thumb--icon-wrapper" onClick={this._onClick}>
              {this._getIcon()}
            </div>
          </div>
        </div>
        <div className="song-list-item--title col-xs-9">{this.song.title}</div>
        <div className="col-xs-9">
          <img height="25" className="user-photo img-circle" src={this.song._user.photo} alt={this.song._user.username} />
          Added {moment(this.song.date).fromNow()}
        </div>
      </li>
    );
  }
}

SongListItem.propTypes = {
  song: React.PropTypes.object,
  playing: React.PropTypes.object,
  ytPlayer: React.PropTypes.object,
};

module.exports = SongListItem;

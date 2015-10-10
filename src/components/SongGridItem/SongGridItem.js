import React from 'react';
import YouTubePlayerActions from '../../actions/YouTubePlayerActions';
import TagItem from '../TagItem/TagItem';

require('./SongGridItem.scss');

class SongGridItem extends React.Component {

  constructor(props) {
    super(props);
    this.song = props.song;
  }

  _onClick = () => {
    const playing = this.props.youtube.playing;
    const player = this.props.youtube.player;

    if (player === null) {
      YouTubePlayerActions.updatePlaying(this.song);
      return;
    }

    const playerState = player.getPlayerState();

    if (this.song._id === playing._id) {
      if (playerState === 1) {
        // if player is playing, then pause
        player.pauseVideo();
      } else {
        // player is not playing around yo, but we gonna play anyway
        player.playVideo();
      }
    } else {
      YouTubePlayerActions.updatePlaying(this.song);
    }
  }

  _getIcon = () => {
    const song = this.song;
    const player = this.props.youtube.player;
    const playing = this.props.youtube.playing;
    const playIcon = <i className="yt-thumb-icon play fa fa-youtube-play"></i>;
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

  _getTagItem = (tag, i) => {
    return <TagItem key={i} tag={tag} />;
  }

  render() {
    const thumbnail = this.song.thumbnails.maxres ? this.song.thumbnails.maxres : this.song.thumbnails.medium;

    return (
      <div className="song-grid-item col-xs-12 col-sm-6 col-md-4 col-lg-3">

        <div className="song-grid-item__thumbnail">
          <div className="yt-thumb embed-responsive embed-responsive-16by9">
            <img className="embed-responsive-item" src={thumbnail.url} alt={this.song.title} />
            <div className="yt-thumb--icon-wrapper" onClick={this._onClick}>
              {this._getIcon()}
            </div>
          </div>
        </div>

        <div className="song-grid-item__title">
          <a href="#">{this.song.title}</a>
        </div>

      </div>
    );
  }
}

SongGridItem.propTypes = {
  song: React.PropTypes.object,
  youtube: React.PropTypes.object,
};

module.exports = SongGridItem;

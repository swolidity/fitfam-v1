import React from 'react';
import YouTubePlayerActions from '../../actions/YouTubePlayerActions';
import TagItem from '../TagItem/TagItem';

require('./VideoGridItem.scss');

class VideoGridItem extends React.Component {

  static contextTypes = {
    sidebar: React.PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props);
    this.video = props.video;
  }

  _onClick = () => {
    const playing = this.props.youtube.playing;
    const player = this.props.youtube.player;

    if (player === null) {
      YouTubePlayerActions.updatePlaying(this.video);
      return;
    }

    const playerState = player.getPlayerState();

    if (!this.context.sidebar) {
      YouTubePlayerActions.updatePlaying(this.video);
      player.playVideo();
    }

    if (this.video._id === playing._id) {
      if (playerState === 1) {
        // if player is playing, then pause
        player.pauseVideo();
      } else {
        // player is not playing around yo, but we gonna play anyway
        player.playVideo();
      }
    } else {
      YouTubePlayerActions.updatePlaying(this.video);
    }
  }

  _getIcon = () => {
    const video = this.video;
    const player = this.props.youtube.player;
    const playing = this.props.youtube.playing;
    const playIcon = <i className="yt-thumb-icon play fa fa-youtube-play"></i>;
    const pauseIcon = <i className="yt-thumb-icon pause fa fa-pause"></i>;

    if (player === null || playing === null || !this.context.sidebar) {
      return playIcon;
    }

    if ( (video._id === playing._id) && (player.getPlayerState() === 1) ) {
      return pauseIcon;
    }

    if ( (video._id === playing._id) && (player.getPlayerState() === 3) ) {
      return pauseIcon;
    }

    return playIcon;
  }

  _getTagItem = (tag, i) => {
    return <TagItem key={i} tag={tag} />;
  }

  render() {
    const thumbnail = this.video.thumbnails.maxres ? this.video.thumbnails.maxres : this.video.thumbnails.medium;

    return (
      <div className="video-grid-item col-xs-12 col-sm-6 col-md-4 col-lg-3">

        <div className="video-grid-item__thumbnail">
          <div className="yt-thumb embed-responsive embed-responsive-16by9">
            <img className="embed-responsive-item" src={thumbnail.url} alt={this.video.title} />
            <div className="yt-thumb--icon-wrapper" onClick={this._onClick}>
              {this._getIcon()}
            </div>
          </div>

          <div className="video-grid-item__title">
            {this.video.title}
          </div>
        </div>

      </div>
    );
  }
}

VideoGridItem.propTypes = {
  video: React.PropTypes.object,
  youtube: React.PropTypes.object,
};

module.exports = VideoGridItem;

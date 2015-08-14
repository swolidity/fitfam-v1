import React from 'react';
import ProfilePhoto from '../ProfilePhoto/ProfilePhoto';
import YouTubePlayerActions from '../../actions/YouTubePlayerActions';
import moment from 'moment';
import TagItem from '../TagItem/TagItem';

require('./VideoListItem.scss');

class VideoListItem extends React.Component {

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

    if (player === null || playing === null) {
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

  _getTagItem = (tag) => {
    return <TagItem tag={tag} />;
  }

  render() {
    const thumbnail = this.video.thumbnails.medium;

    return (
      <li className="video-list-item row">
        <div className="video-list-item--thumbnail col-xs-3">
          <div className="yt-thumb embed-responsive embed-responsive-16by9">
            <img className="embed-responsive-item" src={thumbnail.url} alt={this.video.title} />
            <div className="yt-thumb--icon-wrapper" onClick={this._onClick}>
              {this._getIcon()}
            </div>
          </div>
        </div>
        <div className="col-xs-9">
          <div className="video-list-item--title">{this.video.title}</div>
          <div className="tag-list">{this.video.tags.map(this._getTagItem)}</div>
          <ProfilePhoto height="25" className="user-photo img-circle" user={this.video._user} />
          Added {moment(this.video.date).fromNow()}
        </div>
      </li>
    );
  }
}

VideoListItem.propTypes = {
  video: React.PropTypes.object,
  youtube: React.PropTypes.object,
};

module.exports = VideoListItem;

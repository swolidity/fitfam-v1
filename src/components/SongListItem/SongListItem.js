import React from 'react';
import ProfilePhoto from '../ProfilePhoto/ProfilePhoto';
import YouTubePlayerActions from '../../actions/YouTubePlayerActions';
import moment from 'moment';
import TagItem from '../TagItem/TagItem';
import { Link } from 'react-router';

require('./SongListItem.scss');

class SongListItem extends React.Component {

  static contextTypes = {
    sidebar: React.PropTypes.bool.isRequired,
  }

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

    if (!this.context.sidebar) {
      YouTubePlayerActions.updatePlaying(this.song);
      player.playVideo();
    }

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

    if (player === null || playing === null || !this.context.sidebar) {
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
      <li className="song-list-item">
        <div className="row">

          <div className="col-xs-12 col-sm-3">
            <div className="song-list-item__thumbnail">
              <div className="yt-thumb embed-responsive embed-responsive-16by9">
                <img className="embed-responsive-item" src={thumbnail.url} alt={this.song.title} />
                <div className="yt-thumb--icon-wrapper" onClick={this._onClick}>
                  {this._getIcon()}
                </div>
              </div>
            </div>
          </div>

          <div className="col-xs-10 col-sm-8">
            <div className="song-list-item__info">
              <div className="song-list-item--title">{this.song.title}</div>
              <div className="tag-list">{this.song.tags.map(this._getTagItem)}</div>
            </div>
            <Link to="user-profile" params={{ username: this.song._user.username }} className="song-list-item__username">{this.song._user.username}</Link> {moment(this.song.date).fromNow()}

          </div>

          <div className="col-xs-2 col-sm-1">
            <ProfilePhoto height="40" className="user-photo img-circle" user={this.song._user} />
          </div>

        </div>
      </li>
    );
  }
}

SongListItem.propTypes = {
  song: React.PropTypes.object,
  youtube: React.PropTypes.object,
  postID: React.PropTypes.string,
  likes: React.PropTypes.number,
};

module.exports = SongListItem;

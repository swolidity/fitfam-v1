import React from 'react';
import AppActions from '../../actions/AppActions';
import YouTubePlayerActions from '../../actions/YouTubePlayerActions';
import YouTubePlayerStore from '../../stores/YouTubePlayerStore';
import ProfilePhoto from '../ProfilePhoto/ProfilePhoto';
import moment from 'moment';
import { Link } from 'react-router';

require('./YouTubePlayer.scss');

class YouTubePlayer extends React.Component {

  constructor(props) {
    super(props);

    this.state = YouTubePlayerStore.getState();
  }

  componentDidMount() {
    YouTubePlayerStore.listen(this._onChange);
  }

  componentWillUnmount() {
    YouTubePlayerStore.unlisten(this._onChange);
  }

  _onChange = (state) => {
    this.setState(state);
  }

  _onYouTubeReady = (e) => {
    // e.target is the player object
    YouTubePlayerActions.updatePlayer(e.target);
  }

  _onYouTubePlay = (e) => {
    YouTubePlayerActions.updatePlayer(e.target);
  }

  _onYouTubePause = (e) => {
    YouTubePlayerActions.updatePlayer(e.target);
  }

  _onYouTubeEnd = (e) => {
    YouTubePlayerActions.updatePlayer(e.target);
  }

  _closeSidebar = (e) => {
    e.preventDefault();
    this.state.player.pauseVideo();
    AppActions.toggleSidebar(false);
  }

  render() {
    if (typeof (window) !== 'undefined' && this.state.playing) {
      const YouTube = require('react-youtube');
      const opts = {
        height: '240',
        width: '320',
        playerVars: {
          autoplay: this.state.autoplay,
        },
      };

      return (
        <div className="yt-player">
          <div className="yt-player__now-playing-top">Profile Song
            <a href="#" onClick={this._closeSidebar} className="close-sidebar pull-right">x</a>
          </div>
          <div className="embed-responsive embed-responsive-4by3">
            <YouTube
              url={this.state.playing.url}
              opts={opts}
              onReady={this._onYouTubeReady}
              onPlay={this._onYouTubePlay}
              onPause={this._onYouTubePause}
              onEnd={this._onYouTubeEnd}
              className="embed-responsive-item clearfix"
            />
          </div>

          <div className="yt-player--title">{this.state.playing.title}</div>

          <div className="yt-player--added-by">
            <ProfilePhoto height="35" width="35" className="user-photo img-circle" user={this.state.playing._user} />
            <Link to="user-profile" params={{ username: this.state.playing._user.username }} className="username">{this.state.playing._user.username}</Link>
            {moment(this.state.playing.date).fromNow()}
          </div>

        </div>
      );
    }

    return (
      <div></div>
    );
  }
}

module.exports = YouTubePlayer;

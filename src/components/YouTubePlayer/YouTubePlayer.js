import React from 'react';
import YouTubePlayerActions from '../../actions/YouTubePlayerActions';
import YouTubePlayerStore from '../../stores/YouTubePlayerStore';

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
        <div>
          <div className="yt-player-wrapper embed-responsive embed-responsive-4by3">
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

          <h3>{this.state.playing.title}</h3>
        </div>
      );
    }

    return (
      <div></div>
    );
  }
}

module.exports = YouTubePlayer;

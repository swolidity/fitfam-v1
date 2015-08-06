import React from 'react';
import UserSongsActions from '../../actions/UserSongsActions';
import UserSongsStore from '../../stores/UserSongsStore';
import SongList from '../SongList/SongList';
import { Input, ButtonInput } from 'react-bootstrap';

require('./UserSongs.scss');

class UserSongs extends React.Component {

  constructor(props) {
    super(props);

    this.state = UserSongsStore.getState();
    this.user = props.user;
  }

  componentDidMount() {
    UserSongsStore.listen(this._onChange);
    UserSongsStore.fetchSongs(this.user._id);
  }

  componentWillUnmount() {
    UserSongsStore.unlisten(this._onChange);
  }

  _onChange = (state) => {
    this.setState(state);
  }

  _onAddYouTubeSong = (e) => {
    e.preventDefault();

    const url = this.refs.url.getValue();
    UserSongsStore.addYouTubeSong(url);
  }

  _onYouTubeReady = (e) => {
    // e.target is the player object
    UserSongsActions.updateYtPlayer(e.target);
  }

  _onYouTubePlay = (e) => {
    UserSongsActions.updateYtPlayer(e.target);
  }

  _onYouTubePause = (e) => {
    UserSongsActions.updateYtPlayer(e.target);
  }

  _onYouTubeEnd = (e) => {
    UserSongsActions.updateYtPlayer(e.target);
  }

  render() {
    let youTubePlayer = '';
    if (typeof (window) !== 'undefined' && this.state.playing) {
      const YouTube = require('react-youtube');
      const opts = {
        height: '240',
        width: '320',
        playerVars: {
          autoplay: this.state.autoplay,
        },
      };

      youTubePlayer = (
        <YouTube
          url={this.state.playing.url}
          opts={opts}
          onReady={this._onYouTubeReady}
          onPlay={this._onYouTubePlay}
          onPause={this._onYouTubePause}
          onEnd={this._onYouTubeEnd}
          className="embed-responsive-item clearfix"
        />
      );
    }

    return (
      <div className="user-songs">
        <div className="container">

          <div className="user-songs--header">
            <div className="row">
              <div className="title col-xs-6">Songs</div>

              <div className="add-song-form col-xs-6">
                <form>
                  <div className="row">
                    <Input type="text" placeholder="YouTube URL" ref="url" wrapperClassName="yt-url-wrapper col-xs-9" />
                    <ButtonInput type="submit" bsStyle="primary" value="Add Song" onClick={this._onAddYouTubeSong} className="btn-block" wrapperClassName="add-song-wrapper col-xs-3"/>
                  </div>
                </form>
              </div>

            </div>
          </div>

          <div className="row">
            <div className="col-xs-8">
              <SongList
                songs={this.state.songs}
                playing={this.state.playing}
                ytPlayer={this.state.ytPlayer}
              />
            </div>

            <div className="col-xs-4">
              <div className="yt-player-wrapper embed-responsive embed-responsive-4by3">
                {youTubePlayer}
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

module.exports = UserSongs;

import React from 'react';
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

  _onAddYoutubeSong = (e) => {
    e.preventDefault();

    const url = this.refs.url.getValue();
    UserSongsStore.addYoutubeSong(url);
  }

  render() {
    let youTubePlayer = '';
    if (typeof (window) !== 'undefined' && this.state.playing) {
      const YouTube = require('react-youtube');
      const opts = {
        height: '240',
        width: '320',
      }
      youTubePlayer = <YouTube url={this.state.playing.url} opts={opts} />;
    }

    return (
      <div className="UserSongs">
        <div className="container">
          <form>
            <Input type="text" placeholder="YouTube URL" ref="url" />
            <ButtonInput type="submit" bsStyle="primary" value="Add Song" onClick={this._onAddYoutubeSong} />
          </form>

          <div className="row">
            <div className="col-xs-8">
              <SongList songs={this.state.songs} />
            </div>

            <div className="col-xs-4">
              {youTubePlayer}
            </div>
          </div>

        </div>
      </div>
    );
  }
}

module.exports = UserSongs;

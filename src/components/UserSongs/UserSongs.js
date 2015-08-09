import React from 'react';
import UserSongsStore from '../../stores/UserSongsStore';
import YouTubePlayerStore from '../../stores/YouTubePlayerStore';
import SongList from '../SongList/SongList';
import { Input, ButtonInput } from 'react-bootstrap';

require('./UserSongs.scss');

class UserSongs extends React.Component {

  constructor(props) {
    super(props);

    this.state = this._getStateFromStores();
    this.user = props.user;
  }

  componentDidMount() {
    UserSongsStore.listen(this._onChange);
    YouTubePlayerStore.listen(this._onChange);
    UserSongsStore.fetchSongs(this.user._id);
  }

  componentWillUnmount() {
    UserSongsStore.unlisten(this._onChange);
    YouTubePlayerStore.unlisten(this._onChange);
  }

  _getStateFromStores = () => {
    return {
      songs: UserSongsStore.getSongs(),
      youtube: YouTubePlayerStore.getState(),
    };
  }

  _onChange = () => {
    this.setState(this._getStateFromStores);
  }

  _onAddYouTubeSong = (e) => {
    e.preventDefault();

    const url = this.refs.url.getValue();
    UserSongsStore.addYouTubeSong(url);
  }

  render() {
    return (
      <div className="user-songs">

          <div className="user-songs--header row">
              <div className="add-song-form col-xs-12">
                <form>
                  <div className="row">
                    <Input type="text" placeholder="YouTube URL" ref="url" wrapperClassName="yt-url-wrapper col-xs-9" />
                    <ButtonInput type="submit" bsStyle="primary" value="Add Song" onClick={this._onAddYouTubeSong} className="btn-block" wrapperClassName="add-song-wrapper col-xs-3"/>
                  </div>
                </form>
              </div>
          </div>

          <div className="row">
            <div className="col-xs-12">
              <SongList
                songs={this.state.songs}
                youtube={this.state.youtube}
              />
            </div>
          </div>

      </div>
    );
  }
}

module.exports = UserSongs;

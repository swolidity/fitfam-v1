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
    return (
      <div className="UserSongs">
        <div className="container">
          <form>
            <Input type="text" placeholder="YouTube URL" ref="url" />
            <ButtonInput type="submit" bsStyle="primary" value="Add Song" onClick={this._onAddYoutubeSong} />
          </form>

          <SongList songs={this.state.songs} />
        </div>
      </div>
    );
  }
}

module.exports = UserSongs;

import React from 'react';
import UserSongsStore from '../../stores/UserSongsStore';
import YouTubePlayerStore from '../../stores/YouTubePlayerStore';
import LoginStore from '../../stores/LoginStore';
import SongList from '../SongList/SongList';
import AddSongModal from '../AddSongModal/AddSongModal';
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

  _onFilter = (e) => {
    UserSongsStore.fetchSongs(this.user._id, e.target.value);
  }

  render() {
    return (
      <div className="user-songs">

          <div className="user-songs--header row clearfix">

            <div className="filter col-xs-4">
              <Input onChange={this._onFilter} type="text" placeholder="filter" ref="filter" standalone />
            </div>

            <AddSongModal />

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

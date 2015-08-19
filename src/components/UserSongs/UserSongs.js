import React from 'react';
import UserSongsStore from '../../stores/UserSongsStore';
import LoginStore from '../../stores/LoginStore';
import SongList from '../SongList/SongList';
import AddSongModal from '../AddSongModal/AddSongModal';
import { Input } from 'react-bootstrap';

require('./UserSongs.scss');

class UserSongs extends React.Component {
  static propTypes = { user: React.PropTypes.object.isRequired };

  constructor(props) {
    super(props);

    this.state = this._getStateFromStores();
  }

  componentDidMount() {
    UserSongsStore.listen(this._onChange);
    LoginStore.listen(this._onChange);

    UserSongsStore.fetchSongs(this.props.user._id);
  }

  componentWillUnmount() {
    UserSongsStore.unlisten(this._onChange);
    LoginStore.unlisten(this._onChange);
  }

  _getStateFromStores = () => {
    return {
      songs: UserSongsStore.getSongs(),
    };
  }

  _onChange = () => {
    this.setState(this._getStateFromStores);
  }

  _onFilter = (e) => {
    UserSongsStore.fetchSongs(this.props.user._id, e.target.value);
  }

  render() {
    let addSong;

    if (LoginStore.isLoggedIn()) {
      addSong = <AddSongModal showModal={false} />;
    }

    return (
      <div className="user-songs">

          <div className="user-songs--header row clearfix">

            <div className="filter col-xs-4">
              <Input onChange={this._onFilter} type="text" placeholder="filter" ref="filter" standalone />
            </div>

            {addSong}

          </div>

          <div className="row">
            <div className="col-xs-12">
              <SongList songs={this.state.songs} />
            </div>
          </div>
      </div>
    );
  }
}

module.exports = UserSongs;

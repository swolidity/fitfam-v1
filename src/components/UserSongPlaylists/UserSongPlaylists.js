import React from 'react';
import UserSongPlaylistsStore from '../../stores/UserSongPlaylistsStore';
import PlaylistList from '../PlaylistList/PlaylistList';
import Spinner from '../Spinner/Spinner';

require('./UserSongPlaylists.scss');

class UserSongPlaylists extends React.Component {
  static propTypes = { user: React.PropTypes.object.isRequired };

  constructor(props) {
    super(props);

    this.state = UserSongPlaylistsStore.getState();
  }

  componentWillMount() {
    if (this.state.userID && this.props.user._id !== this.state.userID) {
      this.setState({ playlists: null });
    }
  }

  componentDidMount() {
    UserSongPlaylistsStore.listen(this._onChange);
    UserSongPlaylistsStore.fetchPlaylists(this.props.user._id);
  }

  componentWillUnmount() {
    UserSongPlaylistsStore.unlisten(this._onChange);
  }

  _onChange = (state) => {
    this.setState(state);
  }

  render() {
    console.log(this.state.playlists);

    if (this.state.playlists === null) {
      return <Spinner />;
    }

    if (this.state.playlists.length === 0) {
      return false;
    }

    return (
      <div className="user-song-playlists">
        <div className="row">
          <div className="col-xs-12">
            <div className="user-song-playlists__title">
              <a href="#">Playlists</a>
            </div>
            <PlaylistList playlists={this.state.playlists} />
          </div>
        </div>
      </div>
    );
  }
}

module.exports = UserSongPlaylists;

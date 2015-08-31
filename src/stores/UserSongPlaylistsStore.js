import alt from '../alt';
import UserSongPlaylistsActions from '../actions/UserSongPlaylistsActions';
import UserSongPlaylistsSource from '../sources/UserSongPlaylistsSource';

class UserSongPlaylistsStore {
  constructor() {
    this.userID = null;
    this.playlists = [];
    this.err = null;

    this.bindActions(UserSongPlaylistsActions);
    this.exportAsync(UserSongPlaylistsSource);
  }

  onFetchPlaylistsSuccess(res) {
    this.playlists = res.playlists;
    this.userID = res.user_id;
  }

  onFetchPlaylistsFailed(err) {
    this.err = err;
  }
}

module.exports = alt.createStore(UserSongPlaylistsStore, 'UserSongPlaylistsStore');

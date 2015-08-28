import alt from '../alt';
import UserSongsActions from '../actions/UserSongsActions';
import UserSongsSource from '../sources/UserSongsSource';

class UserSongsStore {
  constructor() {
    this.userID = null;
    this.songs = [];
    this.err = null;

    this.bindActions(UserSongsActions);
    this.exportAsync(UserSongsSource);
  }

  onFetchSongs() {
    this.songs = null;
  }

  onReceiveSongs(res) {
    this.songs = res.songs;
    this.userID = res.user_id;
  }

  onReceiveSongsFailed(err) {
    this.err = err;
  }

  onAddSong(song) {
    this.songs.unshift(song);
  }

  onAddSongFailed(err) {
    this.err = err;
  }

  static getSongs() {
    return this.getState().songs;
  }
}

module.exports = alt.createStore(UserSongsStore, 'UserSongsStore');

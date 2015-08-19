import alt from '../alt';
import SongsActions from '../actions/SongsActions';
import SongsSource from '../sources/SongsSource';

class SongsStore {
  constructor() {
    this.songs = [];
    this.err = null;

    this.bindActions(SongsActions);
    this.exportAsync(SongsSource);
  }

  onFetchSongsSuccess(songs) {
    this.songs = songs;
  }

  onFetchSongsFailed(err) {
    this.err = err;
  }

  static getSongs() {
    return this.getState().songs;
  }
}

module.exports = alt.createStore(SongsStore, 'SongsStore');

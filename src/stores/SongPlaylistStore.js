import alt from '../alt';
import SongPlaylistActions from '../actions/SongPlaylistActions';
import SongPlaylistSource from '../sources/SongPlaylistSource';

class SongPlaylistStore {
  constructor() {
    this.playlist = null;
    this.songs = [];
    this.err = null;

    this.bindActions(SongPlaylistActions);
    this.exportAsync(SongPlaylistSource);
  }

  onFetchPlaylistSuccess(res) {
    this.playlist = res.playlist;
    this.songs = res.songs;
  }

  onFetchPlaylistFailed(err) {
    this.err = err;
  }
}

module.exports = alt.createStore(SongPlaylistStore, 'SongPlaylistStore');

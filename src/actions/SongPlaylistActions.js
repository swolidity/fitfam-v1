import alt from '../alt';

class SongPlaylistActions {

  fetchPlaylistSuccess(res) {
    this.dispatch(res);
  }

  fetchPlaylistFailed(err) {
    this.err = err;
  }
}

module.exports = alt.createActions(SongPlaylistActions);

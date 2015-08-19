import alt from '../alt';

class SongsActions {
  fetchSongsSuccess(songs) {
    this.dispatch(songs);
  }

  fetchSongsFailed(err) {
    this.dispatch(err);
  }
}

module.exports = alt.createActions(SongsActions);

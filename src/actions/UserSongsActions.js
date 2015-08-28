import alt from '../alt';

class UserSongsActions {
  fetchSongs() {
    this.dispatch();
  }

  receiveSongs(songs) {
    this.dispatch(songs);
  }

  receiveSongsFailed(err) {
    this.dispatch(err);
  }

  addSong(song) {
    this.dispatch(song);
  }

  addSongFailed(err) {
    this.dispatch(err);
  }
}

module.exports = alt.createActions(UserSongsActions);

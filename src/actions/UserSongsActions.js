import alt from '../alt';

class UserSongsActions {
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

  updatePlaying(song) {
    this.dispatch(song);
  }
}

module.exports = alt.createActions(UserSongsActions);

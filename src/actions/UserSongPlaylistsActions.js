import alt from '../alt';

class UserSongPlaylistsActions {

  fetchPlaylistsSuccess(res) {
    this.dispatch(res);
  }

  fetchPlaylistsFailed(err) {
    this.dispatch(err);
  }
}

module.exports = alt.createActions(UserSongPlaylistsActions);

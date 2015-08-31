import UserSongPlaylistsActions from '../actions/UserSongPlaylistsActions';
import http from 'axios';

const UserSongPlaylistsSource = {
  fetchPlaylists: {
    remote(state, userID) {
      return http.get('/api/users/' + userID + '/songs/playlists')
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return Promise.reject(err.data);
      });
    },
    local() {
      return null;
    },
    success: UserSongPlaylistsActions.fetchPlaylistsSuccess,
    error: UserSongPlaylistsActions.fetchPlaylistsFailed,
  },
};

module.exports = UserSongPlaylistsSource;

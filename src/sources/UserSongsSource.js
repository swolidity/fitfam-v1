import UserSongsActions from '../actions/UserSongsActions';
import LoginStore from '../stores/LoginStore';
import http from 'axios';

const UserSongsSource = {
  fetchSongs: {
    remote(state, userId) {
      return http.get('/api/users/' + userId + '/songs')
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
    success: UserSongsActions.receiveSongs,
    error: UserSongsActions.receiveSongsFailed,
  },

  addYoutubeSong: {
    remote(state, url) {
      const token = LoginStore.getToken();
      return http.post('/api/songs/youtube', {
        url: url,
      },
      {
        headers: { 'Authorization': 'JWT ' + token },
      })
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
    success: UserSongsActions.addSong,
    error: UserSongsActions.addSongFailed,
  },
};

module.exports = UserSongsSource;

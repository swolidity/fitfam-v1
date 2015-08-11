import UserSongsActions from '../actions/UserSongsActions';
import LoginStore from '../stores/LoginStore';
import http from 'axios';

const UserSongsSource = {
  fetchSongs: {
    remote(state, userId, query) {
      return http.post('/api/users/' + userId + '/songs', {
        q: query,
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
    success: UserSongsActions.receiveSongs,
    error: UserSongsActions.receiveSongsFailed,
  },

  addYouTubeSong: {
    remote(state, song) {
      const token = LoginStore.getToken();
      return http.post('/api/songs/youtube', {
        url: song.url,
        tags: song.tags,
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

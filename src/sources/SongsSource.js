import SongsActions from '../actions/SongsActions';
import http from 'axios';

const SongsSource = {
  fetchSongs: {
    remote() {
      return http.get('/api/songs')
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
    success: SongsActions.fetchSongsSuccess,
    error: SongsActions.fetchSongsError,
  },
};

module.exports = SongsSource;

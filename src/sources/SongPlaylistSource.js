import SongPlaylistActions from '../actions/SongPlaylistActions';
import http from 'axios';

const SongPlaylistSource = {
  fetchPlaylist: {
    remote(state, playlistID) {
      return http.get('/api/songs/playlists/' + playlistID)
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
    success: SongPlaylistActions.fetchPlaylistSuccess,
    error: SongPlaylistActions.fetchPlaylistFailed,
  },
};

module.exports = SongPlaylistSource;

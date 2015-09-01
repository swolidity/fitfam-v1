import GenreActions from '../actions/GenreActions';
import http from 'axios';

const GenreSource = {
  fetchGenres: {
    remote() {
      return http.get('/api/genres')
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return Promise.reject(err.data);
      });
    },
    local(state) {
      return state.genres.length ? state.genres : null;
    },
    success: GenreActions.fetchGenresSuccess,
    error: GenreActions.fetchGenresFailed,
  },
};

module.exports = GenreSource;

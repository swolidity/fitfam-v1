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
        return err.data;
      });
    },
    local() {
      return null;
    },
    success: GenreActions.fetchGenresSuccess,
    error: GenreActions.fetchGenresFailed,
  },
};

module.exports = GenreSource;

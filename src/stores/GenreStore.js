import alt from '../alt';
import GenreActions from '../actions/GenreActions';
import GenreSource from '../sources/GenreSource';

class GenreStore {
  constructor() {
    this.genres = [];
    this.err = null;

    this.bindActions(GenreActions);
    this.exportAsync(GenreSource);
  }

  onFetchGenresSuccess(genres) {
    this.genres = genres;
  }

  onFetchGenresFailed(err) {
    this.err = err;
  }

  static getGenres() {
    return this.getState().genres;
  }
}

module.exports = alt.createStore(GenreStore, 'GenreStore');

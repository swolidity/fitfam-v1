import alt from '../alt';

class GenreActions {
  fetchGenresSuccess(genres) {
    this.dispatch(genres);
  }

  fetchGenresFailed(err) {
    this.dispatch(err);
  }
}

module.exports = alt.createActions(GenreActions);

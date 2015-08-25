import React from 'react';
import GenreStore from '../../stores/GenreStore';
import { Link } from 'react-router';

require('./GenreFilter.scss');

class GenreFilter extends React.Component {
  static propTypes = { user: React.PropTypes.object };

  constructor(props) {
    super(props);

    this.state = GenreStore.getState();
  }

  componentDidMount() {
    GenreStore.listen(this._onChange);
    GenreStore.fetchGenres();
  }

  componentWillUnmount() {
    GenreStore.unlisten(this._onChange);
  }

  _onChange = (state) => {
    this.setState(state);
  }

  _getGenreListItem = (genre) => {
    return (
      <li key={genre._id}>
        <Link to="user-songs" params={{ username: this.props.user.username }} query={{ genre: genre.slug }}>{genre.name}</Link>
      </li>
    );
  }

  render() {
    const genreListItems = this.state.genres.map(this._getGenreListItem);

    return (
      <div className="genre-filter">
        <div className="genre-filter__title">
          Filter Genre
          <ul className="genre-list">
            <li><Link to={'/' + this.props.user.username + '/songs'}>All</Link></li>
            {genreListItems}
          </ul>
        </div>
      </div>
    );
  }
}

module.exports = GenreFilter;

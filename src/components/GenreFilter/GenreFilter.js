import React from 'react';
import GenreStore from '../../stores/GenreStore';
import { SplitButton } from 'react-bootstrap';
import { MenuItemLink } from 'react-router-bootstrap';

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
      <MenuItemLink
        key={genre._id}
        to="user-songs"
        params={{ username: this.props.user.username }}
        query={{ genre: genre.slug }}
        >
        {genre.name}
      </MenuItemLink>
    );
  }

  render() {
    const genreListItems = this.state.genres.map(this._getGenreListItem);

    return (
      <div className="genre-filter">
        <SplitButton bsStyle="default" title="Genre">
          <MenuItemLink key={this.props.user._id} to={'/' + this.props.user.username + '/songs'}>All</MenuItemLink>
          {genreListItems}
        </SplitButton>
      </div>
    );
  }
}

module.exports = GenreFilter;

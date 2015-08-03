import React from 'react';
import SongListItem from '../SongListItem/SongListItem';

require('./SongList.scss');

class SongList extends React.Component {

  _getSongListItem = (song) => {
    return (
      <SongListItem key={song._id} song={song} />
    );
  }

  render() {
    const songListItems = this.props.songs.map(this._getSongListItem);

    return (
      <ul className="song-list">
        {songListItems}
      </ul>
    );
  }
}

SongList.propTypes = { songs: React.PropTypes.array };

module.exports = SongList;

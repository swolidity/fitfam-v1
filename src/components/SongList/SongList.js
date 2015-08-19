import React from 'react';
import SongListItem from '../SongListItem/SongListItem';

require('./SongList.scss');

class SongList extends React.Component {

  _getSongListItem = (song) => {
    return (
      <SongListItem
        key={song._id}
        song={song}
        youtube={this.props.youtube}
      />
    );
  }

  render() {
    const songListItems = this.props.songs.map(this._getSongListItem);

    return (
      <div className="song-list">
        {songListItems}
      </div>
    );
  }
}

SongList.propTypes = {
  songs: React.PropTypes.array,
  youtube: React.PropTypes.object,
};

module.exports = SongList;

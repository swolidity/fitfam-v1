import React from 'react';

require('./SongListItem.scss');

class SongListItem extends React.Component {
  render() {
    const song = this.props.song;
    const thumbnail = song.thumbnails.default;
    return (
      <li className="song-list-item row">
        <div className="song-list-item--thumbnail col-xs-2">
          <img src={thumbnail.url} alt={song.title} />
        </div>
        <div className="song-list-item--title col-xs-10">{song.title}</div>
      </li>
    );
  }
}

SongListItem.propTypes = { song: React.PropTypes.object };

module.exports = SongListItem;

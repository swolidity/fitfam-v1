import React from 'react';
import { Link } from 'react-router';

class PlaylistList extends React.Component {
  static propTypes = { playlists: React.PropTypes.array.isRequired };

  _getPlaylistListItem = (playlist) => {
    return (
      <div className="playlist-list-item">
        <Link to="song-playlist" params={{ playlist_id: playlist._id }}>{playlist.name}</Link>
      </div>
    );
  }

  render() {
    const playlistListItems = this.props.playlists.map(this._getPlaylistListItem);

    return (
      <div className="playlist-list">
        {playlistListItems}
      </div>
    );
  }
}

module.exports = PlaylistList;

import React from 'react';
import PlaylistItem from '../PlaylistItem/PlaylistItem';


class PlaylistList extends React.Component {
  static propTypes = { playlists: React.PropTypes.array.isRequired };

  _getPlaylistListItem = (playlist) => {
    return (
      <PlaylistItem key={playlist._id} playlist={playlist} />
    );
  }

  render() {
    const playlistListItems = this.props.playlists.map(this._getPlaylistListItem);

    return (
      <div className="playlist-list">
        <div className="row">
          {playlistListItems}
        </div>
      </div>
    );
  }
}

module.exports = PlaylistList;

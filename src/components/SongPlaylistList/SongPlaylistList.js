import React from 'react';
import YouTubePlayerStore from '../../stores/YouTubePlayerStore';
import SongListItem from '../SongListItem/SongListItem';
import Spinner from '../Spinner/Spinner';

class SongPlaylistList extends React.Component {

  constructor(props) {
    super(props);

    this.state = { youtube: YouTubePlayerStore.getState() };
  }

  componentDidMount() {
    YouTubePlayerStore.listen(this._onChange);
  }

  componentWillUnmount() {
    YouTubePlayerStore.unlisten(this._onChange);
  }

  _onChange = (state) => {
    this.setState({ youtube: state });
  }

  _getSongListItem = (songXref) => {
    return (
      <SongListItem
        key={songXref._id}
        song={songXref._song}
        youtube={this.state.youtube}
      />
    );
  }

  render() {
    if (!this.props.songs) {
      return <Spinner />;
    }

    const songListItems = this.props.songs.map(this._getSongListItem);

    return (
      <div className="song-playlist-list">
        {songListItems}
      </div>
    );
  }
}

SongPlaylistList.propTypes = {
  songs: React.PropTypes.array,
  youtube: React.PropTypes.object,
};

module.exports = SongPlaylistList;

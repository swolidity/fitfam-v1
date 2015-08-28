import React from 'react';
import YouTubePlayerStore from '../../stores/YouTubePlayerStore';
import SongListItem from '../SongListItem/SongListItem';
import Spinner from '../Spinner/Spinner';

require('./SongList.scss');

class SongList extends React.Component {

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

  _getSongListItem = (song) => {
    return (
      <SongListItem
        key={song._id}
        song={song}
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

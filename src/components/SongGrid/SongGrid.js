import React from 'react';
import YouTubePlayerStore from '../../stores/YouTubePlayerStore';
import SongGridItem from '../SongGridItem/SongGridItem';
import Spinner from '../Spinner/Spinner';

require('./SongGrid.scss');

class SongGrid extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      youtube: YouTubePlayerStore.getState(),
    };
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

  _getSongGridItem = (song) => {
    return <SongGridItem key={song._id} song={song} youtube={this.state.youtube} />;
  }

  render() {
    if (!this.props.songs) {
      return <Spinner />;
    }

    const songGridItems = this.props.songs.map(this._getSongGridItem);

    return (
      <div className="song-grid row">
        {songGridItems}
      </div>
    );
  }
}

SongGrid.propTypes = {
  songs: React.PropTypes.array,
  youtube: React.PropTypes.object,
};

module.exports = SongGrid;

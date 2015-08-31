import React from 'react';
import SongPlaylistStore from '../../stores/SongPlaylistStore';
import SongPlaylistList from '../SongPlaylistList/SongPlaylistList';
import Spinner from '../Spinner/Spinner';
import ProfilePhoto from '../ProfilePhoto/ProfilePhoto';

require('./SongPlaylist.scss');

class SongPlaylist extends React.Component {
  static propTypes = { params: React.PropTypes.object.isRequired };

  constructor(props) {
    super(props);

    this.state = SongPlaylistStore.getState();
  }

  componentWillMount() {
    if (this.state.playlist && this.props.params.playlist_id !== this.state.playlist._id) {
      this.setState({ playlist: null });
    }
  }

  componentDidMount() {
    SongPlaylistStore.listen(this._onChange);
    SongPlaylistStore.fetchPlaylist(this.props.params.playlist_id);
  }

  componentWillUnmount() {
    SongPlaylistStore.unlisten(this._onChange);
  }

  _onChange = (state) => {
    this.setState(state);
  }

  render() {
    if (!this.state.playlist) {
      return <Spinner />;
    }

    return (
      <div className="song-playlist">
        <div className="song-playlist__header center">
          <ProfilePhoto height="120" className="img-circle" user={this.state.playlist._user} />
          <h3>{this.state.playlist.name}</h3>
        </div>

        <SongPlaylistList songs={this.state.songs} />
      </div>
    );
  }
}

module.exports = SongPlaylist;

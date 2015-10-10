import React from 'react';
import { Link } from 'react-router';
import http from 'axios';

require('./PlaylistItem.scss');

class PlaylistItem extends React.Component {
  static propTypes = { playlist: React.PropTypes.object.isRequired };

  constructor(props) {
    super(props);

    this.state = {
      thumbnail: null,
      err: null,
    };
  }

  componentDidMount() {
    http.get('/api/songs/playlists/' + this.props.playlist._id + '/thumbnail')
      .then((res) => {
        this.setState({ thumbnail: res.data });
      })
      .catch((err) => {
        this.setState({ err: err.data });
      });
  }

  render() {
    if (this.state.thumbnail === null) {
      return <div></div>;
    }

    const thumbnail = this.state.thumbnail.maxres ? this.state.thumbnail.maxres : this.state.thumbnail.medium;

    return (
      <div className="playlist-item col-xs-12 col-sm-3">
        <div className="playlist-item__background">
          <div className="embed-responsive embed-responsive-16by9">
            <img className="embed-responsive-item" src={thumbnail.url} />
          </div>
          <div className="playlist-item__overlay">
            <Link className="playlist-item__name" to="song-playlist" params={{ playlist_id: this.props.playlist._id }}>{this.props.playlist.name}</Link>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = PlaylistItem;

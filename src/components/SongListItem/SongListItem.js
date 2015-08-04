import React from 'react';
import UserSongsActions from '../../actions/UserSongsActions';
import moment from 'moment';

require('./SongListItem.scss');

class SongListItem extends React.Component {

  constructor(props) {
    super(props);
    this.song = props.song;
  }

  _onClick = () => {
    UserSongsActions.updatePlaying(this.song);
  }

  render() {
    const thumbnail = this.song.thumbnails.default;
    return (
      <li className="song-list-item row">
        <div className="song-list-item--thumbnail col-xs-2">
          <img src={thumbnail.url} alt={this.song.title} onClick={this._onClick} />
        </div>
        <div className="song-list-item--title col-xs-10">{this.song.title}</div>
        <div className="col-xs-10">
          <img height="25" className="user-photo img-circle" src={this.song._user.photo} alt={this.song._user.username} />
          Added {moment(this.song.date).fromNow()}
        </div>
      </li>
    );
  }
}

SongListItem.propTypes = { song: React.PropTypes.object };

module.exports = SongListItem;

import React from 'react';
import SongsStore from '../../stores/SongsStore';
import SongList from '../SongList/SongList';

require('./Songs.scss');

class Songs extends React.Component {
  constructor(props) {
    super(props);

    this.state = SongsStore.getState();
  }

  componentDidMount() {
    SongsStore.listen(this._onChange);
    SongsStore.fetchSongs();
  }

  componentWillUnmount() {
    SongsStore.unlisten(this._onChange);
  }

  _onChange = (state) => {
    this.setState(state);
  }

  render() {
    return (
      <div className="songs">
        <div className="col-xs-10 col-xs-offset-1">
          <SongList songs={this.state.songs} />
        </div>
      </div>
    );
  }
}

module.exports = Songs;

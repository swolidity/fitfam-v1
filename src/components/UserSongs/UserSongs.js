import React from 'react';
import UserSongsActions from '../../actions/UserSongsActions';
import UserSongsStore from '../../stores/UserSongsStore';
import LoginStore from '../../stores/LoginStore';
import SongGrid from '../SongGrid/SongGrid';
import AddSongModal from '../AddSongModal/AddSongModal';
import GenreFilter from '../GenreFilter/GenreFilter';
import { Input } from 'react-bootstrap';

require('./UserSongs.scss');

class UserSongs extends React.Component {
  static propTypes = {
    user: React.PropTypes.object.isRequired,
    query: React.PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = UserSongsStore.getState();
  }

  componentWillMount() {
    if (this.state.userID && this.props.user._id !== this.state.userID) {
      this.setState({ songs: null });
    }
  }

  componentDidMount() {
    UserSongsStore.listen(this._onChange);

    UserSongsStore.fetchSongs(this.props.user._id, '', this.props.query.genre);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.query.genre || this.props.query.genre) {
      UserSongsActions.fetchSongs();
    }

    UserSongsStore.fetchSongs(this.props.user._id, '', nextProps.query.genre);
  }

  componentWillUnmount() {
    UserSongsStore.unlisten(this._onChange);
  }

  _onChange = (state) => {
    this.setState(state);
  }

  _onFilter = (e) => {
    UserSongsStore.fetchSongs(this.props.user._id, e.target.value, this.props.query.genre);
  }

  render() {
    let addSong;

    if (LoginStore.isLoggedIn()) {
      addSong = <AddSongModal showModal={false} />;
    }

    return (
      <div className="row">

        <div className="col-xs-12">
          <div className="user-songs">

              <div className="user-songs--header clearfix">
                <div className="row">
                  <div className="filter col-xs-12 col-sm-8">
                    <Input onChange={this._onFilter} type="text" placeholder="filter" ref="filter" standalone />
                  </div>

                  <div className="col-xs-12 col-sm-4">
                    <div className="add-song-btn-container pull-right">
                      {addSong}
                    </div>

                    <div className="genre-filter-container pull-right">
                      <GenreFilter user={this.props.user}/>
                    </div>
                  </div>
                </div>

              </div>

              <div className="row">
                <div className="col-xs-12">
                  <SongGrid songs={this.state.songs} />
                </div>
              </div>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = UserSongs;

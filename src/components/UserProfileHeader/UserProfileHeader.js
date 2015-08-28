import React from 'react';
import YouTubePlayerActions from '../../actions/YouTubePlayerActions';
import YouTubePlayerStore from '../../stores/YouTubePlayerStore';
import FollowButton from '../FollowButton/FollowButton';
import { Link } from 'react-router';

require('./UserProfileHeader.scss');

class UserProfileHeader extends React.Component {
  static propTypes = {
    user: React.PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = this._getStateFromStores();
  }

  componentDidMount() {
    YouTubePlayerStore.listen(this._onChange);
  }

  componentWillUnmount() {
    YouTubePlayerStore.unlisten(this._onChange);
  }

  _getStateFromStores = () => {
    return {
      youtube: YouTubePlayerStore.getState(),
    };
  }

  _onChange = () => {
    this.setState(this._getStateFromStores());
  }

  _onPhotoCick = (e) => {
    e.preventDefault();

    if (this.props.user.profile_song) {
      const playing = this.state.youtube.playing;
      const player = this.state.youtube.player;

      if (player === null) {
        YouTubePlayerActions.updatePlaying(this.props.user.profile_song);
        return;
      }

      const playerState = player.getPlayerState();

      if (this.props.user.profile_song._id === playing._id) {
        if (playerState === 1) {
          // if player is playing, then pause
          player.pauseVideo();
        } else {
          // player is not playing around yo, but we gonna play anyway
          player.playVideo();
        }
      } else {
        YouTubePlayerActions.updatePlaying(this.props.user.profile_song);
      }
    }
  }

  _getIcon = () => {
    if (!this.props.user.profile_song) {
      return;
    }

    const song = this.props.user.profile_song;
    const player = this.state.youtube.player;
    const playing = this.state.youtube.playing;
    const playIcon = <i className="profile-song-icon play fa fa-play-circle"></i>;
    const pauseIcon = <i className="profile-song-icon pause fa fa-pause"></i>;

    if (player === null || playing === null) {
      return playIcon;
    }

    if ( (song._id === playing._id) && (player.getPlayerState() === 1) ) {
      return pauseIcon;
    }

    if ( (song._id === playing._id) && (player.getPlayerState() === 3) ) {
      return pauseIcon;
    }

    return playIcon;
  }


  render() {
    return (
      <div className="user-profile-header">
        <div className="user-profile-header__user-info clearfix">
          <div className="row">

            <div className="col-xs-12 col-sm-9 col-md-10">
              <div className="profile-photo-container">
                <div className="profile-photo center">
                  <a href="#">
                    <img className="img-circle" src={this.props.user.photo} alt={this.props.user.username} />
                  </a>
                  <div className="profile-song-icon-wrapper" onClick={this._onPhotoCick}>
                    {this._getIcon()}
                  </div>
                </div>
              </div>

              <div className="username-bio">
                  <div className="username"><Link to="user-profile" params={{ username: this.props.user.username }}>{this.props.user.username}</Link></div>
                  <div className="bio">{this.props.user.bio}</div>
              </div>
            </div>

            <div className="col-xs-12 col-sm-3 col-md-2">
              <FollowButton followedID={this.props.user._id} bsStyle="primary" className="pull-right" />
            </div>

          </div>
        </div>
      </div>
    );
  }
}

module.exports = UserProfileHeader;

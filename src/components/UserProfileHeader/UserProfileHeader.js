import React from 'react';
import YouTubePlayerActions from '../../actions/YouTubePlayerActions';
import YouTubePlayerStore from '../../stores/YouTubePlayerStore';
import UserFollowCount from '../UserFollowCount/UserFollowCount';
import FollowButton from '../FollowButton/FollowButton';
import { Link } from 'react-router';

require('./UserProfileHeader.scss');

class UserProfileHeader extends React.Component {
  static propTypes = {
    user: React.PropTypes.object.isRequired,
  };

  static contextTypes = {
    sidebar: React.PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = this._getStateFromStores();
  }

  componentDidMount() {
    YouTubePlayerStore.listen(this._onChange);

    setTimeout(() => {
      this._scrollDown();
    }, 0.1);
  }

  componentWillReceiveProps() {
    // shouldScroll?
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

      if (!this.context.sidebar) {
        YouTubePlayerActions.updatePlaying(this.props.user.profile_song);
        player.playVideo();
      }

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
    const playIcon = <i className="profile-song-icon play fa fa-play"></i>;
    const pauseIcon = <i className="profile-song-icon pause fa fa-pause"></i>;

    if (player === null || playing === null || !this.context.sidebar) {
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

  _scrollDown = () => {
    $('.user-profile-header').css('margin-top', 0);
    window.scrollTo(0, 665);
  }

  render() {
    this._scrollDown();

    return (
      <div className="user-profile-header">
        <div className="headerbar" style={{ background: 'url(' + this.props.user.header_photo + ') center;', backgroundSize: 'cover'}}>
          <div id="headerbarScrollTo"></div>
        </div>
        <div className="container-fluid-5">
          <div className="row">
            <div className="col-xs-12">
                <div className="profile-photo-container">
                  <div className="profile-photo">
                    <a href="#">
                      <img className="img-circle" src={this.props.user.photo} alt={this.props.user.username} />
                    </a>
                    <div className="profile-song-icon-wrapper" onClick={this._onPhotoCick}>
                      <div className="icon-border">
                        {this._getIcon()}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="usernames">
                  <div className="v-align">
                    <div className="username"><Link to="user-profile" params={{ username: this.props.user.username }}>{this.props.user.username}</Link></div>
                    <div className="user-full-name">{this.props.user.full_name}</div>
                  </div>
                </div>

                <div className="user-profile-header__follow">
                  <div className="v-align">
                    <UserFollowCount user={this.props.user} />
                    <FollowButton followedID={this.props.user._id} bsStyle="primary" />
                  </div>
                </div>

                <div style={{ clear: 'both '}}></div>

                <div className="bio">{this.props.user.bio}</div>

            </div>

          </div>
        </div>
      </div>
    );
  }
}

module.exports = UserProfileHeader;

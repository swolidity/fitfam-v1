import React from 'react';
import UserVideosStore from '../../stores/UserVideosStore';
import YouTubePlayerStore from '../../stores/YouTubePlayerStore';
import VideoList from '../VideoList/VideoList';
import { Input, ButtonInput } from 'react-bootstrap';

require('./UserVideos.scss');

class UserVideos extends React.Component {

  constructor(props) {
    super(props);

    this.state = this._getStateFromStores();
    this.user = props.user;
  }

  componentDidMount() {
    UserVideosStore.listen(this._onChange);
    YouTubePlayerStore.listen(this._onChange);
    UserVideosStore.fetchVideos(this.user._id);
  }

  componentWillUnmount() {
    UserVideosStore.unlisten(this._onChange);
    YouTubePlayerStore.unlisten(this._onChange);
  }

  _getStateFromStores = () => {
    return {
      videos: UserVideosStore.getVideos(),
      youtube: YouTubePlayerStore.getState(),
    };
  }

  _onChange = () => {
    this.setState(this._getStateFromStores);
  }

  _onAddYouTubeVideo = (e) => {
    e.preventDefault();

    const url = this.refs.url.getValue();
    UserVideosStore.addYouTubeVideo(url);
  }

  render() {
    return (
      <div className="user-videos">

          <div className="user-videos--header row">
            <div className="add-video-form col-xs-12">
              <form>
                <div className="row">
                  <Input type="text" placeholder="YouTube URL" ref="url" wrapperClassName="yt-url-wrapper col-xs-9" />
                  <ButtonInput type="submit" bsStyle="primary" value="Add Video" onClick={this._onAddYouTubeVideo} className="btn-block" wrapperClassName="add-video-wrapper col-xs-3"/>
                </div>
              </form>
            </div>
          </div>


          <div className="row">
            <div className="col-xs-12">
              <VideoList
                videos={this.state.videos}
                youtube={this.state.youtube}
              />
            </div>
          </div>

      </div>
    );
  }
}

module.exports = UserVideos;

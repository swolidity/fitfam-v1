import React from 'react';
import YouTubePlayerStore from '../../stores/YouTubePlayerStore';
import VideoListItem from '../VideoListItem/VideoListItem';

require('./VideoList.scss');

class VideoList extends React.Component {

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

  _getVideoListItem = (video) => {
    return (
      <VideoListItem
        key={video._id}
        video={video}
        youtube={this.state.youtube}
      />
    );
  }

  render() {
    const videoListItems = this.props.videos.map(this._getVideoListItem);

    return (
      <div className="video-list">
        {videoListItems}
      </div>
    );
  }
}

VideoList.propTypes = {
  videos: React.PropTypes.array,
};

module.exports = VideoList;

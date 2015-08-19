import React from 'react';
import VideoListItem from '../VideoListItem/VideoListItem';

require('./VideoList.scss');

class VideoList extends React.Component {

  _getVideoListItem = (video) => {
    return (
      <VideoListItem
        key={video._id}
        video={video}
        youtube={this.props.youtube}
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
  youtube: React.PropTypes.object,
};

module.exports = VideoList;

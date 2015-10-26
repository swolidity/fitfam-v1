import React from 'react';
import YouTubePlayerStore from '../../stores/YouTubePlayerStore';
import VideoGridItem from '../VideoGridItem/VideoGridItem';
import Spinner from '../Spinner/Spinner';

require('./VideoGrid.scss');

class VideoGrid extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      youtube: YouTubePlayerStore.getState(),
    };
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

  _getVideoGridItem = (video) => {
    return <VideoGridItem key={video._id} video={video} youtube={this.state.youtube} />;
  }

  render() {
    if (!this.props.videos) {
      return <Spinner />;
    }

    const videoGridItems = this.props.videos.map(this._getVideoGridItem);

    return (
      <div className="video-grid row">
        {videoGridItems}
      </div>
    );
  }
}

VideoGrid.propTypes = {
  videos: React.PropTypes.array,
  youtube: React.PropTypes.object,
};

module.exports = VideoGrid;

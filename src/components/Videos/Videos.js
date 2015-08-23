import React from 'react';
import VideosStore from '../../stores/VideosStore';
import VideoList from '../VideoList/VideoList';

require('./Videos.scss');

class Videos extends React.Component {
  constructor(props) {
    super(props);

    this.state = VideosStore.getState();
  }

  componentDidMount() {
    VideosStore.listen(this._onChange);
    VideosStore.fetchVideos();
  }

  componentWillUnmount() {
    VideosStore.unlisten(this._onChange);
  }

  _onChange = (state) => {
    this.setState(state);
  }

  render() {
    return (
      <div className="videos">
        <div className="row">
          <div className="col-xs-12 col-sm-7">
            <VideoList videos={this.state.videos} />
          </div>
        </div>
      </div>
    );
  }
}

module.exports = Videos;

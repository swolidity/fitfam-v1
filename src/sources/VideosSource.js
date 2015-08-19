import VideosActions from '../actions/VideosActions';
import http from 'axios';

const VideosSource = {
  fetchVideos: {
    remote() {
      return http.get('/api/videos')
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return Promise.reject(err.data);
      });
    },
    local() {
      return null;
    },
    success: VideosActions.fetchVideosSuccess,
    error: VideosActions.fetchVideosError,
  },
};

module.exports = VideosSource;

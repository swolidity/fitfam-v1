import UserVideosActions from '../actions/UserVideosActions';
import LoginStore from '../stores/LoginStore';
import http from 'axios';

const UserVideosSource = {
  fetchVideos: {
    remote(state, userId) {
      return http.get('/api/users/' + userId + '/videos')
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
    success: UserVideosActions.receiveVideos,
    error: UserVideosActions.receiveVideosFailed,
  },

  addYouTubeVideo: {
    remote(state, url) {
      const token = LoginStore.getToken();
      return http.post('/api/videos/youtube', {
        url: url,
      },
      {
        headers: { 'Authorization': 'JWT ' + token },
      })
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
    success: UserVideosActions.addVideo,
    error: UserVideosActions.addVideoFailed,
  },
};

module.exports = UserVideosSource;

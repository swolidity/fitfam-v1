import UserPhotosActions from '../actions/UserPhotosActions';
import LoginStore from '../stores/LoginStore';
import http from 'axios';

const UserPhotosSource = {
  fetchPhotos: {
    remote(state, userId) {
      return http.get('/api/users/' + userId + '/photos')
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
    success: UserPhotosActions.receivePhotos,
    error: UserPhotosActions.receivePhotosFailed,
  },

  addPhoto: {
    remote(state, photo) {
      const token = LoginStore.getToken();
      return http.post('/api/photos/', {
        url: photo.url,
        caption: photo.caption,
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
    success: UserPhotosActions.addPhoto,
    error: UserPhotosActions.addPhotoFailed,
  },
};

module.exports = UserPhotosSource;

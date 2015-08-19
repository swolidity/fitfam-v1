import PhotosActions from '../actions/PhotosActions';
import http from 'axios';

const PhotosSource = {
  fetchPhotos: {
    remote() {
      return http.get('/api/photos')
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
    success: PhotosActions.fetchPhotosSuccess,
    error: PhotosActions.fetchPhotosError,
  },
};

module.exports = PhotosSource;

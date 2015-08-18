import alt from '../alt';
import UserPhotosActions from '../actions/UserPhotosActions';
import UserPhotosSource from '../sources/UserPhotosSource';

class UserPhotosStore {
  constructor() {
    this.photos = [];
    this.err = null;

    this.bindActions(UserPhotosActions);
    this.exportAsync(UserPhotosSource);
  }

  onReceivePhotos(photos) {
    this.photos = photos;
  }

  onReceivePhotosFailed(err) {
    this.err = err;
  }

  onAddPhoto(photo) {
    this.photos.unshift(photo);
  }

  onAddPhotoFailed(err) {
    this.err = err;
  }

  static getPhotos() {
    return this.getState().photos;
  }
}

module.exports = alt.createStore(UserPhotosStore, 'UserPhotosStore');

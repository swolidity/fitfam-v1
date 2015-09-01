import alt from '../alt';
import UserPhotosActions from '../actions/UserPhotosActions';
import UserPhotosSource from '../sources/UserPhotosSource';

class UserPhotosStore {
  constructor() {
    this.userID = null;
    this.photos = null;
    this.err = null;

    this.bindActions(UserPhotosActions);
    this.exportAsync(UserPhotosSource);
  }

  onFetchPhotos() {
    this.photos = null;
  }

  onReceivePhotos(res) {
    this.photos = res.photos;
    this.userID = res.user_id;
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

import alt from '../alt';

class UserPhotosActions {
  receivePhotos(photos) {
    this.dispatch(photos);
  }

  receivePhotosFailed(err) {
    this.dispatch(err);
  }

  addPhoto(photo) {
    this.dispatch(photo);
  }

  addPhotoFailed(err) {
    this.dispatch(err);
  }
}

module.exports = alt.createActions(UserPhotosActions);

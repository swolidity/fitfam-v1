import alt from '../alt';

class PhotosActions {
  fetchPhotosSuccess(photos) {
    this.dispatch(photos);
  }

  fetchPhotosFailed(err) {
    this.dispatch(err);
  }
}

module.exports = alt.createActions(PhotosActions);

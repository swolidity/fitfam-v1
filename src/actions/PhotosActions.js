import alt from '../alt';

class PhotosActions {
  fetchPhotosSuccess(posts) {
    this.dispatch(posts);
  }

  fetchPhotosFailed(err) {
    this.dispatch(err);
  }
}

module.exports = alt.createActions(PhotosActions);

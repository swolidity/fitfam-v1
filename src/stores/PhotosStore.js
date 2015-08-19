import alt from '../alt';
import PhotosActions from '../actions/PhotosActions';
import PhotosSource from '../sources/PhotosSource';

class PhotosStore {
  constructor() {
    this.photos = [];
    this.err = null;

    this.bindActions(PhotosActions);
    this.exportAsync(PhotosSource);
  }

  onFetchPhotosSuccess(photos) {
    this.photos = photos;
  }

  onFetchPhotosFailed(err) {
    this.err = err;
  }
}

module.exports = alt.createStore(PhotosStore, 'PhotosStore');

import React from 'react';
import PhotoListItem from '../PhotoListItem/PhotoListItem';

require('./PhotoList.scss');

class PhotoList extends React.Component {

  _getPhotoListItem = (photo) => {
    return (
      <PhotoListItem
        key={photo._id}
        photo={photo}
      />
    );
  }

  render() {
    const photoListItems = this.props.photos.map(this._getPhotoListItem);

    return (
      <div className="photo-list">
        {photoListItems}
      </div>
    );
  }
}

PhotoList.propTypes = {
  photos: React.PropTypes.array,
};

module.exports = PhotoList;

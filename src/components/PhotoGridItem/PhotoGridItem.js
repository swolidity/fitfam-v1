import React from 'react';

require('./PhotoGridItem.scss');

class PhotoGridItem extends React.Component {

  render() {
    return (
      <div className="photo-grid-item col-xs-12 col-sm-4 col-md-3 col-lg-2">
        <div className="photo-grid-item__photo">
          <img className="img-responsive" src={this.props.photo.url} />
        </div>
      </div>
    );
  }
}

PhotoGridItem.propTypes = {
  photo: React.PropTypes.object.isRequired,
  postID: React.PropTypes.string.isRequired,
  likes: React.PropTypes.number.isRequired,
};

module.exports = PhotoGridItem;

import React from 'react';
import moment from 'moment';

require('./PhotoListItem.scss');

class PhotoListItem extends React.Component {

  render() {
    return (
      <div className="photo-list-item">
        <div className="col-xs-12 col-sm-6 col-md-4">
          <div>
            <img className="photo-list-item--photo img-responsive" src={this.props.photo.url} />
          </div>

          <div className="photo-list-item--info">
            <img height="25" className="user-photo img-circle" src={this.props.photo._user.photo} alt={this.props.photo._user.username} />
            Added {moment(this.props.photo.date).fromNow()}
          </div>
        </div>
      </div>
    );
  }
}

PhotoListItem.propTypes = {
  photo: React.PropTypes.object,
};

module.exports = PhotoListItem;

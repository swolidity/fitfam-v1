import React from 'react';
import ProfilePhoto from '../ProfilePhoto/ProfilePhoto';
import moment from 'moment';

require('./PhotoListItem.scss');

class PhotoListItem extends React.Component {

  render() {
    return (
      <li className="photo-list-item row">
        <div className="col-xs-2">
          <img className="photo-list-item--photo img-responsive" src={this.props.photo.url} />
        </div>

        <div className="col-xs-10">
          <div className="photo-list-item--info">
            <div className="photo-list-item__caption">{this.props.photo.caption}</div>
            <ProfilePhoto height="25" className="user-photo img-circle" user={this.props.photo._user} />
            Added {moment(this.props.photo.date).fromNow()}
          </div>
        </div>
      </li>
    );
  }
}

PhotoListItem.propTypes = {
  photo: React.PropTypes.object,
};

module.exports = PhotoListItem;

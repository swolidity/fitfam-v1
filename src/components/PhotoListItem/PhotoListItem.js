import React from 'react';
import ProfilePhoto from '../ProfilePhoto/ProfilePhoto';
import LikeBox from '../LikeBox/LikeBox';
import moment from 'moment';
import { Link } from 'react-router';

require('./PhotoListItem.scss');

class PhotoListItem extends React.Component {

  render() {
    return (
      <div className="photo-list-item component-box">
        <div className="row">
          <div className="photo-list-item__col col-xs-12">

            <div className="photo-list-item__info">
              <ProfilePhoto height="40" className="user-photo img-circle" user={this.props.photo._user} />
              <Link to="user-profile" params={{ username: this.props.photo._user.username }} className="photo-list-item__username">{this.props.photo._user.username}</Link> {moment(this.props.photo.date).fromNow()}
            </div>

            <div className="photo-list-item__photo">
              <img className="img-responsive" src={this.props.photo.url} />
            </div>

            <div className="photo-list-item__caption">
              {this.props.photo.caption}

              <div className="inner-border"></div>
            </div>

            <div className="photo-list-item__action-box">
              <LikeBox postID={this.props.postID} likes={this.props.likes} />
            </div>

          </div>
        </div>
      </div>
    );
  }
}

PhotoListItem.propTypes = {
  photo: React.PropTypes.object.isRequired,
  postID: React.PropTypes.string.isRequired,
  likes: React.PropTypes.number.isRequired,
};

module.exports = PhotoListItem;

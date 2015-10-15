import React from 'react';
import ProfilePhoto from '../ProfilePhoto/ProfilePhoto';
import moment from 'moment';
import { Link } from 'react-router';

require('./TextFeedItem.scss');

class TextFeedItem extends React.Component {
  static propTypes = {
    text: React.PropTypes.object.isRequired,
    postedBy: React.PropTypes.object,
  };

  render() {
    const postedBy = this.props.postedBy ? this.props.postedBy : this.props.text._user;
    return (
      <div className="text-feed-item component-box">
        <div className="text-feed-item__info">
          <ProfilePhoto height="40" className="user-photo img-circle" user={postedBy} />
          <Link to="user-profile" params={{ username: postedBy.username }} className="text-feed-item__username">{postedBy.username}</Link> <span className="text-feed-item__date">{moment(this.props.text.date).fromNow()}</span>
        </div>
        {this.props.text.content}
      </div>
    );
  }
}


module.exports = TextFeedItem;

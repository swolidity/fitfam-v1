import React from 'react';
import http from 'axios';
import { Link } from 'react-router';

require('./UserFollowCount.scss');

class UserFollowCount extends React.Component {
  static propTypes = {
    user: React.PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      followers: null,
      following: null,
    };
  }

  componentDidMount() {
    http.get('/api/users/' + this.props.user._id + '/follow_count')
    .then((res) => {
      this.setState({
        followers: res.data.followers,
        following: res.data.following,
      });
    })
    .catch((err) => {
      this.setState({
        err: err.data,
      });
    });
  }

  render() {
    return (
      <div className="user-follow-count row">
        <div className="user-follow-count__followers col-xs-6 center">
          <span className="count">{this.state.followers}</span> <Link to="user-followers" params={{ username: this.props.user.username }} >Followers</Link>
        </div>
        <div className="user-follow-count__following col-xs-6 center">
          <span className="count">{this.state.following}</span> <Link to="user-following" params={{ username: this.props.user.username }} >Following</Link>
        </div>
      </div>
    );
  }
}

module.exports = UserFollowCount;

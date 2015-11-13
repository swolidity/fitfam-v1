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
      <div className="user-follow-count">
        <div className="user-follow-count__user-number count-box">
          <div>User No.</div>
          <div className="count">1</div>
        </div>
        <div className="user-follow-count__karma count-box">
          <div>Fit Karma</div>
          <div className="count">1</div>
        </div>
        <div className="user-follow-count__followers count-box">
          <Link to="user-followers" params={{ username: this.props.user.username }} >
            <div>Followers</div>
            <div className="count">{this.state.followers}</div>
          </Link>
        </div>

        <div className="user-follow-count__following count-box">
          <Link to="user-following" params={{ username: this.props.user.username }} >
            <div>Following</div>
            <span className="count">{this.state.following}</span>
          </Link>
        </div>
      </div>
    );
  }
}

module.exports = UserFollowCount;

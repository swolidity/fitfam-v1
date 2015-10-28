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
        <div className="user-follow-count__following social-box">
          <div className="social-label"><Link to="user-following" params={{ username: this.props.user.username }} >FOLLOWING</Link></div>
          <span className="social-count">{this.state.following}</span>
        </div>

        <div className="user-follow-count__followers social-box">
          <div className="social-label"><Link to="user-followers" params={{ username: this.props.user.username }} >FOLLOWERS</Link></div>
          <span className="social-count">{this.state.followers}</span>
        </div>

        <div className="user-follow-count__karma social-box">
          <div className="social-label">KARMA</div>
          <span className="social-count">77</span>
        </div>
      </div>
    );
  }
}

module.exports = UserFollowCount;

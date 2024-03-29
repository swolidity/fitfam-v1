import React from 'react';
import LoginStore from '../../stores/LoginStore';
import http from 'axios';

require('./LikeBox.scss');

class LikeBox extends React.Component {
  static propTypes = {
    postID: React.PropTypes.string.isRequired,
    likes: React.PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = { liked: false };
  }

  componentDidMount() {
    if (LoginStore.isLoggedIn()) {
      this._fetchLikedStatus();
    }
  }

  _onChange = (state) => {
    this.setState({
      liked: state,
    });
  }

  _fetchLikedStatus = () => {
    http.post('/api/users/' + LoginStore.getUser()._id + '/liked', {
      post_id: this.props.postID,
    })
    .then((res) => {
      this._onChange(res.data);
    })
    .catch((err) => {
      this.setState({ err: err.data });
    });
  }

  _onLike = (e) => {
    e.preventDefault();

    const token = LoginStore.getToken();
    http.post('/api/likes', {
      user_id: LoginStore.getUser()._id,
      post_id: this.props.postID,
    }, {
      headers: { 'Authorization': 'JWT ' + token },
    }).then((res) => {
      this._onChange(res.data);
    });
  }

  render() {
    let likeIcon;

    if (this.state.liked) {
      likeIcon = <a href="#" className="like-btn"><i className="fa fa-2x fa-heart"></i></a>;
    } else {
      likeIcon = <a href="#" className="like-btn" onClick={this._onLike}><i className="fa fa-2x fa-heart-o"></i></a>;
    }

    return (
      <div className="like-box">
         {likeIcon}
      </div>
    );
  }
}

module.exports = LikeBox;

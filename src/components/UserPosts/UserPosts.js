import React from 'react';
import UserPostsStore from '../../stores/UserPostsStore';
import PostList from '../PostList/PostList';
import UserFollowFaces from '../UserFollowFaces/UserFollowFaces';
import LatestProgressPics from '../LatestProgressPics/LatestProgressPics';
import ProfileSongMod from '../ProfileSongMod/ProfileSongMod';

require('./UserPosts.scss');

class UserPosts extends React.Component {
  static propTypes = { user: React.PropTypes.object.isRequired };

  constructor(props) {
    super(props);

    this.state = UserPostsStore.getState();
  }

  componentWillMount() {
    if (this.state.userID && this.props.user._id !== this.state.userID) {
      this.setState({ posts: null });
    }
  }

  componentDidMount() {
    UserPostsStore.listen(this._onChange);
    UserPostsStore.fetchPosts(this.props.user._id);
  }

  componentWillUnmount() {
    UserPostsStore.unlisten(this._onChange);
  }

  _onChange = (state) => {
    this.setState(state);
  }

  render() {
    return (
      <div className="row">
        <div className="col-xs-12 col-sm-6 col-sm-offset-3">
          <div className="user-posts">
            <PostList posts={this.state.posts} />
          </div>
        </div>
      </div>
    );
  }
}

module.exports = UserPosts;

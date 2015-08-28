import React from 'react';
import UserPostsActions from '../../actions/UserPostsActions';
import UserPostsStore from '../../stores/UserPostsStore';
import PostList from '../PostList/PostList';
import UserFollowFaces from '../UserFollowFaces/UserFollowFaces';

require('./UserPosts.scss');

class UserPosts extends React.Component {
  static propTypes = { user: React.PropTypes.object.isRequired };

  constructor(props) {
    super(props);

    this.state = UserPostsStore.getState();
  }
  componentDidMount() {
    UserPostsStore.listen(this._onChange);
    UserPostsActions.fetchPosts.defer();
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
        <div className="col-xs-12 col-sm-5">
          <div className="user-posts__sidebar">
            <UserFollowFaces user={this.props.user} />
          </div>
        </div>

        <div className="col-xs-12 col-sm-7">
          <div className="user-posts">
            <PostList posts={this.state.posts} />
          </div>
        </div>
      </div>
    );
  }
}

module.exports = UserPosts;

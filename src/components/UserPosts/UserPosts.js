import React from 'react';
import UserPostsStore from '../../stores/UserPostsStore';
import PostList from '../PostList/PostList';

require('./UserPosts.scss');

class UserPosts extends React.Component {
  static propTypes = { user: React.PropTypes.object.isRequired };

  constructor(props) {
    super(props);

    this.state = UserPostsStore.getState();
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
      <div className="user-posts">
        <PostList posts={this.state.posts} />
      </div>
    );
  }
}

module.exports = UserPosts;

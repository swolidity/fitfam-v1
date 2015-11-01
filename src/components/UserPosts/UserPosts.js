import React from 'react';
import UserPostsStore from '../../stores/UserPostsStore';
import PostList from '../PostList/PostList';
import StatusComposer from '../StatusComposer/StatusComposer';
import Spinner from '../Spinner/Spinner';

require('./UserPosts.scss');

class UserPosts extends React.Component {
  static propTypes = { user: React.PropTypes.object.isRequired };

  constructor(props) {
    super(props);
    this.state = UserPostsStore.getState();
  }

  componentWillMount() {
    if (this.props.user._id !== this.state.userID) {
      // check if we're on a new user's page and if we are set null for loading state
      this.setState({
        posts: null,
      });
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

  _loadMore = (e) => {
    e.preventDefault();
    const skip = this.state.skip + this.state.limit;
    UserPostsStore.fetchPosts(this.props.user._id, skip);
  }

  render() {
    if (!this.state.posts) {
      return <Spinner />;
    }

    return (
      <div className="row">
        <div className="col-xs-12 col-sm-6">
          <StatusComposer user={this.props.user} />
          <div className="user-posts">
            <PostList posts={this.state.posts} />
          </div>
          <a onClick={this._loadMore} className="load-more-btn btn btn-primary">Load More</a>
        </div>
      </div>
    );
  }
}

module.exports = UserPosts;

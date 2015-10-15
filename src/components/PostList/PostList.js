import React from 'react';
import YouTubePlayerStore from '../../stores/YouTubePlayerStore';
import TextFeedItem from '../TextFeedItem/TextFeedItem';
import PhotoListItem from '../PhotoListItem/PhotoListItem';
import VideoListItem from '../VideoListItem/VideoListItem';
import SongFeedItem from '../SongFeedItem/SongFeedItem';
import Spinner from '../Spinner/Spinner';

require('./PostList.scss');

class PostList extends React.Component {
  static propTypes = { posts: React.PropTypes.array.isRequired };

  constructor(props) {
    super(props);

    this.state = this._getState();
  }

  componentDidMount() {
    YouTubePlayerStore.listen(this._onChange);
  }

  componentWillUnmount() {
    YouTubePlayerStore.unlisten(this._onChange);
  }

  _onChange = () => {
    this.setState(this._getState());
  }

  _getState() {
    return {
      youtube: YouTubePlayerStore.getState(),
    };
  }

  _getPostListItem = (post) => {
    if (post._text) {
      post._text._user = post._user; // tack the populated user object on
      return <TextFeedItem key={post._id} postID={post._id} likes={post.likes} text={post._text} postedBy={post._posted_by} />;
    }

    if (post._photo) {
      post._photo._user = post._user; // tack the populated user object on
      return <PhotoListItem key={post._id} postID={post._id} likes={post.likes} photo={post._photo} />;
    }

    if (post._video) {
      post._video._user = post._user; // tack the populated user object on
      return <VideoListItem key={post._id} postID={post._id} likes={post.likes} video={post._video} youtube={this.state.youtube} />;
    }

    if (post._song) {
      post._song._user = post._user; // tack the populated user object on
      return <SongFeedItem key={post._id} postID={post._id} likes={post.likes} song={post._song} youtube={this.state.youtube} />;
    }
  }

  render() {
    if (!this.props.posts) {
      return <Spinner />;
    }

    const postListItems = this.props.posts.map(this._getPostListItem);

    return (
      <div className="post-list">
        {postListItems}
      </div>
    );
  }
}

module.exports = PostList;

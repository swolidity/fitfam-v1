import React from 'react';
import YouTubePlayerStore from '../../stores/YouTubePlayerStore';
import PhotoListItem from '../PhotoListItem/PhotoListItem';
import VideoListItem from '../VideoListItem/VideoListItem';
import SongListItem from '../SongListItem/SongListItem';

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
    if (post._video) {
      post._video._user = post._user; // tack the populated user object on
      return <VideoListItem key={post._id} video={post._video} youtube={this.state.youtube} />;
    }

    if (post._song) {
      post._song._user = post._user; // tack the populated user object on
      return <SongListItem key={post._id} song={post._song} youtube={this.state.youtube} />;
    }
  }

  render() {
    const postListItems = this.props.posts.map(this._getPostListItem);

    return (
      <ul className="post-list">
        {postListItems}
      </ul>
    );
  }
}

module.exports = PostList;
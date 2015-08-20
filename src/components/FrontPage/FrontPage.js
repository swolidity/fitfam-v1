import React from 'react';
import FrontPageStore from '../../stores/FrontPageStore';
import PostList from '../PostList/PostList';

require('./FrontPage.scss');

class FrontPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = FrontPageStore.getState();
  }
  componentDidMount() {
    FrontPageStore.listen(this._onChange);
    FrontPageStore.fetchPosts();
  }

  componentWillUnmount() {
    FrontPageStore.unlisten(this._onChange);
  }

  _onChange = (state) => {
    this.setState(state);
  }

  render() {
    return (
      <div className="front-page">
        <div className="row">
          <div className="col-xs-6">
            <PostList posts={this.state.posts} />
          </div>
        </div>
      </div>
    );
  }
}

module.exports = FrontPage;

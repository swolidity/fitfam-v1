import React from 'react';
import FrontPageStore from '../../stores/FrontPageStore';
import PostList from '../PostList/PostList';
import moment from 'moment';

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
          <div className="col-xs-12 col-sm-4 col-md-3">
            <ul>
              <li>t/Powerlifting</li>
              <li>t/Bodybuilding</li>
              <li>t/CrossFit</li>
            </ul>
          </div>
          <div className="col-xs-12 col-sm-7">
            <PostList posts={this.state.posts} />
          </div>
        </div>
      </div>
    );
  }
}

module.exports = FrontPage;

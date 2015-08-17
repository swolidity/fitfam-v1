import React from 'react';
import FrontPageStore from '../../stores/FrontPageStore';

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
        <div className="col-xs-10 col-xs-offset-1">
          <h2>Hey FITFAM!</h2>
          {this.state.posts}
        </div>
      </div>
    );
  }
}

module.exports = FrontPage;

import React from 'react';
import UserVideosStore from '../../stores/UserVideosStore';
import LoginStore from '../../stores/LoginStore';
import VideoGrid from '../VideoGrid/VideoGrid';
import { Input } from 'react-bootstrap';

require('./UserVideos.scss');

class UserVideos extends React.Component {

  constructor(props) {
    super(props);

    this.state = this._getStateFromStores();
    this.user = props.user;
  }

  componentWillMount() {
    if (this.state.userID && this.props.user._id !== this.state.userID) {
      this.setState({ videos: null });
    }
  }

  componentDidMount() {
    UserVideosStore.listen(this._onChange);

    UserVideosStore.fetchVideos(this.user._id);
  }

  componentWillUnmount() {
    UserVideosStore.unlisten(this._onChange);
  }

  _getStateFromStores = () => {
    return {
      videos: UserVideosStore.getVideos(),
    };
  }

  _onChange = () => {
    this.setState(this._getStateFromStores);
  }

  _onFilter = (e) => {
    UserVideosStore.fetchVideos(this.user._id, e.target.value);
  }

  render() {
    return (
      <div className="user-videos">
        <div className="row">
          <div className="col-xs-12">
            <VideoGrid videos={this.state.videos} />
          </div>
        </div>
      </div>
    );
  }
}

module.exports = UserVideos;

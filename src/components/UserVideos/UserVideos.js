import React from 'react';
import UserVideosStore from '../../stores/UserVideosStore';
import LoginStore from '../../stores/LoginStore';
import VideoList from '../VideoList/VideoList';
import AddVideoModal from '../AddVideoModal/AddVideoModal';
import { Input, ButtonInput } from 'react-bootstrap';

require('./UserVideos.scss');

class UserVideos extends React.Component {

  constructor(props) {
    super(props);

    this.state = this._getStateFromStores();
    this.user = props.user;
  }

  componentDidMount() {
    UserVideosStore.listen(this._onChange);
    LoginStore.listen(this._onChange);
    UserVideosStore.fetchVideos(this.user._id);
  }

  componentWillUnmount() {
    UserVideosStore.unlisten(this._onChange);
    LoginStore.unlisten(this._onChange);
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
    let addVideo;

    if (LoginStore.isLoggedIn()) {
      addVideo = <AddVideoModal showModal={false} />;
    }

    return (
      <div className="user-videos">

          <div className="user-videos--header">
            <div className="row">
              <div className="filter col-xs-8">
                <Input onChange={this._onFilter} type="text" placeholder="filter" ref="filter" standalone />
              </div>

              <div className="col-xs-4">
                {addVideo}
              </div>
            </div>
          </div>


          <div className="row">
            <div className="col-xs-12">
              <VideoList videos={this.state.videos} />
            </div>
          </div>

      </div>
    );
  }
}

module.exports = UserVideos;

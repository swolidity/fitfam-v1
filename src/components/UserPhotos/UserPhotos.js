import React from 'react';
import UserPhotosStore from '../../stores/UserPhotosStore';
import LoginStore from '../../stores/LoginStore';
import PhotoList from '../PhotoList/PhotoList';
import AddPhotoModal from '../AddPhotoModal/AddPhotoModal';

require('./UserPhotos.scss');

class UserPhotos extends React.Component {
  static propTypes = { user: React.PropTypes.object };

  constructor(props) {
    super(props);

    this.state = UserPhotosStore.getState();
  }

  componentDidMount() {
    UserPhotosStore.listen(this._onChange);
    UserPhotosStore.fetchPhotos(this.props.user._id);
  }

  componentWillUnmount() {
    UserPhotosStore.unlisten(this._onChange);
  }

  _onChange = (state) => {
    this.setState(state);
  }

  render() {
    let addPhoto;

    if (LoginStore.isLoggedIn()) {
      addPhoto = <AddPhotoModal showModal={false} />;
    }

    return (
      <div className="user-photos">
        <div className="user-photos--header row clearfix">
          {addPhoto}
        </div>

        <div className="row">
          <div className="col-xs-12">
            <PhotoList photos={this.state.photos} />
          </div>
        </div>
      </div>
    );
  }
}

module.exports = UserPhotos;

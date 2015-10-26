import React from 'react';
import UserPhotosStore from '../../stores/UserPhotosStore';
import PhotoGrid from '../PhotoGrid/PhotoGrid';

require('./UserPhotos.scss');

class UserPhotos extends React.Component {
  static propTypes = { user: React.PropTypes.object };

  constructor(props) {
    super(props);

    this.state = UserPhotosStore.getState();
  }

  componentWillMount() {
    if (this.state.userID && this.props.user._id !== this.state.userID) {
      this.setState({ photos: null });
    }
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
    return (
      <div className="user-photos">
        <PhotoGrid photos={this.state.photos} />
      </div>
    );
  }
}

module.exports = UserPhotos;

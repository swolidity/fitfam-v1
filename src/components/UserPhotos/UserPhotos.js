import React from 'react';
import UserPhotosStore from '../../stores/UserPhotosStore';
import PhotoList from '../PhotoList/PhotoList';

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
    UserPhotosStore.listen(this._onChange);
  }

  _onChange = (state) => {
    this.setState(state);
  }

  render() {
    return (
      <div className="user-photos">
        <PhotoList photos={this.state.photos} />
      </div>
    );
  }
}

module.exports = UserPhotos;

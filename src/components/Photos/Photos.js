import React from 'react';
import PhotosStore from '../../stores/PhotosStore';
import PhotoList from '../PhotoList/PhotoList';

require('./Photos.scss');

class Photos extends React.Component {
  constructor(props) {
    super(props);

    this.state = PhotosStore.getState();
  }

  componentDidMount() {
    PhotosStore.listen(this._onChange);
    PhotosStore.fetchPhotos();
  }

  componentWillUnmount() {
    PhotosStore.unlisten(this._onChange);
  }

  _onChange = (state) => {
    this.setState(state);
  }

  render() {
    return (
      <div className="photos">
        <div className="row">
          <div className="col-xs-12 col-sm-7">
            <PhotoList photos={this.state.photos} />
          </div>
        </div>
      </div>
    );
  }
}

module.exports = Photos;

import React from 'react';
import YouTubePlayerStore from '../../stores/YouTubePlayerStore';
import PhotoGridItem from '../PhotoGridItem/PhotoGridItem';
import Spinner from '../Spinner/Spinner';

require('./PhotoGrid.scss');

class PhotoGrid extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      youtube: YouTubePlayerStore.getState(),
    };
  }

  componentDidMount() {
    YouTubePlayerStore.listen(this._onChange);
  }

  componentWillUnmount() {
    YouTubePlayerStore.unlisten(this._onChange);
  }

  _onChange = (state) => {
    this.setState({ youtube: state });
  }

  _getPhotoGridItem = (photo) => {
    return <PhotoGridItem key={photo._id} photo={photo} youtube={this.state.youtube} />;
  }

  render() {
    if (!this.props.photos) {
      return <Spinner />;
    }

    const photoGridItems = this.props.photos.map(this._getPhotoGridItem);

    return (
      <div className="photo-grid">
        {photoGridItems}
      </div>
    );
  }
}

PhotoGrid.propTypes = {
  photos: React.PropTypes.array,
  youtube: React.PropTypes.object,
};

module.exports = PhotoGrid;

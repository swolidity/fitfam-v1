import React from 'react';
import http from 'axios';
import Spinner from '../Spinner/Spinner';
import { Link } from 'react-router';

require('./LatestProgressPics.scss');

class LatestProgressPics extends React.Component {
  static propTypes = { user: React.PropTypes.string.isRequired };

  constructor(props) {
    super(props);

    this.state = {
      progressPics: null,
      err: null,
    };
  }

  componentDidMount() {
    http.get('/api/users/' + this.props.user._id + '/progress_pics')
      .then((res) => {
        this.setState({ progressPics: res.data });
      })
      .catch((err) => {
        this.setState({ err: err.data });
      });
  }

  _getProgressPicItem = (pic) => {
    return (
      <div className="col-xs-4">
        <img className="img-responsive" src={pic.url} />
      </div>
    );
  }

  render() {
    if (!this.state.progressPics) {
      return <Spinner />;
    }

    const progressPics = this.state.progressPics.map(this._getProgressPicItem);

    return (
      <div className="latest-progress-pics">
        <div className="col-xs-12">
          <Link className="title" to="user-photos" params={{ username: this.props.user.username }}>
            Photos
          </Link>
        </div>
        {progressPics}
      </div>
    );
  }
}

module.exports = LatestProgressPics;

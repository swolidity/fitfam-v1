import React from 'react';
import UserVideosStore from '../../stores/UserVideosStore';
import { Input, ButtonInput, Modal } from 'react-bootstrap';
import LoginSignupModal from '../LoginSignupModal/LoginSignupModal';
import authenticated from '../../decorators/Authenticated';

require('./AddVideoModal.scss');

class AddVideoModal extends React.Component {
  static propTypes = {
    showModal: React.PropTypes.bool.isRequired,
    loggedIn: React.PropTypes.bool.isRequired,
  };
  static defaultProps = { showModal: false };

  constructor(props) {
    super(props);

    this.state = props;
  }

  _onAddYouTubeVideo = (e) => {
    e.preventDefault();

    const video = {
      url: this.refs.url.getValue(),
      tags: this.refs.tags.getValue(),
    };

    UserVideosStore.addYouTubeVideo(video);
  }

  _show = () => {
    this.setState({ showModal: true });
  }

  _onHide = () => {
    this.setState({ showModal: false });
  }

  render() {
    let modal;

    if (!this.props.loggedIn) {
      modal = <LoginSignupModal showModal={this.state.showModal} onShow={this._show} onHide={this._onHide} />;
    } else {
      modal = (
        <Modal show={this.state.showModal} onHide={this._onHide}>
          <Modal.Header closeButton>
            <Modal.Title>Add Video</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="row">
                <div className="col-xs-12">
                  <Input type="text" placeholder="YouTube URL" ref="url" />
                  <Input type="text" placeholder="tags" ref="tags" />
                  <ButtonInput type="submit" bsStyle="primary" value="Add Video" onClick={this._onAddYouTubeVideo} className="btn-block" />
                </div>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      );
    }

    return (
      <div>
        <ButtonInput type="submit" bsStyle="default" value="Add Video" onClick={this._show} className="btn-block" wrapperClassName="add-video-wrapper col-xs-2 pull-right" standalone />
        {modal}
      </div>
    );
  }
}

module.exports = authenticated(AddVideoModal);

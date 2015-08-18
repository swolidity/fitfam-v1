import React from 'react';
import UserPhotosStore from '../../stores/UserPhotosStore';
import { Input, ButtonInput, Modal } from 'react-bootstrap';
import LoginSignupModal from '../LoginSignupModal/LoginSignupModal';
import authenticated from '../../decorators/Authenticated';

require('./AddPhotoModal.scss');

class AddPhotoModal extends React.Component {
  static propTypes = {
    showModal: React.PropTypes.bool.isRequired,
    loggedIn: React.PropTypes.bool.isRequired,
  };
  static defaultProps = { showModal: false };

  constructor(props) {
    super(props);

    this.state = props;
  }

  _onAddPhoto = (e) => {
    e.preventDefault();

    const photo = {
      url: this.refs.url.getValue(),
      caption: this.refs.caption.getValue(),
    };

    UserPhotosStore.addPhoto(photo);
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
            <Modal.Title>Add Photo</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="row">
                <div className="col-xs-12">
                  <Input type="text" placeholder="Photo URL" ref="url" />
                  <Input type="textarea" placeholder="caption" ref="caption" />
                  <ButtonInput type="submit" bsStyle="primary" value="Add Photo" onClick={this._onAddPhoto} className="btn-block" />
                </div>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      );
    }

    return (
      <div>
        <ButtonInput type="submit" bsStyle="default" value="Add Photo" onClick={this._show} className="btn-block" wrapperClassName="add-photo-wrapper col-xs-2 pull-right" standalone />
        {modal}
      </div>
    );
  }
}

module.exports = authenticated(AddPhotoModal);

import React from 'react';
import { Modal } from 'react-bootstrap';

class LoginSignupModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = props;
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps);
  }

  _show = () => {
    this.setState({ showModal: true });
    this.state.onShow();
  }

  _onHide = () => {
    this.setState({ showModal: false });
    this.state.onHide();
  }

  render() {
    return (
      <Modal show={this.state.showModal} onHide={this._onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Login / Signup</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Pleas login or signup
        </Modal.Body>
      </Modal>
    );
  }
}

module.exports = LoginSignupModal;

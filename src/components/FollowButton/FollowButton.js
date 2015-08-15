import React from 'react';
import { ButtonInput } from 'react-bootstrap';
import LoginSignupModal from '../LoginSignupModal/LoginSignupModal';

class FollowButton extends React.Component {
  static defaultProps = { showModal: false };

  constructor(props) {
    super(props);
    this.state = props;
  }

  _show = () => {
    this.setState({ showModal: true });
  }

  _hide = () => {
    this.setState({ showModal: false });
  }

  render() {
    return (
      <div>
        <ButtonInput onClick={this._show} bsStyle="primary" className="follow-btn btn-block" standalone >Follow</ButtonInput>
        <LoginSignupModal showModal={this.state.showModal} onShow={this._show} onHide={this._hide} />
      </div>
      );
  }
}

module.exports = FollowButton;

import React from 'react';
import UserSongsStore from '../../stores/UserSongsStore';
import { Input, ButtonInput, Modal } from 'react-bootstrap';
import LoginSignupModal from '../LoginSignupModal/LoginSignupModal';
import authenticated from '../../decorators/authenticated';

require('./AddSongModal.scss');

class AddSongModal extends React.Component {
  static propTypes = {
    showModal: React.PropTypes.bool.isRequired,
    loggedIn: React.PropTypes.bool.isRequired,
  };
  static defaultProps = { showModal: false };

  constructor(props) {
    super(props);

    this.state = props;
  }

  _onAddYouTubeSong = (e) => {
    e.preventDefault();

    const song = {
      url: this.refs.url.getValue(),
      tags: this.refs.tags.getValue(),
    };

    UserSongsStore.addYouTubeSong(song);
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
            <Modal.Title>Add Song</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="row">
                <div className="col-xs-12">
                  <Input type="text" placeholder="YouTube URL" ref="url" />
                  <Input type="text" placeholder="tags" ref="tags" />
                  <ButtonInput type="submit" bsStyle="primary" value="Add Song" onClick={this._onAddYouTubeSong} className="btn-block" />
                </div>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      );
    }

    return (
      <div>
        <ButtonInput type="submit" bsStyle="default" value="Add Song" onClick={this._show} className="btn-block" wrapperClassName="add-song-wrapper col-xs-2 pull-right" standalone />
        {modal}
      </div>
    );
  }
}

module.exports = authenticated(AddSongModal);

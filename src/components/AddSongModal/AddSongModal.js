import React from 'react';
import UserSongsStore from '../../stores/UserSongsStore';
import GenreStore from '../../stores/GenreStore';
import { Input, ButtonInput, Modal } from 'react-bootstrap';
import LoginSignupModal from '../LoginSignupModal/LoginSignupModal';
import authenticated from '../../decorators/Authenticated';

require('./AddSongModal.scss');

class AddSongModal extends React.Component {
  static propTypes = {
    showModal: React.PropTypes.bool.isRequired,
    loggedIn: React.PropTypes.bool.isRequired,
  };
  static defaultProps = { showModal: false };

  constructor(props) {
    super(props);

    this.state = this._getState();
    this.state.showModal = props.showModal;
  }

  componentDidMount() {
    GenreStore.listen(this._onChange);
    GenreStore.fetchGenres();
  }

  componentWillUnmount() {
    GenreStore.unlisten(this._onChange);
  }

  _onChange = () => {
    this.setState(this._getState());
  }

  _getState = () => {
    return {
      genres: GenreStore.getGenres(),
    };
  }

  _onAddYouTubeSong = (e) => {
    e.preventDefault();

    const song = {
      url: this.refs.url.getValue(),
      genre: this.refs.genre.getValue(),
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

  _getGenreSelectItem = (genre) => {
    return (
      <option key={genre._id} value={genre._id}>{genre.name}</option>
    );
  }

  render() {
    let modal;

    if (!this.props.loggedIn) {
      modal = <LoginSignupModal showModal={this.state.showModal} onShow={this._show} onHide={this._onHide} />;
    } else {
      const genreSelectItems = this.state.genres.map(this._getGenreSelectItem);
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
                  <Input type="select" placeholder="Genre" ref="genre">
                    {genreSelectItems}
                  </Input>
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
        <ButtonInput type="submit" bsStyle="default" value="Add Song" onClick={this._show} wrapperClassName="add-song-wrapper" standalone />
        {modal}
      </div>
    );
  }
}

module.exports = authenticated(AddSongModal);

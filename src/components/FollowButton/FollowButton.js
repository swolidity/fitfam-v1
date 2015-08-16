import React from 'react';
import FollowStore from '../../stores/FollowStore';
import LoginStore from '../../stores/LoginStore';
import { ButtonInput } from 'react-bootstrap';
import LoginSignupModal from '../LoginSignupModal/LoginSignupModal';

class FollowButton extends React.Component {
  static propTypes = {
    user: React.PropTypes.object.isRequired,
    bsStyle: React.PropTypes.string,
   }
  static defaultProps = { showModal: false };

  constructor(props) {
    super(props);
    this.state = this._getState(props);
  }

  componentDidMount() {
    LoginStore.listen(this._onChange);
    FollowStore.listen(this._onChange);

    if (LoginStore.isLoggedIn()) {
      const follower = LoginStore.getUser();
      const followed = this.props.user;

      FollowStore.fetchIsFollowing(follower._id, followed._id);
    }
  }

  componentWillUnmount() {
    LoginStore.unlisten(this._onChange);
    FollowStore.unlisten(this._onChange);
  }

  _onChange = () => {
    this.setState(this._getState(this.props));
  }

  _getState = (props) => {
    return {
      showModal: props.showModal,
      isFollowing: FollowStore.getIsFollowing(),
    };
  }

  _show = () => {
    this.setState({ showModal: true });
  }

  _hide = () => {
    this.setState({ showModal: false });
  }

  _follow = () => {
    // user cant follow self
    if (this.props.user._id === LoginStore.getUser()._id) {
      return;
    }

    const follower = LoginStore.getUser();
    const followed = this.props.user;

    if (this.state.isFollowing) {
      FollowStore.unfollow(follower._id, followed._id);
    } else {
      FollowStore.follow(follower._id, followed._id);
    }
  }

  render() {
    const followText = this.state.isFollowing ? 'Unfollow' : 'Follow';
    let modal;
    let clickHandler;

    if (!LoginStore.isLoggedIn()) {
      modal = <LoginSignupModal showModal={this.state.showModal} onShow={this._show} onHide={this._hide} />;
      clickHandler = this._show;
    } else {
      clickHandler = this._follow;
    }

    return (
      <div>
        <ButtonInput onClick={clickHandler} bsStyle={this.props.bsStyle} className="follow-btn btn-block" standalone >{followText}</ButtonInput>
        {modal}
      </div>
    );
  }
}

module.exports = FollowButton;

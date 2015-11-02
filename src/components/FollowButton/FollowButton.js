import React from 'react';
import FollowStore from '../../stores/FollowStore';
import LoginStore from '../../stores/LoginStore';
import { ButtonInput } from 'react-bootstrap';
import LoginSignupModal from '../LoginSignupModal/LoginSignupModal';
import classNames from 'classnames';

require('./FollowButton.scss');

class FollowButton extends React.Component {
  static propTypes = {
    followedID: React.PropTypes.string.isRequired,
    bsStyle: React.PropTypes.string,
    className: React.PropTypes.string,
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
      const followedID = this.props.followedID;

      FollowStore.fetchIsFollowing(follower._id, followedID);
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
      isFollowing: FollowStore.getIsFollowing(props.followedID),
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
    if (this.props.followedID === LoginStore.getUser()._id) {
      return;
    }

    const follower = LoginStore.getUser();
    const followedID = this.props.followedID;

    if (this.state.isFollowing) {
      FollowStore.unfollow(follower._id, followedID);
    } else {
      FollowStore.follow(follower._id, followedID);
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
      <div className="follow-btn-container">
        <ButtonInput onClick={clickHandler} bsStyle={this.props.bsStyle} className={classNames(this.props.className, 'follow-btn')} standalone >{followText}</ButtonInput>
        {modal}
      </div>
    );
  }
}

module.exports = FollowButton;

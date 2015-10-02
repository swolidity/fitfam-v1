import React from 'react';
import UserFollowersActions from '../../actions/UserFollowersActions';
import UserFollowingActions from '../../actions/UserFollowingActions';
import UserFollowersStore from '../../stores/UserFollowersStore';
import UserFollowingStore from '../../stores/UserFollowingStore';
import ProfilePhoto from '../ProfilePhoto/ProfilePhoto';
import { TabbedArea, TabPane } from 'react-bootstrap';

require('./UserFollowFaces.scss');

class UserFollowFaces extends React.Component {
  static propTypes = {
    user: React.PropTypes.object.isRequired,
    followFaceSize: React.PropTypes.string,
  };

  static defaultProps = {
    followFaceSize: "35",
  }

  constructor(props) {
    super(props);
    this.state = this._getStateFromStores();
  }

  componentWillMount() {
    if (this.state.userID && this.props.user._id !== this.state.userID) {
      this.setState({
        followers: null,
        following: null,
      });
    }
  }


  componentDidMount() {
    UserFollowersStore.listen(this._onChange);
    UserFollowingStore.listen(this._onChange);

    UserFollowersStore.fetchFollowers(this.props.user._id);
    UserFollowingStore.fetchFollowing(this.props.user._id);
  }

  componentWillUnmount() {
    UserFollowersStore.unlisten(this._onChange);
    UserFollowingStore.unlisten(this._onChange);
  }

  _getStateFromStores = () => {
    return {
      followers: UserFollowersStore.getFollowers(),
      following: UserFollowingStore.getFollowing(),
      userID: UserFollowingStore.getUserID(),
    };
  }

  _onChange = () => {
    this.setState(this._getStateFromStores);
  }

  _getFollowingFaces = () => {
    return this.state.following.map((follow) => {
      return (
        <li><ProfilePhoto className="img-circle" width={this.props.followFaceSize} height={this.props.followFaceSize} user={follow._followed} /></li>
      );
    });
  }

  _getFollowerFaces = () => {
    return this.state.followers.map((follow) => {
      return (
        <li><ProfilePhoto className="img-circle" width={this.props.followFaceSize} height={this.props.followFaceSize} user={follow._follower} /></li>
      );
    });
  }

  render() {
    if (!this.state.following) {
      return <div></div>;
    }

    return (
      <div className="user-follow-faces">

        <TabbedArea defaultActiveKey={1}>
          <TabPane eventKey={1} tab={'Following ' + this.state.following.length}>
            <div className="user-follow-faces__following">
              <ul className="follow-faces-list">
                {this._getFollowingFaces()}
              </ul>
            </div>
          </TabPane>

          <TabPane eventKey={2} tab={'Followers ' + this.state.followers.length} >
            <div className="user-follow-faces__followers">
              <ul className="follow-faces-list">
                {this._getFollowerFaces()}
              </ul>
            </div>
          </TabPane>

        </TabbedArea>


      </div>
    );
  }
}

module.exports = UserFollowFaces;

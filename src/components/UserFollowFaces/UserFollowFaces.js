import React from 'react';
import UserFollowersStore from '../../stores/UserFollowersStore';
import UserFollowingStore from '../../stores/UserFollowingStore';
import ProfilePhoto from '../ProfilePhoto/ProfilePhoto';
import { TabbedArea, TabPane } from 'react-bootstrap';

require('./UserFollowFaces.scss');

class UserFollowFaces extends React.Component {
  static propTypes = { user: React.PropTypes.object.isRequired };

  constructor(props) {
    super(props);
    this.state = this._getStateFromStores();
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
    };
  }

  _onChange = () => {
    this.setState(this._getStateFromStores);
  }

  _getFollowingFaces = () => {
    return this.state.following.map((follow) => {
      return (
        <li><ProfilePhoto className="img-circle" width="45" height="45" user={follow._followed} /></li>
      );
    });
  }

  _getFollowerFaces = () => {
    return this.state.followers.map((follow) => {
      return (
        <li><ProfilePhoto className="img-circle" width="45" height="45" user={follow._follower} /></li>
      );
    });
  }

  render() {
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

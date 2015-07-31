import React from 'react';
import UsersStore from '../../stores/UsersStore';
import UserListItem from '../UserListItem/UserListItem';

class Users extends React.Component {

  constructor() {
    super();
    this.state = UsersStore.getState();

    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    UsersStore.listen(this.onChange);
    UsersStore.fetchUsers();
  }

  componentWillUnmount() {
    UsersStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  _getUserListItem = (user) => {
    return (
      <UserListItem
        key={user._id}
        user={user}
      />
    );
  }

  render() {
    if (this.state.errorMessage) {
      return (
        <div className="container">Error: {this.state.errorMessage}</div>
        );
    }

    if (UsersStore.isLoading()) {
      return (
        <div className="container">
          <img src="/spinner.gif" />
        </div>
      );
    }

    const userListItems = this.state.users.map(this._getUserListItem);

    return (
      <div className="container">
        <div className="user-list">
          {userListItems}
        </div>
      </div>
    );
  }
}

module.exports = Users;

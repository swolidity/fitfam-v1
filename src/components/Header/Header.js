import React from 'react';
import { Link } from 'react-router';
import { Navbar, CollapsibleNav, Nav, DropdownButton, MenuItem } from 'react-bootstrap';
import { NavItemLink, MenuItemLink } from 'react-router-bootstrap';
import LoginActions from '../../actions/LoginActions';
import LoginStore from '../../stores/LoginStore';

require('./Header.scss');

class Header extends React.Component {

  constructor(props) {
    super(props);

    this.state = LoginStore.getState();

    this.handleChange = this.handleChange.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    LoginStore.listen(this.handleChange);
  }

  componentWillUnmount() {
    LoginStore.unlisten(this.handleChange);
  }

  handleChange(state) {
    this.setState(state);
  }

  handleLogout(e) {
    e.preventDefault();
    LoginActions.logoutUser();
  }

  render() {
    let loginNavItem;
    let signupNavItem;
    let profileDropdown;

    if (this.state.user) {
      signupNavItem = null;

      profileDropdown = ( <DropdownButton eventKey={3} title={
                          <img
                            width="35"
                            height="35"
                            className="profile-photo img-circle"
                            src={this.state.user.photo }
                          />
                        }
                        className="profileDropdown"
                        noCaret={true}
                        >
                          <MenuItemLink to="user-profile" params={{username: this.state.user.username}}>Profile</MenuItemLink>
                          <MenuItemLink to="account-settings">Settings</MenuItemLink>
                          <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
                        </DropdownButton> );
    } else {
      // if user is not logged in show login link
      loginNavItem = <NavItemLink to="about">login</NavItemLink>;

      profileDropdown = null;
    }

    return (
      <Navbar fixedTop fluid toggleNavKey={0} className="Navbar" brand={<Link to="/">FITFAM</Link>}>
       <CollapsibleNav eventKey={0} >

          <Nav navbar right>
            {loginNavItem}
            {signupNavItem}
            {profileDropdown}
          </Nav>
        </CollapsibleNav>
      </Navbar>
      );
  }
}

export default Header;

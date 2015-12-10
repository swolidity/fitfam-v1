import React from 'react';
import { Link } from 'react-router';
import { Navbar, NavbarBrand, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

require('./Header.scss');

class Header extends React.Component {
  render() {
    let loginNavItem;
    let signupNavItem;
    let profileDropdown;

    // if user is not logged in show login link
    loginNavItem = <LinkContainer to="/"><NavItem>login</NavItem></LinkContainer>;

    profileDropdown = null;

    return (
      <Navbar fixedTop fluid className="Navbar">
        <NavbarBrand><Link to="/">FITFAM</Link></NavbarBrand>
       <Navbar.Collapse>

          <Nav navbar pullRight>
            {loginNavItem}
            {signupNavItem}
            {profileDropdown}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      );
  }
}

export default Header;

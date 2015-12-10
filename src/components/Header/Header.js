import React from 'react';
import { Link } from 'react-router';
import { Navbar, CollapsibleNav, Nav, NavItem } from 'react-bootstrap';
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

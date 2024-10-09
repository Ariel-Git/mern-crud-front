import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './Header.css';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/user/userSlice';
import { RootState } from '../../store/store';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>CRUD Demo</Navbar.Brand>
          </LinkContainer>
          {user && (
            <>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-start w-100">
                  <LinkContainer to="/users">
                    <Nav.Link>Users List</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/profile">
                    <Nav.Link>Profile</Nav.Link>
                  </LinkContainer>
                  <Nav.Link
                    className="btn btn-danger ms-auto bg-danger text-white px-3"
                    onClick={handleLogout}
                  >
                    Logout
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </>
          )}
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;

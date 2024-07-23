import React, { useContext, useEffect } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import '../../App.css';
import AuthContext from '../../AuthContext';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';


function NavbarMain() {
  
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext); // Destructure both isAuthenticated and setIsAuthenticated from the context

  useEffect(() => {
    const checkAuthStatus = async () => {
      const response = await fetch('https://localhost:5000/api/Users/checkValidity', {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    };

    checkAuthStatus();
  }, [setIsAuthenticated]);




  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark" fixed="top">
        <Container>
          <Navbar.Brand href="#home" className="navbar-brand-custom">NightPhoto</Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link href="/">Home</Nav.Link>
          
                <Nav.Link href="Login">Login</Nav.Link>
                <Nav.Link href="Register">Register</Nav.Link>
              
            
            {isAuthenticated && (
              <Nav className="ms-auto">
                    <DropdownButton id="dropdown-basic-button" title="SIGNED IN" variant="warning">
      <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
      <Dropdown.Item href="#/action-2">Artist Page</Dropdown.Item>
      <Dropdown.Item href="#/action-3">Log out</Dropdown.Item>
    </DropdownButton>
              </Nav>
            )}
          </Nav>
        </Container>
      </Navbar>
      <br />
    </>
  );
}

export default NavbarMain;
import { useContext, useEffect, useRef } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import '../../App.css';
import AuthContext from '../../AuthContext';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

function NavbarMain() {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const logoutTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const INACTIVITY_TIMEOUT = 1 * 60 * 30000; // 30minuuttia

  useEffect(() => {
    const checkAuthStatus = async () => {
      const response = await fetch('https://nphotoapi-ascra0avhfaedzfh.northeurope-01.azurewebsites.net/api/Users/checkValidity', {
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

  console.log(isAuthenticated);

  const handleLogout = async () => {
    await fetch('https://nphotoapi-ascra0avhfaedzfh.northeurope-01.azurewebsites.net/api/Users/logout', {
      method: 'POST',
      credentials: 'include',
    });

    setIsAuthenticated(false);
  };

  const resetLogoutTimeout = () => {
    if (logoutTimeoutRef.current) {
      clearTimeout(logoutTimeoutRef.current);
    }
    logoutTimeoutRef.current = setTimeout(handleLogout, INACTIVITY_TIMEOUT);
  };

  useEffect(() => {
    if (isAuthenticated) {
      resetLogoutTimeout();
      window.addEventListener('mousemove', resetLogoutTimeout);
      window.addEventListener('keypress', resetLogoutTimeout);
    }

    return () => {
      if (logoutTimeoutRef.current) {
        clearTimeout(logoutTimeoutRef.current);
      }
      window.removeEventListener('mousemove', resetLogoutTimeout);
      window.removeEventListener('keypress', resetLogoutTimeout);
    };
  }, [isAuthenticated]);




  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark" fixed="top">
        <Container>
          <Navbar.Brand href="#home" className="navbar-brand-custom">NightPhoto</Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link href="/">Home</Nav.Link>
          
                <Nav.Link href="Login">Login</Nav.Link>
                <Nav.Link href="Register">Register</Nav.Link>
                <Nav.Link href="UploadImage">Upload Image</Nav.Link>
            
            {isAuthenticated && (
              <Nav className="ms-auto">
                    <DropdownButton id="dropdown-basic-button" title="SIGNED IN" variant="warning">
      <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
      <Dropdown.Item href="#/action-2">Artist Page</Dropdown.Item>
      <Dropdown.Item onClick={handleLogout}>Log out</Dropdown.Item>
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
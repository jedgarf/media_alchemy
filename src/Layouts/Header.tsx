import React from 'react';
import { Link } from "react-router-dom";

// Bootstrap Components
import { Container, Nav, Navbar, NavDropdown, Image, Button } from 'react-bootstrap';

// Font Awesome Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Components
import { ThemeProvider, useTheme } from '../Components/ThemeContext';

// Config
import { title } from "../Config/settings.config";
import { mainLogo } from "../Config/images.config";

interface HeaderTypes {
  pageName: string
}

const Header: React.FC<HeaderTypes> = ({ pageName }) => {

  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <div className={`bg-dark text-light p-2`}>
        ✨ Welcome to {title}!
      </div>
      <Navbar collapseOnSelect fixed="top" sticky="top" expand="lg" className={`my-navbar bg-body-tertiary justify-content-between`} data-bs-theme={`${theme === 'dark' ? 'dark' : 'light'}`}>
        <Container>
          <Navbar.Brand href="/">
            <Image
              src={mainLogo} // Replace with the actual path to your image
              width="140"
              height="50"
              className="d-inline-block align-top"
              alt={title}
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/" className={pageName === "youtube" ? 'active' : ''}><FontAwesomeIcon icon={["fab", "youtube"]} color='#DC4C64' /> Youtube</Nav.Link>
              <Nav.Link as={Link} to="/facebook" className={pageName === "facebook" ? 'active' : ''}><FontAwesomeIcon icon={["fab", "facebook"]} color='#3B71CA' /> Facebook</Nav.Link>
              <NavDropdown title="Dropdown" id="collapsible-nav-dropdown" hidden>
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              {/* <Nav.Link href="/android_apps">Download Android</Nav.Link> */}
              <Nav.Link>
                <Button onClick={toggleTheme}>{theme === 'dark' ? <FontAwesomeIcon icon={"lightbulb"} /> : <FontAwesomeIcon icon={"moon"} />}</Button>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>

        </Container>
      </Navbar>
    </>
  )
}

export default Header;
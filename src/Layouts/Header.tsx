import React from 'react';

// Bootstrap Components
import { Container, Nav, Navbar, NavDropdown, Image } from 'react-bootstrap';

// Font Awesome Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Config
import { title } from "../Config/settings.config";
import { mainLogo } from "../Config/images.config";
const Header: React.FC = () => {
  return (
    <>
      <div className="bg-dark text-light p-2">
        Welcome to {title}!
      </div>
      <Navbar collapseOnSelect fixed="top" sticky="top" expand="lg" className="my-navbar bg-body-tertiary justify-content-between" data-bs-theme="primary">
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
              <Nav.Link href="/" className='active'><FontAwesomeIcon icon={["fab", "youtube"]} color='#DC4C64' /> Youtube</Nav.Link>
              <Nav.Link href="/facebook"><FontAwesomeIcon icon={["fab", "facebook"]} color='#3B71CA' /> Facebook</Nav.Link>
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
            <Nav hidden>
              <Nav.Link href="/android_apps">Download Android</Nav.Link>
              <Nav.Link eventKey={2} href="#memes">
                Dank memes
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default Header;
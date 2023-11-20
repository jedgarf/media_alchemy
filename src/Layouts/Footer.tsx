import React from 'react';

// Bootstrap Components
import { Container, Row, Col, Image } from 'react-bootstrap';

// Font Awesome Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Config
import { title } from "../Config/settings.config";
import { mainLogo } from "../Config/images.config";

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark text-light pt-4">
      <Container>
        <Row>
          <Col sm={12} md={6}>
            <h5>
              <Image
                src={mainLogo} // Replace with the actual path to your image
                width="180"
                height="70"
                className="d-inline-block align-top"
                alt={title}
              />
            </h5>
            <p style={{ textAlign: 'justify' }}>Welcome to {title}, where seamless media conversion meets user-friendly simplicity. Our online platform empowers you to convert online contents effortlessly, transcending formats with just a few clicks.</p>
            {/* <p>Contact Us</p> */}
          </Col>
          <Col sm={12} md={6}>
            <h5>Other Sites</h5>
            <p><a className='text-link' href='https://allhqflix.com' target='__blank'>AllHQFlix</a></p>
          </Col>
        </Row>
      </Container>
      <div className="text-center pt-5 pb-3">
        <p>&copy; 2023 {title}. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer;

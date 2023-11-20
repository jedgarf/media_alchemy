import React from 'react';

// Bootstrap Components
import { Container, Row, Col, Image } from 'react-bootstrap';

// Components
import { ThemeProvider, useTheme } from '../Components/ThemeContext';

const Unavailable: React.FC = () => {

    const { theme, toggleTheme } = useTheme();

  return (
    <div className={`page_content ${theme === 'dark' ? 'bg-dark' : 'bg-light'}`} style={{ height: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Container fluid="lg">
            <Row>
                <Col sm={12}>
                    <center>
                        <h4 style={{ textTransform: 'uppercase' }} className={`${theme === 'dark' ? 'text-light' : 'text-dark'}`}>Opening browser console was prohibited for security purpose.</h4>
                    </center>
                </Col>
            </Row>
        </Container>
    </div>
  )
}

export default Unavailable;
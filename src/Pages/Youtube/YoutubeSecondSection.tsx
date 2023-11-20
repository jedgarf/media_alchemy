import React, { useState, useRef, useEffect } from 'react';

// Bootstrap Components
import { Container, Row, Col, Image, Form, InputGroup, Button, ListGroup, ButtonGroup } from 'react-bootstrap';

// Font Awesome Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Config
import { title } from "../../Config/settings.config";
import { displayImage1 } from "../../Config/images.config";

const YoutubeSecondSection: React.FC = () => {
    
    return (
        <div className='page_content bg-light' style={{ paddingBottom: '80px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Container fluid="lg">
                <Row>
                    <Col sm={12} md={6} className='mb-4'>
                        <center>
                            <Image
                                src={displayImage1}
                                className="d-inline-block align-top"
                                alt={title}
                                fluid
                                rounded
                            />
                        </center>
                    </Col>
                    <Col sm={12} md={6}>
                        <h4 style={{ textAlign: 'justify' }}><b>{title}</b> focuses on providing a reliable and no-nonsense media conversion service. Get your job done without distractions.</h4>
                        <h4 style={{ textAlign: 'justify' }}>Enjoy an ad-free environment. No deep advertisements, just a clean and simple interface.</h4>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default YoutubeSecondSection;
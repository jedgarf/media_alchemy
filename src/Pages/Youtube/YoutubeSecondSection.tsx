import React, { useState, useRef, useEffect } from 'react';

// Bootstrap Components
import { Container, Row, Col, Image, Form, InputGroup, Button, ListGroup, ButtonGroup } from 'react-bootstrap';

// Components
import { ThemeProvider, useTheme } from '../../Components/ThemeContext';

// Font Awesome Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Config
import { title } from "../../Config/settings.config";
import { displayImage1 } from "../../Config/images.config";

const YoutubeSecondSection: React.FC = () => {

    const { theme, toggleTheme } = useTheme();
    
    return (
        <div className={`page_content ${theme === 'dark' ? 'bg-dark text-light' : 'bg-light text-dark'}`} style={{  paddingTop: '7%', paddingBottom: '5%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Container fluid="lg">
                <Row>
                    <Col sm={12} md={12} className='mb-4'>
                        <center>
                            <h2>About {title}</h2>
                        </center>
                    </Col>
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
                        <h5 style={{ textAlign: 'justify' }}><b>Youtube.com</b> is the largest video sharing platform on the Internet. Every day millions of new videos are added. You can find all kinds of videos but YouTube does not offer a FREE downloading service for these videos.<br/>
                        <b>{title}</b> allows you to download your favorite YouTube videos as audio or video files in the most efficient way. You are able to use <b>{title}</b> on any device – it is optimized to work on desktop, tablet and mobile devices. There is also no additional software or app needed.</h5>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default YoutubeSecondSection;
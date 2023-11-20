import React, { useState, useRef, useEffect } from 'react';

// Bootstrap Components
import { Container, Row, Col, Image, Form, InputGroup, Button, ListGroup, ButtonGroup } from 'react-bootstrap';

// Font Awesome Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Components
import { ThemeProvider, useTheme } from '../../Components/ThemeContext';

// Config
import { title } from "../../Config/settings.config";
import { displayImage1 } from "../../Config/images.config";

const FacebookDownloadProcess: React.FC = () => {
    
    const { theme, toggleTheme } = useTheme();

    return (
        <div className={`page_content ${theme === 'dark' ? 'bg-dark text-light' : 'bg-light text-dark'}`} style={{  paddingTop: '7%', paddingBottom: '5%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Container fluid="lg">
                <Row>
                    <Col sm={12} md={12} className='mb-4'>
                        <center>
                            <h2>How to download a Facebook video?</h2>
                        </center>
                    </Col>
                    <Col sm={12} md={12}>
                        <h5>1. Open <a href='https://www.facebook.com/' target='__blank'>facebook.com</a> and search for the video you would like to download.</h5>
                        <h5>2. When you find the video, click on it and wait until it starts playing. Then, just copy the video URL from your browser address bar.</h5>
                        <h5>3. Open <b>{title}</b> and paste the video URL in our converter and click convert button. After that you will be able to choose the download format. You can choose between SD or HD.</h5>
                        <h5>4. We will try to convert the video in the best available quality. But be aware that it is only possible to download videos that are up to 90 minutes long, to guarantee that the conversion will be done within a few minutes.</h5>
                        <h5>5. As soon as the conversion of the video is completed you will see a Download button. Just click on it, and the download shall start.</h5>
                        <h5>With the usage of <b>{title}</b> you are accepting our Terms of Use.</h5>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default FacebookDownloadProcess;
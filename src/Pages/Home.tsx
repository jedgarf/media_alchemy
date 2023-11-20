import React, { useState, useRef, useEffect } from 'react';

// Bootstrap Components
import { Container, Row, Col, Image, Form, InputGroup, Button, ListGroup, ButtonGroup } from 'react-bootstrap';

// Font Awesome Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Config
import { title } from "../Config/settings.config";
import { mainLogo } from "../Config/images.config";

// Pages
import YoutubeSecondSection from "./Youtube/YoutubeSecondSection";

// Services
import { youtubeLinkInfo, youtubeAudioDownload, youtubeVideoDownload } from "../Services/YoutubeServices";

const Home: React.FC = () => {

    const linkRef = useRef<HTMLInputElement>(null);
    const [isLoadInfo, setIsLoadInfo] = useState<boolean>(true);
    const [youtubeInfo, setYoutubeInfo] = useState<any>([]);

    const generateYoutubeLink = async (e: any) => {
        e.preventDefault();
        try {
            let link = linkRef.current ? linkRef.current.value : "";
            setIsLoadInfo(true);
            await youtubeLinkInfo(link).then((response) => {
                console.log(response.data.videoDetails);
                setYoutubeInfo(response.data.videoDetails);
                
            });
        } catch (error) {
            setYoutubeInfo([]);
        }
    }

    const downloadAudio = async (e: any) => {
        e.preventDefault();
        try {
            let link = linkRef.current ? linkRef.current.value : "";
            await youtubeAudioDownload(link).then((response) => {
                console.log(response);
                
            });
        } catch (error) {
            console.log(error);
        }
    }

    const downloadVideo = async (e: any) => {
        e.preventDefault();
        try {
            let link = linkRef.current ? linkRef.current.value : "";
            await youtubeVideoDownload(link).then((response) => {
                console.log(response);
                
            });
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
      console.log(youtubeInfo);
      setIsLoadInfo(false);
    }, [youtubeInfo]);
    
    return (
        <>
            <div className='page_content bg-light' style={{ height: '65vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Container fluid="lg">
                    <Row>
                        <Col sm={12}>
                            <center>
                                <h2>Youtube Link to MP3/MP4</h2>
                            </center>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12} style={{ marginTop: 30 }} align='center'>
                            <form onSubmit={(e) => generateYoutubeLink(e)}>
                                <InputGroup className="mb-3" style={{ maxWidth: '700px' }}>
                                    <Form.Control
                                    placeholder="ex. https://www.youtube.com/watch?v=IHhNTt3oxtY"
                                    aria-label="paste your youtube link here..."
                                    aria-describedby="basic-addon2"
                                    ref={linkRef}
                                    required
                                    />
                                    <Button type='submit' className='' variant="outline-primary" id="button-addon2" style={{ fontWeight: 550 }}>
                                    Convert {isLoadInfo ? <FontAwesomeIcon icon="spinner" className='spinner' /> : <FontAwesomeIcon icon="arrow-right" />}
                                    </Button>
                                </InputGroup>
                            </form>
                        </Col>
                        <Col sm={12} style={{ marginTop: 30 }} align='center'>
                            <Container fluid  style={{ maxWidth: '1000px', fontSize: '13px' }}>
                                {youtubeInfo?.title ? (
                                    <Row>
                                        <Col sm={12} md={5} align='center' className='mb-3'>
                                            <iframe title={youtubeInfo?.title} src={youtubeInfo?.embed?.iframeUrl} width={270} height={200} allowFullScreen></iframe>
                                        </Col>
                                        <Col sm={12} md={7} align='left'>
                                            <table style={{ marginBottom: '20px' }}>
                                                <tr>
                                                    <th>Title:</th>
                                                    <td>{youtubeInfo?.title}</td>
                                                </tr>
                                                <tr>
                                                    <th>Description:</th>
                                                    <td>{youtubeInfo?.description}</td>
                                                </tr>
                                                <tr>
                                                    <th>Length:</th>
                                                    <td>{youtubeInfo?.lengthSeconds > 60 ? `${(youtubeInfo?.lengthSeconds / 60).toFixed(2)} minutes` : `${youtubeInfo?.lengthSeconds} seconds`}</td>
                                                </tr>
                                                <tr>
                                                    <th>Upload Date:</th>
                                                    <td>{youtubeInfo?.uploadDate}</td>
                                                </tr>
                                            </table>
                                            <center>
                                                <ButtonGroup>
                                                    <Button onClick={downloadAudio}><FontAwesomeIcon icon="file-audio" /> MP3</Button>
                                                    <Button onClick={downloadVideo}><FontAwesomeIcon icon="file-video" /> MP4</Button>
                                                </ButtonGroup>
                                            </center>
                                        </Col>
                                    </Row>
                                ) : ("")}
                            </Container>
                        </Col>
                    </Row>
                </Container>
            </div>
            <YoutubeSecondSection/>
        </>
    )
}

export default Home;
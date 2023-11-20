import React, { useState, useRef, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';

// Bootstrap Components
import { Container, Row, Col, Image, Form, InputGroup, Button, ListGroup, ButtonGroup } from 'react-bootstrap';

// Font Awesome Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Config
import { title } from "../Config/settings.config";
import { mainLogo } from "../Config/images.config";

// Pages
import YoutubeDownloadProcess from "./Youtube/YoutubeDownloadProcess";
import YoutubeSecondSection from "./Youtube/YoutubeSecondSection";

// Components
import { ThemeProvider, useTheme } from '../Components/ThemeContext';

// Services
import { youtubeLinkInfo, youtubeAudioDownload, youtubeVideoDownload } from "../Services/YoutubeServices";

const Home: React.FC = () => {

    const { theme, toggleTheme } = useTheme();

    const linkRef = useRef<HTMLInputElement>(null);
    const [isLoadInfo, setIsLoadInfo] = useState<boolean>(true);
    const [youtubeInfo, setYoutubeInfo] = useState<any>([]);

    const generateYoutubeLink = async (e: any) => {
        e.preventDefault();
        try {
            let link = linkRef.current ? linkRef.current.value : "";
            setIsLoadInfo(true);
            await youtubeLinkInfo(link).then((response) => {
                // console.log(response.data.videoDetails);
                setYoutubeInfo(response.data.videoDetails);
                
            });
        } catch (error) {
            setYoutubeInfo([]);
        }
    }

    const downloadAudio = async (e: any) => {
        e.preventDefault();
        try {
            let videoUrl = linkRef.current ? linkRef.current.value : "";
            const response: AxiosResponse<any> = await youtubeAudioDownload(videoUrl);
            // console.log(response.data);
            // Create a blob URL and initiate a download
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${youtubeInfo?.title.replace(/[\/\?<>\\:\*\|"]/g, '_')}.mp3`);
            document.body.appendChild(link);
            link.click();

            // Clean up the blob URL
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.log(error);
        }
    }

    const downloadVideo = async (e: any) => {
        e.preventDefault();
        try {
            let videoUrl = linkRef.current ? linkRef.current.value : "";
            const response: AxiosResponse<any> = await youtubeVideoDownload(videoUrl);
            // console.log(response.data);
            // Create a blob URL and initiate a download
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${youtubeInfo?.title.replace(/[\/\?<>\\:\*\|"]/g, '_')}.mp4`);
            document.body.appendChild(link);
            link.click();

            // Clean up the blob URL
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
    //   console.log(youtubeInfo);
      setIsLoadInfo(false);
    }, [youtubeInfo]);
    
    return (
        <>
            <div className={`page_content ${theme === 'dark' ? 'bg-dark' : 'bg-light'}`} style={{ paddingTop: '7%', paddingBottom: '5%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Container fluid="lg">
                    <Row>
                        <Col sm={12}>
                            <center>
                                <h2><FontAwesomeIcon icon={["fab", "youtube"]} color='#DC4C64' style={{ fontSize: 100 }} /></h2>
                                <p style={{ textTransform: 'uppercase' }} className={`${theme === 'dark' ? 'text-light' : 'text-dark'}`}>You can convert and download to mp3 or mp4 with no deep shit ads.</p>
                            </center>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12} style={{ marginTop: 10 }} align='center'>
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
                        <Col sm={12} style={{ marginTop: 30, marginBottom: 140 }} align='center'>
                            <Container fluid  style={{ maxWidth: '1000px', fontSize: '13px' }} className={`${theme === 'dark' ? 'text-light' : 'text-dark'}`}>
                                {youtubeInfo?.title ? (
                                    <Row>
                                        <Col sm={12} md={5} align='center' className='mb-3'>
                                            <iframe title={youtubeInfo?.title} src={youtubeInfo?.embed?.iframeUrl} width={'100%'} height={200} allowFullScreen></iframe>
                                        </Col>
                                        <Col sm={12} md={7} align='left'>
                                            <table cellPadding={5} style={{ marginBottom: '20px' }}>
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
                                        </Col>
                                        <Col sm={12} md={12}>
                                            <Button onClick={downloadAudio} style={{ marginRight: 10 }}><FontAwesomeIcon icon="file-audio" /> MP3</Button>
                                            <Button onClick={downloadVideo}><FontAwesomeIcon icon="file-video" /> MP4</Button>
                                        </Col>
                                    </Row>
                                ) : (<><br/><br/><br/></>)}
                            </Container>
                        </Col>
                    </Row>
                </Container>
            </div>
            <YoutubeDownloadProcess/>
            <YoutubeSecondSection/>
        </>
    )
}

export default Home;
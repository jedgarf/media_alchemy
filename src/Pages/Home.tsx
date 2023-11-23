import React, { useState, useRef, useEffect } from 'react';
import axios, { AxiosResponse, AxiosProgressEvent, CancelTokenSource } from 'axios';

// Bootstrap Components
import { Container, Row, Col, Image, Form, InputGroup, Button, ListGroup, ButtonGroup, ProgressBar } from 'react-bootstrap';

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

// Utilities
import { moveTo } from "../Utilities/GeneralUtilities";

// Services
import { youtubeLinkInfo, youtubeDownloadLink, youtubeAudioDownload, youtubeVideoDownload } from "../Services/YoutubeServices";

const Home: React.FC = () => {

    const { theme, toggleTheme } = useTheme();

    const linkRef = useRef<HTMLInputElement>(null);
    const progressBarDivRef = useRef<HTMLInputElement>(null);
    const [isLoadInfo, setIsLoadInfo] = useState<boolean>(true);
    const [hidePasteButton, setHidePasteButton] = useState<boolean>(true);
    const [youtubeInfo, setYoutubeInfo] = useState<any>([]);
    const [showProgressBar, setShowProgressBar] = useState<boolean>(false);
    const [percentage, setPercentage] = useState<any>(0);
    const [cancelTokenSource, setCancelTokenSource] = useState<CancelTokenSource | null>(null);
    const [toastrMessage, setToastrMessage] = React.useState<string | null>(null);

    const generateYoutubeLink = async (e: any) => {
        e.preventDefault();
        setToastrMessage("");
        try {
            let link = linkRef.current ? linkRef.current.value : "";
            setIsLoadInfo(true);
            await youtubeLinkInfo(link).then((response) => {
                // console.log(response.data.videoDetails);
                setYoutubeInfo(response.data);
                
            });
        } catch (error) {
            setYoutubeInfo([]);
            setToastrMessage('Invalid URL.');
        }
    }

    const downloadLink = async (e: any, mediaType: string, downloadUrl: string) => {
        e.preventDefault();

        setPercentage(0);
        setToastrMessage("");
        setShowProgressBar(true);

        // move smoothly to progressbar
        if (progressBarDivRef.current) {
            progressBarDivRef.current.scrollIntoView({ behavior: 'smooth' });
        }

        try {
            const { token, cancel } = axios.CancelToken.source();
            setCancelTokenSource({ token, cancel });

            const response = await youtubeDownloadLink(downloadUrl, {
                onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
                  // Handle progress updates (you can update the UI here)
                  if (progressEvent.total !== null && progressEvent.total !== undefined) {
                    const progress = (progressEvent.loaded / progressEvent.total) * 100;
                    setPercentage(progress.toFixed(2));
                    // console.log(`Download Progress: ${progress.toFixed(2)}%`);
                  }
                },
                cancelToken: token, // Pass the cancel token to the request
              });

            // Create a blob URL and initiate a download
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            console.log("url", url);
            link.setAttribute('download', `${youtubeInfo?.title.replace(/ /g, '_').replace(/ +/g, "_").replace(/[^a-zA-Z0-9_.-]/g, '_')}.${mediaType}`);
            document.body.appendChild(link);
            link.click();

            // Clean up the blob URL
            window.URL.revokeObjectURL(url);

        } catch (error) {
            if (axios.isCancel(error)) {
                console.log('Request canceled:', error.message);
            } else {
                console.error('Error:', error);
                setToastrMessage("Cant download this file.");
            }
        } finally { 
            setTimeout(function () {
                setPercentage(0);
                setShowProgressBar(false);
                // Reset the cancel token source after the request is complete
                setCancelTokenSource(null);
            }, 3000);
        }
    }

    const stopDownloading = (e: any) => {
        e.preventDefault();
        if (cancelTokenSource) {
            cancelTokenSource.cancel('Request canceled by cleanup.');
        }
        setPercentage(0);
        setTimeout(function () {
            setShowProgressBar(false);
        }, 1000);
    }

    const pasteDownloadUrl = (e: any) => {
        if (navigator.clipboard && navigator.clipboard.readText) {
            // Clipboard API is supported
            navigator.clipboard.readText()
              .then(text => {
                // Handle the text read from the clipboard
                // console.log('Text from clipboard:', text);
                if (linkRef.current) {
                    linkRef.current.value = text;   
                }
              })
              .catch(error => {
                console.error('Error reading from clipboard:', error);
              });
        } else {
            // Clipboard API is not supported
            console.error('Clipboard API is not supported in this browser');
        }
    }

    useEffect(() => {
        setIsLoadInfo(false);
        try {
            if (navigator.clipboard && navigator.clipboard.readText) {
                navigator.clipboard.readText();
                setHidePasteButton(false);
            }
        } catch (error) {
            console.error(error);
        }
    }, [youtubeInfo]);
    
    return (
        <>
            <div className={`page_content ${theme === 'dark' ? 'bg-dark' : 'bg-light'}`} style={{ paddingTop: '7%', paddingBottom: '5%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Container fluid="lg">
                    <Row>
                        <Col sm={12}>
                            <center>
                                <h2><FontAwesomeIcon icon={["fab", "youtube"]} color='#DC4C64' style={{ fontSize: 100 }} /></h2>
                                <p style={{ textTransform: 'uppercase' }} className={`${theme === 'dark' ? 'text-light' : 'text-dark'}`}>You can convert and download with no deep shit ads.</p>
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
                                    <Button type='button' title='Paste' className='' onClick={(e) => pasteDownloadUrl(e)} variant="success" id="button-addon2" style={{ fontWeight: 550 }} hidden={hidePasteButton}>
                                        <FontAwesomeIcon icon="paste" />
                                    </Button>
                                    <Button type='submit' title='Convert' className='' variant="primary" id="button-addon2" style={{ fontWeight: 550 }}>
                                        {isLoadInfo ? <FontAwesomeIcon icon="spinner" className='spinner' /> : <FontAwesomeIcon icon="arrow-right" />}
                                    </Button>
                                </InputGroup>
                                {toastrMessage && 
                                <p className={`${theme === 'dark' ? 'text-white' : 'text-black'}`}><FontAwesomeIcon icon="circle-exclamation" style={{ color: '#DC4C64' }} /> {toastrMessage}</p>
                                }
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
                                                <tbody>
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
                                                </tbody>
                                            </table>
                                        </Col>
                                        <Col sm={12} md={12}>
                                            {/* <Button onClick={(e) => downloadLink(e, 'mp3', youtubeInfo?.audioDownloadLink)} style={{ marginRight: 10 }}><FontAwesomeIcon icon="file-audio" /> MP3</Button>
                                            <Button onClick={(e) => downloadLink(e, 'mp4', youtubeInfo?.videoDownloadLink)}><FontAwesomeIcon icon="file-video" /> MP4</Button> */}
                                            <Row style={{ textAlign: 'left' }}>
                                                <Col sm={12} md={6} style={{ marginBottom: '10px' }}>
                                                    <h5>Audio:</h5>
                                                    {youtubeInfo?.audioDownloadLinks.map((item: any, index: number) => {
                                                        return (
                                                            <Row key={index} style={{ textAlign: 'left', marginTop: '5px', marginBottom: '5px' }}>
                                                                <Col xs={6} md={6} style={{ display: 'flex', alignItems: 'center', height: '6vh' }}>
                                                                    <h6 style={{ fontSize: '15px' }}><b>Bitrate:</b> {item.audioBitrate}Kbps ({item.container})</h6>
                                                                </Col>
                                                                <Col xs={6} md={6} style={{ textAlign: 'right', height: '6vh' }}>
                                                                    <Button size="sm" onClick={(e) => downloadLink(e, 'mp3', item.url)} disabled={showProgressBar}><FontAwesomeIcon icon="file-download" /> Download {item.contentLength ? "(" + (item.contentLength / 1024 / 1024).toFixed(2) + "MB)" : ""}</Button> 
                                                                </Col>
                                                            </Row>
                                                        )
                                                    })}
                                                </Col>
                                                <Col sm={12} md={6} style={{ marginBottom: '10px' }}>
                                                    <h5>Video:</h5>
                                                    {youtubeInfo?.videoDownloadLinks.map((item: any, index: number) => {
                                                        return (
                                                            <Row key={index} style={{ textAlign: 'left', marginTop: '5px', marginBottom: '5px' }}>
                                                                <Col xs={6} md={6} style={{ display: 'flex', alignItems: 'center', height: '6vh' }}>
                                                                    <h6 style={{ fontSize: '15px' }}><b>Resolution:</b> {item.qualityLabel.toUpperCase()} ({item.container})</h6>
                                                                </Col>
                                                                <Col xs={6} md={6} style={{ textAlign: 'right', height: '6vh' }}>
                                                                    <Button size="sm" onClick={(e) => downloadLink(e, 'mp4', item.url)} disabled={showProgressBar}><FontAwesomeIcon icon="file-download" /> Download {item.contentLength ? "(" + (item.contentLength / 1024 / 1024).toFixed(2) + "MB)" : ""}</Button> 
                                                                </Col>
                                                            </Row>
                                                        )
                                                    })}
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col sm={12} md={12} style={{ marginTop: 30 }} hidden={!showProgressBar}>
                                            <Row>
                                                <Col sm={12} md={12} style={{ marginBottom: 10 }}>
                                                    <Row>
                                                        <Col xs={12} md={6} style={{ textAlign: 'left' }}>
                                                            <p><FontAwesomeIcon icon="spinner" className='spinner' /> Please wait while downloding...</p>
                                                        </Col>
                                                        <Col xs={12} md={6} style={{ textAlign: 'right' }}>
                                                            <Button size="sm" variant='danger' onClick={(e) => stopDownloading(e)} disabled={percentage >= 95}><FontAwesomeIcon icon="stop" /> Stop</Button> 
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col sm={12} md={12} className='download-progressbar'>
                                                    <div ref={progressBarDivRef}>
                                                        <ProgressBar now={percentage} label={`${percentage}% completed`} animated />
                                                    </div>
                                                </Col>
                                            </Row>
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
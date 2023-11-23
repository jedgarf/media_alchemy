import React, { useState, useRef, useEffect } from 'react';
import axios, { AxiosResponse, AxiosProgressEvent, CancelTokenSource } from 'axios';

// Bootstrap Components
import { Container, Row, Col, Image, Form, InputGroup, Button, ListGroup, ButtonGroup, ProgressBar } from 'react-bootstrap';

// Font Awesome Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Config
import { title } from "../../Config/settings.config";
import { mainLogo } from "../../Config/images.config";

// Pages
import FacebookDownloadProcess from "../Facebook/FacebookDownloadProcess";

// Components
import { ThemeProvider, useTheme } from '../../Components/ThemeContext';

// Services
import { facebookLinkInfo, facebookDownloadLink } from "../../Services/facebookServices";

const Home: React.FC = () => {

    const { theme, toggleTheme } = useTheme();

    const linkRef = useRef<HTMLInputElement>(null);
    const [isLoadInfo, setIsLoadInfo] = useState<boolean>(true);
    const [fbInfo, setFbInfo] = useState<any>([]);
    const [showProgressBar, setShowProgressBar] = useState<boolean>(false);
    const [percentage, setPercentage] = useState<any>(0);
    const [cancelTokenSource, setCancelTokenSource] = useState<CancelTokenSource | null>(null);
    const [toastrMessage, setToastrMessage] = React.useState<string | null>(null);

    const generateYoutubeLink = async (e: any) => {
        e.preventDefault();
        try {
            let link = linkRef.current ? linkRef.current.value : "";
            setIsLoadInfo(true);
            await facebookLinkInfo(link).then((response) => {
                // console.log("response.data", response.data.results);
                setFbInfo(response.data.results); 
            });
        } catch (error) {
            setFbInfo([]);
            setToastrMessage("Video not available for download.");
        }
    }

    const downloadLink = async (e: any, downloadUrl: string) => {
        e.preventDefault();
        setPercentage(0);
        setShowProgressBar(true);
        try {
            const { token, cancel } = axios.CancelToken.source();
            setCancelTokenSource({ token, cancel });

            const response = await facebookDownloadLink(downloadUrl, {
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
            const num = Math.floor(Math.random() * 90000) + 10000;
            link.href = url;
            link.setAttribute('download', `downloadedFbVideo-${num}.mp4`);
            document.body.appendChild(link);
            link.click();

            // Clean up the blob URL
            window.URL.revokeObjectURL(url);

        } catch (error) {
            if (axios.isCancel(error)) {
                console.log('Request canceled:', error.message);
            } else {
                console.error('Error:', error);
                setToastrMessage("Cant download this video.");
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

    useEffect(() => {
    //   console.log(fbInfo);
      setIsLoadInfo(false);
    }, [fbInfo]);
    
    return (
        <>
            <div className={`page_content ${theme === 'dark' ? 'bg-dark' : 'bg-light'}`} style={{ paddingTop: '7%', paddingBottom: '5%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Container fluid="lg">
                    <Row>
                        <Col sm={12}>
                            <center>
                                <h2><FontAwesomeIcon icon={["fab", "facebook"]} color='#3B71CA' style={{ fontSize: 100 }} /></h2>
                                <p style={{ textTransform: 'uppercase' }} className={`${theme === 'dark' ? 'text-light' : 'text-dark'}`}>You can convert and download with no deep shit ads.</p>
                            </center>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12} style={{ marginTop: 10 }} align='center'>
                            <form onSubmit={(e) => generateYoutubeLink(e)}>
                                <InputGroup className="mb-3" style={{ maxWidth: '700px' }}>
                                    <Form.Control
                                    placeholder="ex. https://www.facebook.com/watch?v=984326882905820"
                                    aria-label="paste your facenook link here..."
                                    aria-describedby="basic-addon2"
                                    ref={linkRef}
                                    required
                                    />
                                    <Button type='submit' className='' variant="primary" id="button-addon2" style={{ fontWeight: 550 }}>
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
                                {fbInfo?.url ? (
                                    <Row>
                                        <Col sm={12} md={5} align='center' className='mb-3'>
                                            <Image src={fbInfo?.thumbnail} width={'100%'} height={200} />
                                        </Col>
                                        <Col sm={12} md={7} align='left'>
                                            <table cellPadding={5} style={{ marginBottom: '20px' }}>
                                                <tr>
                                                    <th>Title:</th>
                                                    <td>{fbInfo?.title || 'N/A'}</td>
                                                </tr>
                                            </table>
                                        </Col>
                                        <Col sm={12} md={12}>
                                            <center>
                                                <Button size="sm" onClick={(e) => downloadLink(e, fbInfo?.sd)} style={{ marginRight: 5 }}  disabled={showProgressBar}><FontAwesomeIcon icon="file-download" /> Download (SD)</Button>
                                                <Button size="sm" onClick={(e) => downloadLink(e, fbInfo?.hd)}  disabled={showProgressBar}><FontAwesomeIcon icon="file-download" /> Download (HD)</Button>
                                            </center>
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
                                                <Col sm={12} md={12}>
                                                    <ProgressBar now={percentage} label={`${percentage}% completed`} animated />
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
            <FacebookDownloadProcess/>
        </>
    )
}

export default Home;
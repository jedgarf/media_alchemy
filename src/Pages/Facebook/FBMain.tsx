import React, { useState, useRef, useEffect } from 'react';
import axios, { AxiosResponse, AxiosProgressEvent } from 'axios';

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
        }
    }

    const downloadLink = async (e: any, downloadUrl: string) => {
        e.preventDefault();
        setPercentage(0);
        setShowProgressBar(true);
        try {
            const response = await facebookDownloadLink(downloadUrl, {
                onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
                  // Handle progress updates (you can update the UI here)
                  if (progressEvent.total !== null && progressEvent.total !== undefined) {
                    const progress = (progressEvent.loaded / progressEvent.total) * 100;
                    setPercentage(progress.toFixed(2));
                    // console.log(`Download Progress: ${progress.toFixed(2)}%`);
                  }
                },
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
            console.error('Error downloading file:', error);
        } finally { 
            setTimeout(function () {
                setPercentage(0);
                setShowProgressBar(false);
            }, 3000);
        }
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
                                <p style={{ textTransform: 'uppercase' }} className={`${theme === 'dark' ? 'text-light' : 'text-dark'}`}>You can convert and download to mp4 with no deep shit ads.</p>
                            </center>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12} style={{ marginTop: 10 }} align='center'>
                            <form onSubmit={(e) => generateYoutubeLink(e)}>
                                <InputGroup className="mb-3" style={{ maxWidth: '700px' }}>
                                    <Form.Control
                                    placeholder="ex. https://www.facebook.com/watch/?v=984326882905820"
                                    aria-label="paste your facenook link here..."
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
                                                <Button onClick={(e) => downloadLink(e, fbInfo?.sd)} style={{ marginRight: 5 }}><FontAwesomeIcon icon="file-download" /> SD</Button>
                                                <Button onClick={(e) => downloadLink(e, fbInfo?.hd)}><FontAwesomeIcon icon="file-download" /> HD</Button>
                                            </center>
                                        </Col>
                                        <Col sm={12} md={12} style={{ marginTop: 30 }} hidden={!showProgressBar}>
                                            <ProgressBar now={percentage} label={`${percentage}% completed`} animated />
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
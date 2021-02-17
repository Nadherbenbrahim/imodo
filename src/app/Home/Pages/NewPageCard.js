import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { connectInstagramPage, disconnectInstagramPage, deleteInstagramPage, makeOwnerInstagramPage, connectFacebookPage, disconnectFacebookPage,deleteFacebookPage, makeOwnerFacebookPage, getFbData, getInstaData, setPreferences } from '../../../redux/actions/socialMediaActions';
import { useLocation, useHistory } from 'react-router-dom';
import NumericInput from 'react-numeric-input';
import {
    Row,
    Col,
    Image,
    Modal,
    Spinner,
    Form,
    Button,
} from 'react-bootstrap';
import OwnerCheckbox from './OwnerCheckbox';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import Lottie from 'react-lottie';

import animationData from '../../../assets/json/loadingSpinner.json';
import notFoundAnimationData from '../../../assets/json/not-found.json';

import { IoIosClose, IoIosMore } from 'react-icons/io';
const DISC_ICON = require('../../../assets/images/home/disconnected-icon.png');
const CONN_ICON = require('../../../assets/images/home/connected-icon.png');
const DELETE_ICON = require('../../../assets/images/home/delete_trash.png');
const USER_ICON = require('../../../assets/images/home/user.png');
const USER_MEMBER_ICON = require('../../../assets/images/home/page-card-member.png');
const INSTA_ICON = require('../../../assets/images/home/insta-icon.png');
const FB_ICON = require('../../../assets/images/home/fb-icon.png');

function NewPageCard(props) {
    /* 
        ALL PROPS {
            platform={"fb"} 
            isConnectedPage={page.isConnected} 
            namePage={page.name} 
            idPage={page.idPage} 
            picture={null} 
            accessToken={page.access_token}
            status={key}
            spam={page.spam}
            likesComment={page.likesComment}
            delay={page.repsReplies.statut}
        } 
    */

   const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
        confirmButton: 'wizard-pages-active-btn-alert',
        },
        buttonsStyling: false
    });

    const defaultOptionsNotFound = {
        loop: true,
        autoplay: true, 
        animationData: notFoundAnimationData,
        rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
        }
    };  

    const defaultOptions = {
        loop: true,
        autoplay: true, 
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
    };

    const location = useLocation();
    const history = useHistory();
    const fbHost = "https://graph.facebook.com/v8.0";

    const [fbGraphData,setFbGraphData] = useState(null);
    const [instaGraphData,setInstaGraphData] = useState(null);
    const [showPopoverConnect, setShowPopoverConnect] = useState(false);
    const [loadingWhileConnecting, setLoadingWhileConnecting] = useState(false);
    const [showDisconnectModal, setShowDisconnectModal] = useState(false);
    const [showModalTeam,setShowModalTeam] = useState(false);
    
    const [selectedOwner, setSelectedOwner] = useState({});
    const [ownerConfirmation, setOwnerConfirmation] = useState(null);
    
    // ANTI SPAM:
    const [showSpamPopover, setShowSpamPopover] = useState(false);
    const [spamVar, setSpamVar] = useState(props.spam);
    const [likeVar, setLikeVar] = useState(props.likesComment);
    const [delayReply, setDelayReply] = useState(props.delay);
    const [exactlySeconds, setExactlySeconds] = useState(0);
    const [exactlyMinutes, setExactlyMinutes] = useState(0);

    const [randomlyFromSeconds, setRandomlyFromSeconds] = useState(0);
    const [randomlyFromMinutes, setRandomlyFromMinutes] = useState(0);
    const [randomlyToSeconds, setRandomlyToSeconds] = useState(0);
    const [randomlyToMinutes, setRandomlyToMinutes] = useState(0);

    const handleDisconnectModal = () => setShowDisconnectModal(!showDisconnectModal);

    const handleConnectPopover = () =>  setShowPopoverConnect(!showPopoverConnect);

    const handleSpamPopover = () => setShowSpamPopover(!showSpamPopover)

    const checkOwner = () => {
        let userData = JSON.parse(localStorage.getItem('userData'));
        let found = null;
        
        if(props.admins.length > 0) {
            found = props.admins.find(admin => admin.idFacebook === userData.user.idFacebook && admin.role === "owner")
        };
        return found;
    };

    const selectNewOwner = (idFacebook,firstName,lastName,idPage) => {
        
        if(selectedOwner.idFacebook === idFacebook) {
            setSelectedOwner({});
        } else {
            // setSelectedOwner([idFacebook,`${firstName} ${lastName}`]);
            setSelectedOwner({
                idFacebook: idFacebook,
                firstName: firstName,
                lastName: lastName,
                idPage: idPage,
            });
        }
    };

    const confirmTheOwner = () => {

        // Mdoal reset 
        // setShowDisconnectModal(false);
        // setShowModalTeam(false);
        // setOwnerConfirmation(false);
        // setSelectedOwner({});

        if(selectedOwner.idFacebook && selectedOwner.idPage) {

            if(props.platform === "instagram") {
                props.makeOwnerInstagramPage(selectedOwner.idPage,selectedOwner.idFacebook)
                .then(() => {
                    // Confirm the new Owner: 
                    setOwnerConfirmation(true);
                })
                .catch(() => {
                    swalWithBootstrapButtons.fire({
                        title: 'Connexion error with the server. Try again !',
                        confirmButtonText: 'Okay',
                    }); 
                });
            } else {
                props.makeOwnerFacebookPage(selectedOwner.idPage,selectedOwner.idFacebook)
                .then(() => {
                    // Confirm the new Owner: 
                    setOwnerConfirmation(true);
                })
                .catch(() => {
                    swalWithBootstrapButtons.fire({
                        title: 'Connexion error with the server. Try again !',
                        confirmButtonText: 'Okay',
                    }); 
                });
            };

        } else {
           
            swalWithBootstrapButtons.fire({
                title: 'Please select a new owner !',
                confirmButtonText: 'Okay',
            }); 
        }

        // props.platform === "insta" ? props.makeOwnerInstagramPage(idPage,member.idFacebook) : props.makeOwnerFacebookPage(idPage,member.idFacebook)
    };
    const resetModal = () => {
        setShowDisconnectModal(false);
        setShowModalTeam(false);
        setOwnerConfirmation(false);
        setSelectedOwner({});
    };

    const getMinutes = (millis) => {
        return Math.floor(millis / 60000);
    };

    const getSeconds = (millis) => {
        return ((millis % 60000) / 1000).toFixed(0);
    };

    // RENDERING METHODS: 
    const renderPopover = () => (
        <div 
            className="page-card-connect-popover d-flex"
            onClick={() => {
                    // Popup Config
                    const swalWithBootstrapButtons = Swal.mixin({
                        customClass: {
                        confirmButton: 'wizard-pages-active-btn',
                        },
                        buttonsStyling: false
                    });

                    if(props.platform === "instagram" && !props.isConnectedPage) {
                        // Instagram 
                        setLoadingWhileConnecting(true);
                        props.connectInstagramPage(props.idPage)
                        .then(() => {
                            setLoadingWhileConnecting(false);
                            props.setLoadingPages(true);
                            props.getInstaData()
                            .then(() => props.setLoadingPages(false))
                            .catch(() => {
                                setLoadingWhileConnecting(false);
                                swalWithBootstrapButtons.fire({
                                    title: 'Error while getting instagram pages',
                                    confirmButtonText: 'Retry',
                                });
                            });
                        })
                        .catch(() => {
                            swalWithBootstrapButtons.fire({
                                title: 'Error while connecting the instagram page',
                                confirmButtonText: 'Retry',
                            });
                        });
                    } else if(props.platform === "facebook" && !props.isConnectedPage) {
                        // Facebook
                        setLoadingWhileConnecting(true);
                        props.connectFacebookPage(props.idPage)
                        .then(() => {
                            setLoadingWhileConnecting(false);
                            props.setLoadingPages(true);
                            props.getFbData()
                            .then(() => props.setLoadingPages(false))
                            .catch(() => {
                                swalWithBootstrapButtons.fire({
                                    title: 'Error while getting facebook pages',
                                    confirmButtonText: 'Retry',
                                });
                            });;
                        }) 
                        .catch(() => {
                            setLoadingWhileConnecting(false);
                            swalWithBootstrapButtons.fire({
                                title: 'Error while connecting the facebook page',
                                confirmButtonText: 'Retry',
                            });
                        });
                    } else {
                        setShowDisconnectModal(true)
                    }
                    
            }}
        >
            {loadingWhileConnecting 
            ?
            (<div className="px-3"><Spinner animation="border" size="sm" variant="primary" className="spinnerRose" /></div>)
            :
            (
            props.isConnectedPage
            ?
            <p className="m-auto">Disconnect</p>
            :
            <p className="m-auto">Connect</p>
            )
            }
        </div>
    )

    const renderSpamPopover = () => (
        <div className="page-card-anti-spam-popover" key={props.idPage * Math.random()}>
            <Row>
                <Col lg={12} className="mb-2">
                    <div className="d-flex" onClick={() =>  setSpamVar(!spamVar) }>
                        <Form.Check 
                            type="switch"
                            id="custom-switch-1"
                            label=""
                            className="my-auto mr-2"
                            checked={spamVar}
                        />
                        <p className="page-card-anti-spam-switch-label my-auto">Anti Spam</p>
                    </div>
                </Col>

                <Col lg={12} className="mb-2">
                    <div className="d-flex" onClick={() => setLikeVar(!likeVar) }>
                        <Form.Check 
                            type="switch"
                            id="custom-switch-2"
                            label=""
                            className="my-auto mr-2"
                            checked={likeVar}
                        />
                        <p className="page-card-anti-spam-switch-label my-auto">Like matched replies</p>
                    </div>
                </Col>
                
                <Col lg={12} className="mb-1">
                    <p className="page-card-anti-spam-small-text mb-1">Delay before replying</p>
                    <hr style={{height: '2px', borderColor: '#B4B4B4', margin: 0, }} />
                </Col>

                <Col lg={12} className="mb-2">
                    <div className="d-flex" onClick={() => setDelayReply('immediatly')}>
                        <Form.Check 
                            type="checkbox"
                            id="custom-checkbox-1"
                            className="my-auto mr-1"
                            checked={delayReply === "immediatly"}
                        />
                        <p className="page-card-anti-spam-checkbox-label my-auto">Immediatly</p>
                    </div>
                </Col>
                
                <Col lg={12} className="mb-2">
                    <div className="d-flex justify-content-between">
                        <div className="d-flex" onClick={() => setDelayReply('Exactly')}>
                            <Form.Check 
                                type="checkbox"
                                id="custom-checkbox-2"
                                className="my-auto mr-1"
                                checked={delayReply === "Exactly"}
                            />
                            <p className="page-card-anti-spam-checkbox-label my-auto">Exactly after</p>
                        </div>

                        <div className="d-flex">
                            <NumericInput id="page-card-anti-spam-input" min={0} max={59} value={exactlyMinutes} onChange={setExactlyMinutes} disabled={delayReply === "immediatly"} />
                            <p className="page-card-anti-spam-unity my-auto mx-1">m</p>
                            
                            <NumericInput id="page-card-anti-spam-input" min={0} max={59} value={exactlySeconds} onChange={setExactlySeconds} disabled={delayReply === "immediatly"}/>
                            <p className="page-card-anti-spam-unity my-auto ml-1">s</p>
                        </div>
                    </div>
                </Col>
                
                <Col lg={12} className="mb-2">
                    <div className="d-flex justify-content-between">
                        <div className="d-flex" onClick={() => setDelayReply('Randomly')}>
                            <Form.Check 
                                type="checkbox"
                                id="custom-checkbox-2"
                                className="my-auto mr-1"
                                checked={delayReply === "Randomly"}
                            />
                            <p className="page-card-anti-spam-checkbox-label my-auto">Randomly</p>
                        </div>

                        <div className="d-flex">
                            <p className="page-card-anti-spam-checkbox-label my-auto mr-2">From</p>
                            <NumericInput id="page-card-anti-spam-input" min={0} max={59} value={randomlyFromMinutes} onChange={setRandomlyFromMinutes} disabled={delayReply === "immediatly"}/>
                            <p className="page-card-anti-spam-unity my-auto mx-1">m</p>

                            <NumericInput id="page-card-anti-spam-input" min={0} max={59} value={randomlyFromSeconds} onChange={setRandomlyFromSeconds} disabled={delayReply === "immediatly"}/>
                            <p className="page-card-anti-spam-unity my-auto ml-1">s</p>
                        </div>
                    </div>
                </Col>
                
                <Col lg={12} className="mb-2 d-flex" >
                    <div className="d-flex ml-auto">
                        <p className="page-card-anti-spam-checkbox-label my-auto mr-2">To</p>
                        <NumericInput id="page-card-anti-spam-input" min={0} max={59} value={randomlyToMinutes} onChange={setRandomlyToMinutes} disabled={delayReply === "immediatly"}/>
                        <p className="page-card-anti-spam-unity my-auto mx-1">m</p>

                        <NumericInput id="page-card-anti-spam-input" min={0} max={59} value={randomlyToSeconds} onChange={setRandomlyToSeconds} disabled={delayReply === "immediatly"}/>
                        <p className="page-card-anti-spam-unity my-auto ml-1">s</p>
                    </div>
                </Col>

                <Col lg={12} className="mb-3 d-flex">
                    {/*  */}
                    <div className="page-card-anti-spam-save-btn p-2 ml-auto" onClick={() => props.setPreferences(history,spamVar,likeVar,delayReply,props.page,props.platform,exactlySeconds,exactlyMinutes,randomlyFromSeconds,randomlyFromMinutes,randomlyToSeconds,randomlyToMinutes)}>
                        Save 
                    </div>
                </Col>
            </Row>
        </div>
    ); 
    
    const renderDisconnectModal = (idPage) => (
        <Modal show={showDisconnectModal} onHide={handleDisconnectModal} size="lg" centered >
            <div className="d-flex flex-column">
                
                {!showModalTeam
                &&
                <IoIosClose className="ml-auto mr-3 mt-2" color={'#9F9F9F'} size={'28'} onClick={resetModal} style={{cursor: 'pointer'}} />
                }
                
                {showModalTeam
                &&
                <Modal.Header>
                    <Col lg={12}>
                        <Row className="justify-content-between d-flex">
                            <p className="my-auto page-card-modal-small-title" style={{fontSize: '17px'}}>Make Owner</p>
                            <IoIosClose className="my-auto" color={'#9F9F9F'} size={'28'} onClick={resetModal} style={{cursor: 'pointer'}} />
                        </Row>
                    </Col>
                </Modal.Header>
                }

                <Modal.Body>
                    {!showModalTeam 
                    &&
                    <>
                    <Row className="d-flex">
                        <Col className="d-flex flex-column m-auto">
                            {
                                props.picture !== null
                                ?
                                <Image src={props.picture} fluid className="m-auto pages-card-profile-picture" />
                                :
                                fbGraphData !== null 
                                ?
                                <Image src={fbGraphData.picture.data.url} fluid className="m-auto pages-card-profile-picture" />
                                :
                                <Lottie options={defaultOptions} width={150} />
                            }
                                
                            <div className="d-flex" style={{ zIndex: 1, marginTop: '-20px' }}>
                                <Col lg={6} />

                                <Col lg={6}>
                                    <Image src={props.platform === "facebook" ? FB_ICON : INSTA_ICON} fluid className="m-auto" />
                                </Col>
                            </div>
                        </Col>
                    </Row>

                    <Row className="d-flex mb-3 mt-3">
                        <p className="m-auto pages-card-title" >{props.namePage}</p>
                    </Row>
                    </>
                    }

                    {!showModalTeam
                    ? 
                    <Row className="d-flex mt-3 mb-3 justify-content-around ml-5 mr-5">
                        <Col lg={2} />

                        <Col lg={5} className="d-flex">

                            <div className="d-flex flex-column mr-auto" onClick={() => setShowModalTeam(true)}>
                                <div className="page-card-modal-small-box m-auto d-flex">
                                    <Image src={USER_ICON} className="m-auto"  style={{ width: '25px'}} />
                                </div>
                                <p className="page-card-modal-small-title mx-auto mt-2">Make Owner</p>
                            </div>
                            
                            {/* Disconnect Na7awha faj2atan */}
                            {/* <div 
                                className="d-flex flex-column m-auto" 
                                style={{cursor: 'pointer'}} 
                                onClick={() => { 
                                        // Popup Config:
                                        const swalWithBootstrapButtons = Swal.mixin({
                                            customClass: {
                                            confirmButton: 'wizard-pages-active-btn',
                                            },
                                            buttonsStyling: false
                                        });
                
                                        if(props.platform === "insta") {
                                            props.disconnectInstagramPage(idPage)
                                            .then(() => {
                                                props.setLoadingPages(true);
                                                setShowDisconnectModal(false);
                                                props.getInstaData()
                                                .then(() => props.setLoadingPages(false))
                                                .catch(() => {
                                                    swalWithBootstrapButtons.fire({
                                                        title: 'Error while getting instagram pages',
                                                        confirmButtonText: 'Retry',
                                                    });
                                                    }
                                                );
                                            })
                                            .catch(() => {
                                                swalWithBootstrapButtons.fire({
                                                    title: 'Error while disconnecting the instagram page',
                                                    confirmButtonText: 'Retry',
                                                });
                                            });
                                        } else {
                                            props.disconnectFacebookPage(idPage)
                                            .then(() => {
                                                props.setLoadingPages(true);
                                                setShowDisconnectModal(false);
                                                props.getFbData()
                                                .then(() => props.setLoadingPages(false))
                                                .catch(() => {
                                                    swalWithBootstrapButtons.fire({
                                                        title: 'Error while getting facebook pages',
                                                        confirmButtonText: 'Retry',
                                                    });
                                                });
                                            })
                                            .catch(() => {
                                                swalWithBootstrapButtons.fire({
                                                    title: 'Error while disconnecting the facebook page',
                                                    confirmButtonText: 'Retry',
                                                });
                                            });
                                        };
                                    }
                                } 

                            >
                                <div className="page-card-modal-small-box m-auto d-flex">
                                    <Image src={DISC_ICON} className="m-auto" style={{ width: '23px'}} />
                                </div>
                                <p className="page-card-modal-small-title mx-auto mt-2">Disconnect</p>
                            </div>
                             */}
                            
                            {/* DELETE */}
                            <div 
                                className="d-flex flex-column ml-auto" 
                                style={{cursor: 'pointer'}} 
                                onClick={() => {
                                        const swalWithBootstrapButtons = Swal.mixin({
                                            customClass: {
                                            confirmButton: 'wizard-pages-active-btn',
                                            },
                                            buttonsStyling: false
                                        });
                                        
                                        if(props.platform === "instagram") {
                                            props.deleteInstagramPage(idPage)
                                            .then(() => {
                                                setShowDisconnectModal(false);
                                                props.setLoadingPages(true);
                                                props.getInstaData()
                                                .then(() => {
                                                    props.setLoadingPages(false)
                                                })
                                                .catch(() => {
                                                    swalWithBootstrapButtons.fire({
                                                        title: 'Error while getting instagram pages',
                                                        confirmButtonText: 'Retry',
                                                    });
                                                });

                                            })
                                            .catch(() => {  
                                                swalWithBootstrapButtons.fire({
                                                    title: 'Error while deleting the instagram page',
                                                    confirmButtonText: 'Retry',
                                                });

                                            });
                                            
                                        } else {
                                            props.deleteFacebookPage(idPage)
                                            .then(() => {
                                                setShowDisconnectModal(false);
                                                props.setLoadingPages(true);
                                                props.getFbData()
                                                .then(() => {
                                                    props.setLoadingPages(false);
                                                })
                                                .catch(() => {
                                                    swalWithBootstrapButtons.fire({
                                                        title: 'Error while getting facebook pages',
                                                        confirmButtonText: 'Retry',
                                                    });

                                                });
                                            })
                                            .catch(() => {
                                                swalWithBootstrapButtons.fire({
                                                    title: 'Error while deleting the facebook page',
                                                    confirmButtonText: 'Retry',
                                                });
                                            });
                                        };
                                    }
                                } 
                            >
                                <div className="page-card-modal-small-box m-auto d-flex">
                                    <Image src={DELETE_ICON} className="m-auto" style={{ width: '23px'}} />
                                </div>
                                <p className="page-card-modal-small-title mx-auto mt-2">Delete</p>
                            </div> 

                        </Col>

                        <Col lg={2} />
                    </Row>  
                    :
                    <Row className="d-flex mt-3 mb-3 justify-content-around ml-5 mr-5">
                        <Col lg={1} />

                        <Col lg={10} className="d-flex flex-column">

                            {ownerConfirmation
                            ?
                                (
                                    <>
                                        <Row className="justify-content-center mb-3">
                                            <Col lg={12} className="d-flex">
                                                <p className="page-card-modal-small-title m-auto" style={{ color: '#E5007D', fontSize: '17px' }}>{selectedOwner.firstName} {selectedOwner.lastName}</p>
                                            </Col>
                                        </Row>

                                        <Row className="justify-content-center mb-3">
                                            <Col lg={12} className="d-flex">
                                                <p className="page-card-modal-small-title m-auto">is now the new Owner of</p>
                                            </Col>
                                        </Row>

                                        <Row className="d-flex">
                                            <Col className="d-flex flex-column m-auto">
                                                {
                                                    props.picture !== null
                                                    ?
                                                    <Image src={props.picture} fluid className="m-auto pages-card-profile-picture" />
                                                    :
                                                    fbGraphData !== null 
                                                    ?
                                                    <Image src={fbGraphData.picture.data.url} fluid className="m-auto pages-card-profile-picture" />
                                                    :
                                                    <Lottie options={defaultOptions} width={150} />
                                                }
                                                    
                                                <div className="d-flex" style={{ zIndex: 1, marginTop: '-20px' }}>
                                                    <Col lg={6} />

                                                    <Col lg={6}>
                                                        <Image src={props.platform === "facebook" ? FB_ICON : INSTA_ICON} fluid className="m-auto" />
                                                    </Col>
                                                </div>
                                            </Col>
                                        </Row>

                                        <Row className="d-flex mb-3 mt-3">
                                            <p className="m-auto pages-card-title" >{props.namePage}</p>
                                        </Row>

                                        <Row className="justify-content-center mb-3">
                                            <div className="wizard-pages-active-btn py-2 px-3" style={{cursoir: 'pointer'}} onClick={resetModal}>
                                                Close
                                            </div>
                                        </Row>
                                    </>
                                )
                            :
                                (
                                    <>
                                    <Row className="justify-content-center mb-3">
                                        <Col lg={12} className="d-flex">
                                            <p className="page-card-modal-small-title m-auto">Select one team admin to make it the new Owner.</p>
                                        </Col>
                                    </Row>

                                    <Row className="justify-content-center mb-1">
                                        <Col lg={10}>
                                            {props.admins.length > 0
                                            ? 
                                                (
                                                    props.admins.map(member => (
                                                        <>
                                                            <Row 
                                                                key={member.idFacebook+Math.random()} 
                                                                className="justify-content-between py-3" 
                                                                // onClick={() => props.platform === "insta" ? props.makeOwnerInstagramPage(idPage,member.idFacebook) : props.makeOwnerFacebookPage(idPage,member.idFacebook)}
                                                                style={{borderBottom: '1px solid #EBEDF0'}}
                                                            >   
                                                                <div className="d-flex">
                                                                    <p className="m-auto page-card-owner-name">{member.first_name} {member.last_name}</p>
                                                                </div>

                                                                <div 
                                                                    className="d-flex" 
                                                                    onClick={() => member.role !== "owner" ? selectNewOwner(member.idFacebook, member.first_name, member.last_name,idPage) : null}
                                                                >   
                                                                    {member.role === "owner" 
                                                                    ?
                                                                    <p className="page-card-modal-small-title m-auto" style={{ color: '#E4E6EB' }}>Owner Already !</p>
                                                                    :
                                                                    <OwnerCheckbox checked={selectedOwner.idFacebook === member.idFacebook} className={"m-auto"} />
                                                                    }
                                                                </div>
                                                            </Row>
                                                        </>
                                                    ))
                                                )
                                            :
                                                (
                                                    <Row>
                                                        <Col lg={12}  className="d-flex">
                                                            <Lottie options={defaultOptionsNotFound} width={200} className="m-auto" /*height={400}*/ />
                                                        </Col>

                                                        <Col lg={12}  className="d-flex">
                                                            <p className="m-auto page-card-modal-small-title">
                                                                Sorry ! You don't have any team member.
                                                            </p>
                                                        </Col>
                                                    </Row>
                                                )

                                            }
                                        </Col>
                                    </Row>

                                    <Row className="justify-content-center mt-2">
                                        <Col lg={12} >
                                            <Row className="justify-content-between">
                                                <div className="wizard-pages-inactive-btn py-2 px-3" style={{cursor: 'pointer'}} onClick={() => setShowModalTeam(false)}>
                                                    Back
                                                </div>

                                                <div className="wizard-pages-active-btn py-2 px-3" style={{cursoir: 'pointer'}} onClick={() => confirmTheOwner()}>
                                                    Next
                                                </div>
                                            </Row>
                                        </Col>
                                    </Row>
                                    </>                                    
                                )
                            }
                        </Col>

                        <Col lg={1} />
                    </Row>           
                    }

                </Modal.Body>
            </div>
            
        </Modal>
    );

    useEffect(() => {
        if(props.platform === "facebook") {
            axios.get(`${fbHost}/${props.idPage}/?fields=fan_count,picture,new_like_count&access_token=${props.accessToken}`)
                .then(res => { setFbGraphData(res.data); })
                .catch(err => { console.log("PageCardFb",(err)) })
            } else {
            // INSTA
            axios.get(`${fbHost}/${props.idPage}/?fields=id,media,followers_count,media_count,profile_picture_url,username,name&access_token=${props.accessToken}`)
                .then(res => { setInstaGraphData(res.data); })
                .catch(err => { console.log("PageCard Insta",(err)) })
        };
        setExactlySeconds(props.delay === "Exactly" ? getMinutes(props.respReplies.time[0]) : 0);
        setExactlyMinutes(props.delay === "Exactly" ? getSeconds(props.respReplies.time[0]) : 0);
        
        setRandomlyFromMinutes(props.delay === "Randomly" ? getMinutes(props.respReplies.time[0]) : 0)
        setRandomlyFromSeconds(props.delay === "Randomly" ? getSeconds(props.respReplies.time[1]) : 0)

        setRandomlyToMinutes(props.delay === "Randomly" ? getMinutes(props.respReplies.time[0]) : 0)
        setRandomlyToSeconds(props.delay === "Randomly" ? getSeconds(props.respReplies.time[1]) : 0)
    }, [])

    return (
        /* card grisé */
        props.status === "listPageConnectedOtherTeam" 
        ?
        <div 
            key={props.idPage + Math.random()} 
            className="pages-card my-1 ml-1 mr-3" 
            style={{ backgroundColor: "#ECEDF0", border:"0"}}
        >   
            <Row className="d-flex">
                <Col className="d-flex flex-column">
                    {
                        props.picture !== null
                        ?
                        <Image src={props.picture} fluid className="m-auto pages-card-profile-picture" />
                        :
                        fbGraphData !== null 
                        ?
                        <Image src={fbGraphData.picture.data.url} fluid className="m-auto pages-card-profile-picture" />
                        :
                        <Lottie options={defaultOptions} width={150} />
                    }
                        
                    <div className="d-flex" style={{ zIndex: 1, marginTop: '-20px' }}>
                        <Col lg={6} />

                        <Col lg={6}>
                            <Image src={props.platform === "instagram" ? FB_ICON : INSTA_ICON} fluid className="m-auto" />
                        </Col>
                    </div>
                </Col>
            </Row>

            <Row className="d-flex mb-3 mt-3">
                <p className="m-auto pages-card-title" >{props.namePage}</p>
            </Row>

            <Row className="d-flex" className="page-card-disabled-title-container">
                <p className="m-auto page-card-disabled-title">This page is managed by another team</p>
            </Row>

            <Row className="d-flex mt-3">
                <Row className="m-auto justify-content-between">    
                    <Col lg={6}>
                        <Row>
                            <Col lg={12} className="d-flex">
                                {
                                instaGraphData !== null
                                ?
                                <p className="m-auto pages-card-title" style={{fontSize: '30px'}}>{instaGraphData.followers_count}</p>
                                :
                                fbGraphData !== null 
                                ?
                                    <p className="m-auto pages-card-title" style={{fontSize: '30px'}}>{fbGraphData.fan_count}</p>
                                :
                                    <Lottie options={defaultOptions} width={100} />
                                }
                            </Col>

                            <Col lg={12} className="d-flex" >
                                <p className="mx-auto pages-card-desc-2">Total Fans</p>
                            </Col>
                        </Row>
                    </Col>

                    <Col lg={6} className="p-0">
                        <Row>
                            <Col lg={12} className="d-flex">
                                {
                                instaGraphData !== null
                                ?
                                    <p className="m-auto pages-card-title" style={{fontSize: '30px'}}>{instaGraphData.media_count}</p>
                                :
                                fbGraphData !== null
                                ?
                                    <p className="m-auto pages-card-title" style={{fontSize: '30px'}}>{fbGraphData.new_like_count}</p>
                                :
                                    <Lottie options={defaultOptions} width={100} />
                                }
                            </Col>

                            <Col lg={12} className="d-flex p-0">
                                {
                                props.platform === "facebook"
                                ?
                                <p  className="mx-auto pages-card-desc-2">Total Interactions</p>
                                :
                                <p  className="mx-auto pages-card-desc-2">Posts</p>
                                }
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Row>
        </div>
        :
        <div 
            key={props.idPage + Math.random()} 
            className={props.socialMediaPageSelected && props.socialMediaPageSelected.id === props.idPage ? "pages-card-active ml-1" : "pages-card m-1"} 
            style={{
                backgroundColor: "white",
                border: 
                    props.status === "listPageConnectedOwner" 
                    ? 
                    "2px solid #E5007D" 
                    : 
                    props.status === "listPageInvite" 
                    ?
                    "2px solid #139216"
                    : 
                    props.status === "listPageInviteAdmin" 
                    ?
                    "2px solid #199EE3" 
                    :
                    "1px solid #B4B4B4"
            }}
        >
            {/* Disconnect Modal */}
            {renderDisconnectModal(props.idPage)}
   
            {/* Connect / Disconnect popover */}
            {showPopoverConnect && renderPopover()}
            
            {showSpamPopover && renderSpamPopover()}
            
            

            {
            location.pathname === "/home/pages" && 
            !props.isConnectedPage
            ?
            <Row className="d-flex">
                <Image 
                    src={DISC_ICON}
                    style={{ cursor: 'pointer' }} 
                    className="mr-auto" 
                    fluid 
                    onClick={handleConnectPopover}
                />
            </Row>
            :
            location.pathname === "/home/pages" && 
            props.isConnectedPage && 
            checkOwner() 
            ? 
            <Row className="d-flex">
                <Image 
                    src={CONN_ICON}
                    style={{ cursor: 'pointer' }} 
                    className="mr-auto" 
                    fluid 
                    onClick={handleConnectPopover}
                />
                <IoIosMore 
                    size={21}
                    color={"#b4b4b4"}
                    style={{ cursor: 'pointer' }} 
                    className="ml-auto"
                    onClick={handleSpamPopover}
                />
            </Row>
            :
            location.pathname === "/home/pages" &&
            <Row className="d-flex">
                <Image 
                    src={USER_MEMBER_ICON}
                    style={{ cursor: 'pointer' }} 
                    className="mr-auto" 
                    fluid 
                />
            </Row>
            }
            <div onClick={() => props.selectPage(props.page,props.platform,props.status)}>
            <Row className="d-flex">
                <Col className="d-flex flex-column">
                    {
                    props.picture !== null
                    ?
                    <Image src={props.picture} fluid className="m-auto pages-card-profile-picture" />
                    :
                    fbGraphData !== null 
                    ?
                    <Image src={fbGraphData.picture.data.url} fluid className="m-auto pages-card-profile-picture" />
                    :
                    <Lottie options={defaultOptions} width={150} />
                    }
                        
                    <Row className="d-flex" style={{ zIndex: 1, marginTop: '-20px' }}>
                        <Col lg={6} />
                        

                        <Col lg={6} className="d-flex">
                            <Image src={props.platform === "facebook" ? FB_ICON : INSTA_ICON} fluid className="mr-auto" />
                        </Col>
                    </Row>
                </Col>
            </Row>

            <Row className="d-flex mb-3 mt-3">
                <p className="m-auto pages-card-title" >{props.namePage}</p>
            </Row>

            <Row className="d-flex mt-3">
                <Row className="m-auto justify-content-between">    
                    <Col lg={6}>
                        <Row>
                            <Col lg={12} className="d-flex">
                                {
                                instaGraphData !== null
                                ?
                                <p className="m-auto pages-card-title" style={{fontSize: '30px'}}>{instaGraphData.followers_count}</p>
                                :
                                fbGraphData !== null 
                                ?
                                <p className="m-auto pages-card-title" style={{fontSize: '30px'}}>{fbGraphData.fan_count}</p>
                                :
                                <Lottie options={defaultOptions} width={100} />
                                }
                            </Col>

                            <Col lg={12} className="d-flex" >
                                <p className="mx-auto pages-card-desc-2">Total Fans</p>
                            </Col>
                        </Row>
                    </Col>

                    <Col lg={6} className="p-0">
                        <Row>
                            <Col lg={12} className="d-flex">
                                {
                                instaGraphData !== null
                                ?
                                    <p className="m-auto pages-card-title" style={{fontSize: '30px'}}>{instaGraphData.media_count}</p>
                                :
                                fbGraphData !== null
                                ?
                                    <p className="m-auto pages-card-title" style={{fontSize: '30px'}}>{fbGraphData.new_like_count}</p>
                                :
                                    <Lottie options={defaultOptions} width={100} />
                                }
                            </Col>

                            <Col lg={12} className="d-flex p-0">
                                {
                                props.platform === "facebook"
                                ?
                                <p  className="mx-auto pages-card-desc-2">Total Interactions</p>
                                :
                                <p  className="mx-auto pages-card-desc-2">Posts</p>
                                }
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Row>
            </div>
        </div>
    )
};


const mapStateToProps = (state) => {
    return {
        socialMediaPageSelected : state.socialMediaR.socialMediaPageSelected,
    }
};

export default connect(mapStateToProps, { connectInstagramPage,disconnectInstagramPage,deleteInstagramPage,makeOwnerInstagramPage, connectFacebookPage, disconnectFacebookPage, deleteFacebookPage, makeOwnerFacebookPage, getFbData, getInstaData, setPreferences })(NewPageCard);

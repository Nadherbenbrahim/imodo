import React, { useState, useEffect } from 'react'
import './Login.css';
import Facebook from './Facebook';
import axios from 'axios';
import {host} from '../../config';

// Components :
import Navbar from '../Components/Navbar';


import { connect } from 'react-redux';

// Translations
import { trans } from '../../Translations';

import {
    Container,
    Row,
    Col,
    Image,
    Modal,
    Form
} from 'react-bootstrap';

import {
    Link,
    Redirect,
} from 'react-router-dom';

import Swal from 'sweetalert2/dist/sweetalert2.js';

// Icons & Images:
import { IoIosClose } from 'react-icons/io';
const LANDING_IMG = require('../../assets/images/login/landing-img.png');
const MIND_ICON = require('../../assets/images/login/mind.png');
const CHATBOT_ICON = require('../../assets/images/login/chatbot.png');
const CORE_AI_ICON = require('../../assets/images/login/coreai.svg');

function LandingPage(props) {

    let { lang } = props;

    // Popup Config :
    const popup = Swal.mixin({
        customClass: {
          confirmButton: 'wizard-pages-active-btn py-2 px-3',
        },
        buttonsStyling: false
    });

    const [showContact, setShowContact] = useState(false);
    const [contactName, setContactName] = useState("");
    const [contactLastName, setContactLastName] = useState("");
    const [contactOrg, setContactOrg] = useState("");
    const [contactEmail, setContactEmail] = useState("");
    const [contactPhone, setContactPhone] = useState("");
    const [contactSubject, setContactSubject] = useState("");
    const [contactMsg, setContactMsg] = useState("");


    const auth_token = localStorage.getItem('authtoken');
    const userData = JSON.parse(localStorage.getItem('userData'));

    const allMenuItems = [
        {title: trans[lang].navbar.contactUs , route: 'contact-link'},
        {title: trans[lang].navbar.whatIsModo , route: 'what-is-modo'},
        {title: trans[lang].navbar.howToUseIt , route: 'how-to-use-it-home'},
        {title: trans[lang].navbar.pricing , route: 'pricing'},
    ];

    const isValidEmail = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const sendContactForm = () => {

        if(contactName === "") {
            popup.fire({
                icon: 'error',
                title: trans[lang].landingPage.validNameErr,
                confirmButtonText: trans[lang].landingPage.retry,
            });
        } else if( contactLastName === "" ) {
            popup.fire({
                icon: 'error',
                title: trans[lang].landingPage.validLastNameErr,
                confirmButtonText: trans[lang].landingPage.retry,
            });
        } else if (contactOrg === "") {
            popup.fire({
                icon: 'error',
                title: trans[lang].landingPage.validOrgErr,
                confirmButtonText: trans[lang].landingPage.retry,
            });
        } else if (!isValidEmail(contactEmail)) {
            popup.fire({
                icon: 'error',
                title: trans[lang].landingPage.validEmailErr,
                confirmButtonText: trans[lang].landingPage.retry,
            });
        } else if (contactPhone === "") {
            popup.fire({
                icon: 'error',
                title: trans[lang].landingPage.validPhoneErr,
                confirmButtonText: trans[lang].landingPage.retry,
            });
        } else if (contactSubject === "") {
            popup.fire({
                icon: 'error',
                title:  trans[lang].landingPage.validSubjectErr,
                confirmButtonText: trans[lang].landingPage.retry,
            });
        } else if (contactMsg === "") {
            popup.fire({
                icon: 'error',
                title: trans[lang].landingPage.validMsgErr,
                confirmButtonText: trans[lang].landingPage.retry,
            });
        } else {
            // SEND THE CONTACT FORM

            let objectToSend = {
                name: contactName,
                last_name: contactLastName,
                org: contactOrg,
                email: contactEmail,
                phone: contactPhone,
                subject: contactSubject,
                msg: contactMsg,
                status: false,
            };

            // console.log("im sending to nour", objectToSend);
            
            axios.post(host + `/api/v1/contact/addContact`,objectToSend)
            .then(res => {
                console.log('/api/v1/contact/addContact APi Response =>', res.data.data);
                popup.fire({
                    icon: 'success',
                    title: trans[lang].landingPage.contactSuccess,
                    confirmButtonText: trans[lang].landingPage.confirmContact,
                });
                setShowContact(false) ;
            })
            .catch((err) => {
                console.log("/api/v1/contact/addContact APi post Api error  =>", err)
                popup.fire({
                    icon: 'error',
                    title: trans[lang].landingPage.conexErr,
                    confirmButtonText: trans[lang].landingPage.retry,
                });
            })
        }
    };

    // Rendering Methods
    const renderContactModal = () => (
        <Modal show={showContact} size={"lg"} centered>
            <Modal.Body style={{background: '#F5F5F5', borderRadius: '10px'}}>
                <Col lg={12}>
                    <Row>
                        <Col lg={12} className="d-flex mb-1">
                            <IoIosClose color={"#B4B4B4"} size={30} className="ml-auto" style={{cursor: 'pointer'}} onClick={() => { setShowContact(false) }} />
                        </Col>

                        <Col lg={12} className="d-flex mb-2">
                            <p className="m-auto contact-us-title">{trans[lang].landingPage.contactUs}</p>
                        </Col> 

                        <Col lg={12}>
                            <Form>
                                <Form.Row className="mb-3">
                                    <Col lg={6}>
                                        <Form.Label  id="contact-form-label">{trans[lang].landingPage.firstName} *</Form.Label>
                                        <Form.Control onChange={(e) => setContactName(e.target.value)}id="contact-form-input" />
                                    </Col>

                                    <Col lg={6}>
                                        <Form.Label id="contact-form-label">{trans[lang].landingPage.lastName} *</Form.Label>
                                        <Form.Control onChange={(e) => setContactLastName(e.target.value)}id="contact-form-input" />
                                    </Col>
                                </Form.Row>
                                
                                <Form.Row className="mb-3">
                                    <Col lg={6}>
                                        <Form.Label id="contact-form-label">{trans[lang].landingPage.org} *</Form.Label>
                                        <Form.Control onChange={(e) => setContactOrg(e.target.value)}id="contact-form-input" />
                                    </Col>

                                    <Col lg={6}>
                                        <Form.Label id="contact-form-label">{trans[lang].landingPage.email} *</Form.Label>
                                        <Form.Control onChange={(e) => setContactEmail(e.target.value)}id="contact-form-input" />
                                    </Col>
                                </Form.Row>

                                <Form.Row className="mb-3">
                                    <Col lg={6}>
                                        <Form.Label  id="contact-form-label">{trans[lang].landingPage.phone}</Form.Label>
                                        <Form.Control type="number" onChange={(e) => setContactPhone(e.target.value)}id="contact-form-input" />
                                    </Col>

                                    <Col lg={6}>
                                        <Form.Label id="contact-form-label">{trans[lang].landingPage.subject}</Form.Label>
                                        <Form.Control onChange={(e) => setContactSubject(e.target.value)}id="contact-form-input" />
                                    </Col>
                                </Form.Row>

                                <Form.Row className="mb-3">
                                    <Col lg={12}>
                                        <Form.Label  id="contact-form-label">{trans[lang].landingPage.message}</Form.Label>
                                        <Form.Control onChange={(e) => setContactMsg(e.target.value)}as="textarea" rows={3} id="contact-form-input" />
                                    </Col>
                                </Form.Row>
                                
                                <Form.Row className="justify-content-center mb-2">
                                    <div className="contact-form-button py-2 text-center" onClick={() => sendContactForm()}>
                                        {trans[lang].landingPage.send}
                                    </div>
                                </Form.Row>
                            </Form>   
                        </Col>
                    </Row>
                </Col>
            </Modal.Body>
        </Modal>
    );

    return (
        <>
        { auth_token !== null && userData !== null && <Redirect to="/home/dashboard" /> }
        <Navbar menuItems={allMenuItems} loginBtn={true} setShowContact={setShowContact} />

        <Container fluid>
        {showContact && renderContactModal()}
            {/* BLOC 1 */}
            <Row className="mb-5 justify-content-center flex-column-reverse flex-sm-row" style={{background: "#F9F9F9" , padding: '120px 0px 63px 0px'}}>
            {/* <Row className="mb-5 justify-content-center" style={{background: "#F9F9F9" , padding: '63px 0px',marginTop: '100px'}}> */}
                <Col lg={4} className={"d-flex"} style={{backgroundColor: ''}} >
                    {/* <div className="m-auto d-flex justify-content-between flex-column"> */}
                    <div className={"mx-auto mt-auto mb-5"}>
                        <Row className="mt-4 mt-sm-auto mt-md-auto mt-lg-auto">
                            <Col lg={12} className="d-flex"> <p className="landing-big-text ">{trans[lang].landingPage.conversationIs} <br/> {trans[lang].landingPage.firstStepOf}</p></Col>
                            <Col lg={12} className="d-flex"><p className="landing-desc mb-5 mt-4">{trans[lang].landingPage.streamLine} <br/> {trans[lang].landingPage.teamEfforts}</p></Col>
                            <Col lg={12} className="d-flex mt-3"><Facebook type="landing" content={trans[lang].landingPage.myFreeTrial}/></Col>
                            <Col lg={12} className="d-flex mt-3"><p className="no-credit-required">** {trans[lang].landingPage.noCard}</p></Col>
                        </Row>
                    </div>
                    {/* </div> */}
                </Col>

                <Col lg={6} className={"d-flex"} style={{backgroundColor: ''}}>
                    <Row>
                        <Col lg={12}>
                            <Image className={"mx-auto mt-2 image-landing-page"} src={LANDING_IMG} />
                        </Col>

                        <Col lg={12} className="d-flex">
                            <p className="m-auto landing-page-slogan">{trans[lang].landingPage.schedAgent}</p>
                        </Col>
                    </Row>
                </Col>
            </Row>


            {/* CARDS */}
            <a id="what-is-modo"></a>
            <Row className="justify-content-center"  style={{paddingTop: '100px',paddingBottom: '100px'}}>
                <Col xs={10} md={10} lg={10} xl={10} className="">
                    <Row className="justify-content-center" >

                        <Col xs={12} md={3} lg={4} xl={4} className="d-flex p-0 my-1">
                            <div className="my-auto mr-auto landing-card">
                                <Row className="d-flex mb-3">
                                    <Image src={MIND_ICON} fluid className="mr-auto landing-card-icon" />          
                                </Row>

                                <Row>
                                    <p className="landing-card-title">{trans[lang].landingPage.machineLearn}</p>
                                </Row>

                                <Row>
                                    <p className="landing-card-desc-blue">{trans[lang].landingPage.basedOn}</p>
                                </Row>

                                <Row>
                                    <p className="landing-card-desc">{trans[lang].landingPage.moreThan15}<div style={{color: '#333335',display:'inline'}} >  {trans[lang].landingPage.supportedLangs}</div></p>
                                </Row>

                                <Row>
                                    <Link to="#" className="landing-card-btn">{trans[lang].landingPage.learnMore}</Link>
                                </Row>
                            </div>
                        </Col>

                        <Col xs={12} md={3} lg={4} xl={4} className="d-flex p-0 my-1">
                            <div className="m-auto landing-card">
                                <Row className="d-flex mb-3">
                                    <Image src={CHATBOT_ICON} fluid className="mr-auto landing-card-icon"/>
                                </Row>

                                <Row>
                                    <p className="landing-card-title">{trans[lang].landingPage.forSmallBus}</p>
                                </Row>

                                <Row>
                                    <p className="landing-card-desc-blue">{trans[lang].landingPage.receiveComs}</p>
                                </Row>

                                <Row>
                                    <p className="landing-card-desc">{trans[lang].landingPage.modoAutoReply} <div style={{color: '#333335',display:'inline'}} >{trans[lang].landingPage.processUp}</div> {trans[lang].landingPage.defineSpecific}</p>
                                </Row>

                                <Row>
                                    <Link to="#" className="landing-card-btn">{trans[lang].landingPage.learnMore}</Link>
                                </Row>
                            </div>
                        </Col>

                        <Col xs={12} md={3} lg={4} xl={4} className="d-flex p-0 my-1">
                            <div className="my-auto ml-auto landing-card">
                                <Row className="d-flex mb-3">
                                    <Image src={CORE_AI_ICON} fluid className="mr-auto landing-card-icon"/>
                                </Row>

                                <Row>
                                    <p className="landing-card-title">{trans[lang].landingPage.forAgencies}</p>
                                </Row>

                                <Row>
                                    <p className="landing-card-desc-blue">{trans[lang].landingPage.busyManaging}</p>
                                </Row>

                                <Row>
                                    <p className="landing-card-desc">{trans[lang].landingPage.stayEngaged} <div style={{color: '#333335',display:'inline'}} > {trans[lang].landingPage.withoutRep}</div> {trans[lang].landingPage.runYour} <div style={{color: '#333335',display:'inline'}} > {trans[lang].landingPage.quiz} </div> {trans[lang].landingPage.congrats}</p>
                                </Row>

                                <Row>
                                    <Link to="#" className="landing-card-btn">{trans[lang].landingPage.learnMore}</Link>
                                </Row>
                            </div>
                        </Col>
                        
                    </Row>
                </Col>
            </Row>
    
        </Container>
        </>
    )
}


const mapStateToProps = (state) => ({
    lang: state.socialMediaR.lang,
});

export default connect(mapStateToProps, {})(LandingPage);

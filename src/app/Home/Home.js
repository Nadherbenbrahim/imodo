import React, { useState } from 'react';
// import './Home.css';

import Navbar from '../Components/Navbar';
import SideMenu from '../Components/SideMenu';
import ScrollToTop from '../Components/ScrollToTop';
import Dashboard from './Dashboard/Dashboard';
// import Pages from './Pages/Pages';
// import NewPages from './Pages/NewPages';
import MyAgents from './MyAgents/MyAgents';
import MyAgentsMessages from './MyAgents/MyAgentsMessages';
import ManageProducts from './ManageProducts/ManageProducts';
import AddNewProducts from './ManageProducts/AddNewProducts';
import UpdateProducts from './ManageProducts/UpdateProducts';
import Billing from './Billing/Billing';
import AutoWizard from './AutoWizard/AutoWizard';
import WizardPopup from './AutoWizard/WizardPopup';
import Team from './Team/Team';

import { connect } from 'react-redux';

// Translations
import { trans } from '../../Translations';

import {
    Row,
    Col,
    Container,
    Modal,
    Form
} from 'react-bootstrap';

import {
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import axios from 'axios';
import {host} from '../../config';

import { IoIosClose } from 'react-icons/io';



function Home(props) {
    
    let { lang } = props;
    
    const auth_token = localStorage.getItem('authtoken');
    const userData = JSON.parse(localStorage.getItem('userData'));

    // Popup Config :
    const popup = Swal.mixin({
        customClass: {
          confirmButton: 'wizard-pages-active-btn py-2 px-3',
        },
        buttonsStyling: false
    });

    const allMenuItems = [
        {title: trans[lang].navbar.contactUs, route: 'contact-link'},
        {title: trans[lang].navbar.howToUseIt, route: 'how-to-use-it-home'},
        {title: trans[lang].navbar.pricing , route: 'pricing'},
    ];

    const [showContact, setShowContact] = useState(false);
    const [contactName, setContactName] = useState("");
    const [contactLastName, setContactLastName] = useState("");
    const [contactOrg, setContactOrg] = useState("");
    const [contactEmail, setContactEmail] = useState("");
    const [contactPhone, setContactPhone] = useState("");
    const [contactSubject, setContactSubject] = useState("");
    const [contactMsg, setContactMsg] = useState("");

    const isValidEmail = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

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
        { auth_token === null && userData === null && <Redirect to="/" /> }
        <ScrollToTop />
        <Navbar menuItems={allMenuItems} userData={1}  setShowContact={setShowContact} />
        <Container fluid className="p-0 h-100" >
            {showContact && renderContactModal()}
                
            <Row className="mx-0" style={{height: '100%'}} >
                <Col lg={2} style={{background: 'white',position: 'relative',boxShadow: '1px 1px 2px #0000000D'}} className="pt-5">
                    <SideMenu  />
                </Col>

                <Col lg={10}  style={{background: '#F9F9F9'}} className="pl-auto pl-lg-5 px-4 px-lg-0">
                
                <Switch> 
                    {/* <Route path="/home/testPages">
                        <div style={{ height: window.innerHeight * 1.2,marginTop: '135px'}}>
                            <NewPages />
                        </div>
                    </Route> */}

                    <Route path="/home/dashboard">
                        <Dashboard />
                    </Route>

                    <Route path="/home/my-agents">
                        <MyAgents />
                    </Route>

                    <Route path="/home/my-agents-messages">
                        <MyAgentsMessages />
                    </Route>
                    
                    <Route path="/home/manage-products">
                        <ManageProducts />
                    </Route>
                    
                    <Route path="/home/update-products">
                        <UpdateProducts />
                    </Route>


                    <Route path="/home/add-new-products">
                        <AddNewProducts />
                    </Route>
                    
                    <Route path="/home/billing">
                        <Billing />
                    </Route>

                    <Route path="/home/wizard-popup">
                        <WizardPopup />
                    </Route>

                    <Route path="/home/auto-wizard">
                        <AutoWizard />
                    </Route>

                    <Route path="/home/team">
                        <Team />
                    </Route>

                </Switch>
            </Col>
            </Row>
        </Container>
        </>
    )
};



const mapStateToProps = (state) => {
    return {
        lang: state.socialMediaR.lang,
    }
};

export default connect(mapStateToProps, {})(Home);

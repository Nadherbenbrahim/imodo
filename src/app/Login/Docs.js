import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';
import {host} from '../../config';

import Navbar from '../Components/Navbar';
import {
  Row,
  Col,
  Form,
  Modal,
  Image,
} from 'react-bootstrap';
import Swal from 'sweetalert2/dist/sweetalert2.js';

import { connect } from 'react-redux';

// Translations
import { trans } from '../../Translations';

import { IoIosClose } from 'react-icons/io';
import { BsArrowRightShort } from 'react-icons/bs';

// IMAGES:
const OVERALL = require('../../assets/images/docs/overall.png');
const WHAT_INTENT = require('../../assets/images/docs/what_intent.png');
const SIGNUP = require('../../assets/images/docs/signup.png');
const CONNECTED_PAGES = require('../../assets/images/docs/connectedPages.png');
const WIZARD_POPUP = require('../../assets/images/docs/wizard-popup.png');
const DASHBOARD = require('../../assets/images/docs/dashboard.png');
const POSTS = require('../../assets/images/docs/posts.png');

function Docs(props) {

  let { lang } = props;
  
  
  // Popup Config :
  const popup = Swal.mixin({
    customClass: {
      confirmButton: 'wizard-pages-active-btn py-2 px-3',
    },
    buttonsStyling: false
  });
  
  
  const allMenuItems = [
    {title: trans[lang].navbar.contactUs, route: 'contact-link'},
    {title: trans[lang].navbar.howToUseIt, route: 'how-to-use-it'},
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

  const [activeLink, setActiveLink] = useState("Overview");

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
              title: 'Sent succesfully !',
              confirmButtonText: 'Thanks',
          });
          setShowContact(false) ;
      })
      .catch((err) => {
          console.log("/api/v1/contact/addContact APi post Api error  =>", err)
          popup.fire({
              icon: 'error',
              title: 'Connexion error please try again !',
              confirmButtonText: 'Okay',
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
    <Navbar menuItems={allMenuItems} loginBtn={true} setShowContact={setShowContact} />

      <Row style={{marginTop: '88px',height:'100%'}}>
        {showContact && renderContactModal()}
        
        <Col lg={2} className="docs-side-menu">
          <Row className="position-fixed side-menu-docs">
            {trans[lang].docs.menu.map((doc,index) => 
              <Col lg={12} key={index + doc.id + Math.random()} className="d-flex" style={{marginTop: doc.id === 1 ? "40px" : "0px"}}>
                <div className="w-100 ml-4 mt-1" style={{ display: 'grid' }}>
                  <p className="titre-menu-docs mb-2">{doc.title}</p>
                  {doc.items.map((item,index) => 
                    <a href={`#${doc.ids[index]}`} key={index * Math.random()} onClick={() => setActiveLink(item)} className={activeLink === item ? "sous-titre-menu-docs-selected ml-3 py-1 my-1" : "sous-titre-menu-docs ml-3 py-1 my-1"} ><BsArrowRightShort size={21} /> {item}</a>
                  )}
                </div>
              </Col>
            )}    
          </Row>
        </Col>

        <Col lg={10} style={{backgroundColor:'#F9F9F9' }}>
            <Row style={{ marginTop: '85px'}} >
                <Col lg={1} />

                <Col lg={9} className="p-0">
                    
                  {/* BASICS */}
                  <section id={"Overview"}>
                    <Row className="box-docs mb-4">  
                        <Col lg={1} className="d-flex px-0 py-5">
                          <div className="docs-bullet mt-2 mb-auto mr-auto" />
                        </Col>

                        <Col lg={11} className="px-0 py-5 flex-row">
                          <p className="text-box-docs mb-3">{trans[lang].docs.overview.title}</p>
                          <p className="desc-box-docs  mb-3">
                            {trans[lang].docs.overview.desc}
                          </p>
                          
                          <iframe 
                            title="Imodo" height="300" width="600" style={{borderRadius: '5px'}}
                            src={trans[lang].docs.overview.video}
                            frameBorder='0'
                            allow='autoplay; encrypted-media'
                            allowFullScreen
                          />
                        </Col>
                    </Row>
                  </section>

                  <section id={"Overall process"}>
                    <Row className="box-docs mb-4">  
                        <Col lg={1} className="d-flex px-0 py-5">
                          <div className="docs-bullet mt-2 mb-auto mr-auto" />
                        </Col>

                        <Col lg={11} className="px-0 py-5 flex-row">
                          <p className="text-box-docs mb-3">{trans[lang].docs.overallProcess.title}</p>
                          <p className="desc-box-docs  mb-3">
                            {trans[lang].docs.overallProcess.desc}
                          </p>
                          
                          <div style={{height: '300px', width: '600px'}} className="my-3">
                            <Image src={OVERALL} style={{maxHeight: '100%', maxWidth: '100%'}} />
                          </div>

                          <p className="desc-box-docs  mb-3">
                            {trans[lang].docs.overallProcess.listTitle}
                          </p>

                          <ul>
                            {trans[lang].docs.overallProcess.listElements.map(elm => 
                              <li>{elm}</li>
                            )}
                          </ul>
                        </Col>
                    </Row>
                  </section>
                  
                  <section id={"What’s an intent?"}>
                    <Row className="box-docs mb-4">  
                        <Col lg={1} className="d-flex px-0 py-5">
                          <div className="docs-bullet mt-2 mb-auto mr-auto" />
                        </Col>

                        <Col lg={11} className="px-0 py-5 flex-row">
                          <p className="text-box-docs mb-3">{trans[lang].docs.whatIsIntent.title}</p>
                          <p className="desc-box-docs  mb-3">{trans[lang].docs.whatIsIntent.desc}</p>
                          <p className="desc-box-docs  mb-3">{trans[lang].docs.whatIsIntent.desc1}</p>
                          
                          <p className="desc-box-docs  mb-3">
                            <strong>{trans[lang].docs.whatIsIntent.listTitle}</strong>
                          </p>

                          <ul>
                            {trans[lang].docs.whatIsIntent.listElements.map(elm => 
                                <li>{elm}</li>
                            )}
                          </ul>

                          <p className="desc-box-docs  mb-3">
                            {trans[lang].docs.whatIsIntent.desc2}
                          </p>

                          <div style={{height: '600px', width: '100%'}} className="my-3 d-flex">
                            <Image src={WHAT_INTENT} className="m-auto" style={{maxHeight: '100%', width: 'auto'}} />
                          </div>
                        </Col>
                    </Row>
                  </section>

                  {/* Start with modo */}
                  <section id={"Sign up"}>
                    <Row className="box-docs mb-4">  
                        <Col lg={1} className="d-flex px-0 py-5">
                          <div className="docs-bullet mt-2 mb-auto mr-auto" />
                        </Col>

                        <Col lg={11} className="px-0 py-5 flex-row">
                          <p className="text-box-docs mb-3">{trans[lang].docs.signUp.title}</p>
                          <p className="desc-box-docs  mb-3">{trans[lang].docs.signUp.desc}</p>
                          
                          <div style={{maxHeight: '300px', width: '600px'}} className="my-3">
                            <Image src={SIGNUP} style={{maxHeight: '100%', maxWidth: '100%'}} />
                          </div>

                          <p className="desc-box-docs  mb-3">
                            <strong>{trans[lang].docs.signUp.desc1}</strong>
                          </p>
                        </Col>
                    </Row>
                  </section>
                  
                  <section id={"Connect your pages"}>
                    <Row className="box-docs mb-4">  
                        <Col lg={1} className="d-flex px-0 py-5">
                          <div className="docs-bullet mt-2 mb-auto mr-auto" />
                        </Col>

                        <Col lg={11} className="px-0 py-5 flex-row">
                          <p className="text-box-docs mb-3">{trans[lang].docs.connectPages.title}</p>
                          
                          <p className="desc-box-docs  mb-3">
                            {trans[lang].docs.connectPages.desc}
                          </p>
                          
                          <p className="desc-box-docs  mb-3">
                            {trans[lang].docs.connectPages.desc1}
                          </p>

                          <p className="desc-box-docs  mb-3">
                            {trans[lang].docs.connectPages.note}
                            {trans[lang].docs.connectPages.noteText}
                          </p>
                          
                          <div style={{maxHeight: '300px', width: '600px'}} className="my-3">
                            <Image src={CONNECTED_PAGES} style={{maxHeight: '100%', maxWidth: '100%'}} />
                          </div>

                          <p className="desc-box-docs  mb-3">
                            {trans[lang].docs.connectPages.desc2}   
                          </p>
                        </Col>
                    </Row>
                  </section>
                    
                  
                  <section id={"Invite Members"}>
                    <Row className="box-docs mb-4">  
                        <Col lg={1} className="d-flex px-0 py-5">
                          <div className="docs-bullet mt-2 mb-auto mr-auto" />
                        </Col>

                        <Col lg={11} className="px-0 py-5 flex-row">
                          <p className="text-box-docs mb-3">{trans[lang].docs.inviteMembers.title}</p>
                          <p className="desc-box-docs  mb-3">
                            {trans[lang].docs.inviteMembers.desc}
                          </p>
                          
                          <p className="desc-box-docs  mb-3">
                            {trans[lang].docs.inviteMembers.desc1}
                          </p>
                          
                          <iframe 
                            title="Imodo" height="300" width="600" style={{borderRadius: '5px'}}
                            src={"https://www.youtube.com/embed/nf0V9Q2ByYQ"}
                            frameBorder='0'
                            allow='autoplay; encrypted-media'
                            allowFullScreen
                          />
                        </Col>
                    </Row>
                  </section>
                  
                  <section id={"Roles and permissions"}>
                    <Row className="box-docs mb-4">  
                        <Col lg={1} className="d-flex px-0 py-5">
                          <div className="docs-bullet mt-2 mb-auto mr-auto" />
                        </Col>

                        <Col lg={11} className="px-0 py-5 flex-row">
                          <p className="text-box-docs mb-3">{trans[lang].docs.roles.title} </p>
                          
                          <p className="desc-box-docs  mb-3">
                            {trans[lang].docs.roles.desc} 
                          </p>
                          
                          <div>{trans[lang].docs.roles.list}</div>

                          <div style={{maxHeight: '300px', width: '600px'}} className="my-3">
                            <Image src={CONNECTED_PAGES} style={{maxHeight: '100%', maxWidth: '100%'}} />
                          </div>

                          <p className="desc-box-docs  mb-3">{trans[lang].docs.roles.desc1}</p>

                          <div>{trans[lang].docs.roles.list1} </div>

                        </Col>
                    </Row>
                  </section>

                  {/* Create a Smart Agent */}
                  <section id={"Moderation options"}>
                    <Row className="box-docs mb-4">  
                        <Col lg={1} className="d-flex px-0 py-5">
                          <div className="docs-bullet mt-2 mb-auto mr-auto" />
                        </Col>

                        <Col lg={11} className="px-0 py-5 flex-row">
                          <p className="text-box-docs mb-3">{trans[lang].docs.moderationOptions.title}</p>
                          
                          <p className="desc-box-docs  mb-3">
                            {trans[lang].docs.moderationOptions.desc}
                          </p>

                          <div style={{maxHeight: '300px', width: '600px'}} className="my-3">
                            <Image src={WIZARD_POPUP} style={{maxHeight: '100%', maxWidth: '100%'}} />
                          </div>
                          
                          <p className="desc-box-docs mb-3" style={{color: '#2f5596', fontSize: '15px'}}>
                            {trans[lang].docs.moderationOptions.desc1}
                          </p>

                          <p className="desc-box-docs mb-3">
                            {trans[lang].docs.moderationOptions.desc2}
                          </p>

                          <p className="desc-box-docs mb-3" style={{color: '#2f5596', fontSize: '15px'}}>
                            {trans[lang].docs.moderationOptions.desc3}
                          </p>

                          <p className="desc-box-docs mb-3">
                            {trans[lang].docs.moderationOptions.desc4}
                          </p>

                          <iframe 
                            title="Imodo" height="300" width="600" style={{borderRadius: '5px'}}
                            src={"https://www.youtube.com/embed/BwWzUNu9e7g"}
                            frameBorder='0'
                            allow='autoplay; encrypted-media'
                            allowFullScreen
                          />
                        </Col>
                    </Row>
                  </section>

                  <section id={"Set up your Agent"}>
                    <Row className="box-docs mb-4">  
                        <Col lg={1} className="d-flex px-0 py-5">
                          <div className="docs-bullet mt-2 mb-auto mr-auto" />
                        </Col>

                        <Col lg={11} className="px-0 py-5 flex-row">
                          <p className="text-box-docs mb-3">{trans[lang].docs.setUpAgent.title}</p>
                          
                          <p className="desc-box-docs  mb-3">
                            {trans[lang].docs.setUpAgent.desc}
                          </p>

                          <iframe 
                            title="Imodo" height="300" width="600" style={{borderRadius: '5px'}}
                            src={"https://www.youtube.com/embed/pn_Sg7AG58U"}
                            frameBorder='0'
                            allow='autoplay; encrypted-media'
                            allowFullScreen
                          />
                        </Col>
                    </Row>
                  </section>
                
                  <section id={"Set up specific response"}>
                    <Row className="box-docs mb-4">  
                        <Col lg={1} className="d-flex px-0 py-5">
                          <div className="docs-bullet mt-2 mb-auto mr-auto" />
                        </Col>

                        <Col lg={11} className="px-0 py-5 flex-row">
                          <p className="text-box-docs mb-3">{trans[lang].docs.specificResponse.title}</p>
                          
                          <p className="desc-box-docs  mb-3">
                            {trans[lang].docs.specificResponse.desc}
                          </p>

                          <p className="desc-box-docs  mb-3">
                            {trans[lang].docs.specificResponse.desc1}
                          </p>

                          <p className="desc-box-docs  mb-3">
                            <strong>{trans[lang].docs.specificResponse.exp}</strong> 
                          </p>

                          <p className="desc-box-docs  mb-3">
                            {trans[lang].docs.specificResponse.desc2}
                          </p>

                          <iframe 
                            title="Imodo" height="300" width="600" style={{borderRadius: '5px'}}
                            src={"https://www.youtube.com/embed/dQFOQXQIk6U"}
                            frameBorder='0'
                            allow='autoplay; encrypted-media'
                            allowFullScreen
                          />
                        </Col>
                    </Row>
                  </section>
                  
                  <section id={"Set up an Instagram Agent"}>
                    <Row className="box-docs mb-4">  
                        <Col lg={1} className="d-flex px-0 py-5">
                          <div className="docs-bullet mt-2 mb-auto mr-auto" />
                        </Col>

                        <Col lg={11} className="px-0 py-5 flex-row">
                          <p className="text-box-docs mb-3">{trans[lang].docs.instaAgent.title}</p>
                          
                          <p className="desc-box-docs  mb-3">
                            {trans[lang].docs.instaAgent.desc}
                          </p>

                          <iframe 
                            title="Imodo" height="300" width="600" style={{borderRadius: '5px'}}
                            src={"https://www.youtube.com/embed/BwWzUNu9e7g"}
                            frameBorder='0'
                            allow='autoplay; encrypted-media'
                            allowFullScreen
                          />
                        </Col>
                    </Row>
                  </section>
                  
                  <section id={"Call-to-action buttons"}>
                    <Row className="box-docs mb-4">  
                        <Col lg={1} className="d-flex px-0 py-5">
                          <div className="docs-bullet mt-2 mb-auto mr-auto" />
                        </Col>

                        <Col lg={11} className="px-0 py-5 flex-row">
                          <p className="text-box-docs mb-3"> {trans[lang].docs.callToAction.title}</p>
                          
                          <p className="desc-box-docs  mb-3">
                            {trans[lang].docs.callToAction.desc}
                          </p>

                          <p className="desc-box-docs  mb-3">
                            <strong>{trans[lang].docs.callToAction.note}</strong>
                          </p>

                          <p className="desc-box-docs  mb-3">
                            {trans[lang].docs.callToAction.desc1}
                          </p>

                          <iframe 
                            title="Imodo" height="300" width="600" style={{borderRadius: '5px'}}
                            src={"https://www.youtube.com/embed/4yd8qwEdXD0"}
                            frameBorder='0'
                            allow='autoplay; encrypted-media'
                            allowFullScreen
                          />

                        </Col>
                    </Row>
                  </section>
                  
                  <section id={"Test your agent"}>
                    <Row className="box-docs mb-4">  
                        <Col lg={1} className="d-flex px-0 py-5">
                          <div className="docs-bullet mt-2 mb-auto mr-auto" />
                        </Col>

                        <Col lg={11} className="px-0 py-5 flex-row">
                          <p className="text-box-docs mb-3">{trans[lang].docs.testAgent.title}</p>
                          
                          <p className="desc-box-docs  mb-3">
                            {trans[lang].docs.testAgent.desc}
                          </p>

                          <iframe 
                            title="Imodo" height="300" width="600" style={{borderRadius: '5px'}}
                            src={"https://www.youtube.com/embed/8DKJEDDodQ8"}
                            frameBorder='0'
                            allow='autoplay; encrypted-media'
                            allowFullScreen
                          />

                        </Col>
                    </Row>
                  </section>
                 
                  <section id={"Setup Anti-Spam and preferences"}>
                    <Row className="box-docs mb-4">  
                        <Col lg={1} className="d-flex px-0 py-5">
                          <div className="docs-bullet mt-2 mb-auto mr-auto" />
                        </Col>

                        <Col lg={11} className="px-0 py-5 flex-row">
                          <p className="text-box-docs mb-3">{trans[lang].docs.antiSpam.title}</p>
                          
                          <p className="desc-box-docs  mb-3">
                            {trans[lang].docs.antiSpam.desc}
                          </p>

                          <p className="desc-box-docs  mb-3">
                            {trans[lang].docs.antiSpam.desc1}
                          </p>

                          <iframe 
                            title="Imodo" height="300" width="600" style={{borderRadius: '5px'}}
                            src={"https://www.youtube.com/embed/BwWzUNu9e7g"}
                            frameBorder='0'
                            allow='autoplay; encrypted-media'
                            allowFullScreen
                          />

                        </Col>
                    </Row>
                  </section>
                  
                  {/* Manage products */}
                  <section id={"Create products"}>
                    <Row className="box-docs mb-4">  
                        <Col lg={1} className="d-flex px-0 py-5">
                          <div className="docs-bullet mt-2 mb-auto mr-auto" />
                        </Col>

                        <Col lg={11} className="px-0 py-5 flex-row">
                          <p className="text-box-docs mb-3">{trans[lang].docs.createProducts.title}</p>
                          
                          <p className="desc-box-docs  mb-3">
                            {trans[lang].docs.createProducts.desc}
                          </p>

                          <p className="desc-box-docs">
                           <strong>{trans[lang].docs.createProducts.note}</strong>
                          </p>

                          <p className="desc-box-docs mb-3">
                            {trans[lang].docs.createProducts.desc1}
                          </p>

                          <iframe 
                            title="Imodo" height="300" width="600" style={{borderRadius: '5px'}}
                            src={"https://www.youtube.com/embed/t-yp4WGilsE"}
                            frameBorder='0'
                            allow='autoplay; encrypted-media'
                            allowFullScreen
                          />
                        </Col>
                    </Row>
                  </section>
                  
                  <section id={"Add Synonyms"}>
                    <Row className="box-docs mb-4">  
                        <Col lg={1} className="d-flex px-0 py-5">
                          <div className="docs-bullet mt-2 mb-auto mr-auto" />
                        </Col>

                        <Col lg={11} className="px-0 py-5 flex-row">
                          <p className="text-box-docs mb-3">{trans[lang].docs.addSynonyms.title}</p>
                          
                          <p className="desc-box-docs  mb-3">
                            {trans[lang].docs.addSynonyms.desc}
                          </p>

                          <iframe 
                            title="Imodo" height="300" width="600" style={{borderRadius: '5px'}}
                            src={"https://www.youtube.com/embed/C6jiY_ETA7I"}
                            frameBorder='0'
                            allow='autoplay; encrypted-media'
                            allowFullScreen
                          />
                        </Col>
                    </Row>
                  </section>
                  
                  {/* Manage agents */}
                  <section id={"Update agent"}>
                    <Row className="box-docs mb-4">  
                        <Col lg={1} className="d-flex px-0 py-5">
                          <div className="docs-bullet mt-2 mb-auto mr-auto" />
                        </Col>

                        <Col lg={11} className="px-0 py-5 flex-row">
                          <p className="text-box-docs mb-3">{trans[lang].docs.updateAgent.title}</p>
                          
                          <p className="desc-box-docs  mb-3">
                            {trans[lang].docs.updateAgent.desc} 
                          </p>

                          <p className="desc-box-docs  mb-3">
                            <strong>{trans[lang].docs.updateAgent.note}</strong> <br />
                            {trans[lang].docs.updateAgent.noteText} 
                          </p>

                          <iframe 
                            title="Imodo" height="300" width="600" style={{borderRadius: '5px'}}
                            src={"https://www.youtube.com/embed/ZVJ1TfCsLIo"}
                            frameBorder='0'
                            allow='autoplay; encrypted-media'
                            allowFullScreen
                          />
                        </Col>
                    </Row>
                  </section>
                  
                  <section id={"Check Comments"}>
                    <Row className="box-docs mb-4">  
                        <Col lg={1} className="d-flex px-0 py-5">
                          <div className="docs-bullet mt-2 mb-auto mr-auto" />
                        </Col>

                        <Col lg={11} className="px-0 py-5 flex-row">
                          <p className="text-box-docs mb-3">{trans[lang].docs.checkComments.title}</p>
                          
                          <p className="desc-box-docs  mb-3">
                            {trans[lang].docs.checkComments.desc}
                          </p>

                          <iframe 
                            title="Imodo" height="300" width="600" style={{borderRadius: '5px'}}
                            src={"https://www.youtube.com/embed/BwWzUNu9e7g"}
                            frameBorder='0'
                            allow='autoplay; encrypted-media'
                            allowFullScreen
                          />
                        </Col>
                    </Row>
                  </section>
                  
                  <section id={"Setup Quiz Agent"}>
                    <Row className="box-docs mb-4">  
                        <Col lg={1} className="d-flex px-0 py-5">
                          <div className="docs-bullet mt-2 mb-auto mr-auto" />
                        </Col>

                        <Col lg={11} className="px-0 py-5 flex-row">
                          <p className="text-box-docs mb-3">{trans[lang].docs.quizAgent.title}</p>
                          
                          <p className="desc-box-docs  mb-3">
                            {trans[lang].docs.quizAgent.desc}
                          </p>

                          <p className="desc-box-docs  mb-3">
                            {trans[lang].docs.quizAgent.desc1}
                          </p>

                          <iframe 
                            title="Imodo" height="300" width="600" style={{borderRadius: '5px'}}
                            src={"https://www.youtube.com/embed/BWmWcuC-Hcw"}
                            frameBorder='0'
                            allow='autoplay; encrypted-media'
                            allowFullScreen
                          />
                        </Col>
                    </Row>
                  </section>

                  {/* Dashboard */}
                  <section id={"Agent Performances"}>
                    <Row className="box-docs mb-4">  
                        <Col lg={1} className="d-flex px-0 py-5">
                          <div className="docs-bullet mt-2 mb-auto mr-auto" />
                        </Col>

                        <Col lg={11} className="px-0 py-5 flex-row">
                          <p className="text-box-docs mb-3">{trans[lang].docs.agentPerformances.title}</p>
                          
                          <p className="desc-box-docs  mb-3">
                            {trans[lang].docs.agentPerformances.desc}
                          </p>
                            
                          <div>{trans[lang].docs.agentPerformances.list}</div>
                          
                          <div style={{maxHeight: '300px', width: '600px'}} className="my-3">
                            <Image src={DASHBOARD} style={{maxHeight: '100%', maxWidth: '100%'}} />
                          </div>

                          <div style={{maxHeight: '300px', width: '600px'}} className="my-3">
                            <Image src={POSTS} style={{maxHeight: '100%', maxWidth: '100%'}} />
                          </div>
                        </Col>
                    </Row>
                  </section>
                  
                </Col>
            </Row>
        </Col>
      </Row>
    </>
  );
}

const mapStateToProps = (state) => ({
  lang: state.socialMediaR.lang,
});

export default connect(mapStateToProps, {})(Docs);

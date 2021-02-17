import React, { useEffect, useState } from 'react';
import './Login.css';
import axios from 'axios';
import {host} from '../../config';
import Swal from 'sweetalert2/dist/sweetalert2.js';

import Navbar from '../Components/Navbar';
import OwnerCheckbox from '../Home/Pages/OwnerCheckbox';

import { connect } from 'react-redux';
import { getPricingInfos, detectCurrency } from '../../redux/actions/billingActions';

// Translations
import { trans } from '../../Translations';

import {
    Modal,
    Form,
    Row,
    Col,
    Image
} from 'react-bootstrap';
import { IoIosClose } from 'react-icons/io';


const INSTA_ICON = require('../../assets/images/home/slider-instagram.svg');
const FB_ICON = require('../../assets/images/home/slider-facebook.svg');
const USER_ICON = require('../../assets/images/login/price-user.svg');
const CHECKBOX_ICON = require('../../assets/images/login/price-checkbox.svg');

function Pricing(props) {
    let { 
        lang, 
        pricingInfos,
        currency,

        // Functions
        detectCurrency,
        getPricingInfos
    } = props;

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
    const [checkboxPlan, setCheckboxPlan] = useState("");
    const [checkboxPeriod, setCheckboxPeriod] = useState("");

    // const [activeLink, setActiveLink] = useState("Overview");

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

    const checkPriceColumn = (idCur,euro,usd,tnd) => {
        if(idCur === "EUR") {
            let currStringLength = euro.toString().length;
            return currStringLength < 3 ? 2 : currStringLength < 4 ? 5 : 6
        } else if (idCur === "USD") {
            let currStringLength = usd.toString().length;
            return currStringLength < 3 ? 2 : currStringLength < 4 ? 5 : 6
        } else {
            let currStringLength = tnd.toString().length;
            return currStringLength < 3 ? 2 : currStringLength < 4 ? 5 : 6
        }
    }

    useEffect(() => {
        detectCurrency()
        .then(() => {
            getPricingInfos();
        })
    },[]);

    return (
        <>
        {showContact && renderContactModal()}

        <Navbar menuItems={allMenuItems} loginBtn={true} setShowContact={setShowContact} />

        <div className="page-price" style={{marginTop: "60px"}}>
            <Row className="justify-content-center">
                <Col lg={12} className="d-flex mt-3">
                    <h1 className="price-titre mx-auto mt-5">{trans[lang].pricing.readyTo}</h1>
                </Col>
                <Col lg={12} className="d-flex">
                    <h1 className="price-sous-titre m-auto">{trans[lang].pricing.getFree}</h1>
                </Col>
                {/* pricing bloc */}
                <Col lg={10} className="d-flex">
                    <Row>   
                        {
                        pricingInfos.length > 0 && currency.id.length > 0 &&
                        pricingInfos.map((pricing,index) => 
                            // <Col lg={3} key={index} className="d-flex p-3" style={{height: '720px'}}>
                            <Col lg={3} key={index} className="d-flex p-3">
                                <Row className="colone" >
                                    <Col lg={12} className="mt-2" style={{height: '60px'}}>
                                        <p className="price-titre-item mr-auto my-auto">
                                        {lang === "fr" ? pricing.name_fr : pricing.name}
                                        </p>
                                        {pricing.company
                                        &&
                                            <p className="price-sous-titre mr-auto my-auto" style={{color: '#818e94'}} >{lang === "fr" ? pricing.company_fr : pricing.company}</p>
                                        }
                                    </Col>
                                
                                    <div className="py-3 px-4" >
                                        <Row className="price-colone" >
                                            <Col lg={12} className="d-flex">
                                                <Row className="justify-content-center w-100" >
                                                    <Col lg={2} className="d-flex p-0" >
                                                        <p className="price-price mx-auto mb-auto ml-auto"  style={{fontSize: '19px',color:'#E5007D'}} >
                                                            {currency.value}
                                                        </p>
                                                    </Col>
                                                    <Col lg={() => checkPriceColumn(currency.id,pricing.payement_fr,pricing.payment_do,pricing.payement)} className="d-flex p-0" >
                                                        <p className="price-price my-auto ml-auto" style={{color:'#E5007D'}}>
                                                            {currency.id === "EUR" ? pricing.payement_fr : currency.id === "USD" ? pricing.payment_do : pricing.payement}
                                                        </p>
                                                    </Col>
                                                    <Col lg={3} className="d-flex p-0" ><p className="price-price my-auto mr-auto" style={{fontSize: '14px'}} >/{trans[lang].pricing.month}</p> </Col>
                                                </Row>                                       
                                            </Col>
                                            <Col lg={12} className="d-flex"><p className="price-sous-titre-price mx-auto mt-2" >{trans[lang].pricing.supportedNetwork}</p></Col>
                                            <Col lg={12} className="d-flex"   style={{justifyContent: 'center'}} >
                                                <Image src={FB_ICON} className=" m-1 " style={{width: '7%'}} />
                                                <Image src={INSTA_ICON} className=" m-1"  style={{width: '7%'}} />
                                            </Col>
                                            <Col lg={12} className="d-flex price-sous-titre-price mt-3 mb-4">
                                                <Image src={USER_ICON} className="mr-3 price-icon-size" />
                                                {lang === "fr" ? pricing.number_pages_fr : pricing.number_pages}, {lang === "fr" ? pricing.number_user_fr : pricing.number_user}
                                            </Col>
                                            <Row className="mx-0" style={{height: '230px',alignContent: 'start'}}>
                                                {pricing.number_agent
                                                &&
                                                <Col lg={12} className="d-flex price-checkbox-titre mb-3">
                                                    <Image src={CHECKBOX_ICON} className="mr-3 price-icon-size" />
                                                    {lang === "fr" ? pricing.number_agent_fr : pricing.number_agent}
                                                </Col>
                                                }

                                                {pricing.history
                                                &&
                                                <Col lg={12} className="d-flex price-checkbox-titre mb-3">
                                                    <Image src={CHECKBOX_ICON} className="mr-3 price-icon-size" />
                                                    {lang === "fr" ? pricing.history_fr : pricing.history}
                                                </Col>
                                                }

                                                {pricing.performance
                                                &&
                                                <Col lg={12} className="d-flex price-checkbox-titre mb-3">
                                                    <Image src={CHECKBOX_ICON} className="mr-3 price-icon-size" />
                                                    {lang === "fr" ? pricing.performance_fr : pricing.performance}
                                                </Col>
                                                }

                                                {pricing.training
                                                &&
                                                <Col lg={12} className="d-flex price-checkbox-titre mb-3">
                                                    <Image src={CHECKBOX_ICON} className="mr-3 price-icon-size" />
                                                    {lang === "fr" ? pricing.training_fr : pricing.training}
                                                </Col>
                                                }

                                                {pricing.support
                                                &&
                                                <Col lg={12} className="d-flex price-checkbox-titre mb-3">
                                                    <Image src={CHECKBOX_ICON} className="mr-3 price-icon-size" />
                                                    {lang === "fr" ? pricing.support_fr : pricing.support}
                                                </Col>
                                                }

                                                {pricing.number_autoReply
                                                &&
                                                <Col lg={12} className="d-flex price-checkbox-titre mb-3">
                                                    <Image src={CHECKBOX_ICON} className="mr-3 price-icon-size" />
                                                    {lang === "fr" ? pricing.number_autoReply_fr : pricing.number_autoReply}
                                                </Col>
                                                }
                                            </Row>
                                            {/* {pricing.name === "Free Trial"
                                            &&
                                            <Col lg={12} className="d-flex"><p className="price-credit-card mr-auto mt-4" >** {trans[lang].pricing.noCardRequired} <br/> ** {trans[lang].pricing.free15}</p> </Col>
                                            } */}
                                            <Col lg={12} className="d-flex"><button className="price-button m-auto" >{trans[lang].pricing.choosePlan}</button> </Col>
                                            {/* <Col lg={12} className="d-flex"><button className="price-button m-auto" >{lang === "fr" ? pricing.name_fr : pricing.name}</button> </Col> */}
                                        </Row>
                                    </div>
                                </Row>
                            </Col>                       
                    )}
                    </Row>
                </Col>
                {/*END pricing bloc */}
                <Row className="mx-0 w-100 flex-column" style={{alignContent: 'center'}} >
                    <Col lg={4} className="d-flex mb-1"><p className="price-titre my-auto mr-auto" >{trans[lang].pricing.noSubs}</p></Col>
                    <Col lg={4} className="d-flex mb-5"><p className="price-credit-card my-auto mr-auto" style={{lineHeight: '2',fontSize: '14'}} >{trans[lang].pricing.buyOne}</p></Col>
                </Row>
            </Row>
        </div>

         <div style={{backgroundColor: '#F9F9F9',display: 'flex'}}>
            <Row className="formulaire-pricing mt-5 justify-content-center" >
                <Col lg={12} className="d-flex" >
                    <h1 className="mx-auto mb-5" >Purchase Order</h1>
                </Col>    
                <Col lg={5} className="d-flex flex-column" >
                        <label className="">Nom*</label>
                        <input type="text" className="formulaire-pricing-input" />
                </Col>                                                           
                <Col lg={5} className="d-flex flex-column" >
                        <label className="">Prenom*</label>
                        <input type="text" className="formulaire-pricing-input" />
                </Col>                                                           
                <Col lg={5} className="d-flex flex-column" >
                        <label className="">Email*</label>
                        <input type="text" className="formulaire-pricing-input" />
                </Col>                                                           
                <Col lg={5} className="d-flex flex-column" >
                        <label className="">Adresse*</label>
                        <input type="text" className="formulaire-pricing-input" />
                </Col>                                                           
            
                <Col lg={10} className="d-flex flex-column" >
                    <p>*These provided informations will be requested once.</p>
                    <hr/>
                </Col>                                                        
                <Col lg={10} className="d-flex flex-column">
                    <h2>Select your plan</h2>
                </Col>

                <Col lg={5} className="" >
                        <div className={checkboxPlan === "Basic" ? "formulaire-pricing-checkbox-box-rose mt-3 d-flex" : "formulaire-pricing-checkbox-box mt-3 d-flex"} onClick={() => {setCheckboxPlan("Basic") }}>
                            <OwnerCheckbox checked={checkboxPlan === "Basic" ? true : false}  color={true} />
                            <p class="my-auto ml-3">Basic</p>
                        </div> 
                </Col>                                                            
                <Col lg={5} className="" >
                        <div className={checkboxPlan === "Premium" ? "formulaire-pricing-checkbox-box-rose mt-3 d-flex" : "formulaire-pricing-checkbox-box mt-3 d-flex"} onClick={() => {setCheckboxPlan("Premium") }}>
                            <OwnerCheckbox checked={checkboxPlan === "Premium" ? true : false}  color={true} />
                            <p class="my-auto ml-3">Premium</p>
                        </div>
                </Col>                                                            
                <Col lg={5} className="" >
                        <div className={checkboxPlan === "Pro" ? "formulaire-pricing-checkbox-box-rose mt-3 d-flex" : "formulaire-pricing-checkbox-box mt-3 d-flex"} onClick={() => {setCheckboxPlan("Pro") }}>
                            <OwnerCheckbox checked={checkboxPlan === "Pro" ? true : false}  color={true} /> 
                            <p class="my-auto ml-3">Pro</p>
                        </div>
                </Col>                                                            
                <Col lg={5} className="" ></Col>        

                <Col lg={10} className="d-flex flex-column">
                    <h2 className="mt-4" >Select the period</h2>
                </Col>

                <Col lg={5} className="" >
                        <div className={checkboxPeriod === "one" ? "formulaire-pricing-checkbox-box-rose mt-3 d-flex" : "formulaire-pricing-checkbox-box mt-3 d-flex"} onClick={() => {setCheckboxPeriod("one") }}>
                            <OwnerCheckbox checked={checkboxPeriod === "one" ? true : false}  color={true} />
                            <p class="my-auto ml-3">One month</p>
                        </div> 
                </Col>                                                            
                <Col lg={5} className="" >
                        <div className={checkboxPeriod === "six" ? "formulaire-pricing-checkbox-box-rose mt-3 d-flex" : "formulaire-pricing-checkbox-box mt-3 d-flex"} onClick={() => {setCheckboxPeriod("six") }}>
                            <OwnerCheckbox checked={checkboxPeriod === "six" ? true : false}  color={true} />
                            <p class="my-auto ml-3">6 months</p> <p class="my-auto ml-1" style={{fontSize: '10px'}} >(get 5% reduction)</p>
                        </div>
                </Col>                                                            
                <Col lg={5} className="" >
                        <div className={checkboxPeriod === "three" ? "formulaire-pricing-checkbox-box-rose mt-3 d-flex" : "formulaire-pricing-checkbox-box mt-3 d-flex"} onClick={() => {setCheckboxPeriod("three") }}>
                            <OwnerCheckbox checked={checkboxPeriod === "three" ? true : false}  color={true} /> 
                            <p class="my-auto ml-3">3 months</p><p class="my-auto ml-1" style={{fontSize: '10px'}} >(get 5% reduction)</p>
                        </div>
                </Col>                                                            
                <Col lg={5} className="" >
                        <div className={checkboxPeriod === "year" ? "formulaire-pricing-checkbox-box-rose mt-3 d-flex" : "formulaire-pricing-checkbox-box mt-3 d-flex"} onClick={() => {setCheckboxPeriod("year") }}>
                            <OwnerCheckbox checked={checkboxPeriod === "year" ? true : false}  color={true} /> 
                            <p class="my-auto ml-3">1 year</p><p class="my-auto ml-1" style={{fontSize: '10px'}} >(get 10% reduction)</p>
                        </div>
                </Col>                                                            
                <Col lg={10} className="d-flex mt-4 justify-content-center" >
                    <p id="total-amount" >Total amount :</p><p id="price" >€2500</p> <p id="tax" >Tax included</p> 
                </Col>                                   
                <Col lg={3} className="d-flex mt-4" >
                    <button className="price-button" >Confirm</button> 
                </Col>                                   
            </Row>
        </div>                                       
        </>
    );
}


const mapStateToProps = (state) => ({
    lang: state.socialMediaR.lang,
    pricingInfos : state.billingR.pricingInfos,
    currency : state.billingR.currency,
});

export default connect(mapStateToProps, { getPricingInfos, detectCurrency  })(Pricing);

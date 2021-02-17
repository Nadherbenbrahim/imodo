import React, { useEffect , useState} from 'react';
import '../Home.css';

import Invoice from './Invoice';
import OwnerCheckbox from '../Pages/OwnerCheckbox';

import { connect } from 'react-redux';                       
import { getPricingInfos, getBillingPlan, detectCurrency, payPlan, getPaymentHistory } from '../../../redux/actions/billingActions';

import moment from 'moment';
import {
    Row,
    Col,
    Table,
    Image,
    Modal,
} from 'react-bootstrap';

// Translations
import { trans } from '../../../Translations';

import { FaInfoCircle } from 'react-icons/fa';
import { IoIosClose } from 'react-icons/io';
var sha1 = require('sha1');


const INSTA_ICON = require('../../../assets/images/home/slider-instagram.svg');
const FB_ICON = require('../../../assets/images/home/slider-facebook.svg');
const USER_ICON = require('../../../assets/images/login/price-user.svg');
const CHECKBOX_ICON = require('../../../assets/images/login/price-checkbox.svg');

function Billing(props) {
    
    let {
        lang,
        pricingInfos,
        paymentHistory,
        billingPlan,
        currency,
        socialMediaPageSelected,
        
        // Functions:
        detectCurrency,
        getPricingInfos,
        getPaymentHistory,
        getBillingPlan,
        payPlan,
    } = props;
    
    const userData = JSON.parse(localStorage.getItem('userData'));

    const [showPopover, setShowPopover] = useState(false);
    const [choice, setChoice] = useState({ id:"plan", value: trans[lang].billing.billingPlan});
    const [invoice, setInvoice] = useState(false);
    const [billingModal, setBillingModal] = useState(false);
    const [choosenOffer,setChoosenOffer] = useState([]);
    const [discount,setDiscount] = useState({});
    const [checkboxPeriod, setCheckboxPeriod] = useState("");
    const [checkboxPlan, setCheckboxPlan] = useState("");
    
    // Payments Details: 
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [adress, setAdress] = useState("");
    const [phone, setPhone] = useState("");
    const [signatureId, setSignatureId] = useState("");
    

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

    const checkUserOffer = (packName,type) => {
        if(type === "col") {
            // Column
            if(userData.user.pack[0].name === packName && userData.user.pack[0].status === "Paid") {
                return "price-colone-grise";
            } else {
                return "price-colone";
            }
        } else {
            // Button
            if(userData.user.pack[0].name === packName && userData.user.pack[0].status === "Paid") {
                return "price-button-grise m-auto";
            } else {
                return "price-button m-auto";
            }
        }
    };

    const fireModal = (pricing) => {
        setChoosenOffer([pricing]);
        setCheckboxPlan(pricing.name);
        setBillingModal(true);
    };

    const handleDiscount = (offer,period) => {
        let discounts = { /* payement_fr: 0, payment_do: 0, payement: 0 */ };

        // console.log("Discount this =>", offer, " On This ", discounts);
        
        if(period === "one") {
            setCheckboxPeriod(period);
            setDiscount({});

        } else if (period === "six") {
            setCheckboxPeriod(period);
            discounts.payement_fr = offer.payement_fr - (offer.payement_fr * 0.05);
            discounts.payment_do = offer.payment_do - (offer.payment_do * 0.05);
            discounts.payement = offer.payement - (offer.payement * 0.05);
            setDiscount(discounts);
        } else if (period === "three") {
            setCheckboxPeriod(period);
            discounts.payement_fr = offer.payement_fr - (offer.payement_fr * 0.05);  
            discounts.payment_do = offer.payment_do - (offer.payment_do * 0.05);  
            discounts.payement = offer.payement - (offer.payement * 0.05);
            setDiscount(discounts);

        } else if (period === "year") {
            setCheckboxPeriod(period);
            discounts.payement_fr = offer.payement_fr - (offer.payement_fr * 0.1);  
            discounts.payment_do = offer.payment_do - (offer.payment_do * 0.1);  
            discounts.payement = offer.payement - (offer.payement * 0.1);
            setDiscount(discounts);
        }
    };

    const guid = () => {
        function s4() {
          return Math.floor((1 + Math.random()) * 0x10000)
                     .toString(16)
                     .substring(1);
        }
        let id = s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4();
        console.log("orderID generated ...", id);
        // setSignatureId(id);
        return id;
    };

    const renderPopover = () => (
        <div className="d-flex manage-products-popover" onMouseEnter={() => setShowPopover(true)} onMouseLeave={() => setShowPopover(false)}>
          <p className="m-auto">{trans[lang].billing.infoPopover}</p>
        </div>
    );
      
    const handlePopover = (delay) => {
        setTimeout( () => {
          setShowPopover(!showPopover);
        },delay)
    };

    const getAmount = (offer,discount,period) => {

        console.log("Discount is", discount);
        console.log("Offer payement is", offer[0].payement);
        console.log("Period", period);

        if(period === "" || period === "one" || period === undefined) {
            console.log("Returning Amount", parseInt(offer[0].payement.toFixed(0) * 1000));
            return parseInt(offer[0].payement.toFixed(0) * 1000);
 
        } else if (period !== "one" && period !== undefined && discount !== {} && discount.payement !== undefined) {
            console.log("Returning Amount", parseInt(discount.payement.toFixed(0) * 1000));
            return parseInt(discount.payement.toFixed(0) * 1000);
        }
    };

    const renderBillingModal = () => {
        let orderID = guid();
        console.log("SIgn", sha1("MAR868"+"bd$inC96"+orderID+getAmount(choosenOffer,discount,checkboxPeriod)+currency.id));
        return (
        <Modal show={billingModal} size={"lg"} centered>
            <Modal.Body className="p-0">

                <form action="https://preprod.gpgcheckout.com/Paiement_test/Validation_paiement.php" method="post">
                    <div>
                        <input name="NumSite" id="NumSite" value="MAR868" hidden/>
                        <input name="Password" id="Password" value="6677f06ff9439a26d5dd81d49931662f" hidden/>
                        <input name="orderID" id="orderID" value={orderID} hidden />
                        <input name="Langue" id="Langue" value={lang} hidden />
                        <input name="CustTel" id="CustTel" className="formulaire-pricing-input" hidden value={"55111222"} /*onChange={(e) => setPhone(e.target.value)}*/ />
                        
                        <input name="Currency" id="Currency" value={currency.id} hidden/>
                        
                        <input name="Amount" id="Amount" value={getAmount(choosenOffer,discount,checkboxPeriod)} hidden />
                        
                        {/* {currency.id === "EUR" 
                        ? 
                        pricing.payement_fr 
                        : 
                        currency.id === "USD" 
                        ? 
                        pricing.payment_do 
                        : 
                        pricing.payement}    
                        }
                        <input name="AmountSecond" id="AmountSecond" value="40000" hidden /> */}

                        <input name="PayementType" id="PayementType" value="1" hidden/>
                        <input name="orderProducts" id="orderProducts" value={choosenOffer[0].name} hidden />
                        <input name="signature" id="signature" value={sha1("MAR868"+"bd$inC96"+orderID+getAmount(choosenOffer,discount,checkboxPeriod)+currency.id)} hidden />
                        <input name="vad" id="vad" value="258500003" hidden />
                        <input name="Terminal" id="Terminal" value="001" hidden />
                    </div>
                    <Row className="formulaire-pricing justify-content-center d-flex w-100 h-100">
        
                    <Col lg={12} className="d-flex mb-1">
                        <IoIosClose color={"#B4B4B4"} size={30} className="ml-auto" style={{cursor: 'pointer'}} onClick={() => { setBillingModal(false); setCheckboxPeriod(""); setChoosenOffer([]); setDiscount({}); }} />
                    </Col>
                    
                    <Col lg={12} className="d-flex" >
                        <h1 className="mx-auto mb-5" >Purchase Order</h1>
                    </Col>    

                    <Col lg={5} className="d-flex flex-column mb-2" >
                        <label className="">Nom*</label>
                        <input name="CustLastName" id="CustLastName" className="formulaire-pricing-input" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                    </Col>  

                    <Col lg={5} className="d-flex flex-column mb-2">
                        <label className="">Prenom*</label>
                        <input name="CustFirstName" id="CustFirstName" className="formulaire-pricing-input" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                    </Col>  

                    <Col lg={5} className="d-flex flex-column" >
                        <label className="">Email*</label>
                        <input name="EMAIL" id="EMAIL" className="formulaire-pricing-input" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </Col>  

                    <Col lg={5} className="d-flex flex-column" >
                        <label className="">Adresse*</label>
                        <input name="CustAddress" id="CustAddress" className="formulaire-pricing-input" value={adress} onChange={(e) => setAdress(e.target.value)}/>
                    </Col>

                    {/* <Col lg={5} className="d-flex flex-column" >
                        <label className="">Phone number*</label>
                        <input name="CustTel" id="CustTel" className="formulaire-pricing-input" hidden value={phone} onChange={(e) => setPhone(e.target.value)}/>
                    </Col>                                                           
                 */}
                    <Col lg={10} className="d-flex flex-column" >
                        <p>*These provided informations will be requested once.</p>
                        <hr/>
                    </Col>                                                        
                    <Col lg={10} className="d-flex flex-column">
                        <h2>Select your plan</h2>
                    </Col>

                    {pricingInfos.map((pricing,index) => (
                        pricing.name !== "Free Trial"
                        &&
                        <Col lg={5} key={index * Math.random() * 2}>
                            <div className={checkboxPlan === pricing.name ? "formulaire-pricing-checkbox-box-rose mt-3 d-flex" : "formulaire-pricing-checkbox-box mt-3 d-flex"} onClick={() => { setChoosenOffer([pricing]);  setCheckboxPlan(pricing.name); setCheckboxPeriod(""); setDiscount({}); }}>
                                <OwnerCheckbox checked={checkboxPlan === pricing.name ? true : false}  color={true} />
                                <p class="my-auto ml-3">{lang === "fr" ? pricing.name_fr : pricing.name}</p>
                            </div> 
                        </Col>                                                            
                    ))}

                    <Col lg={5}></Col>        

                    <Col lg={10} className="d-flex flex-column">
                        <h2 className="mt-4" >Select the period</h2>
                    </Col>

                    <Col lg={5} className="" >
                            <div className={checkboxPeriod === "one" ? "formulaire-pricing-checkbox-box-rose mt-3 d-flex" : "formulaire-pricing-checkbox-box mt-3 d-flex"} onClick={() => { handleDiscount(choosenOffer[0],"one") }}>
                                <OwnerCheckbox checked={checkboxPeriod === "one" ? true : false}  color={true} />
                                <p class="my-auto ml-3">One month</p>
                            </div> 
                    </Col>                                                            
                    <Col lg={5} className="" >
                            <div className={checkboxPeriod === "six" ? "formulaire-pricing-checkbox-box-rose mt-3 d-flex" : "formulaire-pricing-checkbox-box mt-3 d-flex"} onClick={() => { handleDiscount(choosenOffer[0],"six") }}>
                                <OwnerCheckbox checked={checkboxPeriod === "six" ? true : false}  color={true} />
                                <p class="my-auto ml-3">6 months</p> <p class="my-auto ml-1" style={{fontSize: '10px'}} >(get 5% reduction)</p>
                            </div>
                    </Col>                                                            
                    <Col lg={5} className="" >
                            <div className={checkboxPeriod === "three" ? "formulaire-pricing-checkbox-box-rose mt-3 d-flex" : "formulaire-pricing-checkbox-box mt-3 d-flex"} onClick={() => { handleDiscount(choosenOffer[0],"three") }}>
                                <OwnerCheckbox checked={checkboxPeriod === "three" ? true : false}  color={true} /> 
                                <p class="my-auto ml-3">3 months</p><p class="my-auto ml-1" style={{fontSize: '10px'}} >(get 5% reduction)</p>
                            </div>
                    </Col>                                                            
                    <Col lg={5} className="" >
                            <div className={checkboxPeriod === "year" ? "formulaire-pricing-checkbox-box-rose mt-3 d-flex" : "formulaire-pricing-checkbox-box mt-3 d-flex"} onClick={() => { handleDiscount(choosenOffer[0],"year") }}>
                                <OwnerCheckbox checked={checkboxPeriod === "year" ? true : false}  color={true} /> 
                                <p class="my-auto ml-3">1 year</p><p class="my-auto ml-1" style={{fontSize: '10px'}} >(get 10% reduction)</p>
                            </div>
                    </Col>  

                    <Col lg={10} className="d-flex mt-4 justify-content-center">
                        {Object.keys(discount).length
                        ?
                        <>
                        <p id="total-amount" >Total amount :</p><p id="price" >
                            {currency.id === "EUR" ? discount.payement_fr.toFixed(0) : currency.id === "USD" ? discount.payment_do.toFixed(0) : discount.payement.toFixed(0)} {currency.value}
                        </p> 
                        <p id="tax" >Tax included</p> 
                        </>
                        :
                        <>
                        <p id="total-amount" >Total amount :</p><p id="price" >
                            {currency.id === "EUR" ? choosenOffer[0].payement_fr.toFixed(0) : currency.id === "USD" ? choosenOffer[0].payment_do.toFixed(0) : choosenOffer[0].payement.toFixed(0)} {currency.value}
                        </p>
                        <p id="tax" >Tax included</p> 
                        </>
                        }
                    </Col>            
                                                                                                                            
                    <Col lg={3} className="d-flex mt-4" >
                        <button className="price-button" type="submit" >Confirm</button> 
                    </Col>                                   
                </Row>                                  
                    
                </form> 
            </Modal.Body>
        </Modal>
    )}; 


    useEffect(() => {
        detectCurrency()
        .then(() => {
            getBillingPlan()
            .then(() => {
                getPricingInfos()
                .then(() => {
                    getPaymentHistory();
                });
            });
        });
    },[]);

    return (
        <div style={{ marginTop: '135px' }}>
            {billingModal && renderBillingModal()}

            {invoice
            ?
            <Invoice setInvoice={setInvoice} data={invoice} />
            :
            <>
            <Row className="mt-5">
                <p className="home-big-title">{trans[lang].billing.title}</p>
                <FaInfoCircle style={{transitionDuration: '300ms' }} color={!showPopover ? "#4080FF" : "#E5007D"} size={'15'} onMouseEnter={() => handlePopover('20')} onMouseLeave={() => handlePopover('700')} />
                {showPopover && renderPopover()}
            </Row>

            <Row>
                {/* Top bar */}
                <Col lg={11} className="d-flex p-0 justify-content-between mt-2">
                    <div className={choice.id === "plan" ? "billing-choice-box-active d-flex mr-auto" : "billing-choice-box d-flex mr-auto"} onClick={() => setChoice({ id:"plan", value: trans[lang].billing.billingPlan})}>
                        <p className="m-auto">{trans[lang].billing.billingPlan}</p>
                    </div>
                    
                    <div className={choice.id === "change" ? "billing-choice-box-active d-flex mx-3" : "billing-choice-box d-flex mx-3"} style={{width: "420px!important"}} onClick={() => setChoice({ id:"change", value: trans[lang].billing.changePlan})}>
                        <p className="m-auto">{trans[lang].billing.changePlan}</p>
                    </div>
                    
                    <div className={choice.id === "payments" ? "billing-choice-box-active d-flex ml-auto" : "billing-choice-box d-flex ml-auto"} onClick={() => setChoice({ id:"payments", value: trans[lang].billing.payments})}>
                        <p className="m-auto">{trans[lang].billing.payments}</p>
                    </div>
                </Col>

                {/* Content */}
                {
                choice.id === "plan"
                ?
                <Col lg={12} className="d-flex p-0 mt-5">
                    {billingPlan 
                    &&
                    <div className="mr-auto billing-box px-3 py-2">

                        <div className="d-flex mb-5">
                            <p className="mr-auto my-auto billing-plan-gray-text">{trans[lang].billingPlan.subscribedTo} {billingPlan.name}</p>
                            <div className="ml-auto my-auto d-flex billing-plan-pink-btn py-2 px-4">
                                <p className="m-auto">{billingPlan.name}</p>
                            </div>
                        </div>

                        <div>
                            <Col lg={lang === "fr" ? 6 : 5} className="p-0">
                                <Col lg={12} className="d-flex mb-2 p-0">
                                    <p className="mr-auto billing-plan-lightgray-text">{trans[lang].billingPlan.socialPages}</p>
                                    <p className="ml-auto billing-plan-lightgray-text" style={{color: "black"}}>{billingPlan.socialPages}</p>
                                </Col>
                            </Col>

                            <Col lg={lang === "fr" ? 6 : 5} className="p-0">
                                <Col lg={12} className="d-flex mb-2 p-0">
                                    <p className="mr-auto billing-plan-lightgray-text">{trans[lang].billingPlan.teamMembers}</p>
                                    <p className="ml-auto billing-plan-lightgray-text" style={{color: "black"}}>{billingPlan.teamMember}</p>
                                </Col>
                            </Col>

                            <Col lg={lang === "fr" ? 6 : 5} className="p-0">
                                <Col lg={12} className="d-flex mb-2 p-0">
                                    <p className="mr-auto billing-plan-lightgray-text">{trans[lang].billingPlan.activeAgents}</p>
                                    <p className="ml-auto billing-plan-lightgray-text" style={{color: "black"}}>{billingPlan.activeAgent}</p>
                                </Col>
                            </Col>

                            <Col lg={lang === "fr" ? 6 : 5} className="p-0">
                                <Col lg={12} className="d-flex mb-2 p-0">
                                    <p className="mr-auto billing-plan-lightgray-text">{trans[lang].billingPlan.monthlyReplies}</p>
                                    <p className="ml-auto billing-plan-lightgray-text" style={{color: "black"}}>{billingPlan.monthlyReplies}</p>
                                </Col>
                            </Col>
                        </div>

                        <div className="d-flex">
                            <div className="ml-auto d-flex">
                                <p className="billing-plan-lightgray-text my-auto">{trans[lang].billingPlan.planValid} &nbsp;</p>
                                <p className="billing-plan-pink-text my-auto">{billingPlan.delai}</p>
                            </div>
                        </div>

                        <hr style={{ width: "100%", border: "1px solid #B4B4B4" }} />

                        <div className="d-flex">
                            <div className="ml-auto d-flex">
                                <div className="billing-plan-green-btn py-2 px-4" onClick={() => setChoice({ id:"change", value: trans[lang].billing.changePlan})}>
                                    <p className="m-auto">{trans[lang].billingPlan.upgradePlan}</p>
                                </div>
                            </div>
                        </div>

                    </div>
                    }
                </Col>
                :
                choice.id === "change"
                ?
                <Col lg={11} className="d-flex p-0 mt-5">
                <Row>
                    {
                    pricingInfos.length > 0 && currency.id.length > 0 &&
                    pricingInfos.map((pricing,index) => 
                        <Col lg={3} key={index + Math.random()} className="d-flex p-3">
                            <Row>
                                <Col lg={12} className="mt-2" style={{height: '60px'}}>
                                    <p className="price-titre-item mr-auto my-auto">
                                    {lang === "fr" ? pricing.name_fr : pricing.name}
                                    </p>
                                    {pricing.company
                                    &&
                                    <p className="price-sous-titre mr-auto my-auto" >{lang === "fr" ? pricing.company_fr : pricing.company}</p>
                                    }
                                </Col>
                            
                                <div className="py-3 px-4" >
                                    <Row className={checkUserOffer(pricing.name,"col")}>
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
                                                <Col lg={3} className="d-flex p-0" >
                                                    <p className="price-price my-auto mr-auto" style={{fontSize: '14px'}} >/{trans[lang].pricing.month}</p> 
                                                </Col>
                                            </Row>                                       
                                        </Col>

                                        <Col lg={12} className="d-flex">
                                            <p className="price-sous-titre-price mx-auto mt-2" >{trans[lang].pricing.supportedNetwork}</p>
                                        </Col>
                                        
                                        <Col lg={12} className="d-flex"   style={{justifyContent: 'center'}} >
                                            <Image src={FB_ICON} className=" m-1 " style={{width: '7%'}} />
                                            <Image src={INSTA_ICON} className=" m-1"  style={{width: '7%'}} />
                                        </Col>

                                        <Col lg={12} className="d-flex price-sous-titre-price mt-3 mb-4 p-0"  >
                                            <Image src={USER_ICON} className="mr-3 price-icon-size" />
                                            {lang === "fr" ? pricing.number_pages_fr : pricing.number_pages}, {lang === "fr" ? pricing.number_user_fr : pricing.number_user}
                                        </Col>

                                        <Row className="mx-0" style={{height: '230px',alignContent: 'start'}}>
                                            {pricing.number_agent
                                            &&
                                            <Col lg={12} className="d-flex price-checkbox-titre mb-3 p-0">
                                                <Image src={CHECKBOX_ICON} className="mr-3 price-icon-size" />
                                                {lang === "fr" ? pricing.number_agent_fr : pricing.number_agent}
                                            </Col>
                                            }

                                            {pricing.history
                                            &&
                                            <Col lg={12} className="d-flex price-checkbox-titre mb-3 p-0">
                                                <Image src={CHECKBOX_ICON} className="mr-3 price-icon-size" />
                                                {lang === "fr" ? pricing.history_fr : pricing.history}
                                            </Col>
                                            }

                                            {pricing.performance
                                            &&
                                            <Col lg={12} className="d-flex price-checkbox-titre mb-3 p-0">
                                                <Image src={CHECKBOX_ICON} className="mr-3 price-icon-size" />
                                                {lang === "fr" ? pricing.performance_fr : pricing.performance}
                                            </Col>
                                            }

                                            {pricing.training
                                            &&
                                            <Col lg={12} className="d-flex price-checkbox-titre mb-3 p-0">
                                                <Image src={CHECKBOX_ICON} className="mr-3 price-icon-size" />
                                                {lang === "fr" ? pricing.training_fr : pricing.training}
                                            </Col>
                                            }

                                            {pricing.support
                                            &&
                                            <Col lg={12} className="d-flex price-checkbox-titre mb-3 p-0">
                                                <Image src={CHECKBOX_ICON} className="mr-3 price-icon-size" />
                                                {lang === "fr" ? pricing.support_fr : pricing.support}
                                            </Col>
                                            }

                                            {pricing.number_autoReply
                                            &&
                                            <Col lg={12} className="d-flex price-checkbox-titre mb-3 p-0">
                                                <Image src={CHECKBOX_ICON} className="mr-3 price-icon-size" />
                                                {lang === "fr" ? pricing.number_autoReply_fr : pricing.number_autoReply}
                                            </Col>
                                            }
                                        </Row>
                                        
                                        <Col lg={12} className="d-flex">
                                            <button className={checkUserOffer(pricing.name,"btn")} onClick={() => { checkUserOffer(pricing.name,"col") === "price-colone" && fireModal(pricing)}} >
                                                {checkUserOffer(pricing.name,"col") === "price-colone-grise" ? trans[lang].pricing.actualPlan : trans[lang].pricing.choosePlan}
                                            </button>
                                        </Col>
                                    </Row>
                                </div>
                            </Row>
                        </Col>                       
                    )}
                    </Row>
                </Col>
                :
                <Col lg={11} className="p-0 mt-5">
                    <p className="billing-payments-title mb-3">{trans[lang].billingPayments.paymentsHistory}</p>
                    
                    {paymentHistory.length > 0
                    &&
                    <Table striped bordered responsive>
                        <thead>
                            <tr>
                                <th className="billing-payments-table-title">{trans[lang].billingPayments.date}</th>
                                <th className="billing-payments-table-title">{trans[lang].billingPayments.payment}</th>
                                <th className="billing-payments-table-title">{trans[lang].billingPayments.status}</th>
                                <th className="billing-payments-table-title">{trans[lang].billingPayments.paidBy}</th>
                                <th className="billing-payments-table-title">{trans[lang].billingPayments.desc}</th>
                                <th className="billing-payments-table-title">{trans[lang].billingPayments.period}</th>
                                <th className="billing-payments-table-title">{trans[lang].billingPayments.invoice}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paymentHistory.map((history,index) => 
                                <tr key={index}>
                                    <td className="billing-payments-table-medium-text">{history.date_Create}</td>
                                    <td className="billing-payments-table-medium-text">{history.payment}{currency.value}</td>
                                    {history.status === "Paid"
                                    ?
                                    <td className="billing-payments-table-semibold-text" style={{color: "#139216"}}>{trans[lang].billingPayments.paid}</td>
                                    :
                                    history.status === "Unpaid"
                                    ?
                                    <td className="billing-payments-table-semibold-text" style={{color: "#E60A17"}}>{trans[lang].billingPayments.unpaid}</td>
                                    :
                                    <td className="billing-payments-table-semibold-text" style={{color: "#4B4F56"}}>{trans[lang].billingPayments.expired}</td>
                                    }
                                    <td className="billing-payments-table-medium-text">{history.payed_by}</td>
                                    <td className="billing-payments-table-bold-text">{history.description}</td>
                                    <td className="billing-payments-table-medium-text">{history.period}</td>
                                    <td className="billing-payments-table-semibold-text" onClick={() => setInvoice(history)} style={{color: "#4080FF", cursor: "pointer"}}>{trans[lang].billingPayments.view}</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                    }
                </Col>
                }
            </Row>
            </>
            }
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        lang : state.socialMediaR.lang,
        socialMediaPageSelected : state.socialMediaR.socialMediaPageSelected,
        pricingInfos : state.billingR.pricingInfos,
        paymentHistory : state.billingR.paymentHistory,
        billingPlan : state.billingR.billingPlan,
        currency : state.billingR.currency,
    }
};

export default connect(mapStateToProps, { getPricingInfos, getBillingPlan, detectCurrency, payPlan, getPaymentHistory })(Billing);


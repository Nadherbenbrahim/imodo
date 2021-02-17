import React, { useEffect , useState} from 'react';
import '../Home.css';

import { connect } from 'react-redux';                       
import { detectCurrency,} from '../../../redux/actions/billingActions';

import {
    Row,
    Col,
    Table,
    Image,
} from 'react-bootstrap';

// Translations
import { trans } from '../../../Translations';

import { IoIosArrowBack } from 'react-icons/io';

const LOGO = require('../../../assets/images/home/logo.svg');


function Invoice(props) {
    
    let {
        lang,
        data,
        currency,
        
        // Functions:
        setInvoice,
        detectCurrency,
    } = props;
    
    const userData = JSON.parse(localStorage.getItem('userData'));

    // useEffect(() => {
    //     detectCurrency()
    //     .then(() => {
    //         getPricingInfos()
    //         .then(() => {
    //             payPlan();
    //         });
    //     })
    // },[]);

    return (
        <div style={{ marginTop: '140px' }}>
           <Row>
               <Col lg={12} className="mb-5 d-flex p-0" onClick={() => setInvoice(false)}>
                   <IoIosArrowBack color="#818e94" size={20} className="my-auto" />
                   <p className="my-auto navbar-menu-title" style={{ fontSize: "18px", color: "#818e94"}}>Back</p>
               </Col>

                {data
                &&
                <Col lg={8} className="p-4" style={{ border: "1px solid #dbdbdb"}}>
                     <div className="d-flex mb-5">
                         <div className="mr-auto my-auto">
                             <Image src={LOGO} className={"my-auto mr-auto"} style={{ maxWidth: '80px' }} />
                         </div>
 
                         <div className="ml-auto my-auto">
                             <p className="m-auto invoice-light-gray-text">{trans[lang].invoice.invoice} #33070</p>
                             <p className="m-auto invoice-light-gray-text">{trans[lang].invoice.created} {data.date_Create}</p>
                         </div>
                     </div>
                     
                     <div className="d-flex mb-1">
                         <div className="mr-auto my-auto">
                             <p className="m-auto invoice-light-gray-text">{trans[lang].invoice.from}</p>
                         </div>
 
                         <div className="ml-auto my-auto">
                             <p className="m-auto invoice-light-gray-text">{trans[lang].invoice.to}</p>
                         </div>
                     </div>
 
                     <div className="d-flex mb-0">
                         <div className="mr-auto my-auto">
                             <p className="m-auto invoice-black-text">MSL INT</p>
                         </div>
 
                         <div className="ml-auto my-auto">
                             <p className="m-auto invoice-black-text">{data.payed_by}</p>
                         </div>
                     </div>
 
                     <div className="d-flex mb-4">
                         <div className="mr-auto my-auto">
                             <p className="m-auto invoice-black-text" style={{ color: "#4080ff", textDecoration: "underline"}}>contact@msl.tn</p>
                         </div>
 
                         <div className="ml-auto my-auto">
                             <p className="m-auto invoice-black-text">msl@msl.tn</p>
                         </div>
                     </div>
 
                     <div className="d-flex mb-0 p-2" style={{backgroundColor: "#e4e6eb"}}>
                         <div className="mr-auto my-auto">
                             <p className="m-auto invoice-dark-gray-text">{trans[lang].invoice.item}</p>
                         </div>
 
                         <div className="ml-auto my-auto">
                             <p className="m-auto invoice-dark-gray-text">{trans[lang].invoice.price}</p>
                         </div>
                     </div>
 
                     <div className="d-flex mb-0 py-2 px-3">
                         <div className="mr-auto my-auto">
                             <p className="m-auto invoice-dark-gray-text">{data.description} ({data.period})</p>
                         </div>
 
                         <div className="ml-auto my-auto">
                             <p className="m-auto invoice-dark-gray-text">{data.payment} {currency.value}</p>
                         </div>
                     </div>
 
                     <div className="d-flex mb-1 py-2 px-3">
                         <div className="ml-auto my-auto">
                             <p className="m-auto invoice-dark-gray-text">{trans[lang].invoice.total} {data.payment}{currency.value}</p>
                         </div>
                     </div>
 
 
                 </Col>
                }
           </Row>
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        lang : state.socialMediaR.lang,
        currency : state.billingR.currency,
        socialMediaPageSelected : state.socialMediaR.socialMediaPageSelected,
    }
};

export default connect(mapStateToProps, { detectCurrency })(Invoice);


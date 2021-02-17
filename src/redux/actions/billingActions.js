import axios from 'axios'
import { host } from '../../config';
import Swal from 'sweetalert2/dist/sweetalert2.js';
var sha1 = require('sha1');
// const md5Password = "bd$inC96";

// Popup Config: 
const popup = Swal.mixin({
    customClass: {
    confirmButton: 'wizard-pages-active-btn',
    },
    buttonsStyling: false
});

const paymentHost = "https://preprod.gpgcheckout.com/Paiement_test/Validation_paiement.php";
// const paymentHost = "https://preprod.gpgcheckout.com/Paiement_test";
const userNamePayment = "MAR868";
const md5Password = "6677f06ff9439a26d5dd81d49931662f";

export const payPlan = (lang) => {
    return (dispatch) => {

        
        // Devise TND
        // let objectToSend = {
            //     NumSite: "MAR868",
            //     Password: "6677f06ff9439a26d5dd81d49931662f",
            //     orderID: "modo69",
            //     orderId: "modo69",
            //     EMAIL: "enis@msl.com",
            //     CustLastName: "Ayechi",
            //     CustFirstName: "Enis",
            //     CustAddress: "CUN",
            //     CustTel: "58000111",
            //     Langue: "fr",
            //     Amount: 50000,
            //     Currency: "TND",
            //     PayementType: "1",
            //     orderProducts: "ProPlanmodo",
            //     // signature: sha1("MAR868"+"bd$inC96"+"MODO-TEST-255"+50000+"TND"),
            //     signature: sha1("MAR868"+"bd$inC96"+"modo69"+50000+"TND"),
            //     vad: "258500003",
            // };
            
        
        let formData = new FormData();
        
        const config = {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Access-Control-Allow-Origin' : '*',
              'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            //'Content-Type': 'multipart/form-data',
            }
        };

        let orderID = "nadherr" + Math.random();

        formData.append('NumSite', "MAR868");
        formData.append('Password', "6677f06ff9439a26d5dd81d49931662f");
        formData.append('orderID', orderID);
        formData.append('EMAIL', "enis@msl.com");
        formData.append('CustLastName', "Ayechi");
        formData.append('CustFirstName', "Enis");
        formData.append('CustAddress', "CUN");
        formData.append('CustTel', "58000111");
        formData.append('Langue', "fr");
        formData.append('Amount', 40000);
        formData.append('Currency', 'TND');
        formData.append('PayementType', 1);
        formData.append('orderProducts', 'ProPlanmodoo');
        formData.append('signature', sha1("MAR868bd$inC96"+orderID+"40000TND"));
        formData.append('vad', '258500003');
        formData.append('Terminal', "001");
    
        return axios.post("https://preprod.gpgcheckout.com/Paiement_test/Validation_paiement.php",formData,config)
        .then(res => {
            console.log('payPlan =>', res.data);
        })
        .catch((err) => console.log("payPlan err", err));
        
        
        // return axios.post(paymentHost,objectToSend,config)
        // Devise etrangere
        // let objectToSend = {
        //     NumSite: userNamePayment,
        //     Password: md5Password,
        //     orderID: "MODO-TEST-1",
        //     Langue: lang,
        //     AmountSecond: 10,
        // };
    }
};

export const detectCurrency = () => {
    return (dispatch) => {
        
        return axios.get(`https://ipapi.co/json/`)
        .then(res => {
            // console.log('detecting Currency =>', res.data);

            if(res.data.in_eu) {
                // Europeen ip adress:
                dispatch({
                    type: 'DETECT_CURRENCY',
                    payload: {id: "EUR", key: 978, value: "€"},
                });

            } else {
                // Not europeen ip adress
                if(res.data.currency === "TND") {
                    // Tunisian IP
                    dispatch({
                        type: 'DETECT_CURRENCY',
                        payload: {id: "TND", key: 840,  value: "TND"},
                    });
                } else {
                    // ASIA & AMERICA
                    dispatch({
                        type: 'DETECT_CURRENCY',
                        payload: {id: "USD", key: 788,  value: "$"},
                    });
                }
            }
            
            
        })
        .catch((err) => console.log("detecting Currency err", err));
    }
};

export const getPaymentHistory = (idUser) => {
    return (dispatch) => {

        let idUser = localStorage.getItem('authtoken');

        return axios.get(host + `/api/v1/secure/profile/paymentHistory/${idUser}`)
        .then(res => {
            console.log('getPaymentHistory =>', res.data.data);

            dispatch({
                type: 'GET_PAYMENT_HISTORY',
                payload: res.data.data,
            });
        })
        .catch((err) => console.log("getPaymentHistory err", err));
    }
};

export const getBillingPlan = () => {
    return (dispatch) => {

        let idUser = localStorage.getItem('authtoken');

        return axios.get(host + `/api/v1/secure/profile/billing/${idUser}`)
        .then(res => {
            console.log('getBillingPlan =>', res.data.data);

            dispatch({
                type: 'GET_BILLING_PLAN',
                payload: res.data.data,
            });
        })
        .catch((err) => console.log("getBillingPlan err", err));
    }
};

export const getPricingInfos = () => {
    return (dispatch) => {
        
        return axios.get(host + `/api/v1/pricing/pricing`)
        .then(res => {
            console.log('getPricingInfos =>', res.data.data);

            dispatch({
                type: 'GET_PRICING_INFO',
                payload: res.data.data,
            });
        })
        .catch((err) => console.log("getPricingInfos err", err));
    }
};



import React from 'react'
import {
    Image,
} from 'react-bootstrap';


const Checkbox = require('../../../assets/images/home/checkbox.svg');
const Checkbox2 = require('../../../assets/images/home/checkbox2.svg');
const CheckboxRose = require('../../../assets/images/login/pricing-checkbox-checked.svg');
const CheckboxRose2 = require('../../../assets/images/login/pricing-checkbox.svg');


export default function OwnerCheckbox(props) {
    return (
        <>
        {
        props.color ?
            <Image src={props.checked ? CheckboxRose :CheckboxRose2 } style={{maxWidth: '15px'}} />
            :
            <Image src={props.checked ? Checkbox :Checkbox2 } style={{maxWidth: '15px'}} />
        }
     {/*{props.checked 
        ?
            <div className={`page-card-owner-checkbox ${props.className} d-flex`} >
            <div className="page-card-owner-checkbox-active m-auto"/>
            </div>
        :
            <div className={`page-card-owner-checkbox ${props.className}`} />

        }*/}
        </>
    )
}

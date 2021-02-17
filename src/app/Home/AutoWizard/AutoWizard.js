import React, { useEffect } from 'react'
import './AutoWizard.css';

import {
    Row,
    Col,
    Image,
} from 'react-bootstrap';

import WizardSteps from './WizardSteps';
import WizardPages from './WizardPages';
import WizardPosts from './WizardPosts';
import WizardConfig from './WizardConfig';
import WizardTest from './WizardTest';

// Redux:
import { connect } from 'react-redux';
import { nextWizardStep } from '../../../redux/actions/wizardActions';

// Translations
import { trans } from '../../../Translations';

const INSTA_ICON = require('../../../assets/images/home/insta-icon.png');
const FB_ICON = require('../../../assets/images/home/fb-icon.png');

function AutoWizard(props) {

    let { lang } = props;

    useEffect(() => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        return () => {}
    }, [props.wizardStep])

    return (
        <Col xs={12} style={{height: window.innerHeight * 2, marginTop: '135px'}} className="d-flex flex-column" >
        
        <Row className="d-flex">
            <Col lg={1} />
            
            <Col lg={3} className="d-flex flex-column p-0">
                {/* Wizard Selected Page */}
                { 
                props.wizardSelectedPage !== null && props.wizardStep > 0 &&  props.wizardStep < 4 &&
                <Row className="d-flex mr-auto pl-3 py-1 mb-1">
                    <div className="d-flex flex-column mr-3">
                        <Image src={props.wizardSelectedPage.picture_url} className="m-auto" style={{maxWidth: '38px', borderRadius: '50%'}} />
                        <Image src={props.wizardSelectedPage.platform === "instagram" ? INSTA_ICON : FB_ICON} className="ml-auto" style={{ maxWidth: '16px',zIndex: 1, marginTop: '-10px'}}/>
                    </div>
                    <p className="m-auto wizard-pages-page-title-autoWizard1" >{props.wizardSelectedPage.name}</p> 
                </Row>
                }

                {/* Wizard Selected Post */}
                { 
                props.wizardSelectedPost !== null &&
                <Row className="d-flex mr-auto px-3 py-2 wizard-post-selection-container">
                    <div className="d-flex flex-column mr-3">
                        <Image src={props.wizardSelectedPost.hasOwnProperty("picture") ? props.wizardSelectedPost.picture : props.wizardSelectedPage.hasOwnProperty("picture_url") ? props.wizardSelectedPage.picture_url : ""} className="m-auto" style={{maxWidth: '38px'}} />
                    </div>
                    <p className="m-auto wizard-pages-page-title-autoWizard2" >
                        {props.wizardSelectedPost.message && props.wizardSelectedPost.message.length > 14 
                        ? 
                        // props.wizardSelectedPost.message
                        props.wizardSelectedPost.message.substring(0,16) + "..." 
                        :
                        props.wizardSelectedPost.message
                        ?
                        props.wizardSelectedPost.message
                        :
                        props.wizardSelectedPage.name
                        }
                    </p>  
                </Row>
                }

            </Col>

            <Col lg={3} className="d-flex p-0">
                <p className="wizard-title my-auto ml-5">{trans[lang].autoWizard.title}</p> 
            </Col>

            <Col lg={4} />
        </Row>
        
        <WizardSteps />
        
        {props.wizardStep === 0 && <WizardPages />}

        {props.wizardStep === 1 && <WizardPosts />}

        {props.wizardStep === 2 && <WizardConfig />}

        {props.wizardStep === 3 && <WizardTest />}
    </Col>

    )
}

const mapStateToProps = (state) => {
    return {
        lang: state.socialMediaR.lang,
        wizardStep: state.wizardR.wizardStep,
        wizardSelectedPage: state.wizardR.wizardSelectedPage,
        wizardSelectedPost: state.wizardR.wizardSelectedPost,
    }
};

export default connect(mapStateToProps, { nextWizardStep })(AutoWizard);

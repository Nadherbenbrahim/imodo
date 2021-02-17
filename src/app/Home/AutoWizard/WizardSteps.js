import React from 'react';

import {
    Row,
    Col,
} from 'react-bootstrap';
import { connect } from 'react-redux';

// Translations
import { trans } from '../../../Translations';

import { IoIosCheckmark } from 'react-icons/io';

function WizardSteps(props) {

    let { wizardStep, lang } = props;

    const allSteps = [
        { title: trans[lang].WizardSteps.pageSelection, number: 1, circleClass: 'wizard-step-circle-active', numClass: 'wizard-step-num-active', titleClass: 'wizard-step-title-active'},
        { title: trans[lang].WizardSteps.postSelection, number: 2, circleClass: 'wizard-step-circle', numClass: 'wizard-step-num', titleClass: 'wizard-step-title'},
        { title: trans[lang].WizardSteps.autoConfig, number: 3, circleClass: 'wizard-step-circle', numClass: 'wizard-step-num', titleClass: 'wizard-step-title'},
        { title: trans[lang].WizardSteps.test, number: 4, circleClass: 'wizard-step-circle', numClass: 'wizard-step-num', titleClass: 'wizard-step-title'},
    ];

    return (
        <Row className="d-flex mt-3">  
            <Col lg={1} />
            <Col lg={9} className="p-0" >
                <div className="md-stepper-horizontal orange">
                    {allSteps.map((step,index) => {
                        let comp = wizardStep === index

                        return (
                            <div className={step.number - 1 < wizardStep || comp ? "md-step active" : "md-step"}>
                            <div className="md-step-circle">
                                <span  style={{margin: '2px'}}>
                                {
                                step.number - 1 < wizardStep
                                ?
                                <IoIosCheckmark className="m-auto" color={'white'} size={28} />
                                :
                                step.number
                                }
                                </span>
                            
                            </div>
                            <div className="wizard-step-title md-step-title">{step.title}</div>
                            {
                            step.number - 1 < wizardStep
                            ?
                            // LIGNE ROSE
                            <div>
                            <div className="md-step-bar-left active"></div>
                            <div className="md-step-bar-right active"></div>
                            </div>
                            :
                            <div>
                            <div className="md-step-bar-left"></div>
                            <div className="md-step-bar-right"></div>
                            </div>
                            }
                            </div>
                        )
                    }

                    )}
                </div>
            </Col>
            <Col lg={2} />
        </Row>
    );
}

const mapStateToProps = (state) => {
    return {
        lang: state.socialMediaR.lang,
        wizardStep: state.wizardR.wizardStep,
    }
};

export default connect(mapStateToProps, {})(WizardSteps);

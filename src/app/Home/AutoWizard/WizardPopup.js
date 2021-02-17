import React, { useEffect } from 'react'
import './AutoWizard.css';

import { connect } from 'react-redux';
import { setWizardIntentType, resetَAllWizard } from '../../../redux/actions/wizardActions';

import {
    Row,
    Col
} from 'react-bootstrap';

import {
    withRouter,
} from 'react-router-dom';

// Translations
import { trans } from '../../../Translations';

function WizardPopup(props) {
    let { lang, history } = props;

    useEffect(() => {
        props.resetَAllWizard();
    }, [])

    return (
        <>
        <Row style={{ height: window.innerHeight ,marginTop: '135px'}} className="p-0">
            <Col lg={3} />

            <Col lg={5}>
                <div className="mx-auto mt-5 wizard-popup d-flex flex-column">
                    <Row className="d-flex m-auto">
                        <Col lg={12} className='d-flex'>
                            <p className="mx-auto wizard-popup-question">{trans[lang].wizardPopup.text}</p>
                        </Col>
                       
                        <Col lg={8} className="mx-auto mb-3">
                            <div className="my-auto wizard-popup-btn d-flex" onClick={() => props.setWizardIntentType('default',history)}>
                                <p className="m-auto">{trans[lang].wizardPopup.specific}</p>
                            </div>
                        </Col>

                        <Col lg={8} className="mx-auto">
                            <div className="my-auto wizard-popup-btn d-flex" onClick={() => props.setWizardIntentType('generic',history)}>
                                <p className="m-auto">{trans[lang].wizardPopup.generic}</p>
                            </div>
                        </Col>

                    </Row>
                </div>
            </Col>

            <Col lg={3} />
        </Row>
        </>
    );
};


const mapStateToProps = (state) => ({
    lang: state.socialMediaR.lang,
    wizardIntentType: state.wizardR.wizardIntentType,
});

export default withRouter(connect(mapStateToProps, { setWizardIntentType, resetَAllWizard })(WizardPopup));

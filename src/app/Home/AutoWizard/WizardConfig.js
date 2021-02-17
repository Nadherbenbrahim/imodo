import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { nextWizardStep,getExistingProject, getAllIntents, trainAgentPage, trainAgentPost, resetStep3Wizard, nextSpecificWizardStep, resetWizardPostSelected,resetWizardPageSelected } from '../../../redux/actions/wizardActions';
import Swal from 'sweetalert2/dist/sweetalert2.js';
// import ReactTooltip from 'react-tooltip';

import WizardIntentDetails from './WizardIntentDetails';

import {
    Row,
    Col,
    Spinner,
    Modal
} from 'react-bootstrap';

import { useLocation, useHistory } from 'react-router-dom';

// Translations
import { trans } from '../../../Translations';


import { BiError } from 'react-icons/bi';

export const WizardConfig = (props) => {

    let { lang } = props;

    // Popup Config :
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'wizard-pages-active-btn py-2 px-3',
        },
        buttonsStyling: false
    });

    const [selectedIntents, setSelectedIntents] = useState([]);
    const [btnLoading, setBtnLoading] = useState(false);
    const [notif, setNotif] = useState(false);

    let location = useLocation();
    let history = useHistory();

    const checkIntent = (intent) => {
        let found = selectedIntents.findIndex((intenta) => intenta.name === intent);

        if(found > -1) {
           return true;
        } else {
            return false;
        }
    };

    const newIntent = (intent) => {
        let found = selectedIntents.findIndex((intenta) => intenta.name === intent.intent);
        
        // if already clicked swal the popup
        if(found > -1) {    
            if(lang === "en") {
                swalWithBootstrapButtons.fire({ title: `${trans[lang].wizardConfig.intent} "${intent.intent}" ${trans[lang].wizardConfig.alreadySelected}`,confirmButtonText: 'Okay' });
            } else {
                swalWithBootstrapButtons.fire({ title: `${trans[lang].wizardConfig.intent} "${intent.intent_fr}" ${trans[lang].wizardConfig.alreadySelected}`,confirmButtonText: 'Okay' });
            }
        } else {
            // Intent selected and create an array for the products to render it from the backend
            let intentToPush = {
                name: intent.intent,
                name_fr: intent.intent_fr,
                products: [],
                status: 'new',
            };
            // console.log("Im pushing", intentToPush)
            setSelectedIntents(selectedIntents => [...selectedIntents, intentToPush]);
        }
    };

    const goToTrainAgent = () => {
        
        if(selectedIntents.length > 0) {
            setBtnLoading(true);
            setNotif(true);

            if(props.wizardIntentType === "generic") {
                props.trainAgentPage(selectedIntents,props.wizardIdProject)
                .then(() => { setNotif(false);  props.nextWizardStep(); })
                .then(() => props.resetStep3Wizard());
            } else {
                props.trainAgentPost(selectedIntents,props.wizardIdProject)
                .then(() => { setNotif(true); props.nextWizardStep(); })
                .then(() => props.resetStep3Wizard());
            }
        } else {
            swalWithBootstrapButtons.fire({ title: trans[lang].wizardConfig.addAtLeast, confirmButtonText: 'Okay' });
        }
    };

    const handleBackFromStep3To2 = () => {
        props.resetStep3Wizard(); 
        // console.log("Lets see location first =>", location);

        if(location.state) {
            history.push({
                pathname: '/home/my-agents',
                state: { imFrom : 'Wizard' }
            });
        } else {
            if(props.wizardIntentType === "generic") {
                props.resetWizardPageSelected();
                props.nextSpecificWizardStep(0);
            } else {
                props.resetWizardPostSelected();
                props.nextSpecificWizardStep(1);
                
            }
        }

    };

    const renderNotif = () => (
        <Modal show={notif} size="md" centered>
            <Modal.Body>
                <Col lg={12}>
                    <Row>
                        <Col lg={12} className="d-flex">
                            <BiError color={"#E5007D"} size={65} className="mx-auto mb-3" style={{cursor: 'pointer'}} />
                        </Col>

                        <Col lg={12} className="d-flex">
                            <p className="mx-auto mb-3 confirm-modal-text">
                               {trans[lang].wizardConfig.updateYourAgent}
                            </p>
                        </Col>
                        
                        <Col lg={12} className="d-flex">
                           <Spinner  animation="border"  className="spinnerRose m-auto" />
                        </Col>
                    </Row>
                </Col>
            </Modal.Body>
      </Modal>
    );

    useEffect(() => {
        props.getAllIntents(props.wizardIntentType)
        .then(() => {
            props.getExistingProject(props.wizardIdProject)
        });
    },[]);

    useEffect(() => {
        if(props.wizardExistingProjectIntents) {
            // Set selected Intent from the existing project directly :
            let intentToPush = {};
            let newIntents = [];

            props.wizardExistingProjectIntents.map(intent => {
                // console.log("Existing shit !!!!!!! =>", intent);
                intentToPush = {
                    name: intent.name,
                    name_fr: intent.hasOwnProperty("intent_fr") ? intent.intent_fr : intent.hasOwnProperty("name_fr") ? intent.name_fr : intent.name,
                    products: intent.answer,
                    status: 'old',
                };
                newIntents.push(intentToPush);
            });
            // console.log("Final intent =>", newIntents);
            setSelectedIntents(newIntents);
        }
        // To Remove the listner
        return () => {};
    },[props.wizardExistingProjectIntents]);

    return (
        <Row className="mt-1">  
            {notif && renderNotif()}

            <Col lg={1} />
    
            <Col lg={9} className="wizard-pages-container mb-3 py-4 pl-4 pr-5 " style={{backgroundColor: 'white'}}>
                
                {/* INTENTS */}
                <Row className="d-flex" style={{width: 'fit-content'}}>
                    <Col lg={12} className="d-flex flex-column p-3">
                        <div className="d-flex flex-column wizard-config-intents-container px-3 py-2">
                            <p className="mr-auto  mb-3 wizard-config-intent-title">{trans[lang].wizardConfig.selectIntents}</p>
                            
                            <Row className="mx-0 my-0 d-flex">
                                {
                                props.wizardIntents 
                                &&
                                props.wizardIntents.map((intent,index) => (
                                    <div 
                                        key={index}
                                        onClick={() => newIntent(intent)} 
                                        className={checkIntent(intent.intent) ? "d-flex wizard-config-intent-box-active py-1 px-2 mb-2 mr-1" : "d-flex wizard-config-intent-box py-1 px-2 mb-2 mr-1"}
                                    >
                                        {
                                        lang === "en"
                                        ?
                                        <p className="m-auto wizard-config-intent-name">{intent.intent}</p>
                                        :
                                        <p className="m-auto wizard-config-intent-name">{intent.intent_fr}</p>
                                        }
                                    </div>
                                ))}
                            </Row>
                        </div>
                    </Col>
                </Row>
                
                <Row className="d-flex mt-1">  
                    {selectedIntents &&
                        selectedIntents.map((intent,index) => 
                        <WizardIntentDetails 
                            indexOfIntent={index} 
                            intent={intent} 
                            wizardIdProject={props.wizardIdProject} 
                            setIntents={setSelectedIntents} 
                            selectedIntents={selectedIntents} 
                            isExistingProject={props.wizardExistingProjectIntents ? props.wizardExistingProjectIntents : false} 
                            intentStatus={intent.status}
                        />
                    )}
                </Row>
             
                {/* BTNS */}
                <Col lg={12}>
                    <Row className="mb-3">
                        <Col lg={6} className="d-flex">
                            <div className="wizard-pages-inactive-btn py-2 px-4 my-auto text-center"  onClick={handleBackFromStep3To2}>
                                {/* MUST RESET ALL WIZARD 3 VARS */}
                                {trans[lang].wizardConfig.back}
                            </div>
                        </Col>

                        <Col lg={6}>
                            <Row className="d-flex">
                                <div className={"wizard-pages-inactive-btn ml-auto py-2 px-4 mr-3"}>{trans[lang].wizardConfig.saveDraft}</div>
                                
                                <div className={"wizard-pages-active-btn py-2 px-4 mr-3"} onClick={() => goToTrainAgent()}>
                                {
                                    btnLoading
                                    ?
                                    (<Spinner size="sm" animation="border" variant="light" />)
                                    :
                                    trans[lang].wizardConfig.next
                                }
                                </div>
                            </Row>
                        </Col>
                    </Row>
                </Col>

            </Col>
    
            <Col lg={2} />
        </Row>
    );
}

const mapStateToProps = (state) => ({
    lang: state.socialMediaR.lang,
    wizardStep: state.wizardR.wizardStep,
    wizardIntentType: state.wizardR.wizardIntentType,
    wizardIdProject: state.wizardR.wizardIdProject,
    wizardExistingProject: state.wizardR.wizardExistingProject,
    wizardExistingProjectIntents: state.wizardR.wizardExistingProjectIntents,
    wizardIntents: state.wizardR.wizardIntents,
    wizardSelectedPage: state.wizardR.wizardSelectedPage,
    wizardSelectedPost: state.wizardR.wizardSelectedPost,
})

export default connect(mapStateToProps, {nextWizardStep,getExistingProject, getAllIntents, trainAgentPage,trainAgentPost, resetStep3Wizard, nextSpecificWizardStep, resetWizardPostSelected,resetWizardPageSelected })(WizardConfig)

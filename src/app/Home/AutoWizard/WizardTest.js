import React, { useState, useEffect, useRef } from 'react';

import axios from 'axios';
import { host } from '../../../config';

import { connect } from 'react-redux';
import { nextSpecificWizardStep, testAgent, resetStep4ReceivedMsg, getExistingProject } from '../../../redux/actions/wizardActions';

import {
    Row,
    Col,
    Image,
    Spinner,
    Popover,
} from 'react-bootstrap';

import {
    withRouter,
} from 'react-router-dom';

// Translations
import { trans } from '../../../Translations';


import Swal from 'sweetalert2/dist/sweetalert2.js';
import Keyboard from 'react-simple-keyboard';
import layout from "simple-keyboard-layouts/build/layouts/arabic";
import ReactTooltip from 'react-tooltip';

const Arabic = require('../../../assets/images/home/Arabic.svg');
const Arabic_Active = require('../../../assets/images/home/arabic01.svg');
const LETTER_ICON = require('../../../assets/images/home/3a.png');
const IMODO_PROFILE_ICON = require('../../../assets/images/home/full-bulle-imodo.png');

export const WizardTest = (props) => {

    let {
        lang,
        wizardIntentType,
        wizardSelectedPage,
        wizardSelectedPost,
        wizardReceivedMsg,
        wizardIdProject,
        wizardExistingProject,
        history,

        resetStep4ReceivedMsg,
        nextSpecificWizardStep,
        getExistingProject,
    } = props;

    // Popup Config:
    const swalWithBootstrapButtons = Swal.mixin({ customClass: {confirmButton: 'wizard-pages-active-btn-alert'}, buttonsStyling: false });

    const keyboard = useRef(null);


    const [message,setMessage] = useState('');
    const [sendedMsg,setSendedMsg] = useState(null);
    const [btnLoading,setBtnLoading] = useState(null);
    const [wizardFinish,setWizardFinish] = useState(null);
    const [showKeyboard, setShowKeyboard] = useState(false);
    const [cursorPos, setCursorPos] = useState(0);
    const [activateAgent, setActivateAgent] = useState(null);

    
    // Tags:
    // const [Tags,setTags] = useState(false);
    
    const TagsPopover = (
        <Popover id="popover-tags">
          <Popover.Content>
            <Row>
                <Col lg={12}>
                    <Row className="pl-1 my-2">
                        <Col xs={12} className="d-flex mb-1 mt-2">
                            <p className="my-auto mr-auto wizard-config-tag" onClick={() => { setMessage(prevMsg => prevMsg + '##FIRST_NAME##'); }}>{trans[lang].wizardMiracleInput.firstName}</p>
                        </Col>
                         
                        <Col xs={12} className="d-flex mb-1">
                            <p className="my-auto mr-auto wizard-config-tag" onClick={() => { setMessage(prevMsg => prevMsg + '##LAST_NAME##'); }}>{trans[lang].wizardMiracleInput.lastName}</p>
                        </Col>

                        <Col xs={12} className="d-flex mb-1">
                            <p className="my-auto mr-auto wizard-config-tag" onClick={() => { setMessage(prevMsg => prevMsg + '##FULL_NAME##'); }}  >{trans[lang].wizardMiracleInput.fullName}</p>
                        </Col>

                        <Col xs={12} className="m-auto d-flex mb-2">
                            <p className="my-auto mr-auto wizard-config-tag" onClick={() => { setMessage(prevMsg => prevMsg + '##PAGE_NAME##'); }}  >{trans[lang].wizardMiracleInput.pageName}</p>
                        </Col> 
                    </Row>
                </Col>
            </Row>
          </Popover.Content>
        </Popover>
    );

    const chat = () => {
        props.testAgent(message,wizardIntentType,wizardSelectedPage,wizardSelectedPost)
        .then(() => {
            setSendedMsg(message);
            setMessage('');
        })
        .catch(err => {
            console.log("Getting test message wizard", err);

            swalWithBootstrapButtons.fire({
                title: trans[lang].wizardTest.errGetMsg,
                confirmButtonText: trans[lang].wizardTest.retry,
            });
        });
    };

    const showTheFinish = () => {
        setBtnLoading(true);

        setTimeout(() => {
            setWizardFinish(true);
            setBtnLoading(null);
        },1500);
    };

    const activateAgentNow = (status) => {

        if(status === 'live') {

            let objectToSend = {
                live : true
            };

            axios.put(host + `/api/v1/secure/project/agent/live/${wizardIdProject}`,objectToSend,{
                headers: {
                    'authorization': 'Bearer ' + localStorage.getItem('authtoken')
                }
            })
            .then(res => {
                console.log('agent Live post APi Response =>', res.data.data);
                
                
                if(res.data.data === false) {
                    // Free trial
                    swalWithBootstrapButtons.fire({ title: trans[lang].myAgents.activeNowErr,confirmButtonText: trans[lang].wizardTest.retry });
                } else {
                    history.push({
                        pathname: '/home/my-agents',
                        state: { imFrom : 'Wizard', page: wizardSelectedPage },
                    });
                }
                
            })
            .catch((err) => {
                console.log("agent Live post Api error  =>", err)
                swalWithBootstrapButtons.fire({ title: trans[lang].wizardTest.errActivAgent,confirmButtonText: trans[lang].wizardTest.retry });
            })
            
        } else {

            let objectToSend = {
                live : false
            };

            axios.put(host + `/api/v1/secure/project/agent/live/${wizardIdProject}`,objectToSend,{
                headers: {
                    'authorization': 'Bearer ' + localStorage.getItem('authtoken')
                }
            })
            .then(res => {
                console.log('agent Later post APi Response =>', res.data.data);
                // history.push('/home/my-agents');
                history.push({
                    pathname: '/home/my-agents',
                    state: { imFrom : 'Wizard', page: wizardSelectedPage },
                });
            })
            .catch((err) => {
                console.log("agent Later post Api error  =>", err)
                swalWithBootstrapButtons.fire({ title: trans[lang].wizardTest.errActivAgent,confirmButtonText: trans[lang].wizardTest.retry });
            })
        }

    };

    const backToStep3 = () => {
        // Reset Msg received & Go:
        resetStep4ReceivedMsg();
        nextSpecificWizardStep(2)
    };

    const handleCursorPosition = (e) => {
        // console.log("Code", e.keyCode, "cursor in", e.target.selectionStart);
        setCursorPos(e.target.selectionStart - 1);
    }

    const isProjectActive = (project) => {
      
        if(project.trained && project.live) {
            return true; // Status === Active
            // Put your set State ya haider

        } else if (project.trained && !project.live) {
            return false // Status === Not Active
            // Put your set State ya haider

        } else {
            return false // Status === DRAFT
            // Put your set State ya haider

        }
    };

    useEffect(() => {
            
        resetStep4ReceivedMsg();
        if(wizardIdProject) {
            getExistingProject(wizardIdProject)
        };

        if(wizardExistingProject) {
            setActivateAgent(isProjectActive(wizardExistingProject))
        };

    },[])

    return (
        <Row className="mt-5">  
            <Col lg={1} />
    
            <Col lg={9} className="wizard-pages-container mb-3" style={{backgroundColor: 'white'}}>
                
                <Row className="d-flex mt-4 ml-2 mb-4">
                    <p className="my-auto wizard-pages-title">{trans[lang].wizardTest.testInteractionTitle}</p>
                </Row>
                
                <Row className="mb-4">
                    <Col lg={9} className="mx-auto" style={{backgroundColor : 'white',borderRadius: '0.2rem',border: '1px solid #B4B4B4', height: wizardReceivedMsg && wizardReceivedMsg.length > 1 ? "auto" : '300px' }}>
                        {sendedMsg === null
                        &&
                        <Row className="d-flex" style={{height: '100%'}}>
                            <Col lg={12} className="d-flex" >
                                <p className="m-auto wizard-posts-status-text">{trans[lang].wizardTest.testInteraction}</p>
                            </Col>
                        </Row>
                        }

                        {/* BULLE GRIS */}
                        {sendedMsg !== null &&
                        <Row className="d-flex">
                            <Col>
                                <Row className="my-3">
                                    <Col>
                                        <div className="my-agents-msgs-bulle mb-1">
                                            <p className="my-agents-msgs-bulle-text">
                                               {sendedMsg}
                                            </p>
                                        </div>
                                        {/* <p className="my-agents-msgs-bulle-date">1 hour ago</p> */}
                                    </Col>
                                </Row>
                            </Col>

                            <Col lg={7} />
                        </Row>
                        }

                        {/* BULLE BLEU */}
                        {wizardReceivedMsg && wizardReceivedMsg.length > 0
                        &&
                        wizardReceivedMsg.map((msg,index) => 
                            msg.response.text === ""
                            ?
                            <Row key={index} className="d-flex">
                                <Col lg={6} />

                                <Col lg={6}>
                                    <Row className="my-3">
                                        <Col lg={12}>
                                            <Row className="justify-content-end">
                                                <Col lg={10} className="px-0">
                                                    <div className="my-agents-msgs-bulle-bleu mb-1" style={{backgroundColor: '#3B86FF'}}>
                                                        <p className="my-agents-msgs-bulle-text" style={{color: 'white'}}>
                                                            {trans[lang].wizardTest.didNotUnderstand}
                                                        </p>
                                                    </div>
                                                </Col>
                                                <Col lg={2} className="d-flex pl-1">
                                                    <Image src={IMODO_PROFILE_ICON} className={"mt-auto"} style={{maxWidth: '50px'}} />
                                                </Col>
                                            </Row>
                                            {/* <p className="my-agents-msgs-bulle-date">1 hour ago</p> */}
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            :
                            <Row key={index} className="d-flex">
                                <Col lg={6} />

                                <Col lg={6}>
                                    <Row className="my-3">
                                        <Col lg={12}>
                                            <Row className="justify-content-end">
                                                <Col lg={10} className="px-0">
                                                    <div className="my-agents-msgs-bulle-bleu mb-1" style={{backgroundColor: '#3B86FF'}}>
                                                        <p className="my-agents-msgs-bulle-text" style={{color: 'white'}}>
                                                            {msg.response.text}
                                                        </p>
                                                    </div>
                                                </Col>
                                                <Col lg={2} className="d-flex pl-1">
                                                    <Image src={IMODO_PROFILE_ICON} className={"mt-auto"} style={{maxWidth: '50px'}} />
                                                </Col>
                                            </Row>
                                            {/* <p className="my-agents-msgs-bulle-date">1 hour ago</p> */}
                                        </Col>

                                        {/* BUTTONS */}
                                        <Col lg={12}>
                                            <Row className="justify-content-end">
                                                <Col lg={10} className="px-0">
                                                    {msg.response.hasOwnProperty('buttons') && msg.response.buttons.length < 2
                                                    ?
                                                    msg.response.buttons.map((btn,ind) => 
                                                    <div key={ind} data-for='btnTip' data-tip={btn.type === "web_url" ? btn.url : btn.payload} className="button-message-facebook d-flex mb-1">
                                                        <p className="m-auto">{btn.title}</p>
                                                    </div>
                                                    )
                                                    :
                                                    <div className="group-btns-facebook">
                                                        {msg.response.buttons.map((btn,ind) => 
                                                        <div key={ind} data-for='btnTip' data-tip={btn.type === "web_url" ? btn.url : btn.payload} className={`btn-group-facebook${ind} d-flex`} style={{borderBottom: ind < msg.response.buttons.length - 1 && "1px solid #caccd2" }}>
                                                            <p className="m-auto">{btn.title}</p>
                                                        </div>
                                                        )}
                                                    </div>
                                                    }
                                                    <ReactTooltip id='btnTip' textColor='#fff' backgroundColor='#E5007D' />
                                                </Col>

                                                <Col lg={2} className="d-flex pl-1">
                                                    {/* <Image src={IMODO_PROFILE_ICON} className={"mt-auto"} style={{maxWidth: '50px'}} /> */}
                                                </Col>
                                            </Row>
                                        </Col>
                                        
                                        {/* <Col lg={12}>
                                            <Row className="justify-content-end">
                                                <Col lg={10} className="px-0">
                                                    {msg.response.hasOwnProperty('buttons') && msg.response.buttons.length > 1
                                                    &&
                                                    <div className="group-btns-facebook">
                                                        {msg.response.buttons.map((btn,ind) => 
                                                        <div key={ind} data-for='btnTip' data-tip={btn.type === "web_url" ? btn.url : btn.payload} className={`btn-group-facebook${ind} d-flex`} style={{borderBottom: ind < msg.response.buttons.length - 1 && "1px solid #caccd2" }}>
                                                            <p className="m-auto">{btn.title}</p>
                                                        </div>
                                                        )}
                                                    </div>
                                                    }
                                                    <ReactTooltip id='btnTip' textColor='#fff' backgroundColor='#E5007D' />
                                                </Col>

                                                <Col lg={2} className="d-flex pl-1"/>
                                       
                                            </Row>
                                        </Col> */}

                                    </Row>
                                </Col>
                            </Row>
                        )}
                    </Col>
                </Row>

                <Row className="mt-3 mb-3">
                    <Col lg={9} className="mx-auto" style={{backgroundColor : 'white',borderRadius: '0.2rem',border: '1px solid #B4B4B4'}}>
                        <Row className="pt-4 pb-4">
                            <Col lg={1}>
                                {/* NADIA REMOVED TAGS & EMOJIS FROM THE TEST */}
                                {/* <Row className="justify-content-around"> */}
                                <Row className="d-flex">
                                    {/* <div className="d-flex">
                                        <OverlayTrigger trigger="click" placement="top" overlay={TagsPopover}>
                                            <Image 
                                                src={Tags ? BALISE_ICON_ACTIVE : BALISE_ICON} 
                                                onClick={() => setTags(!Tags)} 
                                                className="my-auto mr-auto my-agents-msgs-tiny-icon" 
                                                style={{ width: '19px', cursor: 'pointer'}} 
                                            />   
                                        </OverlayTrigger> 
                                    </div>                                

                                    <div className="d-flex">
                                        <Image src={EMO_ICON} className="m-auto my-agents-msgs-tiny-icon" />
                                    </div> */}

                                    <div className="d-flex m-auto">
                                        <Image src={showKeyboard ? Arabic_Active  : Arabic} onClick={() => setShowKeyboard(!showKeyboard)} className="my-auto my-agents-msgs-tiny-icon" />
                                    </div>

                                    {showKeyboard &&
                                        <div className="wizard-config-keyboard-container" style={{marginLeft: '20px', marginTop: "-235px"}}>
                                            <Keyboard 
                                                keyboardRef={r => {keyboard.current = r; keyboard.current.setInput(message);}}
                                                onChange={(input) => setMessage(input)}
                                                onKeyPress={(key) => key === "{enter}" && setShowKeyboard(false)}
                                                layout={layout} 
                                            />
                                        </div>
                                    }
                                </Row>
                            </Col>

                            <Col lg={11} className="d-flex p-0">
                                <input 
                                    type="text" 
                                    className="my-auto wizard-test-input w-100" 
                                    placeholder={trans[lang].wizardTest.msgPlaceholder}
                                    value={message}
                                    onChange={(e) => { setMessage(e.target.value); if(keyboard.current) { keyboard.current.setInput(e.target.value); } }} 
                                    onClick={(e) => setCursorPos(e.target.selectionStart)}
                                    onKeyDown={(e) => e.key === 'Enter' && chat()}
                                />
                            </Col>

                            <Col lg={3} />    

                        </Row>
                    </Col>
                </Row>

                <Row className="d-flex justify-content-between pl-4 pr-4">
                    <div className="wizard-pages-inactive-btn py-2 px-4 mb-3" onClick={() => backToStep3()}>
                        {trans[lang].wizardTest.back}
                    </div>

                    <div className="mb-3">
                        <Row>
                            <div className="wizard-pages-inactive-btn py-2 px-4 mr-3">
                                {trans[lang].wizardTest.saveDraft}
                            </div>

                            <div className={"wizard-pages-active-btn py-2 px-4 mr-3"} onClick={() => showTheFinish()}>
                                {
                                btnLoading
                                ?
                                (<Spinner size="sm" animation="border" variant="light" />)
                                :
                                trans[lang].wizardTest.finish
                                }
                            </div>
                        </Row>
                    </div>
                </Row>

            </Col>
    
            {wizardFinish 
            &&    
            <Col lg={2} className="d-flex">
                <div className="mt-auto mb-5">
                    <div className="finish-test-container d-flex flex-column py-3 mb-5">
                        <button className={activateAgent ? "mx-auto finish-test-white-btn mb-2" : "mx-auto finish-test-white-btn-active mb-2"} onClick={() => activateAgentNow('live')}>
                            {wizardExistingProject && wizardExistingProject.hasOwnProperty('published') && wizardExistingProject.published ?  trans[lang].wizardTest.updateNow :  trans[lang].wizardTest.activateNow }
                        </button>
                        <button className={activateAgent ? "mx-auto finish-test-transparent-btn mb-2" : "mx-auto finish-test-transparent-btn-active mb-2"} onClick={() => activateAgentNow('later')}>
                            {wizardExistingProject && wizardExistingProject.hasOwnProperty('published') && wizardExistingProject.published ?  trans[lang].wizardTest.updateLater : trans[lang].wizardTest.activateLater }
                        </button>
                    </div>
                </div>
            </Col>
            }
        </Row>
        )
}

const mapStateToProps = (state) => ({
    lang: state.socialMediaR.lang,
    wizardStep: state.wizardR.wizardStep,
    wizardIntentType: state.wizardR.wizardIntentType,
    wizardSelectedPage: state.wizardR.wizardSelectedPage,
    wizardSelectedPost: state.wizardR.wizardSelectedPost,
    wizardReceivedMsg: state.wizardR.wizardReceivedMsg,
    wizardIdProject: state.wizardR.wizardIdProject,
    wizardExistingProject: state.wizardR.wizardExistingProject,
});

export default withRouter(connect(mapStateToProps, { nextSpecificWizardStep, testAgent, resetStep4ReceivedMsg, getExistingProject })(WizardTest));
import React, { useEffect, useState } from 'react'

import { connect } from 'react-redux';
import { addProject, nextWizardStep,nextSpecificWizardStep, resetWizardStep, setWizardSelectedPage, } from '../../../redux/actions/wizardActions';
import { getFbData, getInstaData } from '../../../redux/actions/socialMediaActions';

import WizardRadioBtn from './WizardRadioBtn';
import Lottie from 'react-lottie';
import Swal from 'sweetalert2/dist/sweetalert2.js';

import {
    Row,
    Col,
    Image,
    Spinner,
} from 'react-bootstrap';

import {
    Link,
    withRouter
} from 'react-router-dom';

// Translations
import { trans } from '../../../Translations';

import animationData from '../../../assets/json/loading.json';
import noData from '../../../assets/json/not_found_sad.json';
const INSTA_ICON = require('../../../assets/images/home/insta-icon.png');
const FB_ICON = require('../../../assets/images/home/fb-icon.png');

function WizardPages(props) {

    let { lang, history } = props;

    const [selectedPage, setSelectedPage] = useState(null);
    const [showInstgram, setShowInstgram] = useState(false);
    const [showFacebook, setShowFacebook] = useState(false);
    const [loading, setLoading] = useState(true);
    const [btnLoading, setBtnLoading] = useState(false);
   
    const defaultOptions = {
        loop: true,
        autoplay: true, 
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
    };

    const noDataOptions = {
        loop: true,
        autoplay: true, 
        animationData: noData,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
    };

    useEffect(() => {
        // Getting insta & fb DATA :
        props.getFbData();
        props.getInstaData();
    },[]);

    useEffect(() => {
        props.wizardIntentType === null && history.push('/home/wizard-popup');
    }, [props.wizardIntentType]);

    useEffect(() => {
        if(props.fbData) {
            setLoading(false);
        };
        return () => {
            // removing the listener when props.fbData changes
        }
    },[props.fbData]);

    useEffect(() => {
        if(props.instaData) {
            setLoading(false);
        };
        return () => {
            // removing the listener when props.instaData changes
        }
    },[props.instaData]);

    const renderPage = (index,platform,pageName,picture,idPage,accessToken,pageStatus) => (
        <>
             <Col lg={12}>
                <Row key={idPage + Math.random()} className="my-1" onClick={() => { setSelectedPage(idPage); props.setWizardSelectedPage(platform,pageName,picture,idPage,accessToken,pageStatus) }} style={{ cursor: 'pointer' }}>
                    
                    <Col lg={6}>
                        <Row className="d-flex">
                            <div className="d-flex flex-column">
                                {
                                picture !== null 
                                ?
                                    <Image src={picture} className="m-auto" style={{ maxWidth: '45px', borderRadius: '50%' }} />
                                :
                                    <Image src={`https://graph.facebook.com/v8.0/${idPage}/picture?access_token=${accessToken}`} className="m-auto" style={{ maxWidth: '45px',borderRadius: '50%' }} />
                                }
                                <Image src={platform === "insta" ? INSTA_ICON : FB_ICON} className="ml-auto" style={{ maxWidth: '12px' ,zIndex: 1, marginTop: '-18px'}}/>
                            </div>

                            <p className="my-auto ml-3 wizard-pages-page-title-step1 mr-auto">{pageName}</p>
                        </Row>
                    </Col>

                    <Col lg={6} className="d-flex">
                        <div className="ml-auto my-auto">
                            <WizardRadioBtn checked={selectedPage === idPage} />
                        </div>
                    </Col>

                </Row>
            </Col>

            <Col lg={12} className="p-0">
                <hr className="m-0" style={{ height: '1px'}} />
            </Col>
        </>
    );

    const checkNextStep = () => {
        if(selectedPage !== null && props.wizardIntentType !== null) {
            setBtnLoading(true);

            if(props.wizardIntentType === "generic") {
                //Add Project 
                props.addProject(props.wizardSelectedPage,null)
                    .then(() =>{
                        props.nextSpecificWizardStep(2);
                    });
            } else {
                props.nextWizardStep();
            }
        } else {
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                  confirmButton: 'wizard-pages-active-btn-alert',
                },
                buttonsStyling: false
            });
            swalWithBootstrapButtons.fire({
                title: 'Please select a page',
                confirmButtonText: 'Okay',
            });
        }
    };

    const handleFilter = (platform) => {
        if(platform === 'facebook') {
            setShowFacebook(true);
            setShowInstgram(false);
        } else if(platform === 'instagram') {
            setShowFacebook(false);
            setShowInstgram(true);
        } else {
            setShowFacebook(false);
            setShowInstgram(false);
        }
    };   

    return (
    <>
    <Row className="mt-3">  
        <Col lg={1} />

        <Col lg={9} className="wizard-pages-container" style={{backgroundColor: 'white'}}>
            
           
            <Row className="justify-content-center">

            <Col lg={12} className="d-flex mt-5">
                <p className="wizard-pages-title ml-4">{trans[lang].wizardPages.pageModerate}</p>
            </Col>
        
            {
            !loading
            ?
                (
                <>
                    <Col lg={10}>
                        <Row>
                            <Col lg={12} className="wizard-pages-filter-bar">
                                <Row className="d-flex">
                                    <div className={!showFacebook && !showInstgram ? "wizard-pages-filter-btn-active px-3 py-2" : "wizard-pages-filter-btn px-3 py-2"} onClick={() => handleFilter('all')}>
                                        {trans[lang].wizardPages.allPages}
                                    </div>
                                    
                                    <div className={showFacebook ? "wizard-pages-filter-btn-active px-3 py-2" : "wizard-pages-filter-btn px-3 py-2"} style={{ cursor: 'pointer' }} onClick={() => handleFilter('facebook')}>
                                        {trans[lang].wizardPages.facebook}
                                    </div>
                                    
                                    <div className={showInstgram ? "wizard-pages-filter-btn-active px-3 py-2" : "wizard-pages-filter-btn px-3 py-2"} style={{ cursor: 'pointer' }} onClick={() => handleFilter('instagram')}>
                                        {trans[lang].wizardPages.instagram}
                                    </div>
                                </Row>
                            </Col>


                            {/* Pages */}
                            <Col lg={12} className="my-4 p-0">

                                {!showInstgram && !showFacebook &&
                                    <Col lg={12} className=" p-0">
                                    
                                        {/* render fb data */}
                                        {props.fbData !== null && props.fbData.map((page,index) => {
                                            if(page.status === "listPageInviteAdmin" || page.status === "listPageInvite" || page.status === "listPageConnectedOwner") {
                                                return (
                                                    <div key={index}>
                                                        {renderPage(index,"fb",page.name,null,page.idPage,page.access_token,page.status)}
                                                    </div>
                                                )
                                            } else return(<div />);
                                        })}      

                                        {/* render insta data */}
                                        {props.instaData !== null &&  props.instaData.map((page,index) => {
                                            if(page.status === "listPageInviteAdmin" || page.status === "listPageInvite" || page.status === "listPageConnectedOwner") {
                                                return (
                                                    <div key={index}>
                                                        {renderPage(index,"insta",page.name,page.imageUrl,page.idPage,page.access_token,page.status)}
                                                    </div>
                                                )
                                            } else return(<div />);
                                        })} 
                                        
                                        {/* No Data for fb and instagram */}
                                        {
                                        props.instaDataFiltered !== null &&
                                        props.instaDataFiltered.["listPageConnectedOwner"].length === 0 && 
                                        props.instaDataFiltered["listPageInvite"].length === 0 && 
                                        props.instaDataFiltered["listPageInviteAdmin"].length === 0 &&
                                    
                                        props.fbDataFiltered !== null &&
                                        props.fbDataFiltered["listPageConnectedOwner"].length === 0 && 
                                        props.fbDataFiltered["listPageInvite"].length === 0 && 
                                        props.fbDataFiltered["listPageInviteAdmin"].length === 0 && 
                                        <Col lg={12} className="d-flex flex-column">   
                                            <Lottie options={noDataOptions} width={200} className="m-auto"/>
                                            <p className="mx-auto mt-3 wizard-pages-title">{trans[lang].wizardPages.noDataFbInsta}</p>
                                        </Col>
                                        }
                                    </Col> 
                                }

                                {showFacebook &&
                                <Col lg={12} className="">
                                    {props.fbData !== null && props.fbData.map((page,index) => {
                                            if(page.status === "listPageInviteAdmin" || page.status === "listPageInvite" || page.status === "listPageConnectedOwner") {
                                                return (
                                                    <div key={index}>
                                                        {renderPage(index,"fb",page.name,null,page.idPage,page.access_token,page.status)}
                                                    </div>
                                                )
                                            } else return(<div />);
                                    })} 

                                    {
                                    props.fbDataFiltered !== null &&
                                    props.fbDataFiltered["listPageConnectedOwner"].length === 0 && 
                                    props.fbDataFiltered["listPageInvite"].length === 0 && 
                                    props.fbDataFiltered["listPageInviteAdmin"].length === 0 &&
                                    <Col lg={12} className="d-flex flex-column">   
                                        <Lottie options={noDataOptions} width={200} className="m-auto"/>
                                        <p className="mx-auto mt-3 wizard-pages-title">{trans[lang].wizardPages.noDataFb}</p>
                                    </Col>
                                    }
                                </Col> 
                                }

                                {showInstgram &&
                                    <Col lg={12} className="">
                                        {props.instaData !== null &&  props.instaData.map((page,index) => {
                                            if(page.status === "listPageInviteAdmin" || page.status === "listPageInvite" || page.status === "listPageConnectedOwner") {
                                                return (
                                                    <div key={index}>
                                                        {renderPage(index,"insta",page.name,page.imageUrl,page.idPage,page.access_token,page.status)}
                                                    </div>
                                                )
                                            } else return(<div />);
                                        })}

                                        {
                                        props.instaDataFiltered !== null &&
                                        props.instaDataFiltered["listPageConnectedOwner"].length === 0 && 
                                        props.instaDataFiltered["listPageInvite"].length === 0 && 
                                        props.instaDataFiltered["listPageInviteAdmin"].length === 0 &&
                                        <Col lg={12} className="d-flex flex-column">   
                                            <Lottie options={noDataOptions} width={200} className="m-auto"/>
                                            <p className="mx-auto mt-3 wizard-pages-title">{trans[lang].wizardPages.noDataInsta}</p>
                                        </Col>
                                        }
                                    </Col> 
                                }
                            </Col>
                        </Row>
                    </Col>


                    {/* BTNS */}
                    <Col lg={12}>
                        <Row className="mb-3">
                            <Col lg={6} className="d-flex">
                                <Link to="/home/wizard-popup" style={{textDecoration: 'none'}} className="wizard-pages-inactive-btn d-flex py-2 px-4 ml-3 mr-auto my-auto">
                                    {trans[lang].wizardPages.back}
                                </Link>
                            </Col>

                            <Col lg={6}>
                                <Row className="d-flex">
                                    <div className={"wizard-pages-inactive-btn ml-auto py-2 px-4 mr-3"}>{trans[lang].wizardPages.saveDraft}</div>
                                    
                                    <div className={"wizard-pages-active-btn py-2 px-4 mr-3"} onClick={() => checkNextStep()}>
                                        {
                                        btnLoading
                                        ?
                                        (<Spinner size="sm" animation="border" variant="light" />)
                                        :
                                        trans[lang].wizardPages.next
                                        }
                                    </div>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </>
                )
            :
                (
                <div className="d-flex" style={{ width: '100%' }}>
                    <div className="m-auto">
                        <Lottie options={defaultOptions} width={200} />
                    </div>
                </div>
                )
            }
            </Row>
        </Col>
        <Col lg={2} />
    </Row>
    </>
    );
}


const mapStateToProps = (state) => {
    return {
        lang: state.socialMediaR.lang,
        wizardStep: state.wizardR.wizardStep,
        fbData : state.socialMediaR.fbData,
        fbDataFiltered : state.socialMediaR.fbDataFiltered,
        instaData : state.socialMediaR.instaData,
        instaDataFiltered : state.socialMediaR.instaDataFiltered,
        wizardIntentType: state.wizardR.wizardIntentType,
        wizardSelectedPage: state.wizardR.wizardSelectedPage,
    }
};

export default withRouter(connect(mapStateToProps, { addProject, nextWizardStep, nextSpecificWizardStep, resetWizardStep, getFbData, getInstaData, setWizardSelectedPage })(WizardPages));
import React, { useEffect, useState } from 'react';
import OwnerCheckbox from '../Pages/OwnerCheckbox';

import { connect } from 'react-redux';
import { resetSocialMediaSelections, inviteMember, inviteExistingMember, deleteTeamMember, sendMailTeam, getTeamMembers } from '../../../redux/actions/socialMediaActions';
import { resetَAllWizard, } from '../../../redux/actions/wizardActions';

import Pages from '../Pages/Pages';

import {
    Col,
    Row,
    Modal,
    Spinner,
    Image,
    Form,
} from 'react-bootstrap';

// Translations
import { trans } from '../../../Translations';

import Swal from 'sweetalert2/dist/sweetalert2.js';
import Lottie from 'react-lottie';

import { CopyToClipboard } from 'react-copy-to-clipboard';

import notFoundAnimationData from '../../../assets/json/not-found.json';
import { FaInfoCircle } from 'react-icons/fa';
import { IoIosCopy } from 'react-icons/io';
import {ReactComponent as Zoom} from '../../../assets/images/home/zoom-2.svg';
import {ReactComponent as Trash} from '../../../assets/images/home/trash-simple.svg';
import {ReactComponent as TrashOwner} from '../../../assets/images/home/trash-owner.svg';

const GRAY_SEPERATOR = require('../../../assets/images/home/gray-separator.png');

export const Team = (props) => {

    let {
        lang,
        socialMediaPageSelected,
        teamMembers,
        
        // Funtions:
        getTeamMembers,
        sendMailTeam,
        inviteMember,
        inviteExistingMember,
        deleteTeamMember,
        resetَAllWizard,
        resetSocialMediaSelections,
    } = props;

    // const fbHost = "https://graph.facebook.com/v8.0";

    // Popup Config: 
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
        confirmButton: 'wizard-pages-active-btn py-2 px-3',
        },
        buttonsStyling: false
    });

    // Lottie config
    const defaultOptionsNotFound = {
        loop: true,
        autoplay: true, 
        animationData: notFoundAnimationData,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
    };
   
    const [showPopover, setShowPopover] = useState(false);
    const [showInviteModal, setShowInviteModal] = useState(false);
    const [loadingInvite, setLoadingInvite] = useState(false);
    const [inviteToken, setInviteToken] = useState('');
    const [emailTeamMember,setEmailTeamMember] = useState(''); 
    const [nameTeamMember,setNameTeamMember] = useState(''); 
    const [TeamMembersToInvite,setTeamMembersToInvite] = useState([]); 
    const [TeamMembersToInviteModal,setTeamMembersToInviteModal] = useState(false); 
    const [selectedMember, setSelectedMember] = useState({});
    // const [teamMembers, setTeamMembers] = useState([]);

    const handleInviteModal = () => setShowInviteModal(!showInviteModal);

    const handlePopover = (delay) => {
        setTimeout( () => {
            setShowPopover(!showPopover);
        },delay);
    };

    const validateEmail = (mail) => {
        if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail)) {
            return (true);
        } else {
            return (false);
        }
    };

    const inviteNewMember = (idFacebook, firstName, lastName, role, idPage) => {
        
        if(selectedMember.idFacebook === idFacebook) {
            setSelectedMember({});
        } else {
            setSelectedMember({
                idFacebook: idFacebook,
                firstName: firstName,
                lastName: lastName,
                role: role,
                idPage: idPage,
            });
        }
    };

    const sendInvitationNewMember = (page,member) => {
        inviteExistingMember(page,member)
        .then(() => {
            setTeamMembersToInviteModal(false);
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: trans[lang].team.invitSent,
                showConfirmButton: false,
                timer: 2500
            });
        })
        .catch((err) => {
            console.log("Error addExistingMember,", err)
            swalWithBootstrapButtons.fire({
                title: trans[lang].team.invitFailed,
                confirmButtonText: trans[lang].team.retry,
            });
        });
    };
    
    const renderPopover = () => (
        <div className="d-flex manage-products-popover" >
            <p className="m-auto">
                {trans[lang].team.infoPopover}
                {/* <br/> */}
                {/* <a href="">learn more</a> */}
            </p>
        </div>
    );

    const renderModal = () => (
        <Modal show={showInviteModal} onHide={handleInviteModal} size="lg" centered>
            <div className="d-flex flex-column">
                <Row className="">
                    <Col lg={6}><Modal.Title className="px-2 team-name py-3 ml-3">{trans[lang].team.addMember}</Modal.Title></Col>
                    <Col lg={6} className="d-flex"><button  type="button" class="team-close ml-auto mr-3" onClick={() => { setShowInviteModal(false); setNameTeamMember(''); setEmailTeamMember(''); }} ><span aria-hidden="true">×</span></button></Col>
                    <hr  style={{borderBottom: '1px solid #818E94', opacity: '0.1',padding: '0',margin: '0px auto',width:'90%'}} />
                </Row>
                
                <Modal.Body className="py-5 px-4" >
                    <Row className="d-flex">
                        <Col lg={12} className="d-flex flex-column">
                            <p className="m-auto team-description">{trans[lang].team.copyInvit}</p>
                            <p className="m-auto team-description">{trans[lang].team.invitInfo}</p>
                        </Col>
                    </Row>

                    <Row className="d-flex my-3">
                        <Col md={1}/>
                        
                        <Col md={10} className="d-flex">
                            <Col md={11} className="team-token-container p-2 mx-0">
                                <p className="my-auto team-token-link">{`${window.location.origin}/${inviteToken.substring(0,33)}...`}</p>
                            </Col>
                            <Col md={1} className="d-flex p-0">
                                <CopyToClipboard 
                                    text={`${window.location.origin}/${inviteToken}`}
                                    onCopy={() => {
                                        Swal.fire({
                                            position: 'top-end',
                                            icon: 'success',
                                            title: trans[lang].team.copySuccess,
                                            showConfirmButton: false,
                                            timer: 1500
                                        })
                                    }}
                                >
                                    <span className="d-flex team-copy-span mr-auto" style={{ cursor: 'pointer' }}>
                                        <IoIosCopy className="m-auto" size={"22  "} color={"#fff"} />
                                    </span>
                                </CopyToClipboard>
                            </Col>
                        </Col>

                        <Col lg={1} />
                    </Row>

                    <Row className="justify-content-center my-4">
                        <Col md={6} className="d-flex">
                            <Image src={GRAY_SEPERATOR} fluid />
                        </Col>
                    </Row>
                    
                    <Row className="justify-content-center my-2">
                        <Col md={8} className="d-flex">
                            <p className="team-description mx-auto my-2">{trans[lang].team.enterEmailTeam}</p>
                        </Col>
                    </Row>

                    <Row className="justify-content-center my-2">
                        <div md={4} className="d-flex">
                            <Form.Control type={"text"} className="ml-auto mr-3 my-auto team-token-link" value={nameTeamMember} disabled={true} />
                        </div>

                        <div md={4} className="d-flex">
                            <Form.Control type={"text"} className="ml-auto mr-3 my-auto team-token-link" value={emailTeamMember} onChange={(e) => setEmailTeamMember(e.target.value) } placeholder={trans[lang].team.emailPlaceholder} />
                        </div>

                        <div md={3} className="d-flex">
                            <div 
                                className={"team-button-send mr-3 text-center mr-auto my-auto"} 
                                onClick={() => {
                                    if(validateEmail(emailTeamMember) && nameTeamMember.length > 0 ) {
                                        sendMailTeam(socialMediaPageSelected, emailTeamMember, nameTeamMember, inviteToken)
                                        .then(() => {
                                            setShowInviteModal(false);
                                            setNameTeamMember('');
                                            setEmailTeamMember('');
                                        })
                                        .catch((err) => console.log("Err modal send invitation Team", err))
                                    } else {
                                        swalWithBootstrapButtons.fire({
                                            title: trans[lang].team.invalidEmail,
                                            confirmButtonText: trans[lang].team.retry,
                                        });
                                    }
                                }} 
                            >
                            {trans[lang].team.sendInvit}
                            </div>
                        </div>
                    </Row>
                </Modal.Body>
            </div>
        </Modal>
    );

    const renderModalToInvite = () => (
        <Modal show={TeamMembersToInviteModal} size="lg" centered>
            <div className="d-flex flex-column">
                <Row>
                    <Col lg={6}><Modal.Title className="px-2 team-name py-3 ml-3">{trans[lang].team.inviteMember}</Modal.Title></Col>
                    <Col lg={6} className="d-flex"><button  type="button" class="team-close ml-auto mr-3" onClick={() => { setTeamMembersToInviteModal(false) }} ><span aria-hidden="true">×</span></button></Col>
                    <hr  style={{borderBottom: '1px solid #818E94', opacity: '0.1',padding: '0',margin: '0px auto',width:'90%'}} />
                </Row>
                
                <Modal.Body className="py-5 px-4" >
                  
                    <Row className="justify-content-center mb-3">
                        <Col lg={12} className="d-flex">
                            <p className="page-card-modal-small-title m-auto">{trans[lang].team.selectMember}</p>
                        </Col>
                    </Row>

                    <Row className="justify-content-center mb-1">
                        <Col lg={10}>
                            {TeamMembersToInvite.length > 0
                            ? 
                            (
                            TeamMembersToInvite.map(member => (
                            <>
                            <Row 
                                key={member.idFacebook+Math.random()} 
                                className="justify-content-between py-3" 
                                style={{borderBottom: '1px solid #EBEDF0'}}
                            >   
                                <div className="d-flex">
                                    <p className="m-auto page-card-owner-name" style={{fontSize:'13px'}}>{member.first_name} {member.last_name}</p>
                                </div>

                                <div 
                                    className="d-flex"
                                    style={{cursor: 'pointer'}}
                                    onClick={() => member.role !== "owner" ? inviteNewMember(member.idFacebook, member.first_name, member.last_name, member.role, socialMediaPageSelected.id) : null}
                                >   
                                    {member.role === "owner" 
                                    ?
                                    <p className="page-card-modal-small-title m-auto" style={{ color: '#E4E6EB',fontSize: '14px' }}>{trans[lang].team.ownerAlready}</p>
                                    :
                                    <OwnerCheckbox checked={selectedMember.idFacebook === member.idFacebook} className={"m-auto"} />
                                    }
                                </div>
                            </Row>
                            </>
                            ))
                            )
                            :
                            (
                            <Row>
                                <Col lg={12}  className="d-flex">
                                    <Lottie options={defaultOptionsNotFound} width={200} className="m-auto" />
                                </Col>

                                <Col lg={12}  className="d-flex">
                                    <p className="m-auto page-card-modal-small-title">
                                        {trans[lang].team.noMembers}
                                    </p>
                                </Col>
                            </Row>
                            )
                            }
                        </Col>
                    </Row>

                     <Row className="justify-content-center mt-2">
                        <Col lg={10} className="mt-3">
                            <Row className="d-flex">
                                <div 
                                    style={{cursor: 'pointer'}} 
                                    className={Object.keys(selectedMember).length ? "ml-auto wizard-pages-active-btn py-2 px-3" : "ml-auto wizard-pages-inactive-btn py-2 px-3"} 
                                    onClick={() => Object.keys(selectedMember).length && sendInvitationNewMember(socialMediaPageSelected, selectedMember)}
                                >
                                    {trans[lang].team.inviteMember}
                                </div>
                            </Row>
                        </Col>
                    </Row> 
                </Modal.Body>
            </div>
        </Modal>
    );

    useEffect(() => {
        resetَAllWizard();
    },[]);

    useEffect(() => {
        if(socialMediaPageSelected) {
            getTeamMembers(socialMediaPageSelected);
        };
    },[socialMediaPageSelected]);

    return (
        <div style={{height: window.innerHeight * 1.2 , marginTop: '135px'}}>

            {renderModal()}
            {TeamMembersToInviteModal && renderModalToInvite()}

            <Row className="mt-5">
                <p className="home-big-title" >{trans[lang].team.title}</p>
                <FaInfoCircle style={{transitionDuration: '600ms' }} color={!showPopover ? "#4080FF" : "#E5007D"} size={'15'} onMouseEnter={() => handlePopover('20')} onMouseLeave={() => handlePopover('300')} />
                { showPopover && renderPopover() }
            </Row>

            <Pages title={trans[lang].team.smallTitle} titleStyling={{color: '#4D4F5C', fontSize: '16px', fontFamily: 'Poppins Medium' }} />

            {socialMediaPageSelected
            &&
            <>
            {socialMediaPageSelected.status !== "listPageConnectedOtherTeam"
            ?
            <div>
                <Row className="mr-0 d-flex flex-column">                
                    {socialMediaPageSelected.status === "listPageConnectedOwner"
                    &&
                    <Row className="mb-3"> 
                        <Col lg={12} className="d-flex">
                            <Form.Control type={"text"} className="mr-3 my-auto team-token-link" value={nameTeamMember} onChange={(e) => setNameTeamMember(e.target.value) } placeholder={trans[lang].team.memberName} />
                            <div 
                                className={nameTeamMember.length >= 3 ? "team-invite-btn mr-auto d-flex" : "team-invite-btn-gris mr-auto d-flex"}
                                onClick={() => {
                                    if(nameTeamMember.length < 3) {
                                        swalWithBootstrapButtons.fire({
                                            title: trans[lang].team.validName,
                                            confirmButtonText: trans[lang].team.retry,
                                        });
                                    } else {
                                        setLoadingInvite(true);
                                        inviteMember(socialMediaPageSelected,nameTeamMember)
                                        .then((res) => {
                                            
                                            if(res.data.data === false) {
                                                setLoadingInvite(false);
                                                swalWithBootstrapButtons.fire({
                                                    title: trans[lang].team.errorOffer,
                                                    confirmButtonText: trans[lang].team.retry,
                                                });
                                            } else if(typeof(res.data.data) === "string") {
                                                setInviteToken(res.data.data.tokenPage);
                                                getTeamMembers(socialMediaPageSelected);
                                                setTimeout(() => {
                                                    setLoadingInvite(false);
                                                    setShowInviteModal(true);
                                                },1000);
                                            } else {
                                                setTeamMembersToInvite(res.data.data);
                                                setLoadingInvite(false);
                                                setTeamMembersToInviteModal(true);
                                            }
                                        })
                                        .catch(() => {
                                            setLoadingInvite(false);
                                            swalWithBootstrapButtons.fire({
                                                title: trans[lang].team.errorGenerating,
                                                confirmButtonText: trans[lang].team.retry,
                                            });
                                        });    
                                    }
                                }}
                            >
                                {loadingInvite 
                                ?
                                (<>{trans[lang].team.generatingToken} <Spinner animation="border" size="sm" variant="primary" className="spinnerWhite my-auto ml-2" /></>)
                                :
                                <>{trans[lang].team.inviteMember}</>
                                }
                            </div>
                        </Col>
                    </Row>
                    }
                    <Row>
                        <Col lg={5} className="d-flex">
                            <p className="ml-3 mr-auto my-auto team-members-titre" >{trans[lang].team.teamMembers}</p>
                        </Col>
                        <Col lg={5} className="d-flex">
                            <input type="text" className="ml-auto my-auto recherche-team py-2" />
                            <Zoom className={"zoom-icon"} color={""}  width="16" height="16" />
                        </Col>
                    </Row>

                    <Col lg={10} className="p-3" style={{backgroundColor: socialMediaPageSelected.team.length ? 'white' : 'transparent', borderRadius: '0.3rem'}}>
                        {teamMembers && teamMembers.length
                        ?
                        <>
                        <Row>
                            <Col lg={4} className="d-flex pt-3 pb-3" >
                                <p className="ml-4 mr-auto my-auto manage-products-table-title">{trans[lang].team.name}</p>
                            </Col>
                            
                            <Col lg={4} className="d-flex pt-3 pb-3">
                                <p className="m-auto manage-products-table-title">{trans[lang].team.role}</p>
                            </Col>

                            <Col lg={4} className="d-flex pt-3 pb-3">
                                <p className="mr-4 ml-auto my-auto manage-products-table-title">{trans[lang].team.actions}</p>
                            </Col>
                            <hr style={{borderColor: '#EBEDF0', opacity: '1',padding: '0',margin: 'auto',width: '94%'}} />
                        </Row>

                        {teamMembers.map((member) =>     
                        <Row key={member.idFacebook + Math.random()}>
                            <Col lg={4} className="d-flex pt-3 pb-3">
                                <p className="ml-4 my-auto manage-product-entity-name">{member.name}</p>
                            </Col>
                            
                            <Col lg={4} className="d-flex pt-3 pb-3">
                                <p className="m-auto manage-product-entity-name" style={{color : member.role === 'pending'  && '#E5007D', textTransform: 'uppercase' }}>{member.role}</p>
                            </Col>

                            <Col lg={4} className="d-flex pt-3 pb-3">
                                {
                                socialMediaPageSelected.status === "listPageConnectedOwner"
                                &&
                                <div className="ml-auto " style={{marginRight: '40px'}}>
                                    {member.role === "owner"
                                    ?
                                    <TrashOwner width="20" height="20" onClick={() => swalWithBootstrapButtons.fire({ title: trans[lang].team.cannotDeleteOwner ,confirmButtonText: trans[lang].team.ok, }) }/>
                                    :
                                    <Trash 
                                        width="20" 
                                        height="20"
                                        style={{cursor: 'pointer'}} 
                                        onClick={() => {
                                            deleteTeamMember(socialMediaPageSelected, member.idFacebook, member.role)
                                            .catch(() => {
                                                swalWithBootstrapButtons.fire({
                                                    title: trans[lang].team.errorDeleteMember,
                                                    confirmButtonText: trans[lang].team.retry,
                                                });
                                            })
                                        }} 
                                    />
                                    }
                                </div>
                                }
                            </Col>
                            <hr  style={{borderColor: '#EBEDF0', opacity: '1',padding: '0',margin: 'auto',width: '94%'}} />
                        </Row>
                        )}
                        </>
                        :
                        <>
                        <Col lg={12} className="d-flex" style={{backgroundColor: '#F9F9F9' }}>
                            <Lottie options={defaultOptionsNotFound} width={200} className="m-auto" />
                        </Col>

                        <Col lg={12} className="d-flex mt-5" style={{backgroundColor: '#F9F9F9' }}>
                            <p className="m-auto home-big-title">{trans[lang].team.noMembers}</p>
                        </Col>
                        </>
                        }
                    </Col>
                            
                    <Col lg={2} />
                </Row>
            </div>
            :
            <>
            <Col lg={12} className="d-flex" style={{backgroundColor: '#F9F9F9' }}>
                <Lottie options={defaultOptionsNotFound} width={200} className="m-auto" />
            </Col>

            <Col lg={12} className="d-flex mt-5" style={{backgroundColor: '#F9F9F9' }}>
                <p className="m-auto home-big-title">{trans[lang].team.cannotSee}</p>
            </Col>
            </>
            }
            </> 
            }
        </div>
    )
}

const mapStateToProps = (state) => ({
    lang: state.socialMediaR.lang,
    socialMediaPageSelected: state.socialMediaR.socialMediaPageSelected,
    teamMembers: state.socialMediaR.teamMembers,
})

export default connect(mapStateToProps, { resetSocialMediaSelections,inviteMember, inviteExistingMember, deleteTeamMember, sendMailTeam, getTeamMembers, resetَAllWizard })(Team)

import React, { useEffect, useState } from 'react'

import Pages from '../Pages/Pages';

import {
    Col,
    Row,
    Image,
    Modal,
} from 'react-bootstrap';
import ReactTooltip from 'react-tooltip';
import moment from 'moment';
import axios from 'axios';
import { host } from '../../../config';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import Lottie from 'react-lottie';
import { useHistory, useLocation  } from 'react-router-dom';

import { connect } from 'react-redux';
import {  resetSocialMediaSelections,sycroPageWithWizard } from '../../../redux/actions/socialMediaActions';
import { resetَAllWizard, } from '../../../redux/actions/wizardActions';
import {  getProjectByPage, goToWizardConfig, deleteProjectByPage, setAgentsSelectedProject, resetLogs  } from '../../../redux/actions/myAgentsActions';

// Translations
import { trans } from '../../../Translations';

import notFoundAnimationData from '../../../assets/json/not-found.json';
import { FaLink } from 'react-icons/fa';
import { AiFillPicture } from 'react-icons/ai';
import { BiError } from 'react-icons/bi';
import { IoIosClose } from 'react-icons/io';
import { FaInfoCircle } from 'react-icons/fa';

const EDIT_ICON = require('../../../assets/images/home/Icon feather-edit.svg');
const MSG_ICON = require('../../../assets/images/home/Icon feather-message-square.svg');
const TRASH_ICON = require('../../../assets/images/home/trash-simple.svg');

function MyAgents(props) {

    let {
        lang,
        allSocialPages,
        socialMediaPageSelected,
        agentsProjects,
        
        // Functions
        sycroPageWithWizard,
        resetَAllWizard,
        resetSocialMediaSelections,
        resetLogs,
        getProjectByPage,
        goToWizardConfig,
        deleteProjectByPage,
        setAgentsSelectedProject
    } = props;

    // Popup Config:
    const swalWithBootstrapButtons = Swal.mixin({ customClass: {confirmButton: 'wizard-pages-active-btn-alert'}, buttonsStyling: false });
    
    const notFoundOptions = {
        loop: true,
        autoplay: true, 
        animationData: notFoundAnimationData,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
    };

    let history = useHistory();
    let location = useLocation();

    // const tableTitles = ['Picture', 'Publish', 'Message', 'Date', 'Last update', 'Type', 'Status', 'Edit project'];

    // State :
    const [deleteProjectModal, setDeleteProjectModal] = useState(false);
    const [projectToDelete, setProjectToDelete] = useState({});
    // const [activatingProject, setActivatingProject] = useState({status: "", index: null});
    const [showPopover, setShowPopover] = useState(false);

    const confirmDeleteModal = () => (
        <Modal show={deleteProjectModal} centered>
            <Modal.Body>
                <Col lg={12}>
                    <Row>
                        <Col lg={12} className="d-flex">
                        <IoIosClose color={"#B4B4B4"} size={30} className="ml-auto" style={{cursor: 'pointer'}} onClick={() => { setProjectToDelete({}); setDeleteProjectModal(false); }} />
                        </Col>
        
                        <Col lg={12} className="d-flex">
                        <BiError color={"#E5007D"} size={65} className="mx-auto mb-3" style={{cursor: 'pointer'}} />
                        </Col>
        
                        <Col lg={12} className="d-flex">
                        <p className="mx-auto mb-2 confirm-modal-text">{trans[lang].myAgents.deleteProject}</p>
                        </Col>
                    
                        <Col lg={12} className="d-flex">
                        <div className="mx-auto mb-3 manage-products-add-btn d-flex text-center" onClick={() => deleteProjectByPage(projectToDelete).then(() => { setProjectToDelete({}); setDeleteProjectModal(false); })}>
                            <p className="m-auto">{trans[lang].myAgents.confirmDelete}</p>
                        </div>
                        </Col>
        
                        <Col lg={12} className="d-flex">
                        <p className="mx-auto mb-2 cancel-btn-modal-text" onClick={() => { setProjectToDelete({}); setDeleteProjectModal(false); }}>{trans[lang].myAgents.rejectDelete}</p>
                        </Col>
                    </Row>
                </Col>
            </Modal.Body>
        </Modal>
    );

    const renderDate = (date) => {
        return moment(date).format('DD/MM/YY');
    };

    const renderTime = (date) => {
        return moment(date).format('h:mm');
    };

    const checkStatusClass = (trained,live) => {
    
        if (trained && live) {
            // ACTIVE
            return "my-agent-status-btn d-flex"

        } else if (trained && !live) {
            // !NOT ACTIVE
             return "my-agent-status-btn d-flex"
        } else {
            // DRAFT
            return "my-agent-status-btn-disabled d-flex"
        }
    };

    const activateAgentNow = (project,indexProject) => {

        // console.log("To Activate that =>", project);

        if (project.trained && project.live) {
            // MAKE IT NOT ACTIVE
            let objectToSend = {
                live : false
            };

            axios.put(host + `/api/v1/secure/project/agent/live/${project._id}`,objectToSend,{
                headers: {
                    'authorization': 'Bearer ' + localStorage.getItem('authtoken')
                }
            })
            .then(res => {
                console.log('agent Later post APi Response =>', res.data.data);
                getProjectByPage(socialMediaPageSelected);
            })
            .catch((err) => {
                console.log("agent Later post Api error  =>", err)
                swalWithBootstrapButtons.fire({ title: `Error while activating agent. Try Again !`,confirmButtonText: 'Okay' });
            })

        } else if (project.trained && !project.live) {
            // ACTIVATE IT
            let objectToSend = {
                live : true
            };
            
            axios.put(host + `/api/v1/secure/project/agent/live/${project._id}`,objectToSend,{
                headers: {
                    'authorization': 'Bearer ' + localStorage.getItem('authtoken')
                }
            })
            .then(res => {
                console.log('My agents agent/live post APi Response =>', res.data.data);

                if(res.data.data === false) {
                    // Free trial
                    swalWithBootstrapButtons.fire({ title: trans[lang].myAgents.activeNowErr,confirmButtonText: trans[lang].wizardTest.retry });
                } else {
                    getProjectByPage(socialMediaPageSelected);
                }
            })
            .catch((err) => {
                console.log("My agents agent/live Api error  =>", err)
                swalWithBootstrapButtons.fire({ title: `Error while activating agent. Try Again !`,confirmButtonText: 'Okay' });
            })
        } else {
            // DRAFT
            return;
        }
    };

    const renderPopover = () => (
        <div className="d-flex manage-products-popover">
          <p className="m-auto">
            {trans[lang].myAgents.infoPopover}
            {/* <br/> */}
            {/* <a href="">learn more</a> */}
          </p>
        </div>
    );
      
    const handlePopover = (delay) => {
        setTimeout( () => {
          setShowPopover(!showPopover);
        },delay)
    };

    useEffect(() => {
        resetَAllWizard();
        resetLogs();
        if(location.state) {
            if(location.state.hasOwnProperty('imFrom') && location.state.hasOwnProperty('page') && allSocialPages) {
                // Sync with the wizard page
                // console.log("Lets syncro with the wizard :D", location.state);
                sycroPageWithWizard(allSocialPages,location.state.page);
            } 
        } 
    },[]);

    useEffect(() => {
        if(socialMediaPageSelected) {
            getProjectByPage(socialMediaPageSelected);
        }
    },[socialMediaPageSelected]);

    return (
    <div style={{ height: window.innerHeight * 2, marginTop: '135px' }}>
        {/* MODAL DELETE PROJECT */}
        {deleteProjectModal && confirmDeleteModal()}
        
        <Row className="mt-5">
          <p className="home-big-title">{trans[lang].myAgents.title}</p>
          <FaInfoCircle style={{transitionDuration: '300ms' }} color={!showPopover ? "#4080FF" : "#E5007D"} size={'15'} onMouseEnter={() => handlePopover('20')} onMouseLeave={() => handlePopover('300')} />
          {showPopover && renderPopover()}
        </Row>

        <Pages title={trans[lang].myAgents.smallTitle} />

        {props.socialMediaPageSelected && 
        agentsProjects && agentsProjects.length > 0
        ?
        <>
        <Row>
            <Col lg={12}>
                <Row className="mb-2 mx-0">

                    <Col lg={12} className="d-flex mb-0">
                        <p className="my-auto my-agent-table-title">{trans[lang].myAgents.projectList}</p>
                    </Col>
            
                    <Col lg={11} className="my-3 mx-0 p-0">
                        <Row>
                            <Col lg={12} className="pl-4 pr-5 py-4" style={{background: "#FFFFFF"}}>
                                <Row className="py-2 justify-content-between">
                                    {trans[lang].myAgents.tableTitles.map((title,index) => (
                                        <Col lg={ title === "Status" || title === "Message" || title === "Statut"  ? 2 :  1} key={index} className="d-flex p-0">
                                            <div className="m-auto my-agent-title-table" >{title}</div>
                                        </Col>    
                                    ))}   
                                </Row>  
                                
                                {/* PROJECTS */}
                                {agentsProjects && 
                                agentsProjects.map((project,indexProject) => 
                                    project.hasOwnProperty('intents') && project.intents.length > 0
                                    && 
                                    <Row key={indexProject} className="py-2 justify-content-between" >  
                                        <Col lg={1} className="d-flex">
                                            {project.post.picture 
                                            ?
                                            <Image src={project.post.picture} className={"m-auto"} style={{height: '40px', width: '40px'}} />
                                            :
                                            <Image src={socialMediaPageSelected.picture_url} className={"m-auto"} style={{height: '40px', width: '40px', borderRadius: '50%'}} />
                                            }
                                        </Col>    

                                        <Col lg={1} className="d-flex">
                                            {project.post.published
                                            ?
                                            <div className="flex-column">
                                                <p className="m-auto my-agent-project-date"  style={{color: project.post.status === "Scheduled" ? "#009EE3" : "#4D4F5C"}}>{renderDate(project.post.published)}</p>
                                                <p  className="m-auto my-agent-project-time" style={{color: project.post.status === "Scheduled" ? "#009EE3" : "#4D4F5C"}}>{renderTime(project.post.published)}</p>
                                            </div>
                                            :
                                            <p className="mx-auto my-agent-project-date">--.--</p>
                                            }
                                        </Col>    

                                        <Col lg={2} className="d-flex p-0" >
                                            {project.post.message 
                                            ?
                                            <div className="m-auto my-agents-msg-desc" >
                                                {project.post.message.length > 12
                                                ?
                                                project.post.message.substring(0,40) + "..."
                                                :
                                                project.post.message
                                                }
                                            </div>
                                            :
                                            <p className="mx-auto my-agent-project-date">--.--</p>
                                            }
                                        </Col>    

                                        <Col lg={1} className="d-flex" >
                                            <div className="flex-column">
                                                <p className="m-auto my-agent-project-date">{renderDate(project.createDate)}</p>
                                                <p  className="m-auto my-agent-project-time">{renderTime(project.createDate)}</p>
                                            </div>
                                        </Col>
                                        
                                        <Col lg={1} className="d-flex" >
                                            <div className="flex-column">
                                                <p className="m-auto my-agent-project-date">{renderDate(project.lastUpdate)}</p>
                                                <p  className="m-auto my-agent-project-time">{renderTime(project.lastUpdate)}</p>
                                            </div>
                                        </Col>

                                        <Col lg={1} className="d-flex" >
                                            <div className="m-auto wizard-pages-page-title-table" >
                                                {project.post.idPost === project.post.page.idPage
                                                ?
                                                <FaLink color={project.post.published != null ? "#B4B4B4" : "#85ADFF"} size={"22"} className="m-auto" />
                                                :
                                                <AiFillPicture color={project.post.published != null ? "#B4B4B4" : "#85ADFF"} size={"22"} className="m-auto" />
                                                }
                                            </div>
                                        </Col>    

                                        <Col lg={2} className="d-flex">
                                            <div className={checkStatusClass(project.trained,project.live)}  onClick={() => activateAgentNow(project,indexProject)} style={{margin: 'auto'}} >
                                                {
                                                project.trained && project.live 
                                                ? 
                                                <p className="m-auto">Active</p> 
                                                : 
                                                project.trained && !project.live
                                                ? 
                                                <p className="m-auto">Not Active</p>
                                                :
                                                <p className="m-auto">Draft</p>
                                                }
                                            </div>
                                        </Col>   

                                        <Col lg={1} className="d-flex">
                                            <Image src={EDIT_ICON}  data-for='editIcon' data-tip={"Update agent"} className={"my-auto ml-auto my-agents-icon"}  style={{ height: '19px', width: '19px'}} onClick={() => goToWizardConfig(project,socialMediaPageSelected,history)} />
                                            <Image src={MSG_ICON}   data-for='commentsIcon' data-tip={project.logs === 1 ? trans[lang].myAgents.checkComments : trans[lang].myAgents.noLogs} className={"mx-2 my-auto my-agents-icon"} style={{ height: '19px', width: '19px'}} onClick={() => project.logs === 1 && setAgentsSelectedProject(project,history) } />
                                            <Image src={TRASH_ICON} data-for='deleteIcon' data-tip={"Delete agent"} className={"my-auto mr-auto my-agents-icon"}  style={{ height: '19px', width: '19px'}}  onClick={() => {setProjectToDelete(project); setDeleteProjectModal(true); }} />
                                            
                                            <ReactTooltip id='editIcon'     className='my-agent-icons-hover-text' textColor='#fff' backgroundColor='#B4B4B4' />
                                            <ReactTooltip id='commentsIcon' className='my-agent-icons-hover-text' textColor='#fff' backgroundColor='#B4B4B4' />
                                            <ReactTooltip id='deleteIcon'   className='my-agent-icons-hover-text' textColor='#fff' backgroundColor='#B4B4B4' />
                                        </Col>    
                                    </Row>  
                                )}
                            </Col>
                        </Row>
                    </Col>

                </Row>
            </Col>
        </Row>
        </>
        :
        <>
        <Col lg={12} className="d-flex" style={{backgroundColor: '#F9F9F9' }}>
            <Lottie options={notFoundOptions} width={200} className="m-auto" /*height={400}*/ />
        </Col>

        <Col lg={12} className="d-flex mt-5" style={{backgroundColor: '#F9F9F9' }}>
            <p className="m-auto home-big-title">{trans[lang].myAgents.noAgents}</p>
        </Col>
        </>
        }

    </div>
    );
};

const mapStateToProps = (state) => {
    return {
        lang : state.socialMediaR.lang,
        fbData : state.socialMediaR.fbData,
        instaData : state.socialMediaR.instaData,
        allSocialPages : state.socialMediaR.allSocialPages,
        socialMediaPageSelected : state.socialMediaR.socialMediaPageSelected,
        agentsProjects: state.agentsR.agentsProjects,
        agentsSelectedProject: state.agentsR.agentsSelectedProject,
    }
};

export default connect(mapStateToProps, { resetSocialMediaSelections, sycroPageWithWizard, getProjectByPage, goToWizardConfig, resetَAllWizard, deleteProjectByPage, setAgentsSelectedProject, resetLogs  })(MyAgents);


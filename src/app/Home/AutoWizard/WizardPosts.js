import React, { useEffect } from 'react'

import { connect } from 'react-redux';
import { nextWizardStep, getWizardPagesPosts, getWizardActivePosts, setWizardSelectedPost,prevWizardStep, addProject, resetWizardPageSelected } from '../../../redux/actions/wizardActions';

import {
    Row,
    Col,
    Image,
} from 'react-bootstrap';

import Lottie from 'react-lottie';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import ReactTooltip from 'react-tooltip';

// Translations
import { trans } from '../../../Translations';

import animationData from '../../../assets/json/loading.json';
import {ReactComponent as IconAwesomeSort} from '../../../assets/images/home/Icon-awesome-sort.svg';

function WizardPosts(props) {

    let { lang } = props;
    
    const defaultOptions = {
        loop: true,
        autoplay: true, 
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        props.getWizardPagesPosts(props.wizardSelectedPage);
        props.getWizardActivePosts(props.wizardSelectedPage);
    }, []);

    const isPostActive = (idPost,wizardActivePosts) => {
        if(wizardActivePosts) {
            let found = wizardActivePosts.find(activePost => activePost.post.idPost === idPost);
            
            if(found) {

                if(found.intents.length === 0) {
                    return false;
                } else if(found.trained && found.live) {
                    return trans[lang].wizardPosts.active
                } else if (found.trained && !found.live) {
                    return trans[lang].wizardPosts.notActive
                } else {
                    return trans[lang].wizardPosts.draft
                }
            }
            else { 
               return false;
            }
        } else return false;

    };

    const checkNextStep = () => {
        if(props.wizardSelectedPost === null) {
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                  confirmButton: 'wizard-pages-active-btn-alert',
                },
                buttonsStyling: false
            });
            swalWithBootstrapButtons.fire({
                title: trans[lang].wizardPosts.selectPostError,
                confirmButtonText: trans[lang].wizardPosts.retry,
            });
        }
    };

    const nextMove = (post) => {
        props.setWizardSelectedPost(post); 
        props.addProject(props.wizardSelectedPage,post)
        .then(() =>{
            props.nextWizardStep();
        });
    };

    const handleBackFromStep2To1 = () => {
        props.resetWizardPageSelected();
        props.prevWizardStep();
    };

    return (
    <Row className="d-flex mt-5">  
        <Col lg={1} />

        <Col lg={9} className="wizard-pages-container" style={{backgroundColor: 'white'}}>
            {/* Title */}
            <Row className="my-5 mx-4">
                <Col lg={12} className="d-flex">
                    <p className="my-auto wizard-pages-title">{trans[lang].wizardPosts.selectPost}</p>
                </Col>
                
                {/* POSTS LIST */}
                <Col lg={12} className="mt-5 mb-5">
                    <div>
                    {props.wizardPagePosts
                    ?
                    (
                    <Row>
                        <Col lg={12} style={{borderBottom: '1px solid #EBEDF0'}}>
                            <Row className="py-2" >
                                <Col lg={4} className="d-flex">
                                    <div className="my-auto wizard-pages-page-title-table" >{trans[lang].wizardPosts.post}</div>
                                </Col>    
                                
                                <Col lg={2} className="d-flex" >
                                    <div className="m-auto wizard-pages-page-title-table" >
                                        {trans[lang].wizardPosts.type}<IconAwesomeSort className={"ml-1"}  width="10" height="10" />
                                    </div>
                                </Col>    

                                <Col lg={3} className="d-flex" >
                                    <div className="m-auto wizard-pages-page-title-table" >
                                        {trans[lang].wizardPosts.published}<IconAwesomeSort className={"ml-1"}  width="10" height="10" />
                                    </div>
                                </Col>    

                                <Col lg={3} className="d-flex" >
                                    <div className="m-auto wizard-pages-page-title-table" >
                                        {trans[lang].wizardPosts.agentStatus}<IconAwesomeSort className={"ml-1"}  width="10" height="10" />
                                    </div>
                                </Col>    
                            </Row>
                        </Col>
                        
                        <Col lg={12}>
                        {props.wizardPagePosts.map( (post,index) => {
                            let createdTime = new Date(Date.parse(post.created_time));
                            let publishedDate = `${createdTime.getDate()}/${createdTime.getMonth()+ 1}/${createdTime.getFullYear()}`;
                            let checkedMinutes = createdTime.getMinutes() < 10 ? "0" + createdTime.getMinutes() : createdTime.getMinutes();
                            let publishedTime = `${createdTime.getHours()}:${checkedMinutes}`
                        
                            return (
                                <Row 
                                    className="py-2" 
                                    key={index}  
                                    onClick={() => props.wizardActivePosts && isPostActive(post.id,props.wizardActivePosts) ? null : nextMove(post) } 
                                    style={{ cursor: 'pointer', borderBottom: '1px solid #EBEDF0' }}
                                    data-for={props.wizardActivePosts && isPostActive(post.id,props.wizardActivePosts) ? "postTip" : "noIID"} 
                                    data-tip={trans[lang].wizardPosts.accessPost}
                                >

                                    <ReactTooltip id={"postTip"} textColor='#fff' backgroundColor='#E5007D' />

                                    <Col lg={4} className="d-flex ">
                                        {
                                        post.picture
                                        ?
                                        <Image src={post.picture} className="my-auto" style={{maxWidth: '38px'}} />
                                        :
                                        <Image src={props.wizardSelectedPage.picture_url} className="my-auto" style={{maxWidth: '38px'}} />
                                        }
                                        <p className="my-auto ml-2 wizard-pages-page-title" style={{ color: props.wizardActivePosts && isPostActive(post.id,props.wizardActivePosts) ? '#818E94' : '#3B5998',  }}>
                                            {post.message && post.message.length > 40
                                            ?
                                            post.message.substring(0,10) + "..."
                                            :                                                        
                                            post.message
                                            ?
                                            post.message
                                            :
                                            props.wizardSelectedPage.name
                                            }
                                        </p>
                                    </Col>

                                    <Col lg={2} className="d-flex">
                                        <p className="m-auto wizard-posts-status-text">{post.type}</p>
                                    </Col>

                                    <Col lg={3} className="d-flex">
                                        <div className="flex-column m-auto">
                                            <p className="m-auto wizard-pages-page-date">{publishedDate}</p>
                                            <p  className="m-auto wizard-pages-page-time">{publishedTime}</p>
                                        </div>
                                    </Col>

                                    <Col lg={3} className="d-flex" >
                                        {props.wizardActivePosts && isPostActive(post.id,props.wizardActivePosts) 
                                        ? 
                                        <p className="m-auto wizard-posts-status-text" style={{color: '#E5137D'}}>{isPostActive(post.id,props.wizardActivePosts)}</p>
                                        : 
                                        <p className="m-auto wizard-posts-status-text">{trans[lang].wizardPosts.noAgent}</p>   
                                        }
                                    </Col>
                                </Row>
                            )})
                        }
                        </Col>
                    </Row>
                    )
                    : 
                    (
                    <Row className="d-flex">
                        <div className="m-auto">
                            <Lottie options={defaultOptions} width={200} />
                        </div>
                    </Row>
                    )
                    }
                </div>
                </Col>
            </Row>

            {/* BTNS */}
            <Col lg={12}>
                <Row className="mb-3">
                    <Col lg={6}>
                        <Row className="d-flex">
                            <div className="wizard-pages-inactive-btn d-flex py-2 px-4 ml-3 mr-auto my-auto" onClick={handleBackFromStep2To1}>
                                {trans[lang].wizardPosts.back}
                            </div>
                        </Row>
                    </Col>

                    <Col lg={6}>
                        <Row className="d-flex">
                            <div className={"wizard-pages-inactive-btn ml-auto py-2 px-4 mr-3"}>{trans[lang].wizardPosts.saveDraft}</div>
                            
                            <div className={"wizard-pages-active-btn py-2 px-4 mr-3"} onClick={() => checkNextStep()}>
                                {trans[lang].wizardPosts.next}
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

const mapStateToProps = (state) => {
    return {
        lang: state.socialMediaR.lang,
        wizardStep: state.wizardR.wizardStep,
        wizardSelectedPage: state.wizardR.wizardSelectedPage,
        wizardSelectedPost: state.wizardR.wizardSelectedPost,
        wizardPagePosts: state.wizardR.wizardPagePosts,
        wizardActivePosts: state.wizardR.wizardActivePosts,
    }
};

export default connect(mapStateToProps, { nextWizardStep, getWizardPagesPosts, getWizardActivePosts, setWizardSelectedPost, prevWizardStep, addProject, resetWizardPageSelected  })(WizardPosts)

import React, { useEffect, useState, useRef } from 'react';
import '../Home.css';
import {
    Row,
    Col,
    Dropdown,
    Modal,
} from 'react-bootstrap';
import Slider from "react-slick";
import disableScroll from 'disable-scroll';
import Lottie from 'react-lottie';

import { connect } from 'react-redux';
import { selectSocialMediaPage, getAllPageConnected, getAllPage, getFbData, getInstaData,resetFilterPages, sendPublicReply} from '../../../redux/actions/socialMediaActions';
import PageCard from './PageCard';

import { useLocation, useHistory } from 'react-router-dom'; 

import animationData from '../../../assets/json/loading.json';
import { IoIosArrowDown, IoIosClose } from 'react-icons/io';

import {ReactComponent as Preferences} from '../../../assets/images/home/preferences.svg';

// Translations
import { trans } from '../../../Translations';

function Pages(props) {

    let {
        lang,
        allSocialPages,

        // Functions:
        resetFilterPages,
        getAllPage,
        getAllPageConnected,
        sendPublicReply,
    } = props;

    const history = useHistory();

    const [loadingPages, setLoadingPages] = useState(true);
    const [allSocialPagesFiltered, setAllSocialPagesFiltered] = useState([]);
    const [filterValue, setFilterValue] = useState('all');
    const [filterRole, setFilterRole] = useState('all');
    const [resetCarousel, setResetCarousel] = useState(0);
    const [publicReplyModal, setPublicReplyModal] = useState(false);
    const [publicReplyMsg, setPublicReplyMsg] = useState("");
    const [publicReplyPage, setPublicReplyPage] = useState({});
    const sliderRef = useRef(null);

    const defaultOptions = {
        loop: true,
        autoplay: true, 
        swipe: false,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
    };

    const settings = {
        dots: true,
        infinite: false,
        speed: 700,
        slidesToShow: 4.3,
        slidesToScroll: 4,
        initialSlide: 0,
        slickGoTo: resetCarousel,
        appendDots: dots => (
            <div style={{ padding: 0}}>
              <ul style={{ margin: "0px" }}> {dots} </ul>
            </div>
        ),
        customPaging: i => (
            <div style={{ width: "5px", height: "5px", background: "#E5007D", border: 0, borderRadius: "50%" }} />
        ),
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              initialSlide: 1
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
    };

    const location = useLocation();

    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
        <a  className="pages-filter-box d-flex py-1 px-1" ref={ref} onClick={(e) => {e.preventDefault(); onClick(e);}} href="" style={{ textDecoration: 'none'}}>
            {/* <RiListSettingsFill className={"my-auto mr-2"} color={"#B4B4B4"} size={'20'} />  */}
            <Preferences className={"my-auto mr-2 ml-2"} color={"#B4B4B4"}  width="15" height="15" />
            {filterValue !== "all"
            ?
            <p className={"my-auto mr-2 w-100"}>{filterValue}</p>
            :
            <p className={"my-auto mr-2 w-100"}>{trans[lang].pages.filterPages}</p>
            }
            <span className={"m-auto"}>
                <IoIosArrowDown className={"my-auto ml-3"} color={"#B4B4B4"} size={'17'} /> 
            </span>
        </a>
    ));
    
    const CustomToggleRole = React.forwardRef(({ children, onClick }, ref) => (
        <a  className="pages-filter-box d-flex py-1 px-1" ref={ref} onClick={(e) => {e.preventDefault(); onClick(e);}} href="" style={{ textDecoration: 'none'}}>
            {/* <RiListSettingsFill className={"my-auto mr-2"} color={"#B4B4B4"} size={'20'} />  */}
            <Preferences className={"my-auto mr-2 ml-2"} color={"#B4B4B4"}  width="15" height="15" />
            {filterRole !== "all"
            ?
            <p className={"my-auto mr-2 w-100"}>{filterRole}</p>
            : 
            <p className={"my-auto mr-2 w-100"}>{trans[lang].pages.filterRoles}</p>
            }
            <span className={"m-auto"}>
                <IoIosArrowDown className={"my-auto ml-3"} color={"#B4B4B4"} size={'17'} /> 
            </span>
        </a>
    ));

    const CustomPagesMenu = React.forwardRef(
        ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
        
          return (
            <div
              ref={ref}
              style={style}
              className={className}
              aria-labelledby={labeledBy}
              style={{ width: '-webkit-fill-available' }}
            >
                <Col lg={12} className="d-flex filter-item p-1" onClick={() => { setFilterValue('all'); filterPages('all',allSocialPages); setResetCarousel(0); }}>
                    <p className="ml-2 mr-auto my-auto">{trans[lang].pages.filterPagesElements[0]}</p>
                </Col>

                <Col lg={12} className="d-flex filter-item p-1" onClick={() => { setFilterValue('Facebook'); filterPages('facebook',allSocialPages); setResetCarousel(0); }}>
                    <p className="ml-2 mr-auto my-auto">{trans[lang].pages.filterPagesElements[1]}</p>
                </Col>

                <Col lg={12} className="d-flex filter-item p-1" onClick={() => { setFilterValue('Instagram'); filterPages('instagram',allSocialPages); setResetCarousel(0); }}>
                    <p className="ml-2 mr-auto my-auto">{trans[lang].pages.filterPagesElements[2]}</p>
                </Col>
            </div>
          );
        },
      );
    
    const CustomRoleMenu = React.forwardRef(
        ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
        
          return (
            <div
              ref={ref}
              style={style}
              className={className}
              aria-labelledby={labeledBy}
              style={{ width: '-webkit-fill-available' }}
            >
                <Col lg={12} className="d-flex filter-item p-1" onClick={() => { setFilterRole('all'); filterRoles('all',allSocialPages); setResetCarousel(0); }}>
                    <p className="ml-2 mr-auto my-auto">{trans[lang].pages.filterRolesElements[0]}</p>
                </Col>

                <Col lg={12} className="d-flex filter-item p-1" onClick={() => { setFilterRole('owner'); filterRoles('owner',allSocialPages); setResetCarousel(0); }}>
                    <p className="ml-2 mr-auto my-auto">{trans[lang].pages.filterRolesElements[1]}</p>
                </Col>

                <Col lg={12} className="d-flex filter-item p-1" onClick={() => { setFilterRole('invited'); filterRoles('invited',allSocialPages); setResetCarousel(0); }}>
                    <p className="ml-2 mr-auto my-auto">{trans[lang].pages.filterRolesElements[2]}</p>
                </Col>
            </div>
          );
        },
      );

    const filterPages = (filterBy,Pages) => {
        setLoadingPages(true);
        setFilterRole('all');
        
        if(filterBy === "all") {
            setAllSocialPagesFiltered([]);
            setTimeout(() => {
                setLoadingPages(false);
            },1500);
        } else {
            let filteredPages = Pages.filter((page) => page.platform === filterBy);
            setAllSocialPagesFiltered(filteredPages);
            setTimeout(() => {
                setLoadingPages(false);
            },1500);
        };
    };

    const filterRoles = (filterBy,Pages) => {
        /*
            ALL STATUS :
            "listPageConnectedOwner" => #E5007D" || "listPageInvite" => #139216" 
            "listPageInviteAdmin" => "#199EE3"  || "listPageConnectedOtherTeam" => #B4B4B4"
            "listPageNotConnected" => "No Color"
        */
        setLoadingPages(true);
        setFilterValue('all');
        let filtredPages = [];
        
        if(filterBy === "all") {
            setAllSocialPagesFiltered([]);
            setTimeout(() => {
                setLoadingPages(false);
            },1500);
        } else {
            if(filterBy === "owner") {
                filtredPages = Pages.filter(page => page.status === "listPageConnectedOwner");
            } else {
                filtredPages = Pages.filter(page => page.status !== "listPageConnectedOwner" && page.status !== "listPageConnectedOtherTeam")
                                    .sort((page) => page.status === "listPageInviteAdmin" && -1)
                                    .sort((page) => page.status === "listPageInvite" && -1);
            }
            // console.log("zid thabet =>>>>>>>>>>>>>>>>>>>>>>>>>>>>", filtredPages);
            setAllSocialPagesFiltered(filtredPages);
            setTimeout(() => {
                setLoadingPages(false);
            },1500);
        };
    };
    
    const mouseWheelScroll = (e) => {
        if(e.deltaY > 0) {
            sliderRef.current.slickPrev()
        } else {
            sliderRef.current.slickNext()
        }
    };

    const renderPublicReplyModal = () => (
        <Modal show={publicReplyModal} onHide={() => { setPublicReplyModal(false); setPublicReplyMsg(""); }} size={"md"} centered key={props.idPage * 9 * Math.random()}>
            <div className="d-flex flex-column">
                <IoIosClose className="ml-auto mr-3 mt-2" color={'#9F9F9F'} size={'28'} onClick={() => { setPublicReplyModal(false); setPublicReplyMsg(""); }} style={{cursor: 'pointer'}} />
               
                <p className="wizard-popup-question m-auto">{trans[lang].pageCard.publicReplyModalTitle}</p>
                <textarea key={props.indexOfPage + Math.random()} className="mx-5 my-3 p-1" rows="6" style={{ borderRadius: '5px', border: '1px solid #818E94' }} onChange={(e) => setPublicReplyMsg(e.target.value) }>{publicReplyMsg}</textarea>
                <div 
                    style={{ cursor: 'pointer' }} 
                    className="page-card-anti-spam-save-btn mx-auto my-2 px-3 py-2" 
                    onClick={() => sendPublicReply(history,publicReplyPage,publicReplyMsg,true).then(() => { setPublicReplyModal(false); setPublicReplyMsg(""); getAllPage(); })}
                >
                {trans[lang].pageCard.publicReplyModalBtn}
                </div>
            </div>
        </Modal>
    );

    
    useEffect(() => { 
        if(location.pathname === "/home/dashboard") {
            resetFilterPages();
            getAllPage();
        } else {
            resetFilterPages();
            getAllPageConnected();
        }
    },[]);

    useEffect(() => {
        if(allSocialPages.length > 0) {
            setLoadingPages(false);
        } else {
            setLoadingPages(true);
        }
        return () => {
            // removing the listener when props.x changes
        }
    },[allSocialPages]);

    return (
    <>
        <Row>
             {/* Render public reply Modal */}
             {publicReplyModal && renderPublicReplyModal()}
   
            <Col lg={6} className="d-flex p-0">
                {
                props.title 
                ?
                <p className="mr-auto my-auto sous-text-selectPage">{props.title}</p>  
                :
                <p className="mr-auto my-auto home-big-title">{trans[lang].pages.pagesConnected}</p>
                }
            </Col>
            {allSocialPages.length > 0 
            &&
            <Col lg={5} xs={12} className="d-flex p-0">
                <Row className="justify-content-center m-auto w-xs-100" >
                    <Col xs={6} lg={6} className="d-flex p-0">
                        <div className="m-auto w-100">
                            <Dropdown className="w-100">
                                <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components"/>
                                <Dropdown.Menu as={CustomPagesMenu} />
                            </Dropdown>
                        </div>
                    </Col>
                    
                    <Col xs={6} lg={6} className="d-flex p-0">
                        <div className="m-auto w-100">
                            <Dropdown className="w-100">
                                <Dropdown.Toggle as={CustomToggleRole} id="dropdown-custom-components"/>
                                <Dropdown.Menu as={CustomRoleMenu} />
                            </Dropdown>
                        </div>
                    </Col>
                </Row>
            </Col>
            }
            <Col lg={1} />
        </Row>

        <div>
        {
        !loadingPages
        ?
        (
        <Row>   
        {allSocialPagesFiltered.length > 4 
        ?
        <Col lg={11} className="p-0" style={{height: '300px',marginTop:'13px',marginBottom:'50px' }} onWheel = {(e) => mouseWheelScroll(e)} onMouseEnter={() => disableScroll.on()} onMouseLeave={() => disableScroll.off()} >
            <Slider {...settings} ref={sliderRef}>
            {allSocialPagesFiltered.map((page,indexOfPage) => 
                page.platform === "facebook" 
                ? 
                <div key={page.idPage} className="p-3 mt-4">
                    <PageCard 
                        platform={"fb"} indexOfPage={indexOfPage} isConnectedPage={page.isConnected} namePage={page.name} idPage={page.idPage} picture={null} accessToken={page.access_token} status={page.status} team={page.user} admins={page.admins} 
                        setLoadingPages={setLoadingPages} spam={page.spam} likesComment={page.likesComment} public_reply={page.public_reply} delay={page.respReplies.statut} respReplies={page.respReplies} page={page} selectPage={props.selectSocialMediaPage}
                        setPublicReplyModal={setPublicReplyModal} setPublicReplyMsg={setPublicReplyMsg} setPublicReplyPage={setPublicReplyPage}                    
                    />
                </div>
                :
                <div key={page.idPage} className="p-3 mt-4">
                    <PageCard 
                        platform={"insta"} indexOfPage={indexOfPage} isConnectedPage={page.isConnected} namePage={page.name} idPage={page.idPage} picture={page.imageUrl} accessToken={page.access_token} status={page.status} team={page.user} admins={page.admins} 
                        setLoadingPages={setLoadingPages} spam={page.spam} likesComment={page.likesComment} public_reply={page.public_reply} delay={page.respReplies.statut} respReplies={page.respReplies} page={page} selectPage={props.selectSocialMediaPage}
                        setPublicReplyModal={setPublicReplyModal} setPublicReplyMsg={setPublicReplyMsg} setPublicReplyPage={setPublicReplyPage} 
                    />
                </div>
            )}      
            </Slider>
        </Col>
        :
        allSocialPagesFiltered.length > 0 && allSocialPagesFiltered.length < 5
        ?
        <Col lg={11} className="d-flex p-0" style={{height: '300px',marginTop:'13px',marginBottom:'50px' }}>
            {allSocialPagesFiltered.map((page,indexOfPage) => 
                page.platform === "facebook" 
                ? 
                <div  key={page.idPage} className="p-3 mt-4">
                    <PageCard 
                        platform={"fb"} indexOfPage={indexOfPage} isConnectedPage={page.isConnected} namePage={page.name} idPage={page.idPage} picture={null} accessToken={page.access_token} status={page.status} team={page.user} admins={page.admins} 
                        setLoadingPages={setLoadingPages} spam={page.spam} likesComment={page.likesComment} public_reply={page.public_reply} delay={page.respReplies.statut} respReplies={page.respReplies} page={page} selectPage={props.selectSocialMediaPage}
                        setPublicReplyModal={setPublicReplyModal} setPublicReplyMsg={setPublicReplyMsg} setPublicReplyPage={setPublicReplyPage} 
                    />
                </div>
                :
                <div key={page.idPage} className="p-3 mt-4">
                    <PageCard 
                        platform={"insta"} indexOfPage={indexOfPage} isConnectedPage={page.isConnected} namePage={page.name} idPage={page.idPage} picture={page.imageUrl} accessToken={page.access_token} status={page.status} team={page.user} admins={page.admins} 
                        setLoadingPages={setLoadingPages} spam={page.spam} likesComment={page.likesComment} public_reply={page.public_reply} delay={page.respReplies.statut} respReplies={page.respReplies} page={page} selectPage={props.selectSocialMediaPage}
                        setPublicReplyModal={setPublicReplyModal} setPublicReplyMsg={setPublicReplyMsg} setPublicReplyPage={setPublicReplyPage} 
                    />
                </div>
            )}
        </Col> 
        :
        allSocialPages.length > 4
        ?
        <Col lg={11} className="p-0" style={{height: '300px',marginTop:'13px',marginBottom:'50px'}}  onWheel = {(e) => mouseWheelScroll(e)} onMouseEnter={() => disableScroll.on()} onMouseLeave={() => disableScroll.off() }>
            <Slider {...settings} ref={sliderRef}>
            {allSocialPages.map((page,indexOfPage) => 
                page.platform === "facebook" 
                ? 
                <div key={page.idPage} className="p-3 mt-4">
                    <PageCard 
                        platform={"fb"} indexOfPage={indexOfPage} isConnectedPage={page.isConnected} namePage={page.name} idPage={page.idPage} picture={null} accessToken={page.access_token} status={page.status} team={page.user} admins={page.admins} 
                        setLoadingPages={setLoadingPages} spam={page.spam} likesComment={page.likesComment} public_reply={page.public_reply} delay={page.respReplies.statut} respReplies={page.respReplies} page={page} selectPage={props.selectSocialMediaPage}
                        setPublicReplyModal={setPublicReplyModal} setPublicReplyMsg={setPublicReplyMsg} setPublicReplyPage={setPublicReplyPage} 
                    />
                </div>
                :
                <div key={page.idPage} className="p-3 mt-4">
                    <PageCard 
                        platform={"insta"} indexOfPage={indexOfPage} isConnectedPage={page.isConnected} namePage={page.name} idPage={page.idPage} picture={page.imageUrl} accessToken={page.access_token} status={page.status} team={page.user} admins={page.admins} 
                        setLoadingPages={setLoadingPages} spam={page.spam} likesComment={page.likesComment} public_reply={page.public_reply} delay={page.respReplies.statut} respReplies={page.respReplies} page={page} selectPage={props.selectSocialMediaPage}
                        setPublicReplyModal={setPublicReplyModal} setPublicReplyMsg={setPublicReplyMsg} setPublicReplyPage={setPublicReplyPage} 
                    />
                </div>
            )}      
            </Slider>
        </Col>
        :
        <Col lg={11} className="d-flex p-0" style={{height: '300px',marginTop:'13px',marginBottom:'50px' }}>
            {allSocialPages.map((page,indexOfPage) => 
                page.platform === "facebook" 
                ? 
                <div key={page.idPage} className="p-3 mt-4">
                    <PageCard 
                        platform={"fb"} indexOfPage={indexOfPage} isConnectedPage={page.isConnected} namePage={page.name} idPage={page.idPage} picture={null} accessToken={page.access_token} status={page.status} team={page.user} admins={page.admins} 
                        setLoadingPages={setLoadingPages} spam={page.spam} likesComment={page.likesComment} public_reply={page.public_reply} delay={page.respReplies.statut} respReplies={page.respReplies} page={page} selectPage={props.selectSocialMediaPage}
                        setPublicReplyModal={setPublicReplyModal} setPublicReplyMsg={setPublicReplyMsg} setPublicReplyPage={setPublicReplyPage} 
                    />
                </div>
                :
                <div key={page.idPage} className="p-3 mt-4">
                    <PageCard 
                        platform={"insta"} indexOfPage={indexOfPage} isConnectedPage={page.isConnected} namePage={page.name} idPage={page.idPage} picture={page.imageUrl} accessToken={page.access_token} status={page.status} team={page.user} admins={page.admins} 
                        setLoadingPages={setLoadingPages} spam={page.spam} likesComment={page.likesComment} public_reply={page.public_reply} delay={page.respReplies.statut} respReplies={page.respReplies} page={page} selectPage={props.selectSocialMediaPage}
                        setPublicReplyModal={setPublicReplyModal} setPublicReplyMsg={setPublicReplyMsg} setPublicReplyPage={setPublicReplyPage} 
                    />
                </div>
            )}
        </Col> 
        }
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
    </>
    );
}

const mapStateToProps = (state) => {
    return {
        lang : state.socialMediaR.lang,
        socialMediaPageSelected : state.socialMediaR.socialMediaPageSelected,
        allSocialPages : state.socialMediaR.allSocialPages,
        fbData : state.socialMediaR.fbData,
        instaData : state.socialMediaR.instaData,
    }
};

export default connect(mapStateToProps, {selectSocialMediaPage,getFbData,getInstaData,getAllPageConnected,getAllPage, resetFilterPages, sendPublicReply})(Pages);
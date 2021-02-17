import React, { useEffect, useState } from 'react'
import '../Home.css';
import {
    Row,
    Col,
    Dropdown
} from 'react-bootstrap';
// import OwlCarousel from 'react-owl-carousel';
import Slider from "react-slick";
import Lottie from 'react-lottie';

import { connect } from 'react-redux';
import { selectSocialMediaPage, getAllPageConnected, getAllPage, getFbData, getInstaData } from '../../../redux/actions/socialMediaActions';
import NewPageCard from './NewPageCard';

import { useLocation } from 'react-router-dom'; 

import animationData from '../../../assets/json/loading.json';
import { IoIosArrowDown } from 'react-icons/io';
import {ReactComponent as Preferences} from '../../../assets/images/home/preferences.svg';


function NewPages(props) {

    let {
        allSocialPages,

        getAllPage,
        getAllPageConnected,
    } = props;
    
    const [loadingPages, setLoadingPages] = useState(true);
    const [showFacebook, setShowFacebook] = useState(true);
    const [showInstagram, setShowInstagram] = useState(true);
    const [resetCarousel, setResetCarousel] = useState(0);
    const [carouselToShow, setCarouselToShow] = useState(4.3);
    const [carouselToScroll, setCarouselToScroll] = useState(2);
    // const [allPages, setAllPages] = useState([]);

    const defaultOptions = {
        loop: true,
        autoplay: true, 
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
    };

    const settings = {
        dots: true,
        infinite: false,
        speed: 400,
        slidesToShow: 4.3,
        slidesToScroll: 3,
        initialSlide: 0,
        slickGoTo: resetCarousel,
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
            <Preferences className={"my-auto mr-2 ml-2"} color={"#B4B4B4"}  width="17" height="17" />
            <p className={"my-auto mr-2"}>Filter by page</p>
            <span className={"m-auto"}>
                <IoIosArrowDown className={"my-auto ml-3"} color={"#B4B4B4"} size={'20'} /> 
            </span>
        </a>
    ));
    
    const CustomToggleRole = React.forwardRef(({ children, onClick }, ref) => (
        <a  className="pages-filter-box d-flex py-1 px-1" ref={ref} onClick={(e) => {e.preventDefault(); onClick(e);}} href="" style={{ textDecoration: 'none'}}>
            {/* <RiListSettingsFill className={"my-auto mr-2"} color={"#B4B4B4"} size={'20'} />  */}
            <Preferences className={"my-auto mr-2 ml-2"} color={"#B4B4B4"}  width="17" height="17" />
            <p className={"my-auto mr-2"}>Filter by role</p>
            <span className={"m-auto"}>
                <IoIosArrowDown className={"my-auto ml-3"} color={"#B4B4B4"} size={'20'} /> 
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
                <Col lg={12} className="d-flex filter-item p-1" onClick={() => { setShowFacebook(true); setShowInstagram(true); setResetCarousel(0)}}>
                    <p className="ml-2 mr-auto my-auto">All</p>
                </Col>

                <Col lg={12} className="d-flex filter-item p-1" onClick={() => { setShowFacebook(true); setShowInstagram(false); setResetCarousel(0) }}>
                    <p className="ml-2 mr-auto my-auto">Facebook</p>
                </Col>

                <Col lg={12} className="d-flex filter-item p-1" onClick={() => {  setShowInstagram(true); setShowFacebook(false); setResetCarousel(0)}}>
                    <p className="ml-2 mr-auto my-auto">Instagram</p>
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
                <Col lg={12} className="d-flex filter-item p-1">
                    <p className="ml-2 mr-auto my-auto">All</p>
                </Col>

                <Col lg={12} className="d-flex filter-item p-1">
                    <p className="ml-2 mr-auto my-auto">Owner</p>
                </Col>

                <Col lg={12} className="d-flex filter-item p-1">
                    <p className="ml-2 mr-auto my-auto">Invited</p>
                </Col>
            </div>
          );
        },
      );

    useEffect(() => {
        if(location.pathname === "/home/pages") {
          getAllPage();
        } else {
          getAllPageConnected();
        }
    },[]);


    useEffect(() => {
        if(allSocialPages.length > 0) {
            setLoadingPages(false);
        };
        return () => {
            // removing the listener when props.x changes
        }
    },[allSocialPages]);

    return (
      <>
       {
        !loadingPages
        ?
        (
        <Row>   
          {allSocialPages.length > 4
          ?
          <div style={{ width: '95%', height: '320px',marginTop:'13px' }}>
            <Slider {...settings}>
              {allSocialPages.map((page) => 
                  <NewPageCard 
                    isConnectedPage={page.isConnected} namePage={page.name} picture={page.platform === "facebook" ? null : page.imageUrl} platform={page.platform} idPage={page.idPage} accessToken={page.access_token} status={page.status} team={page.user} admins={page.admins} 
                    setLoadingPages={setLoadingPages} spam={page.spam} likesComment={page.likesComment} delay={page.respReplies.statut} respReplies={page.respReplies} page={page} selectPage={props.selectSocialMediaPage}
                  />
              )}      
            </Slider>
          </div>
          :
          <div style={{ display: 'flex', width: '95%', height: '320px',marginTop:'13px' }}>
              {allSocialPages.map((page) => 
                  <NewPageCard 
                    isConnectedPage={page.isConnected} namePage={page.name} picture={page.platform === "facebook" ? null : page.imageUrl} platform={page.platform} idPage={page.idPage} accessToken={page.access_token} status={page.status} team={page.user} admins={page.admins} 
                    setLoadingPages={setLoadingPages} spam={page.spam} likesComment={page.likesComment} delay={page.respReplies.statut} respReplies={page.respReplies} page={page} selectPage={props.selectSocialMediaPage}
                  />
              )}
          </div>
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
    </>
    );
}

const mapStateToProps = (state) => {
    return {
        // fbData : state.socialMediaR.fbData,
        // instaData : state.socialMediaR.instaData,
        allSocialPages : state.socialMediaR.allSocialPages,
    }
};

export default connect(mapStateToProps, { selectSocialMediaPage, getAllPageConnected ,getAllPage,  getFbData, getInstaData })(NewPages);

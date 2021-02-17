import React, { useEffect , useState} from 'react';
import Pages from '../Pages/Pages';

import moment from 'moment';
import Swal from 'sweetalert2/dist/sweetalert2.js';


import { connect } from 'react-redux';                       
import { getDashboard, getDashboardPosts, resetSocialMediaSelections, resetDashboard, filterDashboardIntents, filterDashboardPosts } from '../../../redux/actions/socialMediaActions';

import {
    Col,
    Row,
    Image,
    Dropdown,
} from 'react-bootstrap';

// Translations
import { trans } from '../../../Translations';

import { PieChart } from 'react-minimal-pie-chart';
import { FaInfoCircle } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io';

const default_img = require('../../../assets/images/home/no_posts.svg');

function Dashboard(props) {
    
    let {
        lang,
        socialMediaPageSelected,
        dashboardData,
        dashboardPosts,


        // FUNCTIONS
        getDashboard,
        getDashboardPosts,
        filterDashboardIntents,
        filterDashboardPosts,
        resetSocialMediaSelections,
        resetDashboard,
    } = props;

    // Popup Config: 
    const popup = Swal.mixin({
        customClass: {
        confirmButton: 'wizard-pages-active-btn px-3 py-2',
        },
        buttonsStyling: false
    });

    const [showPopover, setShowPopover] = useState(false);
    
    const [filterIntentsValue, setFilterIntentsValue] = useState(trans[lang].dashboard.filtresIntents[0].title);
    const [showFilters, setShowFilters] = useState(false);
    // const [intentsSearch, setIntentsSearch] = useState(false);
    // const [filtredIntents, setFiltredIntents] = useState([]);

    const [filterPostsValue, setFilterPostsValue] = useState(trans[lang].dashboard.filtresPosts[1].title);
    const [showPostsFilters, setShowPostsFilters] = useState(false);
    const [postsSearch, setPostsSearch] = useState(false);
    const [filtredPosts, setFiltredPosts] = useState([]);
    

    // Custom dropdowns:
    const intentsToggle = React.forwardRef(({ children, onClick }, ref) => (
        <a href="" ref={ref} onClick={(e) => { e.preventDefault(); onClick(e); setShowFilters(true) }} style={{ textDecoration: 'none' }}>{children}</a>
    ));

    const postsToggle = React.forwardRef(({ children, onClick }, ref) => (
        <a href="" ref={ref} onClick={(e) => { e.preventDefault(); onClick(e); setShowPostsFilters(true) }} style={{ textDecoration: 'none' }}>{children}</a>
    ));

    const IntentsMenu = React.forwardRef(
        ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
          return (
            showFilters && trans[lang].dashboard.filtresIntents
            &&
            <div
              ref={ref}
              className={className}
              aria-labelledby={labeledBy}
              style={{ width: '-webkit-fill-available'}}
            >
            {trans[lang].dashboard.filtresIntents.map((filter) => 
                filter.title !== filterIntentsValue
                &&
                <Col lg={12} className="d-flex filter-item p-1" onClick={() => { setFilterIntentsValue(filter.title); setShowFilters(false); filterIntents(filter.value) }}>
                    <p className="ml-2 mr-auto my-auto">{filter.title}</p>
                </Col>
            )}
            </div>
          );
        },
    );

    const postsMenu = React.forwardRef(
        ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
          return (
            showPostsFilters && trans[lang].dashboard.filtresPosts
            &&
            <div
              ref={ref}
              className={className}
              aria-labelledby={labeledBy}
              style={{ width: '-webkit-fill-available'}}
            >
            {trans[lang].dashboard.filtresPosts.map((filter) => 
                filter.title !== filterPostsValue
                &&
                <Col lg={12} className="d-flex filter-item p-1" onClick={() => { setFilterPostsValue(filter.title); setShowPostsFilters(false); filterPosts(filter.value) }}>
                    <p className="ml-2 mr-auto my-auto">{filter.title}</p>
                </Col>
            )}
            </div>
          );
        },
    );

    const kFormatter = (num) => {
        return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num)
    };

    const renderDate = (date) => {
        return moment(date).format('DD/MM/YY') + " " + moment(date).format('h:mm');
    };
    
    const renderPopover = () => (
        <div className="d-flex manage-products-popover" onMouseEnter={() => setShowPopover(true)} onMouseLeave={() => setShowPopover(false)}>
          <p className="m-auto">{trans[lang].dashboard.infoPopover}</p>
        </div>
    );
      
    const handlePopover = (delay) => {
        setTimeout( () => {
          setShowPopover(!showPopover);
        },delay)
    };

    const filterIntents = (filter) => {
        if(filter === "all") {
            filterDashboardIntents(socialMediaPageSelected,"all")
            .catch((err) => {
                console.log("Error Filtring dashboard intents ya nouur", err);
                popup.fire({
                    title: trans[lang].dashboard.filterErr,
                    confirmButtonText: trans[lang].dashboard.retry,
                });
            });
        } else if(filter === "last week") {
            filterDashboardIntents(socialMediaPageSelected,"week")
            .catch((err) => {
                console.log("Error Filtring dashboard intents ya nouur", err);
                popup.fire({
                    title: trans[lang].dashboard.filterErr,
                    confirmButtonText: trans[lang].dashboard.retry,
                });
            });
        } else {
            filterDashboardIntents(socialMediaPageSelected,"day")
            .catch((err) => {
                console.log("Error Filtring dashboard intents ya nouur", err);
                popup.fire({
                    title: trans[lang].dashboard.filterErr,
                    confirmButtonText: trans[lang].dashboard.retry,
                });
            });
        }
    };

    const filterPosts = (filter) => {
        let filtred = [];

        if(filter === "all") {
            // setPostsSearch(false);
            // setFiltredPosts([]);
            filterDashboardPosts(socialMediaPageSelected,"all")
            .catch((err) => {
                console.log("Error Filtring dashboard posts ya nouur", err);
                popup.fire({
                    title: trans[lang].dashboard.filterPostsErr,
                    confirmButtonText: trans[lang].dashboard.retry,
                });
            });
        } else if(filter === "most recent") {
            // setPostsSearch(true);
            // filtred = dashboardPosts.filter((post) => moment(post.post.created_time).isSame(new Date(), 'week'));
            // setFiltredPosts(filtred);
            filterDashboardPosts(socialMediaPageSelected,"week")
            .catch((err) => {
                console.log("Error Filtring dashboard posts ya nouur", err);
                popup.fire({
                    title: trans[lang].dashboard.filterPostsErr,
                    confirmButtonText: trans[lang].dashboard.retry,
                });
            });
        } else {
            // setPostsSearch(true);
            // filtred = dashboardPosts.filter((post) => moment(post.post.created_time).isSame(new Date(), 'month'));
            // setFiltredPosts(filtred);
            filterDashboardPosts(socialMediaPageSelected,"day")
            .catch((err) => {
                console.log("Error Filtring dashboard posts ya nouur", err);
                popup.fire({
                    title: trans[lang].dashboard.filterPostsErr,
                    confirmButtonText: trans[lang].dashboard.retry,
                });
            });
        }
    };
      
    useEffect(() => {
        resetDashboard();
    },[]);

    useEffect(() => {
        if(socialMediaPageSelected) {
            getDashboard(socialMediaPageSelected);
            getDashboardPosts(socialMediaPageSelected);
        }
        return () => {};
    }, [socialMediaPageSelected]);
    
    
    useEffect(() => {
        if(lang) {
            setFilterIntentsValue(trans[lang].dashboard.filtresIntents[0].title);
            setFilterPostsValue(trans[lang].dashboard.filtresPosts[1].title);
        }
        return () => {};
    }, [lang]);
   
    // useEffect(() => {
    //     // Reset !
    //     // setFilterIntentsValue(trans[lang].dashboard.filtresIntents[0].title);
    //     // setIntentsSearch(false);
    //     // setFiltredIntents([]);
    //     return () => { };
    // },[dashboardData]);
    
    // useEffect(() => {
    //     // Reset !
    //     setFilterPostsValue(trans[lang].dashboard.filtresPosts[1].title);
    //     setPostsSearch(false);
    //     setFiltredPosts([]);

    //     return () => { };
    // },[dashboardPosts]);
    
  
    return (
        <div style={{ marginTop: '135px' }}>
             <Row className="mt-5">
                <p className="home-big-title">{trans[lang].pages.pagesConnected}</p>
                <FaInfoCircle style={{transitionDuration: '300ms' }} color={!showPopover ? "#4080FF" : "#E5007D"} size={'15'} onMouseEnter={() => handlePopover('20')} onMouseLeave={() => handlePopover('700')} />
                {showPopover && renderPopover()}
            </Row>

            <Pages title={trans[lang].dashboard.title} />

            {socialMediaPageSelected 
            &&
            <>
            {/* WHEN DASHBOARD DATA === 0 Treat this */}
           
            <Row>
                <p className="mr-auto mb-3 sous-text-selectPage">{trans[lang].dashboard.smallTitle}</p>
            </Row>

            <Row>
                <Col lg={10} className="d-flex">
                    <p className="home-big-title mr-auto" style={{ fontSize: '20px', fontFamily: 'Poppins SemiBold' }}>{trans[lang].dashboard.mostRequested}</p>

                    <Dropdown className="ml-auto" style={{marginBottom: '22px'}}>
                        <Dropdown.Toggle as={intentsToggle} id="dropdown-custom-components">
                            <Row className="d-flex">
                                <p className="my-auto sous-text-selectPage">{trans[lang].dashboard.date}</p> 
                                <p className="my-auto sous-text-selectPage ml-2" style={{ color: "#BCBCBC" }}>{filterIntentsValue}</p> 
                                <IoIosArrowDown className={"my-auto ml-1"} color={"#4D4F5C"} size={'17'} />
                            </Row>
                        </Dropdown.Toggle>

                        <Dropdown.Menu as={IntentsMenu} />
                    </Dropdown>
                </Col>
            </Row>

            {dashboardData.length === 0
            ?
            <Row>
                <Col lg={10} className="d-flex mb-5">
                    <p className="home-big-title m-auto" style={{ fontSize: '17px', fontFamily: 'Poppins SemiBold' }}>{trans[lang].dashboard.NoResultMostRequested}</p>
                </Col>
            </Row>
            :
            <Row>
                <Col lg={11} className="p-4" style={{background: 'white'}}>
                    <Row>
                        <Col lg={8}>
                            <Row className="justify-content-between mx-2">
                                <p>{trans[lang].dashboard.intents}</p>
                                <p>{trans[lang].dashboard.total}</p>
                            </Row>

                            {/* LINE */}
                            {dashboardData.map((data,i) => 
                            data.hasOwnProperty('title') && data.hasOwnProperty("value") 
                            &&
                            <>
                            <Row key={i} className="justify-content-between mx-2">
                                <span className="intent-dashboard d-flex" style={{ background: data.color}}>
                                    {
                                    data.title.includes("Probablement")
                                    ?
                                    <p className="m-auto px-4">{trans[lang].dashboard.probably} {data.title.replace("Probablement ", "")}</p>
                                    :
                                    <p className="m-auto px-4">{data.title}</p>
                                    } 
                                </span>

                                <span className="d-flex">
                                    <p className="intent-dashboard-total m-auto">{data.value}</p>
                                </span>
                            </Row>
                            <hr className="intent-dashboard-separator" />
                            </>
                            )}
                        </Col>

                        <Col lg={4} className="d-flex">
                            <div className="m-auto" style={{height: '200px', width: '200px'}}>
                                <PieChart lineWidth={20} data={dashboardData} />
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
            }
           
           

            
            {dashboardPosts.length > 0 
            && 
            <>
            <Row className="mt-4 mb-3">
                <Col lg={10} className="d-flex">
                    <p className="home-big-title mr-auto" style={{ fontSize: '20px', fontFamily: 'Poppins SemiBold' }}>{trans[lang].dashboard.posts}</p>

                    <Dropdown className="ml-auto" style={{marginBottom: '22px'}}>
                        <Dropdown.Toggle as={postsToggle} id="dropdown-custom-components">
                            <Row className="d-flex">
                                <p className="my-auto sous-text-selectPage">{trans[lang].dashboard.date}</p> 
                                <p className="my-auto sous-text-selectPage ml-2" style={{ color: "#BCBCBC" }}>{filterPostsValue}</p> 
                                <IoIosArrowDown className={"my-auto ml-1"} color={"#4D4F5C"} size={'17'} />
                            </Row>
                        </Dropdown.Toggle>

                        <Dropdown.Menu as={postsMenu} />
                    </Dropdown>
                </Col>
            </Row>

            <Row>
                <Col lg={11}>
                    <Row>
                        {
                        dashboardPosts.length === 0
                        ?
                        <Col lg={12} className="d-flex">
                            <p className="home-big-title m-auto" style={{ fontSize: '17px', fontFamily: 'Poppins SemiBold' }}>{trans[lang].dashboard.noResultsPosts}</p>
                        </Col>
                        :
                        dashboardPosts.map(post =>
                            <Col xs={12} lg={4} className=" d-flex my-3 px-4 py-3" key={post.idPost}>
                                <Row className="d-flex dashboard-post-card">

                                    <Col lg={12} className="p-3 mb-auto">
                                        <Row>
                                            <Col lg={2} className="d-flex">
                                                <Image src={socialMediaPageSelected.picture_url} className="mb-auto ml-2" style={{height: '40px', width: '40px', borderRadius: '50%'}} />
                                            </Col>

                                            <Col lg={10}>
                                                <p className="mt-2 ml-1" >{socialMediaPageSelected.name}</p>
                                                <p className="dashboard-post-card-date ml-1" >{renderDate(post.post.created_time)}</p>
                                            </Col>
                                        </Row>
                                    </Col>

                                    <Col lg={12} className="d-flex m-auto p-0">
                                    {
                                    post.post.hasOwnProperty('full_picture')
                                    ?
                                    // POST IMAGE FB
                                    <div className="m-auto d-flex">
                                    {/* <div className="dashboard-post-card-full-image d-flex"> */}
                                        <Image src={post.post.full_picture} className="m-auto" style={{maxWidth: '100%', maxHeight: '200px'}} />
                                    </div>
                                    :
                                    post.post.hasOwnProperty('media_url')
                                    ?
                                    // POST IMAGE INSTA
                                    <div className="m-auto d-flex">
                                        <Image src={post.post.media_url} className="m-auto" style={{maxWidth: '100%', maxHeight: '200px'}} />
                                    </div>
                                    :
                                    <div className="m-auto d-flex">
                                        <Image src={default_img} className="m-auto" style={{maxWidth: '100%', maxHeight: '200px'}} />
                                    </div>
                                    }
                                    </Col>

                                    <Col lg={12} className="mt-auto py-2">
                                        <Row className="px-4 d-flex" >
                                            <div className="flex-column d-flex mr-auto">
                                                <p className="m-auto">{post.hasOwnProperty('comments') && kFormatter(post.comments)}</p>
                                                <span className="m-auto">{trans[lang].dashboard.comments}</span>
                                            </div>

                                            <div className="flex-column d-flex m-auto">
                                                <p className="m-auto">{post.hasOwnProperty('matched') && kFormatter(post.matched)}</p>
                                                <span className="m-auto">{trans[lang].dashboard.matched}</span>
                                            </div>

                                            <div className="flex-column d-flex ml-auto">
                                                <p className="m-auto">{post.hasOwnProperty('performance') && kFormatter(parseInt(post.performance).toFixed(0)) + "%"}</p>
                                                <span className="m-auto">{trans[lang].dashboard.performance}</span>
                                            </div>
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                        )}
                    </Row>
                </Col>
            </Row>
            </>
            }
            </>
            }
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        lang : state.socialMediaR.lang,
        socialMediaPageSelected : state.socialMediaR.socialMediaPageSelected,
        dashboardData : state.socialMediaR.dashboardData,
        dashboardPosts : state.socialMediaR.dashboardPosts,
    }
};

export default connect(mapStateToProps, { getDashboard, getDashboardPosts, resetSocialMediaSelections, resetDashboard, filterDashboardIntents, filterDashboardPosts })(Dashboard);


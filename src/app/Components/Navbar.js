import React, { useEffect, useState } from 'react'
import './Components.css';

import Facebook from '../Login/Facebook';

import {
    Row,
    Col,
    Nav,
    Image,
} from 'react-bootstrap';
import axios from 'axios';

import { connect } from 'react-redux';
import { setLang } from '../../redux/actions/socialMediaActions';

import {
    Redirect,
    withRouter,
    Link,
} from 'react-router-dom';

// Translations
import { trans } from '../../Translations';

import { host, Desktop, Tablet, Mobile } from '../../config';

import { IoIosArrowDown } from 'react-icons/io';
import { AiOutlineMenu, AiOutlineClose, AiFillHome } from 'react-icons/ai';
import {ReactComponent as LogoutSvg} from '../../assets/images/login/logout.svg';

const LOGO = require('../../assets/images/home/logo.svg');

function Navbar(props) {
    
    let {
        lang,
        location,
        
        setLang,
    } = props;

    const [userDataFromLogin, setUserDataFromLogin] = useState(null);
    const [redirect, setRedirect] = useState(false);
    const [redirectDocs, setRedirectDocs] = useState(false);
    const [redirectPricing, setRedirectPricing] = useState(false);
    const [mobileMenu, setMobileMenu] = useState(false);
   
    useEffect(() => {
        let userDataFromLocal = JSON.parse(localStorage.getItem('userData'));
        setUserDataFromLogin(userDataFromLocal);
    },[]);

    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
        <a href="" ref={ref} onClick={(e) => { e.preventDefault(); onClick(e); }} >
          <IoIosArrowDown color={"#818E94"} size={"17"} style={{ marginBottom: '50px!important' }} className="my-auto ml-2 navbar-arrow-icon" />
        </a>
    ));

    const Logout = async () => {
        
        setUserDataFromLogin(null);

        await axios.post(host + '/api/v1/auth/logout', null, {
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem('authtoken')
            }
        }).then(async (res) => {
            console.log("Rep logout", res.data);
            await localStorage.clear();
            setRedirect(true);
        })
        .catch(err => {
            console.log("Cannot logout", err);
        });

    };

    function myFunction() {
        document.getElementById("myDropdown").classList.toggle("show");
    };
    
    // Close the dropdown if the user clicks outside of it
    window.onclick = function(event) {
        if (!event.target.matches('.navbar-menu-title')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
            }
        }
        }
    };

    return (
        <>
        {/* For Redirection don't touch */}
        { redirect && <Redirect to={"/"} /> }
        { redirectDocs && <Redirect to={"/how-to-use-it"} /> }
        { redirectPricing && <Redirect to={"/pricing"} /> }
        
        <Desktop>
            <div style={{ display: 'flex',position: 'relative' }}>                 
                <div style={{ boxShadow: '0px 3px 6px #00000029',position: 'fixed',zIndex: '2',width: '100%'}}>  
                    {location.pathname === "/" 
                    &&
                    <Row className="justify-content-center free-trial p-3">
                        <Col lg={lang === "fr" ? 3 : 2} className="d-flex">
                            <div className="text-free-trial m-auto" >{trans[lang].navbar.freeTrial}</div>
                        </Col>
                        <Col lg={2} className="d-flex ">
                            <div className="mr-auto my-auto d-flex"> 
                                <Facebook type="signUp" content={trans[lang].navbar.signUp} />
                            </div>
                        </Col>
                    </Row>
                    }
                    <Nav activeKey="/home" onSelect={(e,selectedKey) => { selectedKey === "contact-link" && props.setShowContact(true) }}>
                        <Row className="justify-content-center m-auto w-100 navbar-menu-style py-2"> 
                            <Col lg={6}>
                                <Row>
                                    <Col className="d-flex p-2" lg={4}>
                                        <Link className="m-auto" to={location.pathname === "/how-to-use-it" || location.pathname === "/pricing" ? "/" : "#"}>
                                            <Image src={LOGO} className={"my-auto mr-auto"} style={{ maxWidth: '80px' }} />
                                        </Link>
                                    </Col>

                                    <Col lg={8}  className="d-flex">
                                        <Row className={"mt-auto"}>
                                            {
                                            props.menuItems.length > 0 
                                            && 
                                            props.menuItems.map(((menuItem,index) => 
                                                <Nav.Item key={index}>
                                                    <Nav.Link className="navbar-menu-title" href={menuItem.route === "what-is-modo" ? "#what-is-modo" : menuItem.route === "contact-link" && "#"} onClick={() => { menuItem.route === "contact-link" ? props.setShowContact(true) : menuItem.route === "how-to-use-it-home" ? setRedirectDocs(true) : menuItem.route === "pricing" &&  setRedirectPricing(true) }}>
                                                        {menuItem.title}
                                                    </Nav.Link>
                                                </Nav.Item>
                                            ))
                                            }
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>

                            <Col lg={6} className="d-flex">
                                {
                                location.pathname === "/how-to-use-it" || location.pathname === "/pricing"
                                ?
                                <>
                                <div className="ml-auto my-auto mr-5">
                                    <Row>
                                        <Col lg={12} className="d-flex">                
                                            <Row className="justify-content-center my-auto mx-1">
                                                <Col xs={6} style={{fontSize: "12px"}} className={lang === "fr" ? "my-agents-msgs-matched-btn px-3 py-1" : "my-agents-msgs-not-matched-btn px-3 py-1"} onClick={() => setLang("fr") }>
                                                    FR
                                                </Col>
                                                <Col xs={6} style={{fontSize: "12px"}} className={lang === "en" ? "my-agents-msgs-matched-btn px-3 py-1" : "my-agents-msgs-not-matched-btn px-3 py-1"} onClick={() => setLang("en") }>
                                                    EN
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </div>
                                <Link className="my-auto mr-5" to={location.pathname === "/how-to-use-it" || location.pathname === "/pricing" ? "/" : "#"}>
                                    <AiFillHome color="#E5007D" size="30" className="ml-auto my-auto mr-3" />
                                </Link>
                                </>
                                :
                                userDataFromLogin && !props.loginBtn
                                ?
                                <div className="ml-auto mt-auto mr-5 d-flex">
                                    <div className="dropdown">
                                        <div>
                                            <Row>
                                                <Col lg={5} className="d-flex">                
                                                    <Row className="justify-content-center my-auto mx-1">
                                                        <Col xs={6} style={{fontSize: "12px"}} className={lang === "fr" ? "my-agents-msgs-matched-btn px-3 py-1" : "my-agents-msgs-not-matched-btn px-3 py-1"} onClick={() => setLang("fr") }>
                                                            FR
                                                        </Col>
                                                        <Col xs={6} style={{fontSize: "12px"}} className={lang === "en" ? "my-agents-msgs-matched-btn px-3 py-1" : "my-agents-msgs-not-matched-btn px-3 py-1"} onClick={() => setLang("en") }>
                                                            EN
                                                        </Col>
                                                    </Row>
                                                </Col>

                                                <Col lg={7}>
                                                    <Row className="mx-1">
                                                        <Col xs={6} className="d-flex">
                                                            <Image src={userDataFromLogin['user'].profilePictureUrl} style={{ maxWidth: '50px', borderRadius: '50%', }} className={"my-auto"} />
                                                        </Col>

                                                        <Col xs={6} className="d-flex navbar-menu-title">
                                                            <IoIosArrowDown className="navbar-menu-title navbar-arrow-icon"  onClick={() => myFunction()}  id="dropdown-custom-components" color={"#818E94"} size={"17"} />
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </div>

                                        <div id="myDropdown" className="dropdown-content">
                                            <div className="d-flex" >
                                                <LogoutSvg className="m-auto" style={{alignItems: 'flex-start'}} />
                                                <a className="m-auto navbar-menu-title" onClick={() => Logout()} style={{alignItems: 'flex-end'}} >{trans[lang].navbar.logout}</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                :
                                props.loginBtn
                                &&
                                <>
                                <div className="ml-auto my-auto mr-5">
                                    <Row>
                                        <Col lg={12} className="d-flex">                
                                            <Row className="justify-content-center my-auto mx-1">
                                                <Col xs={6} style={{fontSize: "12px"}} className={lang === "fr" ? "my-agents-msgs-matched-btn px-3 py-1" : "my-agents-msgs-not-matched-btn px-3 py-1"} onClick={() => setLang("fr") }>
                                                    FR
                                                </Col>
                                                <Col xs={6} style={{fontSize: "12px"}} className={lang === "en" ? "my-agents-msgs-matched-btn px-3 py-1" : "my-agents-msgs-not-matched-btn px-3 py-1"} onClick={() => setLang("en") }>
                                                    EN
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </div>
                                <Nav.Item className="my-auto mr-5" style={{padding: '.5rem 1rem'}}>
                                    <Facebook type="nav" content={trans[lang].navbar.login} />
                                </Nav.Item>
                                </>
                                }
                            </Col>
                        </Row>
                    </Nav>
                </div>
            </div>
        </Desktop>
        
        <Mobile>
            
            <Row style={{height: 'auto', width: 'auto', background: '#fff',boxShadow: '0px 0px 6px -1px',position: 'relative',padding: '10px'}}>
                <Col xs={6} className="d-flex">
                    <Image src={LOGO} className="mr-auto my-auto ml-3" style={{maxWidth: '50px'}}/>
                </Col>
                <Col xs={6} className="d-flex">
                    {mobileMenu 
                    ?
                    <AiOutlineClose color="#E5007D" size="25" className="ml-auto my-auto mr-3" onClick={() => setMobileMenu(false)} />
                    :
                    <AiOutlineMenu color="#E5007D" size="25" className="ml-auto my-auto mr-3" onClick={() => setMobileMenu(true)} />
                    }
                </Col>
                
                {mobileMenu
                &&
                <Col xs={12}>
                    <Row className={"mt-3 flex-column"}>
                        <hr  style={{border: '1px solid #EBEDF0', opacity: '1',padding: '0',margin: '5px auto',width: '100%'}} />
                        {
                        props.menuItems.length > 0 
                        && 
                        props.menuItems.map(((menuItem,index) => 
                            <Nav.Item key={index} className="ml-3">
                                <Nav.Link className="navbar-menu-title my-1" href={menuItem.route === "what-is-modo" ? "#what-is-modo" : menuItem.route === "contact-link" && "#"} onClick={() => { menuItem.route === "contact-link" ? props.setShowContact(true) : menuItem.route === "how-to-use-it-home" && setRedirectDocs(true) }}>
                                    {menuItem.title}
                                </Nav.Link>
                            </Nav.Item>
                        ))
                        }
                        <hr  style={{border: '1px solid #EBEDF0', opacity: '1',padding: '0',margin: '5px auto',width: '100%'}} />
                    </Row>
                    {
                    props.loginBtn
                    &&
                    <div className="d-flex">
                        <Nav.Item className="mx-auto mt-5" >
                            <Facebook type="nav" content="Login" />
                        </Nav.Item>
                    </div>
                    }

                    <Row className="justify-content-center  w-100 mx-0 my-5 ">
                    <Col xs={10} className="navbar-menu-title p-0 mb-2" >Language</Col>
                    <Col xs={5} className={lang === "fr" ? "my-agents-msgs-matched-btn" : "my-agents-msgs-not-matched-btn"} onClick={() => setLang("fr") }>
                        FR
                    </Col>
                    <Col xs={5} className={lang === "en" ? "my-agents-msgs-matched-btn" : "my-agents-msgs-not-matched-btn"} onClick={() => setLang("en") }>
                        EN
                    </Col>
                </Row>
                </Col>
                }
                    
            </Row>
        </Mobile>
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        lang : state.socialMediaR.lang,
    }
};

export default withRouter(connect(mapStateToProps, { setLang })(Navbar));
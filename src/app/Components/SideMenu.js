import React from 'react'
import './Components.css';

import {
    Link,
    useLocation,
} from 'react-router-dom';

import {
    Col,
    Row,
    Image,
    Nav,
} from 'react-bootstrap';

import { connect } from 'react-redux';

// Translations
import { trans } from '../../Translations';


// Images & icons :
const BULLE_IMODO = require('../../assets/images/home/wizard.svg');
const BULLE_IMODO_GRISE = require('../../assets/images/home/logo_hover.svg');
const HOME_ICON = require('../../assets/images/home/pages.svg');
const HOME_ICON_ACTIVE = require('../../assets/images/home/pages_01.svg');
const AGENTS_ICON = require('../../assets/images/home/agents.svg');
const AGENTS_ICON_ACTIVE = require('../../assets/images/home/agents_02.svg');
const PRODUCTS_ICON = require('../../assets/images/home/products.svg');
const PRODUCTS_ICON_ACTIVE = require('../../assets/images/home/products_02.svg');
const TEAM_ICON = require('../../assets/images/home/teams.svg');
const TEAM_ICON_ACTIVE = require('../../assets/images/home/Team_01.svg');
const BILLING_ICON = require('../../assets/images/home/Billing_gris.svg');
const BILLING_ICON_ACTIVE = require('../../assets/images/home/Billing_rose.svg');

function SideMenu(props) {

    let { lang } = props;

    const sideMenuItems = [
        {title: trans[lang].sideMenu.myPages, img: HOME_ICON, imgActive: HOME_ICON_ACTIVE, route: 'dashboard'},
        {title: trans[lang].sideMenu.myAgents, img: AGENTS_ICON, imgActive: AGENTS_ICON_ACTIVE, route: 'my-agents'},
        {title: trans[lang].sideMenu.myProducts, img: PRODUCTS_ICON, imgActive: PRODUCTS_ICON_ACTIVE, route: 'manage-products'},
        {title: trans[lang].sideMenu.team, img: TEAM_ICON, imgActive: TEAM_ICON_ACTIVE, route: 'team'},
        {title: trans[lang].sideMenu.billing, img: BILLING_ICON, imgActive: BILLING_ICON_ACTIVE, route: 'billing'},
    ];
    let location = useLocation();

    return (
        <Row className="justify-content-start" style={{marginTop : '100px', position: 'fixed'}}>
            <Col lg={10} className="mb-3">
                <Link to="/home/wizard-popup" style={{ textDecoration: 'none' }}>
                    <div className={location.pathname === "/home/auto-wizard" || location.pathname === "/home/wizard-popup" ? "side-menu-wizard-btn-grise d-flex p-2 ml-2" : "side-menu-wizard-btn d-flex p-2 ml-2" }>
                        <Row className={"m-auto w-100 px-2"}> 
                            <Col lg={3} className="d-flex p-0">
                                <Image src={location.pathname === "/home/auto-wizard" || location.pathname === "/home/wizard-popup" ?  BULLE_IMODO_GRISE : BULLE_IMODO } className="m-auto" />
                            </Col>
                            
                            <Col lg={9} className="d-flex p-0">
                                <p className={location.pathname === "/home/auto-wizard" || location.pathname === "/home/wizard-popup" ? "side-menu-wizard-text-grise my-auto ml-3" : "side-menu-wizard-text my-auto ml-3"}>
                                    {trans[lang].sideMenu.startModeration}
                                </p>
                            </Col>
                        </Row>
                    </div>
                </Link>
            </Col>

            <Col lg={10} className="mt-5">
                <Nav defaultActiveKey="/home" className="flex-column">
                    {
                    sideMenuItems.map((menuItem,index) =>
                        <Link to={`/home/${menuItem.route}`} key={index} style={{ textDecoration: 'none' }}>
                            <Row className={menuItem.route === "team" ? "d-flex mb-4" : "d-flex"}>
                                <Col lg={3} className="d-flex p-0">
                                    <Image src={location.pathname === `/home/${menuItem.route}` ? menuItem.imgActive : menuItem.img } fluid className="m-auto" />
                                </Col>
                                <Col lg={9} className="d-flex p-0">
                                    <p className="mr-auto my-auto side-menu-title" style={{color: location.pathname === `/home/${menuItem.route}` ? "#E5007D" : "#818E94"}}>{menuItem.title}</p>
                                </Col>
                            </Row>
                        </Link>    
                    )
                    }
                </Nav>
            </Col>
        </Row>
    )
}

const mapStateToProps = (state) => ({
    lang: state.socialMediaR.lang,
});

export default connect(mapStateToProps, {})(SideMenu);


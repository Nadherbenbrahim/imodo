import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { addCategory } from '../../../redux/actions/myProductsActions';

import ProductDetails from './ProductDetails';

import {
    Col,
    Row,
    Image,
    Spinner
} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

// Translations
import { trans } from '../../../Translations';

import { FaInfoCircle } from 'react-icons/fa';
import { MdModeEdit } from 'react-icons/md';
import {ReactComponent as Zoom} from '../../../assets/images/home/zoom-2.svg';
const INSTA_ICON = require('../../../assets/images/home/insta-icon.png');
const FB_ICON = require('../../../assets/images/home/fb-icon.png');

export const AddNewProducts = (props) => {
    
    let { 
        lang,
        history,
        socialMediaPageSelected,
        categorySelected,

        // Functions:
        addCategory

    } = props;

    const [showPopover, setShowPopover]  = useState(false);
    const [HoverNameCatgory, setHoverNameCatgory]  = useState(false);
    const [categoryName,setCategoryName] = useState('');
    const [categoryDone,setCategoryDone] = useState(false);
    const [newProduct,setNewProduct] = useState('');
    const [btnLoading,setBtnLoading] = useState(false);
    const [allProducts, setAllProducts] = useState([]);


    const handlePopover = (delay) => {
        setTimeout( () => {
          setShowPopover(!showPopover);
        },delay)
    };

    const renderPopover = () => (
        <div className="d-flex manage-products-popover">
          <p className="m-auto">
            {trans[lang].addNewProducts.titlePopover}
            {/* <br/> */}
            {/* <a href="">learn more</a> */}
          </p>
        </div>
    );

    const createProducts = () => {    
        let oldProducts = [...allProducts];
        let valueToPush = {
            content: newProduct,
            synonyms: [],
        };

        oldProducts.push(valueToPush);
        setAllProducts(oldProducts);
        setNewProduct("");
    };

    const addStaticSynonym = (indexToPush,valueToPush) => {    
        let oldProducts = [...allProducts];
        oldProducts[indexToPush].synonyms.push(valueToPush);
        setAllProducts(oldProducts);
    };

    const prepareAndSave = () => {
        setBtnLoading(true);
    
        addCategory(socialMediaPageSelected, categoryName, allProducts, history)
        .then(() => {
            history.push('manage-products');
        });

    };

    useEffect(() => {
       if(!socialMediaPageSelected) {
           history.push('manage-products');
       };
    }, []);

    return (
    <div style={{height: window.innerHeight * 1.2,marginTop: '86px'}} className="d-flex flex-column">
           
        <Row className="mt-5 mr-auto">
            {/* <p className="my-agents-table-label" style={{ fontSize: '30px', fontFamily: 'Poppins SemiBold' }}>Add category</p> ) */}
            <p className="home-big-title">{trans[lang].addNewProducts.addCategory}</p> 
            <FaInfoCircle style={{transitionDuration: '300ms' }} color={!showPopover ? "#4080FF" : "#E5007D"} size={'15'} onMouseEnter={() => handlePopover('20')} onMouseLeave={() => handlePopover('300')} />
            { showPopover && renderPopover() }
        </Row>

        {/* SELECTED PAGE */}
        {
        socialMediaPageSelected &&
        <Row className="mr-auto d-flex mb-3">
            <Row className="wizard-selected-page-container m-auto" style={{backgroundColor: 'transparent'}}>
                <div className="d-flex flex-column mr-3">
                    <Image src={socialMediaPageSelected.picture_url} className="m-auto" style={{ maxWidth: '40px',borderRadius: '50%' }} />
                    <Image src={socialMediaPageSelected.platform === "instagram" ? INSTA_ICON : FB_ICON} className="ml-auto" style={{zIndex: 1, marginTop: '-15px',maxWidth: '15px'}}/>
                </div>
                <p className="m-auto add-category-page-name">{socialMediaPageSelected.name}</p> 
            </Row>
        </Row>
        }
        
        {/* Category Name */}
        <Row className="d-flex">   
            {categoryName && categoryDone
            ?
            (
            <Col lg={5} className="p-0">
                <div className="d-flex">
                    <p className="my-auto add-category-category-name">{categoryName}</p>
                    <MdModeEdit className="my-auto ml-3"  color={!HoverNameCatgory ? "#4B4F56" : "#4080FF"} size={'20'} onClick={() => setCategoryDone(false)} onMouseEnter={() => setHoverNameCatgory(true)} onMouseLeave={() => setHoverNameCatgory(false)} style={{transitionDuration: '300ms',cursor: 'pointer' }} />
                </div>
            </Col>
            )
            :
            (
            <Col lg={2} className="add-new-product-input-container">
                <input type="text" className="add-new-product-input w-100" placeholder={trans[lang].addNewProducts.categoryPlaceholder}  value={categoryName} onChange={(e) => setCategoryName(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && setCategoryDone(true)} />
            </Col>
            )
            }
            <Col lg={10} />
        </Row>
        
        {/* ADD PRODUCTS */}
        <Row className="d-flex mt-3">   
            <Col lg={3}>
                <Row className="">
                    <Col lg={6} className="add-new-product-input-container mr-2">
                        <input 
                            type="text" 
                            className="add-new-product-input w-100" 
                            disabled={categoryDone ? false : true} value={newProduct} 
                            onChange={(e) => setNewProduct(e.target.value)} 
                            onKeyDown={(e) => { if(e.key === 'Enter') createProducts() }}
                        />
                    </Col>

                    <Col lg={5}>
                        <Row className={categoryDone ? "team-invite-btn d-flex" : "manage-products-add-disabled-btn d-flex"} onClick={ () => categoryDone ? createProducts() : null }>
                            <p className="m-auto">{trans[lang].addNewProducts.addProduct}</p>
                        </Row>
                    </Col>
                </Row>
            </Col>

            <Col lg={7} className="d-flex">
                <input type="text" placeholder="" className="ml-auto my-auto recherche-team py-2" />
                <Zoom className={"zoom-icon"} color={""}  width="16" height="16" style={{top: '13px'}} />
            </Col>
        </Row>
        
        {allProducts.length > 0 &&
        <>
        <Row className="mt-3 mr-0">
            <Col lg={10} className="p-3" style={{backgroundColor: 'white', borderRadius: '4px'}}> 
                {
                allProducts.length > 0
                &&
                <>
                {/* TITLES */}
                <Row className="px-1">
                    <Col lg={4} className="d-flex py-3">
                        <div className="mr-auto d-flex">
                            <p className="my-auto manage-products-table-title">{trans[lang].addNewProducts.products}</p>
                        </div>
                    </Col>

                    <Col lg={8} className="py-3">
                        <div className="d-flex mr-auto">
                            <p className="mr-5 my-auto manage-products-table-title">{trans[lang].addNewProducts.synonyms}</p>
                        </div>
                    </Col>
                    <hr  style={{borderColor: '#EBEDF0', opacity: '1',padding: '0',margin: 'auto',width: '96%'}} />
                </Row>

                {/* LINE */}
                {allProducts.map((product,index) => 
                <Row className="pl-2">
                    <Col lg={12} className="p-0">
                        <ProductDetails 
                            addStaticSynonym={addStaticSynonym} 
                            updateStaticProductName={true}
                            removeStaticProduct={true}
                            removeStaticSynonym={true}
                            product={product} 
                            synonyms={product.synonyms} 
                            indexProduct={index} 
                            allProducts={allProducts}
                            setAllProducts={setAllProducts} 
                        />  
                        <hr  style={{borderColor: '#EBEDF0', opacity: '1',padding: '0',margin: 'auto',width: '96%'}} />
                                 
                    </Col>
                </Row>

                )}
                </>
                }
            </Col>

            <Col lg={2} />
        </Row>

        {/* Buttons */}
        <Row className="my-5 mr-0 Bloc-Scroll" style={{height: '280px',backgroundColor:'transparent'}} >
            <Col lg={10} className=""> 
                <Row className="justify-content-between">
                    <div className="wizard-pages-inactive-btn py-2 px-4">
                        Back    
                    </div>

                    <div className="wizard-pages-active-btn py-2 px-4" onClick={() => prepareAndSave() }>
                        { btnLoading ? <Spinner animation="border" size={"sm"} variant="light" /> : "Save"}
                    </div>
                </Row>
            </Col>

            <Col lg={2} />
        </Row>

        </>
        }
    </div>
    );
}

const mapStateToProps = (state) => {
    return {
        lang : state.socialMediaR.lang,
        socialMediaPageSelected : state.socialMediaR.socialMediaPageSelected,
        categories : state.productsR.categories,
        categorySelected : state.productsR.categorySelected,
    }
};

export default withRouter(connect(mapStateToProps, { addCategory })(AddNewProducts));

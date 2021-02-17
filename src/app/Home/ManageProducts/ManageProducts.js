import React, { useState, useEffect } from 'react'

import { connect } from 'react-redux';
import { resetSocialMediaSelections } from '../../../redux/actions/socialMediaActions';
import { getCategories, selectCategory, deleteCategory} from '../../../redux/actions/myProductsActions';
import { resetَAllWizard, } from '../../../redux/actions/wizardActions';

import Pages from '../Pages/Pages';

import {
  Col,
  Row,
  Modal,
  Image
} from 'react-bootstrap';
import Lottie from 'react-lottie';
import { withRouter } from 'react-router-dom';

// Translations
import { trans } from '../../../Translations';

import { FaInfoCircle } from 'react-icons/fa';
import { MdAddCircleOutline } from 'react-icons/md';
import { BiSearch, BiError } from 'react-icons/bi';
import { IoIosClose } from 'react-icons/io';
import animationData from '../../../assets/json/loading.json';
import notFoundAnimationData from '../../../assets/json/not-found.json';
const TrashSvg = require('../../../assets/images/home/trash-simple.svg') ;


function ManageProducts(props) {
  let { 
    lang,
    // Routing:
    history,

    // Vars:
    categories,
    socialMediaPageSelected,

    // Functions:
    resetَAllWizard,
    // resetSocialMediaSelections,
    getCategories,
    selectCategory,
    deleteCategory,
    
  } = props;

    const [showPopover, setShowPopover] = useState(false);
    const [iconColor, setIconColor] = useState('#fff');
    const [loading, setLoading] = useState(false);
    const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);
    const [CategoryToDelete, setCategoryToDelete] = useState({});
    const [unableToDeleteIndex, setUnableToDeleteIndex] = useState(null);
    const [unableToDelete, setUnableToDelete] = useState(false);
    
    // SEARCH
    const[search, setSearch] = useState("");
    const[searchEnabled, setSearchEnabled] = useState(false);
    const[filtredData, setFiltredData] = useState([]);

    const defaultOptions = {
      loop: true,
      autoplay: true, 
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    };

    const defaultOptionsNotFound = {
      loop: true,
      autoplay: true, 
      animationData: notFoundAnimationData,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    };

    const handlePopover = (delay) => {
      setTimeout( () => {
        setShowPopover(!showPopover);
      },delay)
    };

    const handleAddIconColor = (color) => {
      setIconColor(color);
    };

    const searchByName = (name) => {
      setSearch(name);
      setFiltredData([]);
      setSearchEnabled(true);

      let resultfiltred = [];
      if(name.length > 0) {
        resultfiltred = categories.filter(category => {
          let categoryLowercase = (category.name).toLowerCase();
          let searchLowercase = name.toLowerCase();
          return categoryLowercase.indexOf(searchLowercase) > -1;
        });
        setFiltredData(resultfiltred);
      } else {
        setSearchEnabled(false);
      }
    };

    const renderPopover = () => (
      <div className="d-flex manage-products-popover">
        <p className="m-auto">
          {trans[lang].myProducts.titlePopover}
          {/* <br/> */}
          {/* <a href="">learn more</a> */}
        </p>
      </div>
    );

    const confirmDeleteModal = () => (
      <Modal show={deleteCategoryModal} centered>
        <Modal.Body>
          <Col lg={12}>
            <Row>
              <Col lg={12} className="d-flex">
                <IoIosClose color={"#B4B4B4"} size={30} className="ml-auto" style={{cursor: 'pointer'}} onClick={() => { setCategoryToDelete({}); setDeleteCategoryModal(false); }} />
              </Col>

              <Col lg={12} className="d-flex">
                <BiError color={"#E5007D"} size={65} className="mx-auto mb-3" style={{cursor: 'pointer'}} />
              </Col>

              <Col lg={12} className="d-flex">
                <p className="mx-auto mb-2 confirm-modal-text">
                {trans[lang].myProducts.deleteCategory}
                </p>
              </Col>
              
              <Col lg={12} className="d-flex">
                <div className="mx-auto mb-3 team-invite-btn d-flex text-center" onClick={() => deleteCategory(CategoryToDelete,socialMediaPageSelected).then(() => { setCategoryToDelete({}); setDeleteCategoryModal(false); })}>
                  <p className="m-auto">{trans[lang].myProducts.confirmDelete}</p>
                </div>
              </Col>

              <Col lg={12} className="d-flex">
                <p className="mx-auto mb-2 cancel-btn-modal-text" onClick={() => { setCategoryToDelete({}); setDeleteCategoryModal(false); }}>{trans[lang].myProducts.rejectDelete}</p>
              </Col>
            </Row>
          </Col>
        </Modal.Body>
      </Modal>
    );
  
    // Reset Page
    useEffect(() => {
      resetَAllWizard();
      // resetSocialMediaSelections();
    },[]);

    // Get the categories of the page:
    useEffect(() => {
      if(socialMediaPageSelected) {
        setLoading(true);

        setTimeout(() => {
          getCategories(socialMediaPageSelected)
               .then(() => setLoading(false));
        },2000);
      };

      return () => {
        // To close the listner
      };
    },[socialMediaPageSelected]);

    return (
      <div style={{marginTop: '135px'}}>
        <Row className="mt-5">
          <p className="home-big-title">{trans[lang].myProducts.title}</p>
          <FaInfoCircle style={{transitionDuration: '300ms' }} color={!showPopover ? "#4080FF" : "#E5007D"} size={'15'} onMouseEnter={() => handlePopover('20')} onMouseLeave={() => handlePopover('300')} />
          {showPopover && renderPopover()}
        </Row>

        <Pages title={trans[lang].myProducts.smallTitle} />
      
        {socialMediaPageSelected &&
        <>
        {/* DELETE MODAL */}
        {deleteCategoryModal && confirmDeleteModal()}
        {
        !loading
        ?
          (
            <>
            {/* ADD & SEARCH */}
            <Row className="d-flex mr-0">
  
              <Col lg={10} className="pr-0" >
                <Row className="mr-0">
                  <Row 
                    className="team-invite-btn d-flex mx-0 mr-auto" 
                    onMouseEnter={() => handleAddIconColor('#E5007D')} 
                    onMouseLeave={() => handleAddIconColor('#fff')}
                    onClick={ () => props.socialMediaPageSelected && history.push('add-new-products') } 
                  >
   
                    <MdAddCircleOutline className="my-auto mr-1" style={{ transitionDuration: '600ms'}} color={iconColor} size={'20'} />
                    <p className="my-auto">{trans[lang].myProducts.addCategory}</p>
                  </Row>
  
                  <div className="manage-products-search-container pr-4 pl-4 ml-auto">
                    <Row className="d-flex">
                      <input type={"text"} value={search} onChange={(e) => searchByName(e.target.value)} className="my-auto mr-2 manage-products-search-input" />
                      <BiSearch color={"#B4B4B4"} size={'20'} className="my-auto" />
                    </Row>
                  </div>
                </Row>
              </Col>
  
              <Col lg={2} />
            </Row>
  
            {/* Categories TABLE */}
            <Row className="my-5 mr-0 Bloc-Scroll" style={{height: '280px',backgroundColor:'transparent'}} >
            {filtredData.length > 0
            ?
            <>
              <Col lg={10} className="p-3" style={{backgroundColor: 'white', borderRadius: '4px'}}>
                <div className="d-flex mx-0 w-100 pt-3 pb-3" style={{borderBottom: '1px solid #EBEDF0'}}>
                  <div className="mr-auto d-flex">
                    <p className="my-auto manage-products-table-title">{trans[lang].myProducts.category}</p>
                  </div>

                  <div className="d-flex ml-auto">
                    <p className="mr-5 my-auto manage-products-table-title">{trans[lang].myProducts.products}</p>
                    <div className="ml-5 my-auto" />
                  </div>
                </div>

                {filtredData.map((cat,index) => 
                    <div key={index} className="d-flex mx-0 w-100 pt-3 pb-3 pr-2 pl-2" style={{borderBottom: '1px solid #EBEDF0'}}>
                      <div className="mr-auto d-flex">
                        <p className="my-auto manage-product-entity-name" onClick={() => selectCategory(cat,history)} style={{cursor: 'pointer'}}>{cat.name}</p>
                      </div>

                      <div className="d-flex ml-auto">
                        <p className="mr-5 my-auto manage-product-entity-name">{cat.children.length}</p>
                        {cat.children.length > 0
                        ?
                        <Image src={TrashSvg} className="ml-5 my-auto" width="17" height="17" style={{cursor: 'pointer'}} onMouseEnter={() => {setUnableToDeleteIndex(index); setUnableToDelete(true)}} onMouseLeave={() => { setUnableToDeleteIndex(null); setUnableToDelete(false); }}/>
                        :
                        <Image src={TrashSvg}  className="ml-5 my-auto" width="17" height="17" style={{cursor: 'pointer'}} onClick={() => {setCategoryToDelete(cat); setDeleteCategoryModal(true);}}/>
                        }

                        {/* Category should be empty to delete it */}
                        {unableToDeleteIndex === index && unableToDelete
                        &&
                        <div className="d-flex py-3 span-hover-manageProduct">
                          <p className="m-auto span-hover-manageProduct-text">{trans[lang].myProducts.categoryEmpty}</p>
                        </div>
                        }

                      </div>
                    </div>
                  )
                }
              </Col>
            </>
            :
            filtredData.length === 0 && searchEnabled
            ?
            <p>{trans[lang].myProducts.noResultSearch} "{search}"</p>
            :
            categories !== null && categories.length > 0
            ?
            (
            <>
              <Col lg={10} className="p-3" style={{backgroundColor: 'white', borderRadius: '4px'}}>
                <div className="d-flex mx-0 w-100 pt-3 pb-3" style={{borderBottom: '1px solid #EBEDF0'}}>
                  <div className="mr-auto d-flex">
                    <p className="my-auto manage-products-table-title">{trans[lang].myProducts.category}</p>
                  </div>

                  <div className="d-flex ml-auto">
                    <p className="mr-5 my-auto manage-products-table-title">{trans[lang].myProducts.products}</p>
                    <div className="ml-5 my-auto" />
                  </div>
                </div>

                {categories.map((cat,index) => 
                    <div key={index} className="d-flex mx-0 w-100 pt-3 pb-3 pr-2 pl-2" style={{borderBottom: '1px solid #EBEDF0'}}>
                      <div className="mr-auto d-flex">
                        <p className="my-auto manage-product-entity-name" onClick={() => selectCategory(cat,history)} style={{cursor: 'pointer'}}>{cat.name}</p>
                      </div>

                      <div className="d-flex ml-auto">
                        <p className="mr-5 my-auto manage-product-entity-name">{cat.children.length}</p>
                        {cat.children.length > 0
                        ?
                        <Image src={TrashSvg} className="ml-5 my-auto" width="17" height="17" style={{cursor: 'pointer'}} onMouseEnter={() => {setUnableToDeleteIndex(index); setUnableToDelete(true)}} onMouseLeave={() => { setUnableToDeleteIndex(null); setUnableToDelete(false); }}/>
                        :
                        <Image src={TrashSvg}  className="ml-5 my-auto" width="17" height="17" style={{cursor: 'pointer'}} onClick={() => {setCategoryToDelete(cat); setDeleteCategoryModal(true);}}/>
                        }

                        {/* Category should be empty  */}
                        {unableToDeleteIndex === index && unableToDelete
                        &&
                        <div className="d-flex py-3 span-hover-manageProduct">
                          <p className="m-auto span-hover-manageProduct-text">{trans[lang].myProducts.categoryEmpty}</p>
                        </div>
                        }

                      </div>
                    </div>
                  )
                }
              </Col>
            </>
            )
            :
            categories !== null && categories.length === 0
            &&
            (
            <>
            <Col lg={12} className="d-flex" style={{backgroundColor: '#F9F9F9' }}>
              <Lottie options={defaultOptionsNotFound} width={200} className="m-auto" /*height={400}*/ />
            </Col>

            <Col lg={12} className="d-flex mt-5" style={{backgroundColor: '#F9F9F9' }}>
                <p className="m-auto home-big-title">{trans[lang].myProducts.noEntities}</p>
            </Col>
            </>
            )
            }

            <Col lg={2} />
            </Row>
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
          </>
        }
      </div>
    )
}

const mapStateToProps = (state) => {
  return {
    lang : state.socialMediaR.lang,
    socialMediaPageSelected : state.socialMediaR.socialMediaPageSelected,
    categories : state.productsR.categories,
    categorySelected : state.productsR.categorySelected,
  }
};

export default withRouter(connect(mapStateToProps, {resetSocialMediaSelections, getCategories, selectCategory, deleteCategory, resetَAllWizard })(ManageProducts));

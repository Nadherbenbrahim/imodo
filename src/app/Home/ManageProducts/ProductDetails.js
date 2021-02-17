import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { selectProduct, updateProductName, removeProduct, addSynonym, removeSynonym } from '../../../redux/actions/myProductsActions';

import AddSynonymInput from './AddSynonymInput';

import {
  Col,
  Row,
  Modal,
  Image
} from 'react-bootstrap';

// Translations
import { trans } from '../../../Translations';

import { FiEdit } from 'react-icons/fi';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { BiError } from 'react-icons/bi';
import { IoIosClose } from 'react-icons/io';
import ReactTooltip from 'react-tooltip';
import Swal from 'sweetalert2/dist/sweetalert2.js'
const TrashSvg = require('../../../assets/images/home/trash-simple.svg') ;

export const ProductDetails = (props) => {

    let { 
        lang,
        indexProduct,
        product,
        synonyms,
        allProducts, 
        setAllProducts,

        socialMediaPageSelected,
        categorySelected,
        productSelected,

        selectProduct,
        updateProductName,
        updateStaticProductName,
        removeProduct,
        removeStaticProduct,
        addSynonym,
        addStaticSynonym,
        removeSynonym,
        removeStaticSynonym,
    } = props;

    const inputRef = useRef();
    const [modifyProductContent, setModifyProductContent] = useState(product.content);
    const oldProductContent = product.content;
    const [enableProductInput, setEnableProductInput] = useState(false);
    const [synonymBoxBorder, setSynonymBoxBorder] = useState(false);

    const [deleteProductModal, setDeleteProductModal] = useState(false);
    const [modifyProductModal, setModifyProductModal] = useState(false);
    const [deleteSynonymModal, setDeleteSynonymModal] = useState(false);
    const [synonymToDelete, setSynonymToDelete] = useState(null);
    const [indexSynonymToDelete, setIndexSynonymToDelete] = useState(null);

    const confirmDeleteProductModal = () => (
        <Modal show={deleteProductModal} centered>
          <Modal.Body>
            <Col lg={12}>
              <Row>
                <Col lg={12} className="d-flex">
                  <IoIosClose color={"#B4B4B4"} size={30} className="ml-auto" style={{cursor: 'pointer'}} onClick={() => setDeleteProductModal(false)} />
                </Col>
  
                <Col lg={12} className="d-flex">
                  <BiError color={"#E5007D"} size={65} className="mx-auto mb-3" style={{cursor: 'pointer'}} />
                </Col>
  
                <Col lg={12} className="d-flex">
                  <p className="mx-auto mb-2 confirm-modal-text">
                  {trans[lang].productsDetails.deleteProduct}
                  </p>
                </Col>
                
                <Col lg={12} className="d-flex">
                  <p className="mx-auto mb-3 confirm-modal-text">
                  {trans[lang].productsDetails.infoDelete}
                  </p>
                </Col>
  
                <Col lg={12} className="d-flex">
                  <div className="mx-auto mb-3 manage-products-add-btn d-flex text-center" onClick={deleteProduct}>
                    <p className="m-auto">{trans[lang].productsDetails.confirmDelete}</p>
                  </div>
                </Col>
  
                <Col lg={12} className="d-flex">
                  <p className="mx-auto mb-2 cancel-btn-modal-text" onClick={() => setDeleteProductModal(false)}>{trans[lang].productsDetails.rejectDelete}</p>
                </Col>
              </Row>
            </Col>
          </Modal.Body>
        </Modal>
    );

    const confirmModifyModal = () => (
        <Modal show={modifyProductModal} centered>
          <Modal.Body>
            <Col lg={12}>
              <Row>
                <Col lg={12} className="d-flex">
                  <IoIosClose color={"#B4B4B4"} size={30} className="ml-auto" style={{cursor: 'pointer'}} onClick={() => { setEnableProductInput(false); setModifyProductContent(oldProductContent); setModifyProductModal(false); }} />
                </Col>
  
                <Col lg={12} className="d-flex">
                  <BiError color={"#E5007D"} size={65} className="mx-auto mb-3" style={{cursor: 'pointer'}} />
                </Col>
  
                <Col lg={12} className="d-flex">
                  <p className="mx-auto mb-2 confirm-modal-text">
                  {trans[lang].productsDetails.deleteProduct}
                  </p>
                </Col>
                
                <Col lg={12} className="d-flex">
                  <p className="mx-auto mb-3 confirm-modal-text">
                  {trans[lang].productsDetails.infoDelete}
                  </p>
                </Col>
  
                <Col lg={12} className="d-flex">
                  <div className="mx-auto mb-3 manage-products-add-btn d-flex text-center" onClick={modifyProduct}>
                    <p className="m-auto"> {trans[lang].productsDetails.confirmEdit}</p>
                  </div>
                </Col>
  
                <Col lg={12} className="d-flex">
                  <p className="mx-auto mb-2 cancel-btn-modal-text" onClick={() => { setEnableProductInput(false); setModifyProductContent(oldProductContent); setModifyProductModal(false); }}>
                  {trans[lang].productsDetails.rejectEdit}
                  </p>
                </Col>
              </Row>
            </Col>
          </Modal.Body>
        </Modal>
    );

    const confirmDeleteSynonymModal = () => (
        <Modal show={deleteSynonymModal} centered>
          <Modal.Body>
            <Col lg={12}>
              <Row>
                <Col lg={12} className="d-flex">
                  <IoIosClose color={"#B4B4B4"} size={30} className="ml-auto" style={{cursor: 'pointer'}} onClick={() =>{ setDeleteSynonymModal(false); setSynonymToDelete(null); setIndexSynonymToDelete(null); }} />
                </Col>
  
                <Col lg={12} className="d-flex">
                  <BiError color={"#E5007D"} size={65} className="mx-auto mb-3" style={{cursor: 'pointer'}} />
                </Col>
  
                <Col lg={12} className="d-flex">
                  <p className="mx-auto mb-2 confirm-modal-text">
                  {trans[lang].productsDetails.deleteSynonym}
                  </p>
                </Col>
                
                <Col lg={12} className="d-flex">
                  <div className="mx-auto mb-3 manage-products-add-btn d-flex text-center" onClick={() => deleteSynonym(synonymToDelete,indexSynonymToDelete)}>
                    <p className="m-auto">{trans[lang].productsDetails.confirmDelete}</p>
                  </div>
                </Col>
  
                <Col lg={12} className="d-flex">
                  <p className="mx-auto mb-2 cancel-btn-modal-text" onClick={() => { setDeleteSynonymModal(false); setSynonymToDelete(null); setIndexSynonymToDelete(null); }}>
                    {trans[lang].productsDetails.rejectDelete}
                  </p>
                </Col>
              </Row>
            </Col>
          </Modal.Body>
        </Modal>
    );


    const modifyProduct = () => {
        // If static Modify
        if(updateStaticProductName) {
            allProducts[indexProduct].content = modifyProductContent;
            setEnableProductInput(false);
            setModifyProductModal(false);
        } else {
            updateProductName(modifyProductContent, categorySelected, productSelected, socialMediaPageSelected)
            .then(() => {;
                setEnableProductInput(false);
                setModifyProductModal(false);
            })
            .catch(() => {
                setEnableProductInput(false);
                setModifyProductContent(oldProductContent);
                setModifyProductModal(false);
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Error while updating product name',
                    showConfirmButton: false,
                    timer: 2000
                })
            });
        }
    };

    const deleteProduct = () => {
        if(removeStaticProduct) {
            let oldProducts = [...allProducts];
            oldProducts.splice(indexProduct,1);
            setAllProducts(oldProducts);  
            setDeleteProductModal(false); 
        } else {
            removeProduct(categorySelected, product, socialMediaPageSelected)
            .then(() => {
                setDeleteProductModal(false);
            })
            .catch(() => {
                setDeleteProductModal(false);
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Error while deleting the product',
                    showConfirmButton: false,
                    timer: 2000
                })
            });
        }   

    };

    const deleteSynonym = (synonym, indexSyn) => {
        if(removeStaticSynonym) {
            let oldProducts = [...allProducts];
            oldProducts[indexProduct].synonyms.splice(indexSyn,1);
            setAllProducts(oldProducts);
            setDeleteSynonymModal(false); 
            setSynonymToDelete(null); 
            setIndexSynonymToDelete(null);
        } else {

            removeSynonym(synonym, product, indexSyn, socialMediaPageSelected, categorySelected) 
            .then(() => {
                setDeleteSynonymModal(false); 
                setSynonymToDelete(null); 
                setIndexSynonymToDelete(null);
            })
            .catch(() => {
                setDeleteSynonymModal(false);
                setSynonymToDelete(null); 
                setIndexSynonymToDelete(null);

                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Error while deleting the synonym',
                    showConfirmButton: false,
                    timer: 2000
                });
            });
        }
    };

    useEffect(() => {
        enableProductInput && inputRef.current.focus();
    },[enableProductInput]);

    return (
      <Row className="mx-0 px-4" key={indexProduct} >
        
        {/* MODAL CONFIRM DELETE */}
        {deleteProductModal && confirmDeleteProductModal()}
        {modifyProductModal && confirmModifyModal()}
        {deleteSynonymModal && confirmDeleteSynonymModal()}

        <Col lg={4} className="d-flex py-2 px-0">
            <div className="mr-auto d-flex">
                {enableProductInput
                ?
                <input 
                    type="text" 
                    ref={inputRef} 
                    value={modifyProductContent}
                    onChange={(e) => setModifyProductContent(e.target.value)}
                    className="py-1 my-auto synonym-box-white w-100" 
                    style={{ border: '1px solid #818E94',fontSize: '15px', fontFamily: 'Poppins SemiBold', color: '#818E94' }}
                    onKeyDown={(e) => { if(e.key === 'Enter') setModifyProductModal(true); }}
                />
                :
                <p className="my-auto manage-product-entity-name">{product.content}</p>
                }
            </div>
        </Col>

        <Col lg={8} className="px-0 py-2">
            <Row>
                <Col lg={10}>
                    <Row className="mx-0">
                        {synonyms.length > 0
                        &&
                        synonyms.map((synonym,indexSyn) => 
                            <Col key={indexSyn} lg={3} className="d-flex p-1">
                                <Row className="d-flex mx-auto synonym-box-gray p-1 w-100 h-100">
                                    {synonym.length > 10
                                    ?
                                    <p data-for='synonymTip' data-tip={synonym} className="my-auto" style={{cursor: 'help'}}>{synonym.substring(0,10)}...</p>
                                    :
                                    <p className="my-auto mr-auto">{synonym}</p>
                                    }
                                    <AiOutlineCloseCircle 
                                        className="my-auto ml-auto" 
                                        color={'#818E94'} 
                                        size={'15'} 
                                        style={{ cursor: 'pointer' }} 
                                        // onClick={() => deleteSynonym(synonym,indexSyn)}
                                        onClick={() => { setSynonymToDelete(synonym); setIndexSynonymToDelete(indexSyn); setDeleteSynonymModal(true); }}
                                    />
                                </Row>
                                <ReactTooltip id='synonymTip' textColor='#fff' backgroundColor='#E5007D' />
                            </Col>    
                        )}

                        <Col lg={3} className="d-flex p-1" onClick={() => setSynonymBoxBorder(true)}>
                            <div className="synonym-box-white p-1 w-100 h-100"  style={{border: synonymBoxBorder ? '1px solid #818E94' : '1px dashed #818E94'}}>
                              <AddSynonymInput addSynonym={addSynonym} addStaticSynonym={addStaticSynonym}  removeSynonym={removeSynonym} index={indexProduct} product={product} setSynonymBoxBorder={setSynonymBoxBorder} />
                            </div>
                        </Col>
                    </Row>
                </Col>

                <Col lg={2} className="d-flex">
                    <Row className="ml-auto">
                        <FiEdit className="my-auto" color={'#E5007D'} size={'17'} style={{ cursor: 'pointer' }} onClick={ () => { selectProduct(product); setEnableProductInput(true); } }/>
                        <Image className="my-auto ml-3" src={TrashSvg} width="17" height="17" style={{ cursor: 'pointer' }} onClick={() => setDeleteProductModal(true)} />
                    </Row>
                </Col>
            </Row>
        </Col>
      </Row> 
    );
};

const mapStateToProps = (state) => ({
    lang : state.socialMediaR.lang,
    socialMediaPageSelected : state.socialMediaR.socialMediaPageSelected,
    categorySelected : state.productsR.categorySelected,
    productSelected: state.productsR.productSelected, 
});

export default connect(mapStateToProps, { selectProduct, updateProductName, removeProduct, addSynonym, removeSynonym })(ProductDetails)

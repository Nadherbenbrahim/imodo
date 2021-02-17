import React, { useState, useRef, useEffect } from 'react';

import axios from 'axios';

import { connect } from 'react-redux';
import { addGenericResponse, updateGenericResponse } from '../../../redux/actions/wizardActions';
import { host } from '../../../config';

import {
    Row,
    Col,
    Popover,
    Overlay,
    Modal,
    Form,
    Spinner,
} from 'react-bootstrap';
import WizardMiracleInput from './WizardMiracleInput';
import ReactTooltip from 'react-tooltip';
import Swal from 'sweetalert2/dist/sweetalert2.js';

// Translations
import { trans } from '../../../Translations';

import { IoIosArrowDown, IoIosArrowUp, IoIosClose } from 'react-icons/io';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { MdAddCircleOutline } from 'react-icons/md';
import {ReactComponent as TrashIntent} from '../../../assets/images/home/trash-intent.svg';
import {ReactComponent as TrashIntentWhite} from '../../../assets/images/home/TrashIntentWhite.svg';

function WizardIntentDetails(props) {

    // All Props from WizardConfig : 
    let {
        lang,
        indexOfIntent,
        intent,
        setIntents,
        selectedIntents,
        wizardExistingProjectIntents,
        intentStatus,
        // isExistingProject,
    } = props;
    
    // Popup Config:
    const swalWithBootstrapButtons = Swal.mixin({ customClass: {confirmButton: 'wizard-pages-active-btn-alert'}, buttonsStyling: false });
    
    // Generic:
    const [GenericResponse,setGenericResponse] = useState('');
    const [GenericTags,setGenericTags] = useState(false);
    const [GenericEmojis,setGenericEmojis] = useState(false);
    const [GenericKeyboard,setGenericKeyboard] = useState(false);
    const [GenericBtnType, setGenericBtnType] = useState('web_url');
    const [GenericBtnTitle, setGenericBtnTitle] = useState('');
    const [GenericBtnValue, setGenericBtnValue] = useState('');
    const [GenericBtns, setGenericBtns] = useState([]);
    const resetGeneric = () => {
        setGenericResponse('');
        setGenericTags(false);
        setGenericEmojis(false);
        setGenericKeyboard(false);
        setGenericBtnType('web_url');
        setGenericBtnTitle('');
        setGenericBtnValue('');
        setGenericBtns([]);
    };
    const handleSaveGenericResponse = (intent,wizardIdProject) => {  
        
        handleUpdateModal(false);

        let project = {
            genericAnswer : GenericResponse,
            intent: intent,
            buttons: GenericBtns,
        };

        if(GenericResponse === "") {
            swalWithBootstrapButtons.fire({
                title: trans[lang].wizardIntentDetails.genericRepEmpty,
                confirmButtonText: trans[lang].wizardIntentDetails.retry,
            });
        } else if (intentState === 'save' && GenericResponse !== '') {
            setSaveUpdateLoading(true);

            props.addGenericResponse(project,wizardIdProject)
            .then(() => {
                setIntentState('update');
                setSaveUpdateLoading(false);
            })
            .catch(() => {
                setSaveUpdateLoading(false);
                swalWithBootstrapButtons.fire({
                    title:  trans[lang].wizardIntentDetails.errorSavingGenericRep,
                    confirmButtonText: trans[lang].wizardIntentDetails.retry,
                });
            });

        } else if (intentState === 'update' && GenericResponse !== '') {
            setSaveUpdateLoading(true);

            props.updateGenericResponse(project,wizardIdProject)
            .then(() => {
                setSaveUpdateLoading(false);
                setGenericBtnColor(false);
            })
            .catch(() => {
                setSaveUpdateLoading(false);
                swalWithBootstrapButtons.fire({
                    title: trans[lang].wizardIntentDetails.errorUpdatingGenericRep,
                    confirmButtonText: trans[lang].wizardIntentDetails.retry,
                });
            });
        }
        
    };

    // Specific:
    const [SpecificResponse, SetSpecificResponse] = useState('');
    const [SpecificKeyBoard, setSpecificKeyBoard] = useState(false);
    const [SpecificEmoji, setSpecificEmoji] = useState(false);
    const [SpecificTags, setSpecificTags] = useState(false);
    const [SpecificBtnType, setSpecificType] = useState('web_url');
    const [SpecificBtnTitle, setSpecificTitle] = useState('');
    const [SpecificBtnValue, setSpecificValue] = useState('');
    const [SpecificBtns, setSpecificBtns] = useState([]);
    const [SpecificPopover, setSpecificPopover] = useState(false);
    const [SpecificTarget, setSpecificTarget] = useState(null);
    const SpecificRef = useRef(null);
    const resetSpecific = () => {
        setProductName('');
        SetSpecificResponse('');
        setSpecificTags(false);
        setSpecificEmoji(false);
        setSpecificKeyBoard(false);
        setSpecificType('web_url');
        setSpecificTitle('');
        setSpecificValue('');
        setSpecificBtns([]);
    };
    const handleSpecificPopover = (event) => {
        setSpecificPopover(!SpecificPopover);
        setSpecificTarget(event.target);
    };

    // Specific Update:
    const [SpecificUpdateResponse, SetSpecificUpdateResponse] = useState('');
    const [SpecificUpdateKeyBoard, setSpecificUpdateKeyBoard] = useState(false);
    const [SpecificUpdateEmoji, setSpecificUpdateEmoji] = useState(false);
    const [SpecificUpdateTags, setSpecificUpdateTags] = useState(false);
    const [SpecificUpdateBtnType, setSpecificUpdateType] = useState('web_url');
    const [SpecificUpdateBtnTitle, setSpecificUpdateTitle] = useState('');
    const [SpecificUpdateBtnValue, setSpecificUpdateValue] = useState('');
    const [SpecificUpdateBtns, setSpecificUpdateBtns] = useState([]);
    const [SpecificUpdatePopover, setSpecificUpdatePopover] = useState(false);
    const [SpecificUpdateTarget, setSpecificUpdateTarget] = useState(null);
    const SpecificUpdateRef = useRef(null);
    const resetUpdateSpecific = () => {
        setSpecificUpdatePopover(false);
        setSpecificUpdateTarget(null);
        SetSpecificUpdateResponse('');
        setSpecificUpdateKeyBoard(false);
        setSpecificUpdateEmoji(false);
        setSpecificUpdateTags(false);
        setSpecificUpdateType('web_url');
        setSpecificUpdateTitle('');
        setSpecificUpdateValue('');
        setSpecificUpdateBtns([]);
        setSpecificBtnColor(false);
    };
    const handleSpecificUpdatePopover = (event,product) => {
        // console.log("Product to update =>", product);
        setProductUpdateName(product.product);
        SetSpecificUpdateResponse(product.preAnswer);
        setSpecificUpdateBtns(product.buttons);
        setSpecificUpdatePopover(!SpecificUpdatePopover);
        setSpecificUpdateTarget(event.target);
    };

    // Products
    const [productName, setProductName] = useState('');
    const [productUpdateName, setProductUpdateName] = useState('');
    const [savedProductToSend, setSavedProductToSend] = useState('');
    const [products, setProducts] = useState([]);

    // Categories
    const [newCategory, setNewCategory] = useState('');
    const [categorySelected, setCategorySelected] = useState('');
    const [allCategories, setAllCategories] = useState([]);
    const [CategorieModal, setCategorieModal] = useState(false);
    const [showModalInput, setShowModalInput] = useState(false);
    const handleCategoriesModal = () => {
        setSpecificPopover(false);
        setCategorieModal(!CategorieModal);
    };
    // other:
    const [saveUpdateLoading,setSaveUpdateLoading] = useState(false);
    const [intentState, setIntentState] = useState('save');
    const [genericBtnColor, setGenericBtnColor] = useState(false);
    const [specificBtnColor, setSpecificBtnColor] = useState(false);
    const [updateModal, handleUpdateModal] = useState(false);
    const [isOpen, setIsOpen] = useState(intentStatus === "old" ? false : true);

    // Categories & Products functions :
    const addNewProduct = (idProjet) => {
        
        // First update api : entity === categorie :
        let productToSend = {
            idPage: props.wizardSelectedPage.id,
            typePage : props.wizardSelectedPage.platform,
            entity: productName,
            intent: props.intent.name,
            genericAnswer: GenericResponse,
            specificAnswer: SpecificResponse,
            categorie: productName,
            buttons: SpecificBtns,
        };

        if(productName === "") {
            swalWithBootstrapButtons.fire({
                title: trans[lang].wizardIntentDetails.prodNameEmpty,
                confirmButtonText: trans[lang].wizardIntentDetails.retry,
            });

        } else if(SpecificResponse === "") {
            swalWithBootstrapButtons.fire({
                title: trans[lang].wizardIntentDetails.specificRepEmpty,
                confirmButtonText: trans[lang].wizardIntentDetails.retry,
            });

        } else {

            axios.put(`${host}/api/v1/secure/project/firstupdate/${idProjet}`, productToSend, {
                headers: {
                    'authorization': 'Bearer ' + localStorage.getItem('authtoken')
                }
            })
            .then( res => {
                console.log('first update response =>', res.data.data);
    
                if (res.data.data === "not exist") {
                    // Call the categories api :
                    axios.get(`${host}/api/v1/secure/project/get/entitiesproject/${props.wizardSelectedPage.platform}/${props.wizardSelectedPage.id}`)
                    .then((res) => {
                        console.log("get categories for modal /get/entitiesproject =>", res.data.data);
                        
                        // Eliminate default categories:
                        let categories = res.data.data;
    
                        if(categories.length > 0) {
                            categories.map((cat,index) => 
                                cat.default === true && categories.splice(index,1)
                            );
                            // console.log("Result after filtring the cats", categories);
                        };
                        setAllCategories(categories);
                        setSpecificPopover(!SpecificPopover);
                        setSavedProductToSend(productToSend);
                        setCategorieModal(true);
                        
                        // ==> Update the products array from addNewProductViaModal() <==
                    })
                    .catch((err) => console.log("addNewProduct WizardIntentDetails =>", err))
                } else if(res.data.data === "exist") {
                    swalWithBootstrapButtons.fire({
                        title: trans[lang].wizardIntentDetails.productExists,
                        confirmButtonText: trans[lang].wizardIntentDetails.retry,
                    });
                } else {
                    // Update the products array :
                    let newSelectedIntents = [...selectedIntents];
    
                    newSelectedIntents.map((intent,index) => {
                        if(index === props.indexOfIntent)  {
                            // intent.products = res.data.data.intents[indexOfIntent].answer
                            setProducts([]);
                            setProducts(res.data.data.intents[indexOfIntent].answer);
                        };
                    });
                    setIntents(newSelectedIntents);
                    
                    // Reset
                    setSpecificPopover(!SpecificPopover);
                    resetSpecific();
                };
            })
            .catch( err => console.log("Wizard Intent Detail addNewProduct fct first Update API err ===>", err))
        } 

    };

    const addNewProductViaModal = (idProjet) => {
        // Send the update with the new category name :) :
        let productToSend = savedProductToSend;
        productToSend.categorie = categorySelected;
    
        // console.log("sendinnng product =>",productToSend);
        // console.log("Category Selected To sennnnd", categorySelected," and product =>>>", productToSend);
        
        return axios.put(host + `/api/v1/secure/project/update/${idProjet}`,productToSend, {
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem('authtoken')
            }
        })
        .then(res => {
            console.log('UPDATE API response =>', res.data);
       
            // set the products from the update api :
            let newSelectedIntents = [...selectedIntents];

            newSelectedIntents.map((_,index) => {
                if(index === props.indexOfIntent)  {
                    //intent.products = res.data.data.intents[indexOfIntent].answer
                    setProducts([]);
                    setProducts(res.data.data.intents[indexOfIntent].answer);
                };
            });
            setIntents(newSelectedIntents);
            
            // Reset
            resetSpecific();
            setCategorySelected('');
            setCategorieModal(false);
        })
        .catch((err) => console.log("addNewProductViaModal => api update err =>> ", err))
    };

    const updateProduct = (idProjet) => {
       
        let productToSend = {
            idPage: props.wizardSelectedPage.id,
            typePage : props.wizardSelectedPage.platform,
            entity: productUpdateName,
            intent: props.intent.name,
            genericAnswer: GenericResponse,
            specificAnswer: SpecificUpdateResponse,
            buttons: SpecificUpdateBtns,
            // categorie: productUpdateName,
        };

        axios.put(host + `/api/v1/secure/project/entitiesupdate/${props.wizardIdProject}`,productToSend,
        {
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem('authtoken')
            }
        })
        .then(res => {
            console.log('updateProduct API response =>', res.data);
            // set the products from the update api :
            let newSelectedIntents = [...selectedIntents];

            newSelectedIntents.map((_,index) => {
                if(index === props.indexOfIntent)  {
                    setProducts([]);
                    setProducts(res.data.data.intents[indexOfIntent].answer);
                };
            });
            setIntents(newSelectedIntents);
            resetUpdateSpecific();
            // setSpecificUpdatePopover(false);
            
        })
        .catch((err) => {
            console.log("updateProduct API error =>> ", err)
            swalWithBootstrapButtons.fire({
                title: trans[lang].wizardIntentDetails.errorUpdatingProduct,
                confirmButtonText: trans[lang].wizardIntentDetails.retry,
            });
        });

    };

    const deleteProduct = (product,index) => {
        
        let newProducts = [...products];
        
        let objectToSend = {
            intent: intent.name,
            answer: product._id,
        };
        
        console.log("To delete That", objectToSend);

        axios.put(host + `/api/v1/secure/project/${props.wizardIdProject}/remove/entity`,objectToSend,{
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem('authtoken')
            }
        })
        .then(res => {
            console.log('deleteProduct API response =>', res.data);
            newProducts.splice(index,1);
            setProducts(newProducts);   
        })
        .catch((err) => {
            console.log("deleteProduct api err =>> ", err)
            swalWithBootstrapButtons.fire({
                title: trans[lang].wizardIntentDetails.errorDeletingProduct,
                confirmButtonText: trans[lang].wizardIntentDetails.retry,
            });
        });
 
    };

    const pushNewCategory = () => {  
        
        let categoryToPush = {
            name : newCategory
        };

        setAllCategories(categories => [...categories, categoryToPush]);
        setCategorySelected(categoryToPush.name);
        
         // Send the update with the new category name :) :
         let productToSend = savedProductToSend;
         productToSend.categorie = newCategory;

         // console.log("sendinnng product =>",productToSend);
         // console.log("Category Selected To sennnnd", categorySelected," and product =>>>", productToSend);
         
         return axios.put(host + `/api/v1/secure/project/update/${props.wizardIdProject}`,productToSend, {
             headers: {
                 'authorization': 'Bearer ' + localStorage.getItem('authtoken')
             }
         })
         .then(res => {
             console.log('pushNewCategory via Modal project/update API response =>', res.data);
        
            // set the products from the update api :
            let newSelectedIntents = [...selectedIntents];
 
            newSelectedIntents.map((_,index) => {
                if(index === props.indexOfIntent)  {
                    setProducts([]);
                    setProducts(res.data.data.intents[indexOfIntent].answer);
                };
            });
            setIntents(newSelectedIntents);
             
            // Reset
            resetSpecific();
            setCategorySelected('');
            setShowModalInput(false); 
            setNewCategory('');
            setCategorieModal(false);
         })
         .catch((err) => console.log("pushNewCategory via Modal project/update api error =>> ", err))
    };

    const deleteIntent = (intent,index) => {
        // console.log("U want to delete this intent =>", intent);
        // intent: nom intent
        let newIntents = [...selectedIntents];
    
        let objectToSend = {
            intent: intent.name,
        };

        console.log("i'm gonna delete intent ya nour with =>", objectToSend);

        axios.put(host + `/api/v1/secure/project/intents/remove/${props.wizardIdProject}`, objectToSend, {
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem('authtoken')
            }
        })
        .then(res => {
            console.log('deleteIntent API response =>', res.data);
            newIntents.splice(index,1);
            setIntents(newIntents);   
        })
        .catch((err) => {
            console.log("deleteIntent api err =>> ", err)
            swalWithBootstrapButtons.fire({
                title: trans[lang].wizardIntentDetails.errorDeletingIntent,
                confirmButtonText: trans[lang].wizardIntentDetails.retry,
            });
        });

        // setIntents(selectedIntents.filter( intent =>( intent !== props.intent.name )))
    };

    const renderUpdateModal = () => (
        <Modal show={updateModal} size="sm" centered>
        <Modal.Body>
          <Col lg={12}>
            <Row>
              <Col lg={12} className="d-flex mb-3">
                <IoIosClose color={"#B4B4B4"} size={30} className="ml-auto" style={{cursor: 'pointer'}} onClick={() => { handleUpdateModal(false) }} />
              </Col>

              <Col lg={12} className="d-flex">
                <p className="mx-auto mb-3 confirm-modal-text">
                    {trans[lang].wizardIntentDetails.updateVisible}
                </p>
              </Col>
              
              <Col lg={12}>
                <Row className="justify-content-center">
                    <div className="team-invite-btn text-center px-3 mr-2" onClick={() => handleSaveGenericResponse(props.intent.name,props.wizardIdProject)}>
                        <p className="m-auto">{trans[lang].wizardIntentDetails.yes}</p>
                    </div>
                    
                    <div className="team-invite-btn-no text-center px-3 ml-2" onClick={() => { handleUpdateModal(false) }}>
                        <p className="m-auto">{trans[lang].wizardIntentDetails.no}</p>
                    </div>
                </Row>
              </Col>

            </Row>
          </Col>
        </Modal.Body>
      </Modal>
    );
     
    useEffect(() => {
        if(wizardExistingProjectIntents && intentStatus === "old") {

            if(wizardExistingProjectIntents[indexOfIntent]) {
                setGenericResponse(wizardExistingProjectIntents[indexOfIntent].hasOwnProperty('genericAnswer') ? wizardExistingProjectIntents[indexOfIntent].genericAnswer : "");
                setGenericBtns(wizardExistingProjectIntents[indexOfIntent].hasOwnProperty('buttons') ? wizardExistingProjectIntents[indexOfIntent].buttons : [])
                setProducts(wizardExistingProjectIntents[indexOfIntent].hasOwnProperty('answer') ? wizardExistingProjectIntents[indexOfIntent].answer : []);
            }
            setIntentState('update');
        }
        return () => {};
    },[wizardExistingProjectIntents]);
     
    useEffect(() => {
        console.log("Im new", intent, intent.name_fr, lang);
    },[intent]);
    
    return (
        <Col lg={6} className="mb-3" key={indexOfIntent}>
            <div className="d-flex flex-column wizard-config-intents-container">
                
                {/* Header */}
                <Row>
                    <Col lg={12} >
                    {intent.name.toLowerCase() === "quiz"
                    ?
                    <Row 
                        className={isOpen ? "justify-content-between mx-0 p-0 wizard-config-intents-top-row-quiz pl-2 pr-1" : "justify-content-between mx-0 p-0 wizard-config-intents-top-row-quiz-closed pl-2 pr-1"} 
                        style={{background: '#B0BBD0'}} 
                    >
                        <div className="d-flex">
                            {
                            props.lang === "en"
                            ?
                            <p className="my-auto wizard-config-intent-title p-2" style={{color: '#ffffff'}}>{intent.name}</p> 
                            :
                            <p className="my-auto wizard-config-intent-title p-2" style={{color: '#ffffff'}}>{intent.name_fr}</p> 
                            }
                        </div>

                        <div className="d-flex mr-1">
                            <TrashIntentWhite width={16} height={16} className="m-auto" style={{cursor: 'pointer'}} onClick={ () => deleteIntent(intent,indexOfIntent)} />
                            {isOpen
                            ?
                            <IoIosArrowUp color={"#ffffff"} size={17} className="ml-1 mt-auto mb-2" style={{cursor: 'pointer'}} onClick={() => setIsOpen(!isOpen)} />
                            :
                            <IoIosArrowDown color={"#ffffff"} size={17} className="ml-1 mt-auto mb-2" style={{cursor: 'pointer'}} onClick={() => setIsOpen(!isOpen)} />
                            }
                        </div>
                    </Row>
                    :
                    <Row 
                        className={isOpen ? "justify-content-between mx-0 p-0 wizard-config-intents-top-row pl-2 pr-1" : "justify-content-between mx-0 p-0 wizard-config-intents-top-row-closed pl-2 pr-1"}
                        style={{
                            background:  
                                Math.ceil(((indexOfIntent+1)/2)) % 2 != 0 && (indexOfIntent+1) % 2 != 0 ?
                                '#E4E6EB' : 
                                Math.ceil(((indexOfIntent+1)/2)) % 2 != 0 && (indexOfIntent+1) % 2 == 0 ?  
                                '#E5007D' :
                                Math.ceil(((indexOfIntent+1)/2)) % 2 == 0 && (indexOfIntent+1) % 2 != 0 ?
                                '#E5007D' : 
                                Math.ceil(((indexOfIntent+1)/2)) % 2 == 0 && (indexOfIntent+1) % 2 == 0 && 
                                '#E4E6EB' 
                        }}
                    >
                        <div className="d-flex">
                            {
                            props.lang === "en"
                            ?
                            <p 
                                className="my-auto wizard-config-intent-title p-2" 
                                style={{ 
                                    color: 
                                        Math.ceil(((indexOfIntent+1)/2)) % 2 != 0 && (indexOfIntent+1) % 2 != 0 ?
                                        '#818E94' : 
                                        Math.ceil(((indexOfIntent+1)/2)) % 2 != 0 && (indexOfIntent+1) % 2 == 0 ?  
                                        '#ffffff' :
                                        Math.ceil(((indexOfIntent+1)/2)) % 2 == 0 && (indexOfIntent+1) % 2 != 0 ?
                                        '#ffffff' : 
                                        Math.ceil(((indexOfIntent+1)/2)) % 2 == 0 && (indexOfIntent+1) % 2 == 0 && 
                                        '#818E94' 
                                }}
                            >
                            {intent.name}
                            </p> 
                            :
                            <p 
                                className="my-auto wizard-config-intent-title p-2" 
                                style={{ 
                                    color: 
                                        Math.ceil(((indexOfIntent+1)/2)) % 2 != 0 && (indexOfIntent+1) % 2 != 0 ?
                                        '#818E94' : 
                                        Math.ceil(((indexOfIntent+1)/2)) % 2 != 0 && (indexOfIntent+1) % 2 == 0 ?  
                                        '#ffffff' :
                                        Math.ceil(((indexOfIntent+1)/2)) % 2 == 0 && (indexOfIntent+1) % 2 != 0 ?
                                        '#ffffff' : 
                                        Math.ceil(((indexOfIntent+1)/2)) % 2 == 0 && (indexOfIntent+1) % 2 == 0 && 
                                        '#818E94' 
                                }}
                            >
                            {intent.name_fr}
                            </p> 
                            }
                        </div>

                        <div className="d-flex mr-1">
                            {                                
                            Math.ceil(((indexOfIntent+1)/2)) % 2 != 0 && (indexOfIntent+1) % 2 != 0 
                            ?
                            <TrashIntent  width={16} height={16} className="m-auto" style={{cursor: 'pointer'}} onClick={ () => deleteIntent(intent,indexOfIntent)} />
                            : 
                            Math.ceil(((indexOfIntent+1)/2)) % 2 != 0 && (indexOfIntent+1) % 2 == 0 
                            ?  
                            <TrashIntentWhite width={16} height={16} className="m-auto" style={{cursor: 'pointer'}} onClick={ () => deleteIntent(intent,indexOfIntent)} />
                            :
                            Math.ceil(((indexOfIntent+1)/2)) % 2 == 0 && (indexOfIntent+1) % 2 != 0 
                            ?
                            <TrashIntentWhite width={16} height={16} className="m-auto" style={{cursor: 'pointer'}} onClick={ () => deleteIntent(intent,indexOfIntent)} />
                            : 
                            Math.ceil(((indexOfIntent+1)/2)) % 2 == 0 && (indexOfIntent+1) % 2 == 0 
                            && 
                            <TrashIntent  width={16} height={16} className="m-auto" style={{cursor: 'pointer'}} onClick={ () => deleteIntent(intent,indexOfIntent)} />
                            }
                            {isOpen
                            ?
                            <IoIosArrowUp 
                                color={
                                    Math.ceil(((indexOfIntent+1)/2)) % 2 != 0 && (indexOfIntent+1) % 2 != 0 
                                    ?
                                    '#818E94' : 
                                    Math.ceil(((indexOfIntent+1)/2)) % 2 != 0 && (indexOfIntent+1) % 2 == 0 
                                    ?  
                                    '#ffffff' :
                                    Math.ceil(((indexOfIntent+1)/2)) % 2 == 0 && (indexOfIntent+1) % 2 != 0 
                                    ?
                                    '#ffffff' : 
                                    Math.ceil(((indexOfIntent+1)/2)) % 2 == 0 && (indexOfIntent+1) % 2 == 0 
                                    && 
                                    '#818E94' 
                                } 
                                size={17} className="ml-1 mt-auto mb-2" style={{ cursor: 'pointer' }} onClick={() => setIsOpen(!isOpen)} 
                            />
                            :
                            <IoIosArrowDown 
                                color={
                                    Math.ceil(((indexOfIntent+1)/2)) % 2 != 0 && (indexOfIntent+1) % 2 != 0 
                                    ?
                                    '#818E94' : 
                                    Math.ceil(((indexOfIntent+1)/2)) % 2 != 0 && (indexOfIntent+1) % 2 == 0 
                                    ?  
                                    '#ffffff' :
                                    Math.ceil(((indexOfIntent+1)/2)) % 2 == 0 && (indexOfIntent+1) % 2 != 0 
                                    ?
                                    '#818E94' : 
                                    Math.ceil(((indexOfIntent+1)/2)) % 2 == 0 && (indexOfIntent+1) % 2 == 0 
                                    && 
                                    '#ffffff' 
                                } 
                                size={17} className="ml-1 mt-auto mb-2" style={{cursor: 'pointer'}} onClick={() => setIsOpen(!isOpen)} 
                            />
                            }
                        </div>
                    </Row>
                    }
                    </Col>
                </Row>

                {isOpen 
                &&
                <div>
                    <div className="mb-2">
                    <WizardMiracleInput  
                        lang={lang}
                        label={trans[lang].wizardIntentDetails.genericResp}
                        response={GenericResponse} handleResponse={setGenericResponse}
                        showTags={GenericTags} handleTags={setGenericTags}
                        showEmojis={GenericEmojis} handleEmojis={setGenericEmojis}
                        showKeyboard={GenericKeyboard} handleKeyboard={setGenericKeyboard}
                        BtnType={GenericBtnType} handleBtnType={setGenericBtnType}
                        BtnTitle={GenericBtnTitle} handleBtnTitle={setGenericBtnTitle}
                        BtnValue={GenericBtnValue} handleBtnValue={setGenericBtnValue}
                        Btns={GenericBtns} handleBtns={setGenericBtns}
                        platform={props.wizardSelectedPage.platform} reset={resetGeneric}
                        changeBtnColor={setGenericBtnColor} 
                    />
                    </div>

                    <div className="px-2 mx-2" >
                        {/* Save Update Button */}
                        <div  className="d-flex" >
                            <p className="ml-auto remaining-text mb-1 mt-1" >{trans[lang].wizardIntentDetails.remainingChars}{ 640 - GenericResponse.length}</p>
                        </div>

                        <div className="d-flex">
                            {
                                intentState === 'save' 
                                ?
                                (
                                !saveUpdateLoading 
                                ?
                                <div onClick={() => handleSaveGenericResponse(props.intent.name,props.wizardIdProject)} className="ml-auto mb-2 wizard-config-update-btn">
                                    {trans[lang].wizardIntentDetails.save}
                                </div>
                                :
                                <div className="d-flex ml-auto  mb-2 py-2 px-4 wizard-config-update-btn">
                                    <Spinner animation="grow" size="sm" variant="light" className="m-auto" />
                                </div>
                                )
                                :
                                (
                                !saveUpdateLoading 
                                ?
                                <div onClick={() => handleUpdateModal(!updateModal)} className={genericBtnColor ? "ml-auto  mb-2  wizard-config-update-btn-active" : "ml-auto  mb-2  wizard-config-update-btn"}>
                                   {trans[lang].wizardIntentDetails.update}
                                </div>
                                :
                                <div className={genericBtnColor ? "d-flex ml-auto  mb-2 py-2 px-4 wizard-config-update-btn-active" : "d-flex ml-auto  mb-2 py-2 px-4 wizard-config-update-btn"}>
                                    <Spinner animation="grow" size="sm" variant="light" className="m-auto" />
                                </div>
                                )
                            }
                            {/* CONFIRMATION UPDATE RESPONSE */}
                            {updateModal && renderUpdateModal()}
                        </div>

                        {/* ADD PRODUCTS DISABLED BEFORE SAVING A GENERIC RESPONSE JUST STATIC  */}
                        {intentState === "save" &&
                        <Col lg={12} className="mx-auto mt-1">
                            <Row>
                                <Col lg={5} className="d-flex wizard-config-add-product-box mb-3 py-1 px-0" style={{cursor: 'not-allowed', borderColor: '#B4B4B4'}}>
                                    <div className="m-auto d-flex justify-content-around" >
                                        <MdAddCircleOutline className="m-auto" color={"#B4B4B4"} size={18} />
                                        <p className="wizard-config-add-product-name my-auto ml-3" style={{fontFamily: 'Poppins SemiBold',fontSize: '13px', color: '#B4B4B4'}}>{trans[lang].wizardIntentDetails.addProduct}</p>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        }

                        
                        
                        {/* PRODUCTS */}
                        {intentState === 'update' &&
                        <Col lg={12} className="mx-auto mt-1">
                            <Row className="justify-content-between">
                                {products.length > 0 && products.map((product,index) => 
                                    product.product.length > 0 
                                    &&
                                    <Col key={index} lg={5}  className={product.default ? "d-flex flex-row mb-3 py-1  wizard-config-product-box-exist" : "d-flex flex-row mb-3 py-1  wizard-config-product-box "} style={{cursor: 'pointer'}}>
                                        {
                                            product.product.length > 11
                                            ?
                                            <p onClick={(e) => handleSpecificUpdatePopover(e,product)} data-for='entityTip' data-tip={product.product} className={product.default ? "m-auto wizard-config-product-name-exist" : "m-auto wizard-config-product-name"}>
                                                {product.product.substring(0,9)}...
                                            </p>
                                            :
                                            <p onClick={(e) => handleSpecificUpdatePopover(e,product)} className={product.default ? "m-auto wizard-config-product-name-exist" : "m-auto wizard-config-product-name"}>
                                                {product.product}
                                            </p>
                                        }
                                        <AiOutlineCloseCircle className="my-auto ml-1" color={product.default ? "#fff" : "#F49BCC"} size={"20"} style={{cursor: 'pointer'}} onClick={() => deleteProduct(product,index)} />
                                        <ReactTooltip id='entityTip' textColor='#fff' backgroundColor='#E5007D' />
                                    </Col> 
                                    )
                                } 
        
                                <Col lg={5} onClick={handleSpecificPopover} className="d-flex wizard-config-add-product-box mb-3 py-1 px-0" style={{cursor: 'pointer'}}>
                                    <div className=" m-auto  d-flex justify-content-around" >
                                        {/* <MdAddCircleOutline className="m-auto" color={"#E5007D"} size={18} /> */}
                                        <MdAddCircleOutline className="m-auto" color={"#4080FC"} size={18} />
                                        <p className="wizard-config-add-product-name my-auto ml-3" style={{fontFamily: 'Poppins SemiBold',fontSize: '13px'}} >{trans[lang].wizardIntentDetails.addProduct}</p>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        }
                    </div>
                
                </div>
                }
            
            </div>
             
            {/* Specific Response Popover */}
            <div ref={SpecificRef} >
                <Overlay
                    show={SpecificPopover}
                    target={SpecificTarget}
                    container={SpecificRef.current}
                    placement={indexOfIntent % 2 !== 0 ? "left" : "right"}
                > 
                    <Popover id="popover-specific"  > 
                    <Popover.Content  className="p-0" >
                            <div className="d-flex">
                                <IoIosClose className="ml-auto" color={'#9F9F9F'} size={'25'} onClick={handleSpecificPopover} style={{cursor: 'pointer'}} />
                            </div>
                          
                            <div className="mx-2 px-2">
                                <label className="wizard-config-textarea-label">{trans[lang].wizardIntentDetails.productName}</label>
                                <input onChange={(e) => setProductName(e.target.value)} value={productName} className="wizard-config-product-input" />
                            </div>

                            <div className="mb-2">
                                <WizardMiracleInput  
                                    lang={lang}
                                    label={trans[lang].wizardIntentDetails.specificResp}
                                    response={SpecificResponse} handleResponse={SetSpecificResponse}
                                    showTags={SpecificTags} handleTags={setSpecificTags}
                                    showEmojis={SpecificEmoji} handleEmojis={setSpecificEmoji}
                                    showKeyboard={SpecificKeyBoard} handleKeyboard={setSpecificKeyBoard}
                                    BtnType={SpecificBtnType} handleBtnType={setSpecificType}
                                    BtnTitle={SpecificBtnTitle} handleBtnTitle={setSpecificTitle}
                                    BtnValue={SpecificBtnValue} handleBtnValue={setSpecificValue}
                                    Btns={SpecificBtns} handleBtns={setSpecificBtns}
                                    platform={props.wizardSelectedPage.platform} reset={resetSpecific}
                                    changeBtnColor={null}
                                />
                            </div>
                            <div  className="d-flex mx-2" >
                                <p className="ml-auto mr-2 remaining-text mb-1 mt-1" >{trans[lang].wizardIntentDetails.remainingChars}{ 640 - SpecificResponse.length}</p>
                            </div>

                            <div className="mr-2 px-2  d-flex">
                                <div className="ml-auto mb-2  wizard-config-update-btn" onClick={() => addNewProduct(props.wizardIdProject)}>{trans[lang].wizardIntentDetails.add}</div>
                            </div>
                        </Popover.Content>
                    </Popover>
                </Overlay>
            </div>
            
            {/* Specific Response Update Popover */}
            <div ref={SpecificUpdateRef} >
                <Overlay
                    show={SpecificUpdatePopover}
                    target={SpecificUpdateTarget}
                    container={SpecificUpdateRef.current}
                    placement={indexOfIntent % 2 !== 0 ? "left" : "right"}
                >
                    <Popover id="popover-specific"   > 
                        <Popover.Content  className="p-0">
                            <div className="d-flex">
                                <IoIosClose className="ml-auto" color={'#9F9F9F'} size={'25'} onClick={resetUpdateSpecific} style={{cursor: 'pointer'}} />
                            </div>

                            <div className="mx-2 px-2">
                                <label className="wizard-config-textarea-label">{trans[lang].wizardIntentDetails.productName}</label>
                                <input onChange={(e) => setProductUpdateName(e.target.value)} value={productUpdateName} disabled={true} style={{cursor: 'not-allowed'}} className="wizard-config-product-input" />
                            </div>

                            <div className="mb-2">
                                <WizardMiracleInput  
                                    lang={lang}
                                    label={trans[lang].wizardIntentDetails.updateSpecificResp}
                                    response={SpecificUpdateResponse} handleResponse={SetSpecificUpdateResponse}
                                    showTags={SpecificUpdateKeyBoard} handleTags={setSpecificUpdateKeyBoard}
                                    showEmojis={SpecificUpdateEmoji} handleEmojis={setSpecificUpdateEmoji}
                                    showKeyboard={SpecificUpdateTags} handleKeyboard={setSpecificUpdateTags}
                                    BtnType={SpecificUpdateBtnType} handleBtnType={setSpecificUpdateType}
                                    BtnTitle={SpecificUpdateBtnTitle} handleBtnTitle={setSpecificUpdateTitle}
                                    BtnValue={SpecificUpdateBtnValue} handleBtnValue={setSpecificUpdateValue}
                                    Btns={SpecificUpdateBtns} handleBtns={setSpecificUpdateBtns}
                                    platform={props.wizardSelectedPage.platform} reset={resetUpdateSpecific}
                                    changeBtnColor={setSpecificBtnColor}
                                />
                            </div>
                            <div  className="d-flex mx-2" >
                                <p className="ml-auto mr-2 remaining-text mb-1 mt-1" >{trans[lang].wizardIntentDetails.remainingChars}{ 640 - SpecificResponse.length}</p>
                            </div>
                            <div className="mr-2 px-2 d-flex">
                                <div className={specificBtnColor ? "ml-auto mb-2  wizard-config-update-btn-active" : "ml-auto mb-2  wizard-config-update-btn"} onClick={() => updateProduct(props.wizardIdProject)}>{trans[lang].wizardIntentDetails.update}</div>
                            </div>
                        </Popover.Content>
                    </Popover>
                </Overlay>
            </div>

            {/* Categories Modal */}
            <Modal show={CategorieModal} onHide={handleCategoriesModal} centered>
                <Modal.Body>          
                    <Row className="d-flex mb-3">
                        <IoIosClose className="ml-auto mr-3" color={'#9F9F9F'} size={'28'} onClick={handleCategoriesModal} style={{cursor: 'pointer'}} />
                    </Row>

                    <Row className="d-flex mb-3">
                        <p className="m-auto wizard-config-intent-title">{trans[lang].wizardIntentDetails.specifyCategory}</p>
                    </Row>

                    <Row className="mb-3">
                        <Col lg={1} />

                        <Col lg={10} className="d-flex justify-content-between p-0 mx-0">
                            <Col lg={8} className="d-flex">
                                {showModalInput && 
                                    <input 
                                        type="text" 
                                        className="mr-auto w-100 my-auto add-new-category-input-container" 
                                        onChange={(e) => setNewCategory(e.target.value)}
                                        value={newCategory}
                                    />
                                }
                            </Col>

                            <Col lg={4} className="d-flex">
                                {!showModalInput
                                &&
                                <p className="ml-auto my-auto wizard-config-intent-name" style={{cursor: 'pointer'}} onClick={() => setShowModalInput(true)}>
                                    {trans[lang].wizardIntentDetails.createNew}
                                </p>
                                }
                            </Col>
                        </Col>

                        <Col lg={1} />
                    </Row>

                    <Row>
                        <Col lg={1} />

                        <Col lg={10}>
                            <Form.Group className="d-flex w-100">
                                <Form.Control 
                                    className="wizard-config-intent-title" 
                                    as="select" 
                                    disabled={showModalInput || allCategories.length === 0} 
                                    onChange={(e) => setCategorySelected(e.target.value)}
                                    value={categorySelected} 
                                    custom
                                >
                                    <option className="wizard-config-intent-title">{trans[lang].wizardIntentDetails.chooseCategory}</option>
                                    {allCategories.length > 0 
                                    && 
                                    allCategories.map((category,index) => 
                                        <option key={index} className="wizard-config-intent-title" value={category.name}>{category.name}</option>
                                    )}
                                </Form.Control>
                            </Form.Group>
                        </Col>

                        <Col lg={1} /> 
                    </Row>
                    
                    <Row className="mb-3">
                        {showModalInput
                        ?
                        <div 
                            className="m-auto mb-2 py-3 px-4 wizard-config-update-btn" 
                            style={{backgroundColor: '#009EE3', cursor:'pointer' }} 
                            onClick={() => pushNewCategory()}
                        >
                        {trans[lang].wizardIntentDetails.create}
                        </div>
                        :
                        <div 
                        className="m-auto mb-2 py-3 px-4 wizard-config-update-btn" 
                        style={{backgroundColor: allCategories.length > 0 && categorySelected ? '#009EE3' : '#707070', cursor: allCategories.length > 0 && categorySelected ? 'pointer' : 'not-allowed', }} 
                        onClick={() => allCategories.length > 0 && categorySelected ? addNewProductViaModal(props.wizardIdProject) : null}
                        >
                        {trans[lang].wizardIntentDetails.add}
                        </div>
                        }
                    </Row>
                </Modal.Body>
            </Modal>
            
        </Col>
    )
}

const mapStateToProps = (state) => ({
    lang: state.socialMediaR.lang,
    wizardIdProject: state.wizardR.wizardIdProject,
    wizardIntentType: state.wizardR.wizardIntentType,
    wizardSelectedPage: state.wizardR.wizardSelectedPage,
    wizardSelectedPost: state.wizardR.wizardSelectedPost,
    wizardExistingProjectIntents: state.wizardR.wizardExistingProjectIntents,
})

export default connect(mapStateToProps, { addGenericResponse, updateGenericResponse })(WizardIntentDetails)
import React, { useState, useEffect, Fragment } from 'react'
import { connect } from 'react-redux'
import { toggleIntent, getAllEntity, addproduct, removeProduct, updateproduct, removeEntityProject, addReponseGeneric, getConnectedPagesProject, togglePopup, updateReponseGeneric, showCategoryPoppup, hideCategoryPoppup, checkProduct } from '../actions'
import { withRouter } from 'react-router-dom'
import EntityForm from './EntityForm'
import { store } from '../index'
import Popup from "reactjs-popup";
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
import layout from "simple-keyboard-layouts/build/layouts/arabic";

function IntentContainerTable(props) {
    const [showEntity, setShowEntity] = useState(false)
    const [entetyVal, setEntetysVal] = useState('')
    const [genericAnswerState, setgenericAnswerState] = useState(null)
    const [reponseGeneric, setReponseGeneric] = useState('')
    const [reponseSpecefic, setReponseSpecefic] = useState('')
    const [productId, setproductId] = useState('')
    const [productExist, setProductExist] = useState('')
    const [modal, setModal] = useState(false)
    const [ShowPopup, setShowPopup] = useState(false)
    const [showKeyBoard, setshowKeyBoard] = useState(false)
    const [category, setcategory] = useState('')
    const [showCategoryList, setshowCategoryList] = useState(false)
    const [showCategoryListPoppup, setshowCategoryListPoppup] = useState(false)


    const showentityForm = (synonyms, preAnswer, product) => {
        setShowEntity(false)
        setReponseGeneric(synonyms)
        setReponseSpecefic(preAnswer)
        setEntetysVal(product)
        setTimeout(() => {
            setShowEntity(true)
        }, 100)
    }
    const intentHandelSubmit = (e, intent) => {
        e.preventDefault()
        if (!genericAnswerState)
            // console.log({ genericAnswer: reponseGeneric, entity: entetyVal, speceficAnswer: reponseSpecefic, intent }, props.porject._id)
            props.addReponseGeneric({ genericAnswer: reponseGeneric, entity: entetyVal, speceficAnswer: reponseSpecefic, intent }, props.porject._id)
                .then(() => props.getAlllProjects())
                .then(() => props.getAllEntitys(props.fb))
        else
            // console.log({ genericAnswer: reponseGeneric, entity: entetyVal, speceficAnswer: reponseSpecefic, intent, id: productId }, props.porject._id)
            props.updateReponseGeneric({ genericAnswer: reponseGeneric, entity: entetyVal, speceficAnswer: reponseSpecefic, intent, id: productId }, props.porject._id)
                .then(() => props.getAlllProjects())
                .then(() => props.getAllEntitys(props.fb))
    }
    const entityHandelSubmit = (e, intent) => {
        e.preventDefault()
        const intents = props.porject.intents.find(el => el.name == intent) || []
        let exist
        for (let element of intents.answer) {
            if (element.product == entetyVal) {
                exist = true
                break
            } else {
                exist = false
            }
        };

        if (productId == '') {
            if (!exist) {
                props.checkProduct({ genericAnswer: reponseGeneric, entity: entetyVal, speceficAnswer: reponseSpecefic, intent }, props.porject._id)
                    .then(() => {
                        console.log(store.getState())
                        if (!store.getState().showAddCategory) {
                            // addProduct(intent)
                            props.getAlllProjects()
                                .then(() => props.getAllEntitys(props.fb))
                                .then(() => setProductExist(''))

                        } else {
                            setshowCategoryListPoppup(true)
                        }

                    })
            } else {
                setProductExist('Product exist')
            }
        }
        else {
            props.updateProduct({ genericAnswer: reponseGeneric, entity: entetyVal, speceficAnswer: reponseSpecefic, intent, id: productId }, props.porject._id)
                .then(() => props.getAlllProjects())
                .then(() => props.getAllEntitys(props.fb))
        }

    }

    const addProduct = (intent) => {
        props.addproduct({ genericAnswer: reponseGeneric, entity: entetyVal, speceficAnswer: reponseSpecefic, categorie: category, intent }, props.porject._id)
            .then(() => props.getAlllProjects())
            .then(() => props.getAllEntitys(props.fb))
            .then(() => {
                const entitys = store.getState().allProjects.find(el => el.post.idPost == props.match.params.idpost).entities
                entitys[entitys.length - 1] && entitys[entitys.length - 1].name == entetyVal && !entitys[entitys.length - 1].default && props.porject.live ? togglePopup() : console.log('project is not live ', entitys)

            })
    }
    useEffect(() => {

        setReponseGeneric(typeof props.intents !== 'undefined' ? props.intents.genericAnswer : '')
        setgenericAnswerState(typeof props.intents !== 'undefined' ? props.intents.genericAnswer : null)
        // setReponseSpecefic(typeof props.intents !== 'undefined' ? props.intents.answer[0].preAnswer : '')
        // setEntetysVal(typeof props.intents !== 'undefined' ? props.intents.answer[0].product : '')
        console.log(props.intents)
    }, [])
    const removeData = () => {
        if (props.porject.intents.find(el => el.name === props.selectedEntent)) {
            props.rmProduct({ genericAnswer: reponseGeneric, entity: entetyVal, speceficAnswer: reponseSpecefic, intent: props.selectedEntent }, props.porject._id);
            props.removeSelectedIntent(props.selectedEntent)
        } else {
            props.removeSelectedIntent(props.selectedEntent)
        }
    }
    const togglePopup = () => {
        props.togglePopup(true)
        setTimeout(() => {
            props.togglePopup(false)
        }, 5000)
    }

    const onChange = (input) => {
        console.log("Input changed", input);
        setReponseGeneric(input)
    }

    const onKeyPress = (button) => {
        console.log("Button pressed", button);
        if (button.toString() == "{enter}") {
            setshowKeyBoard(false)
        }
    }

    return (
        <div className="step3" style={{
            width: "45%",
            borderRadius: "10px",
            border: "2px solid lightgray",
            margin: "10px 2% 10px 2%",
            display: "inline-block",
            position: "relative",
            overflow: props.show ? "visible" : "hidden"
        }}>
            <Popup
                open={showCategoryListPoppup}
                modal
                closeOnDocumentClick={false}
            >
                {close => (
                    <div style={{ textAlign: "center", padding: 40, position: "relative" }}>
                        <svg onClick={() => { props.hideCategoryPoppup() }} style={{ position: "absolute", top: 15, right: 15 }} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"><g fill="#818e94" data-name="Icon ionic-ios-close-circle-outline" transform="translate(-3.375 -3.375)"><path d="M19.231 18.231L16.9 15.9l2.329-2.329a.706.706 0 00-1-1L15.9 14.9l-2.329-2.329a.706.706 0 00-1 1l2.334 2.329-2.329 2.329a.683.683 0 000 1 .7.7 0 001 0L15.9 16.9l2.329 2.329a.709.709 0 001 0 .7.7 0 00.002-.998z" data-name="Tracé 213" transform="translate(-3.529 -3.527)"></path><path d="M12.375 4.587a7.785 7.785 0 11-5.508 2.28 7.737 7.737 0 015.508-2.28m0-1.212a9 9 0 109 9 9 9 0 00-9-9z" data-name="Tracé 214"></path></g></svg>
                        <p style={{
                            marginBottom: 30,
                            color: "#b4b4b4",
                            fontWeight: "bold"
                        }}>Please specify the category</p>
                        <div style={{ position: 'relative' }}>
                            {/* <select value={category} style={{
                                display: "block",
                                width: "100%",
                                padding: "10px",
                                color: "gray",
                                borderColor: "gainsboro",
                                marginBottom: "30px"
                            }} onChange={(e) => { setcategory(e.target.value) }}>
                                <option value="Choose category" selected>Choose category</option>
                                {props.entitys.map(el => <option key={el._id} value={el.name}>{el.name}</option>)}
                            </select> */}
                            <input value={category} style={{
                                display: "block",
                                width: "100%",
                                padding: "10px",
                                color: "gray",
                                borderColor: "gainsboro",
                                boxSizing: "border-box",
                            }} onChange={(e) => { setcategory(e.target.value); setshowCategoryList(true) }} type="text" placeholder="Choose category" required />
                            {
                                showCategoryList && category.length !== 0 &&
                                <div style={{
                                    position: "absolute",
                                    width: "100%",
                                    left: 0,
                                    right: 0,
                                    padding: 10,
                                    boxSizing: "border-box",
                                    textAlign: "left",
                                    background: "#fff",
                                    boxShadow: "0 0 10px lightgrey",
                                    maxHeight: "200px",
                                    overflowY: "scroll"
                                }}>
                                    {
                                        props.entitys.map(el => category.length == 0 ? <div key={el._id}>{el.name}</div> : el.name.toUpperCase().includes(category.toUpperCase()) && <div key={el._id} className="hoverLIst" style={{
                                            padding: "10px 0", cursor: "pointer",
                                            paddingLeft: "10px"
                                        }} onClick={() => {
                                            setcategory(el.name);
                                            setshowCategoryList(false)
                                        }}>{el.name}</div>)
                                    }
                                </div>
                            }
                        </div>
                        <button style={{
                            marginTop: 30,
                            border: "none",
                            background: "#4080ff",
                            color: "#fff",
                            padding: "15px 40px",
                            cursor: "pointer",
                            height: "55px"
                        }} onClick={e => {
                            addProduct(props.selectedEntent)
                            setshowCategoryListPoppup(false)
                        }}>Save</button>

                    </div>
                )}
            </Popup>

            <Popup
                open={modal}
                modal
                closeOnDocumentClick
            >
                {close => (
                    <div style={{ textAlign: "center", padding: 40, position: "relative" }}>
                        <svg onClick={() => { setModal(false) }} style={{ position: "absolute", top: 15, right: 15 }} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"><g fill="#818e94" data-name="Icon ionic-ios-close-circle-outline" transform="translate(-3.375 -3.375)"><path d="M19.231 18.231L16.9 15.9l2.329-2.329a.706.706 0 00-1-1L15.9 14.9l-2.329-2.329a.706.706 0 00-1 1l2.334 2.329-2.329 2.329a.683.683 0 000 1 .7.7 0 001 0L15.9 16.9l2.329 2.329a.709.709 0 001 0 .7.7 0 00.002-.998z" data-name="Tracé 213" transform="translate(-3.529 -3.527)"></path><path d="M12.375 4.587a7.785 7.785 0 11-5.508 2.28 7.737 7.737 0 015.508-2.28m0-1.212a9 9 0 109 9 9 9 0 00-9-9z" data-name="Tracé 214"></path></g></svg>
                        <p style={{
                            marginBottom: 30,
                            color: "#b4b4b4",
                            fontWeight: "bold"
                        }}>Your update will be live and visible for your user</p>
                        <button style={{
                            border: "none",
                            background: "#e5007d",
                            color: "#fff",
                            padding: "15px 40px",
                            cursor: "pointer",
                            height: "55px"
                        }} onClick={e => {
                            intentHandelSubmit(e, props.selectedEntent)
                        }}>Yes</button>
                        <button style={{
                            boxSizing: "border-box",
                            border: "2px solid #e5007d",
                            background: "transparent",
                            color: "#e5007d",
                            padding: "15px 40px",
                            cursor: "pointer",
                            height: "55px",
                            marginLeft: 50
                        }} onClick={() => { setModal(false) }}>No</button>
                    </div>
                )}
            </Popup>
            <h4 style={{
                background: "#F9F9F9",
                display: "flex",
                fontWeight: "bold",
                margin: "0",
                padding: "15px 20px",
                borderBottom: props.show ? "2px solid lightgray" : "none",
                justifyContent: "space-between",
                alignItems: "center",
                borderTopRightRadius: 10,
                borderTopLeftRadius: 10
            }}>{props.selectedEntent}<div><svg onClick={removeData} xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 27 28.786" style={{ cursor: "pointer" }}><g fill="none" stroke="rgb(129, 142, 148)" strokeLinecap="square" strokeMiterlimit="10" strokeWidth="2" transform="translate(-3 -1)"><path d="M26.322 9.143V27a1.786 1.786 0 01-1.786 1.786H8.465A1.786 1.786 0 016.679 27V9.143" data-name="Tracé 429"></path><path d="M0 0L0 10" data-name="Ligne 25" transform="translate(17 13.786)"></path><path d="M0 0L0 10" data-name="Ligne 26" transform="translate(12 13.786)"></path><path d="M0 0L0 10" data-name="Ligne 27" transform="translate(21 13.786)"></path><path d="M12.036 6.464V2h8.929v4.464" data-name="Tracé 430"></path><path d="M25 0L0 0" data-name="Ligne 28" transform="translate(4 6.786)"></path></g></svg><div style={{
                height: "10px",
                transform: "translateY(-5px) rotate(135deg)",
                width: "10px",
                marginLeft: "20px",
                display: "inline-block",
                borderTop: "1.5px solid grey",
                borderRight: "1.5px solid grey",
                cursor: "pointer"
            }} onClick={() => {
                props.toggleIntent({ show: !props.show, name: props.selectedEntent })
            }}></div></div></h4>
            {props.show && <form id="formEntityWizard" onSubmit={(e) => {
                if (!genericAnswerState) {
                    intentHandelSubmit(e, props.selectedEntent)
                } else {
                    e.preventDefault()
                    setModal(true)
                }
            }} style={{ display: 'flex', flexDirection: 'column', padding: "15px 20px" }}>
                <label style={{
                    fontFamily: "poppins",
                    marginBottom: "10px",
                    fontSize: "14px",
                    fontWeight: "bold"
                }}>Generic response</label>
                <textarea type="text" style={{
                    padding: "8px",
                    border: "2px solid lightgray",
                    borderRadius: "5px",
                    outline: "none",
                    height: "70px"
                }} onChange={e => setReponseGeneric(e.target.value)} value={reponseGeneric} required />
                <div>
                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                        {showKeyBoard &&
                            <div style={{
                                position: "absolute",
                                left: -190,
                                bottom: -100
                            }}>
                                <Keyboard
                                    onChange={onChange}
                                    onKeyPress={onKeyPress}
                                    layout={layout}
                                />
                            </div>
                        }
                        <span style={{
                            margin: "10px 5px",
                            width: 41,
                            background: "rgb(249, 249, 249)",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: 40,
                            border: "1px solid lightgray",
                            cursor: 'pointer'
                        }} onClick={() => setshowKeyBoard(!showKeyBoard)}>ع</span>
                        <button type="submit" style={{
                            border: "none",
                            background: "transparent",
                            padding: 0,
                            margin: "10px 5px"
                        }}>
                            <svg width={100} height={40} viewBox="0 0 100 40">
                                <g data-name="Groupe 1132" transform="translate(-1210 -782)">
                                    <rect
                                        data-name="Rectangle 1563"
                                        width={100}
                                        height={40}
                                        rx={2}
                                        transform="translate(1210 782)"
                                        fill="#4080ff"
                                    />
                                    <text
                                        transform={`translate(${genericAnswerState ? 1235 : 1243} 807)`}
                                        fill="#fff"
                                        fontSize={14}
                                        fontFamily="Poppins-SemiBold, Poppins"
                                        fontWeight={600}
                                    >
                                        <tspan x={0} y={0}>
                                            {genericAnswerState ? "Update" : "Save"}
                                        </tspan>
                                    </text>
                                </g>
                            </svg>
                        </button>

                    </div>
                    <div style={{ display: 'flex', flexWrap: "wrap" }}>
                        {props.intents && props.intents.answer.map((el, i) =>
                            el.product && el.product.trim().length > 0 && <div key={el._id} onClick={(e) => {
                                if (e.target.classList.contains("removeSvg")) return;

                                showentityForm(props.intents.genericAnswer, el.preAnswer, el.product);
                                setproductId(el._id)
                            }} style={{
                                margin: "10px 5px",
                                cursor: "pointer",
                                padding: "10px 10px",
                                color: props.porject.entities.find(Element => Element._id === el._id) && props.porject.entities.find(Element => Element._id === el._id).default ? "#fff" : "#818E94",
                                display: "flex",
                                alignItems: "center",
                                border: `2px solid ${props.porject.entities.find(Element => Element._id === el._id) && props.porject.entities.find(Element => Element._id === el._id).default ? "#009EE3" : ""}`,
                                fontWeight: "500",
                                fontFamily: "poppins",
                                borderRadius: "5px",
                                fontSize: "16px",
                                background: props.porject.entities.find(Element => Element._id === el._id) && props.porject.entities.find(Element => Element._id === el._id).default ? "#009EE3" : "transparent"
                            }} >
                                {el.product}

                                {/* <svg onClick={() => { showentityForm(props.intents.genericAnswer, el.preAnswer, el.product); setproductId(el._id) }} style={{ margin: "0px 8px" }} xmlns="http://www.w3.org/2000/svg" width="18.003" height="18.002" viewBox="0 0 18.003 18.002">
                                    <path id="Tracé_428" data-name="Tracé 428" d="M3,17.25V21H6.75L17.81,9.94,14.06,6.19ZM20.71,7.04a1,1,0,0,0,0-1.41L18.37,3.29a1,1,0,0,0-1.41,0L15.13,5.12l3.75,3.75,1.83-1.83Z" transform="translate(-3 -2.998)" fill={props.porject.entities.find(Element => Element._id === el._id) && props.porject.entities.find(Element => Element._id === el._id).default ? `#fff` : "#818e94"} />
                                </svg> */}
                                <svg className="removeSvg" onClick={() => {
                                    // console.log('clicking')
                                    // const confirm = window.confirm("this will remove all reponses that used this product")
                                    // if (confirm)
                                    props.removeEntity(props.porject._id, { _id: el._id, name: el.product })
                                        .then(() => props.getAlllProjects())
                                }}
                                    style={{ cursor: 'pointer', marginLeft: 10 }}
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="18"
                                    height="18"
                                    cursor="pointer"
                                    viewBox="0 0 18 18"
                                >
                                    <g
                                        fill={props.porject.entities.find(Element => Element._id === el._id) && props.porject.entities.find(Element => Element._id === el._id).default ? `#fff` : `#E5007D`}
                                        data-name="Groupe 1163"
                                        transform="translate(-3.375 -3.375)"
                                    >
                                        <path
                                            d="M19.231 18.231L16.9 15.9l2.329-2.329a.706.706 0 00-1-1L15.9 14.9l-2.329-2.329a.706.706 0 00-1 1l2.334 2.329-2.329 2.329a.683.683 0 000 1 .7.7 0 001 0L15.9 16.9l2.329 2.329a.709.709 0 001 0 .7.7 0 00.002-.998z"
                                            data-name="Tracé 213"
                                            transform="translate(-3.529 -3.527)"
                                        ></path>
                                        <path
                                            d="M12.375 4.587a7.785 7.785 0 11-5.508 2.28 7.737 7.737 0 015.508-2.28m0-1.212a9 9 0 109 9 9 9 0 00-9-9z"
                                            data-name="Tracé 214"
                                        ></path>
                                    </g>
                                </svg>
                            </div>
                        )}
                        {
                            genericAnswerState ?
                                <svg style={{ margin: "10px 5px" }} onClick={() => {
                                    showentityForm(reponseGeneric, '', '');
                                    setproductId('')
                                }}
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="156"
                                    height="40"
                                    viewBox="0 0 156 40"
                                >
                                    <g fill="#fff" strokeDasharray="3" data-name="Tracé 416">
                                        <path d="M3.525 0h148.95A3.785 3.785 0 01156 4v32a3.785 3.785 0 01-3.525 4H3.525A3.785 3.785 0 010 36V4a3.785 3.785 0 013.525-4z"></path>
                                        <path
                                            fill="#4080fc"
                                            d="M3.525 0h3v1h-3V0zm6 0h3v1h-3V0zm6 0h3v1h-3V0zm6 0h3v1h-3V0zm6 0h3v1h-3V0zm6 0h3v1h-3V0zm6 0h3v1h-3V0zm6 0h3v1h-3V0zm6 0h3v1h-3V0zm6 0h3v1h-3V0zm6 0h3v1h-3V0zm6 0h3v1h-3V0zm6 0h3v1h-3V0zm6 0h3v1h-3V0zm6 0h3v1h-3V0zm6 0h3v1h-3V0zm6 0h3v1h-3V0zm6 0h3v1h-3V0zm6 0h3v1h-3V0zm6 0h3v1h-3V0zm6 0h3v1h-3V0zm6 0h3v1h-3V0zm6 0h3v1h-3V0zm6 0h3v1h-3V0zm6 0h3v1h-3V0zm5.981.174c.158.055.312.122.46.2l.005.003.005.003.005.002.005.003.005.003a.076.076 0 01.005.002l.005.003.004.003h.002a.6.6 0 01.003.002l.001.001.004.002h.001l.004.003h.001l.004.003h.001l.005.003c.002 0 .003.002.005.003l.01.005.015.009.005.003a.245.245 0 00.01.005l.001.001.003.002.002.001.003.002.002.001.003.002.002.001.002.001.003.002.002.001.003.002.002.001.003.002h.002l.003.002.002.002.002.001.003.002.002.001.002.001a.516.516 0 01.008.005l.002.001.003.002.002.001.003.002h.001l.003.003a.054.054 0 01.005.003h.001a.905.905 0 01.06.038l.004.003.005.003.005.003.004.003.005.003.005.003a3.667 3.667 0 01.915.864l.004.005c0 .002.002.003.003.005a2.488 2.488 0 01.007.009l.003.004.004.005c0 .002.002.003.003.005l.064.088c0 .002.002.003.003.005l.003.004.003.005a.93.93 0 00.006.01l.004.004a4.035 4.035 0 01.051.077l.006.01.003.004c.002.002.003.003.003.005h.001l.003.005.003.005a.63.63 0 00.003.005l.003.005.003.005.003.005.003.004v.001a.639.639 0 00.007.01l.03.049.003.004c0 .002.002.004.003.005 0 .002.002.004.003.005 0 .002.002.003.003.005v.001l.002.004.001.001.002.004.001.001.002.004.001.001.002.004.001.001.002.004.001.001.002.004.001.001.002.004v.001l.003.004V1.8l.003.004v.001l.003.004v.001a.527.527 0 01.004.005l.04.07v.001l.002.005.003.005c0 .002.002.003.003.005l.002.005.003.005.003.005v.001l.003.004v.001l.002.005a.7.7 0 00.005.01h.001l.046.089.002.005.003.005.003.005.002.006.003.005.064.136-.912.41c-.32-.714-.877-1.253-1.527-1.478l.327-.945zM155 5.134h1v3h-1v-3zm0 6h1v3h-1v-3zm0 6h1v3h-1v-3zm0 6h1v3h-1v-3zm0 6h1v3h-1v-3zm0 6h1v.92a.807.807 0 010 .009v.006a.089.089 0 000 .01v.01l-.001.006V36.115a1.31 1.31 0 000 .009V36.133l-.001.005V36.165l-.001.002v.024l-.001.002v.018l-.001.006v.017l-.001.003v.015l-.001.003v.015a.251.251 0 00-.002.015v.014l-.001.004V36.316l-.001.005v.008a.336.336 0 01-.001.007v.007l-.001.003v.012l-.001.004v.007l-.001.003v.007l-.001.005v.01l-.001.003v.008l-.002.01v.012l-.001.002-.001.01V36.449l-.001.005-.002.012v.008l-.002.017v.007h-.001a3.33 3.33 0 01-.002.019v.006l-.003.019c-.052.44-.168.859-.337 1.242l-.007.016-.002.005v.001l-.007.015v.001l-.003.005v.001l-.007.014v.002l-.003.004v.003c-.002.001-.002.003-.003.005l-.002.004-.001.003-.002.004-.001.002-.003.005v.002a.749.749 0 01-.003.006l-.001.002-.002.005-.001.002a1.09 1.09 0 01-.004.006c0 .003-.002.005-.003.007v.001l-.003.006-.007.015-.007.014-.004.008a4.17 4.17 0 01-.054.106l-.884-.467c.25-.475.383-1.023.383-1.586v-.866zm-1.997 3.8l.247.969h-.004l-.005.002h-.002l-.004.002h-.002l-.003.001h-.003l-.003.001h-.002l-.004.002h-.002l-.003.001h-.002l-.004.002h-.006v.001l-.005.001a3.143 3.143 0 01-.478.074l-.005.001h-.006-.005-.002l-.004.001h-.006a1.558 1.558 0 01-.034.002l-.004.001a.285.285 0 00-.006 0h-.006-.002l-.004.001h-.006a.332.332 0 01-.005 0h-.003-.005l-.004.001H152.6h-.002-.003-.003a.951.951 0 01-.005.001h-.004-.006-.006H152.558l-.003.001h-.006a1.387 1.387 0 01-.006 0h-.006-.006-.006-.003-.003-.006a.623.623 0 01-.006 0h-.003-.003-.006-.002l-.004.001h-.007-.007-2.217v-1h2.217c.178 0 .356-.022.528-.066zm-8.745.066h3v1h-3v-1zm-6 0h3v1h-3v-1zm-6 0h3v1h-3v-1zm-6 0h3v1h-3v-1zm-6 0h3v1h-3v-1zm-6 0h3v1h-3v-1zm-6 0h3v1h-3v-1zm-6 0h3v1h-3v-1zm-6 0h3v1h-3v-1zm-6 0h3v1h-3v-1zm-6 0h3v1h-3v-1zm-6 0h3v1h-3v-1zm-6 0h3v1h-3v-1zm-6 0h3v1h-3v-1zm-6 0h3v1h-3v-1zm-6 0h3v1h-3v-1zm-6 0h3v1h-3v-1zm-6 0h3v1h-3v-1zm-6 0h3v1h-3v-1zm-6 0h3v1h-3v-1zm-6 0h3v1h-3v-1zm-6 0h3v1h-3v-1zm-6 0h3v1h-3v-1zm-6 0h3v1h-3v-1zm-4.672-1.083c.44.626 1.08 1.018 1.757 1.075l-.085.997a3.172 3.172 0 01-1.134-.318l-.005-.002-.005-.002-.005-.003-.005-.002a3.276 3.276 0 01-.068-.035l-.005-.003-.005-.003-.005-.002-.004-.003h-.001l-.004-.002H2.01l-.004-.003h-.001l-.004-.003-.005-.002v-.001l-.005-.002-.004-.003h-.001a3.435 3.435 0 01-.038-.021l-.004-.002-.001-.001-.004-.002-.004-.003h-.002l-.003-.003h-.002l-.003-.002-.002-.001-.003-.002-.001-.001a.547.547 0 01-.004-.002h-.001l-.003-.003a.152.152 0 01-.007-.004l-.003-.001-.002-.001-.003-.002-.001-.001-.004-.002h-.001l-.004-.003-.004-.003a3.429 3.429 0 01-.014-.008l-.004-.002-.001-.001-.004-.003a.127.127 0 01-.006-.003l-.003-.002-.002-.001-.002-.002a.83.83 0 01-.003-.001l-.002-.002-.002-.001-.003-.002-.002-.001-.003-.002-.002-.001-.003-.002a.308.308 0 00-.005-.003l-.002-.001a.427.427 0 00-.002-.002l-.003-.001-.002-.002-.002-.001-.003-.002-.002-.001-.003-.002-.002-.001-.002-.002-.003-.001-.002-.002-.002-.001-.003-.002-.002-.002a1.2 1.2 0 01-.006-.003l-.001-.001-.003-.002-.002-.001-.002-.002-.003-.001-.002-.002-.003-.001-.002-.002-.002-.001-.002-.002-.003-.002h-.002l-.003-.003-.002-.001-.003-.002-.002-.001-.002-.002-.002-.001-.003-.002-.002-.001-.003-.002-.002-.002-.002-.001-.002-.002-.003-.002-.002-.001-.003-.002-.002-.001-.003-.002-.002-.001-.002-.002-.002-.002a.825.825 0 00-.003-.002h-.002l-.01-.007-.004-.004a.833.833 0 00-.005-.003l-.004-.003-.002-.001-.003-.002-.002-.001a.605.605 0 01-.003-.003h-.001l-.003-.003-.002-.001a.494.494 0 00-.004-.003l-.004-.003h-.001l-.004-.003-.004-.003-.001-.001-.004-.003H1.64l-.004-.003a.067.067 0 01-.005-.004l-.004-.003h-.001l-.005-.004a3.34 3.34 0 01-.028-.02l-.004-.004-.005-.004-.004-.003h-.001l-.004-.003v-.001l-.005-.003-.004-.003-.001-.001-.004-.003-.005-.004-.004-.003h-.001l-.004-.004a.926.926 0 00-.004-.003h-.001a3.63 3.63 0 01-.037-.03l-.004-.003-.005-.003v-.001a2.79 2.79 0 01-.004-.003l-.005-.004-.004-.003-.004-.004a.067.067 0 01-.005-.004 1.095 1.095 0 00-.01-.007l-.004-.004a.779.779 0 01-.053-.045h-.002c0-.002-.002-.003-.003-.004H1.4a.596.596 0 01-.004-.004l-.004-.003v-.001l-.004-.003h-.001l-.004-.004a1 1 0 01-.005-.004l-.004-.004-.005-.004a3.63 3.63 0 01-.03-.027l-.004-.004h-.001a1.052 1.052 0 00-.004-.004l-.004-.004h-.001a.466.466 0 01-.003-.004h-.001l-.004-.004-.004-.004-.004-.004h-.001l-.004-.004-.004-.003v-.001l-.004-.004h-.001a3.532 3.532 0 01-.03-.028l-.004-.004-.004-.004-.001-.001a.664.664 0 00-.004-.004l-.004-.003v-.001l-.004-.003v-.001l-.004-.003-.001-.002-.003-.002-.001-.002-.003-.002-.002-.002a.592.592 0 00-.007-.006v-.002c-.002 0-.003-.002-.004-.003l-.004-.004h-.001a.757.757 0 00-.004-.004l-.004-.004a2.368 2.368 0 01-.01-.01l-.003-.003V39l-.004-.003v-.001l-.004-.004h-.001l-.003-.004a.144.144 0 01-.004-.004l-.002-.001-.002-.003-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.003-.003v-.001l-.003-.003-.002-.001-.002-.003-.002-.002-.002-.002-.002-.002a.24.24 0 01-.002-.002l-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.003-.004h-.001l-.004-.005-.002-.002a.316.316 0 01-.004-.004l-.002-.002-.002-.002a.21.21 0 00-.002-.002l-.002-.003-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.003-.002-.002-.002-.002-.001-.002-.003-.002-.001-.002-.002-.002-.002-.002-.002-.003s-.002 0-.002-.002a.31.31 0 00-.002-.002l-.002-.002-.002-.002-.002-.002-.002-.003a.171.171 0 01-.004-.004l-.001-.001a.38.38 0 01-.018-.02.415.415 0 01-.007-.007v-.002c-.002 0-.002-.002-.003-.003l-.001-.001-.003-.003-.001-.002-.003-.003h-.001c0-.002-.002-.003-.003-.004v-.001l-.004-.003v-.001l-.003-.004H1.01a.72.72 0 01-.003-.004l-.004-.005-.004-.004a3.913 3.913 0 01-.23-.297l.817-.576zM0 32.65h1v3H0v-3zm0-6h1v3H0v-3zm0-6h1v3H0v-3zm0-6h1v3H0v-3zm0-6h1v3H0v-3zm.2-5.98l.955.297A3.48 3.48 0 001 4v1.65H0V4v-.006-.002-.004-.002-.004-.002-.004-.003-.005a.83.83 0 010-.007v-.006-.002-.004-.002-.004-.002-.004-.002-.006-.006-.002-.004-.002-.004-.002l.001-.005v-.001-.005-.001-.006-.002-.004-.003-.003-.003a.34.34 0 000-.004V3.87l.001-.004v-.002-.012-.001-.005-.002-.004-.002l.001-.005V3.82v-.001a.556.556 0 010-.007l.001-.004v-.002-.004V3.8v-.005-.001-.006l.001-.006V3.78v-.005-.002-.005-.001l.001-.005v-.001-.012-.001l.001-.005v-.002-.005-.006a3.705 3.705 0 01.002-.02v-.005-.002V3.7l.001-.006.001-.013v-.007a4.457 4.457 0 01.002-.031h.001v-.007l.001-.006.002-.025v-.007c.029-.322.091-.633.183-.928zM3.525 0v1c-.359 0-.706.088-1.03.262L2.021.381A3.19 3.19 0 013.137.024h.006l.005-.001.039-.005h.006l.005-.001h.006L3.21.015h.006A3.197 3.197 0 013.25.011h.012L3.265.01a.227.227 0 01.006 0L3.278.01l.02-.002h.014l.004-.001H3.328l.004-.001h.008l.013-.001h.012l.002-.001h.018l.003-.001h.003a.729.729 0 00.006 0h.011l.004-.001H3.442L3.445 0H3.507L3.511 0h.014z"
                                        ></path>
                                    </g>
                                    <text
                                        fill="#4080fc"
                                        data-name="Add product"
                                        fontFamily="Roboto"
                                        fontSize="16"
                                        transform="translate(41 26)"
                                    >
                                        <tspan x="0" y="0">
                                            Add product
        </tspan>
                                    </text>
                                    <g
                                        fill="none"
                                        stroke="#4080fc"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        data-name="Icon feather-plus-circle"
                                        transform="translate(10 8)"
                                    >
                                        <path
                                            d="M20.676 11.838A8.838 8.838 0 1111.838 3a8.838 8.838 0 018.838 8.838z"
                                            data-name="Tracé 210"
                                        ></path>
                                        <path d="M11.838 8.303v7.07" data-name="Tracé 211"></path>
                                        <path d="M8.303 11.838h7.07" data-name="Tracé 212"></path>
                                    </g>
                                </svg> :
                                <Fragment>
                                    <svg onClick={() => {
                                        setShowPopup(true)
                                        setTimeout(() => {
                                            setShowPopup(false)
                                        }, 3000)
                                    }} style={{ margin: "10px 5px", cursor: "no-drop" }}
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="156"
                                        height="40"
                                        viewBox="0 0 156 40"
                                    >
                                        <g fill="#fff" strokeDasharray="3" data-name="Tracé 416">
                                            <path d="M3.525 0h148.95A3.785 3.785 0 01156 4v32a3.785 3.785 0 01-3.525 4H3.525A3.785 3.785 0 010 36V4a3.785 3.785 0 013.525-4z"></path>
                                            <path
                                                fill="#b4b4b4"
                                                d="M3.525 0h3v1h-3V0zm6 0h3v1h-3V0zm6 0h3v1h-3V0zm6 0h3v1h-3V0zm6 0h3v1h-3V0zm6 0h3v1h-3V0zm6 0h3v1h-3V0zm6 0h3v1h-3V0zm6 0h3v1h-3V0zm6 0h3v1h-3V0zm6 0h3v1h-3V0zm6 0h3v1h-3V0zm6 0h3v1h-3V0zm6 0h3v1h-3V0zm6 0h3v1h-3V0zm6 0h3v1h-3V0zm6 0h3v1h-3V0zm6 0h3v1h-3V0zm6 0h3v1h-3V0zm6 0h3v1h-3V0zm6 0h3v1h-3V0zm6 0h3v1h-3V0zm6 0h3v1h-3V0zm6 0h3v1h-3V0zm6 0h3v1h-3V0zm5.981.174c.158.055.312.122.46.2l.005.003.005.003.005.002.005.003.005.003a.076.076 0 01.005.002l.005.003.004.003h.002a.6.6 0 01.003.002l.001.001.004.002h.001l.004.003h.001l.004.003h.001l.005.003c.002 0 .003.002.005.003l.01.005.015.009.005.003a.245.245 0 00.01.005l.001.001.003.002.002.001.003.002.002.001.003.002.002.001.002.001.003.002.002.001.003.002.002.001.003.002h.002l.003.002.002.002.002.001.003.002.002.001.002.001a.516.516 0 01.008.005l.002.001.003.002.002.001.003.002h.001l.003.003a.054.054 0 01.005.003h.001a.905.905 0 01.06.038l.004.003.005.003.005.003.004.003.005.003.005.003a3.667 3.667 0 01.915.864l.004.005c0 .002.002.003.003.005a2.488 2.488 0 01.007.009l.003.004.004.005c0 .002.002.003.003.005l.064.088c0 .002.002.003.003.005l.003.004.003.005a.93.93 0 00.006.01l.004.004a4.035 4.035 0 01.051.077l.006.01.003.004c.002.002.003.003.003.005h.001l.003.005.003.005a.63.63 0 00.003.005l.003.005.003.005.003.005.003.004v.001a.639.639 0 00.007.01l.03.049.003.004c0 .002.002.004.003.005 0 .002.002.004.003.005 0 .002.002.003.003.005v.001l.002.004.001.001.002.004.001.001.002.004.001.001.002.004.001.001.002.004.001.001.002.004.001.001.002.004v.001l.003.004V1.8l.003.004v.001l.003.004v.001a.527.527 0 01.004.005l.04.07v.001l.002.005.003.005c0 .002.002.003.003.005l.002.005.003.005.003.005v.001l.003.004v.001l.002.005a.7.7 0 00.005.01h.001l.046.089.002.005.003.005.003.005.002.006.003.005.064.136-.912.41c-.32-.714-.877-1.253-1.527-1.478l.327-.945zM155 5.134h1v3h-1v-3zm0 6h1v3h-1v-3zm0 6h1v3h-1v-3zm0 6h1v3h-1v-3zm0 6h1v3h-1v-3zm0 6h1v.92a.807.807 0 010 .009v.006a.089.089 0 000 .01v.01l-.001.006V36.115a1.31 1.31 0 000 .009V36.133l-.001.005V36.165l-.001.002v.024l-.001.002v.018l-.001.006v.017l-.001.003v.015l-.001.003v.015a.251.251 0 00-.002.015v.014l-.001.004V36.316l-.001.005v.008a.336.336 0 01-.001.007v.007l-.001.003v.012l-.001.004v.007l-.001.003v.007l-.001.005v.01l-.001.003v.008l-.002.01v.012l-.001.002-.001.01V36.449l-.001.005-.002.012v.008l-.002.017v.007h-.001a3.33 3.33 0 01-.002.019v.006l-.003.019c-.052.44-.168.859-.337 1.242l-.007.016-.002.005v.001l-.007.015v.001l-.003.005v.001l-.007.014v.002l-.003.004v.003c-.002.001-.002.003-.003.005l-.002.004-.001.003-.002.004-.001.002-.003.005v.002a.749.749 0 01-.003.006l-.001.002-.002.005-.001.002a1.09 1.09 0 01-.004.006c0 .003-.002.005-.003.007v.001l-.003.006-.007.015-.007.014-.004.008a4.17 4.17 0 01-.054.106l-.884-.467c.25-.475.383-1.023.383-1.586v-.866zm-1.997 3.8l.247.969h-.004l-.005.002h-.002l-.004.002h-.002l-.003.001h-.003l-.003.001h-.002l-.004.002h-.002l-.003.001h-.002l-.004.002h-.006v.001l-.005.001a3.143 3.143 0 01-.478.074l-.005.001h-.006-.005-.002l-.004.001h-.006a1.558 1.558 0 01-.034.002l-.004.001a.285.285 0 00-.006 0h-.006-.002l-.004.001h-.006a.332.332 0 01-.005 0h-.003-.005l-.004.001H152.6h-.002-.003-.003a.951.951 0 01-.005.001h-.004-.006-.006H152.558l-.003.001h-.006a1.387 1.387 0 01-.006 0h-.006-.006-.006-.003-.003-.006a.623.623 0 01-.006 0h-.003-.003-.006-.002l-.004.001h-.007-.007-2.217v-1h2.217c.178 0 .356-.022.528-.066zm-8.745.066h3v1h-3v-1zm-6 0h3v1h-3v-1zm-6 0h3v1h-3v-1zm-6 0h3v1h-3v-1zm-6 0h3v1h-3v-1zm-6 0h3v1h-3v-1zm-6 0h3v1h-3v-1zm-6 0h3v1h-3v-1zm-6 0h3v1h-3v-1zm-6 0h3v1h-3v-1zm-6 0h3v1h-3v-1zm-6 0h3v1h-3v-1zm-6 0h3v1h-3v-1zm-6 0h3v1h-3v-1zm-6 0h3v1h-3v-1zm-6 0h3v1h-3v-1zm-6 0h3v1h-3v-1zm-6 0h3v1h-3v-1zm-6 0h3v1h-3v-1zm-6 0h3v1h-3v-1zm-6 0h3v1h-3v-1zm-6 0h3v1h-3v-1zm-6 0h3v1h-3v-1zm-6 0h3v1h-3v-1zm-4.672-1.083c.44.626 1.08 1.018 1.757 1.075l-.085.997a3.172 3.172 0 01-1.134-.318l-.005-.002-.005-.002-.005-.003-.005-.002a3.276 3.276 0 01-.068-.035l-.005-.003-.005-.003-.005-.002-.004-.003h-.001l-.004-.002H2.01l-.004-.003h-.001l-.004-.003-.005-.002v-.001l-.005-.002-.004-.003h-.001a3.435 3.435 0 01-.038-.021l-.004-.002-.001-.001-.004-.002-.004-.003h-.002l-.003-.003h-.002l-.003-.002-.002-.001-.003-.002-.001-.001a.547.547 0 01-.004-.002h-.001l-.003-.003a.152.152 0 01-.007-.004l-.003-.001-.002-.001-.003-.002-.001-.001-.004-.002h-.001l-.004-.003-.004-.003a3.429 3.429 0 01-.014-.008l-.004-.002-.001-.001-.004-.003a.127.127 0 01-.006-.003l-.003-.002-.002-.001-.002-.002a.83.83 0 01-.003-.001l-.002-.002-.002-.001-.003-.002-.002-.001-.003-.002-.002-.001-.003-.002a.308.308 0 00-.005-.003l-.002-.001a.427.427 0 00-.002-.002l-.003-.001-.002-.002-.002-.001-.003-.002-.002-.001-.003-.002-.002-.001-.002-.002-.003-.001-.002-.002-.002-.001-.003-.002-.002-.002a1.2 1.2 0 01-.006-.003l-.001-.001-.003-.002-.002-.001-.002-.002-.003-.001-.002-.002-.003-.001-.002-.002-.002-.001-.002-.002-.003-.002h-.002l-.003-.003-.002-.001-.003-.002-.002-.001-.002-.002-.002-.001-.003-.002-.002-.001-.003-.002-.002-.002-.002-.001-.002-.002-.003-.002-.002-.001-.003-.002-.002-.001-.003-.002-.002-.001-.002-.002-.002-.002a.825.825 0 00-.003-.002h-.002l-.01-.007-.004-.004a.833.833 0 00-.005-.003l-.004-.003-.002-.001-.003-.002-.002-.001a.605.605 0 01-.003-.003h-.001l-.003-.003-.002-.001a.494.494 0 00-.004-.003l-.004-.003h-.001l-.004-.003-.004-.003-.001-.001-.004-.003H1.64l-.004-.003a.067.067 0 01-.005-.004l-.004-.003h-.001l-.005-.004a3.34 3.34 0 01-.028-.02l-.004-.004-.005-.004-.004-.003h-.001l-.004-.003v-.001l-.005-.003-.004-.003-.001-.001-.004-.003-.005-.004-.004-.003h-.001l-.004-.004a.926.926 0 00-.004-.003h-.001a3.63 3.63 0 01-.037-.03l-.004-.003-.005-.003v-.001a2.79 2.79 0 01-.004-.003l-.005-.004-.004-.003-.004-.004a.067.067 0 01-.005-.004 1.095 1.095 0 00-.01-.007l-.004-.004a.779.779 0 01-.053-.045h-.002c0-.002-.002-.003-.003-.004H1.4a.596.596 0 01-.004-.004l-.004-.003v-.001l-.004-.003h-.001l-.004-.004a1 1 0 01-.005-.004l-.004-.004-.005-.004a3.63 3.63 0 01-.03-.027l-.004-.004h-.001a1.052 1.052 0 00-.004-.004l-.004-.004h-.001a.466.466 0 01-.003-.004h-.001l-.004-.004-.004-.004-.004-.004h-.001l-.004-.004-.004-.003v-.001l-.004-.004h-.001a3.532 3.532 0 01-.03-.028l-.004-.004-.004-.004-.001-.001a.664.664 0 00-.004-.004l-.004-.003v-.001l-.004-.003v-.001l-.004-.003-.001-.002-.003-.002-.001-.002-.003-.002-.002-.002a.592.592 0 00-.007-.006v-.002c-.002 0-.003-.002-.004-.003l-.004-.004h-.001a.757.757 0 00-.004-.004l-.004-.004a2.368 2.368 0 01-.01-.01l-.003-.003V39l-.004-.003v-.001l-.004-.004h-.001l-.003-.004a.144.144 0 01-.004-.004l-.002-.001-.002-.003-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.003-.003v-.001l-.003-.003-.002-.001-.002-.003-.002-.002-.002-.002-.002-.002a.24.24 0 01-.002-.002l-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.003-.004h-.001l-.004-.005-.002-.002a.316.316 0 01-.004-.004l-.002-.002-.002-.002a.21.21 0 00-.002-.002l-.002-.003-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.003-.002-.002-.002-.002-.001-.002-.003-.002-.001-.002-.002-.002-.002-.002-.002-.003s-.002 0-.002-.002a.31.31 0 00-.002-.002l-.002-.002-.002-.002-.002-.002-.002-.003a.171.171 0 01-.004-.004l-.001-.001a.38.38 0 01-.018-.02.415.415 0 01-.007-.007v-.002c-.002 0-.002-.002-.003-.003l-.001-.001-.003-.003-.001-.002-.003-.003h-.001c0-.002-.002-.003-.003-.004v-.001l-.004-.003v-.001l-.003-.004H1.01a.72.72 0 01-.003-.004l-.004-.005-.004-.004a3.913 3.913 0 01-.23-.297l.817-.576zM0 32.65h1v3H0v-3zm0-6h1v3H0v-3zm0-6h1v3H0v-3zm0-6h1v3H0v-3zm0-6h1v3H0v-3zm.2-5.98l.955.297A3.48 3.48 0 001 4v1.65H0V4v-.006-.002-.004-.002-.004-.002-.004-.003-.005a.83.83 0 010-.007v-.006-.002-.004-.002-.004-.002-.004-.002-.006-.006-.002-.004-.002-.004-.002l.001-.005v-.001-.005-.001-.006-.002-.004-.003-.003-.003a.34.34 0 000-.004V3.87l.001-.004v-.002-.012-.001-.005-.002-.004-.002l.001-.005V3.82v-.001a.556.556 0 010-.007l.001-.004v-.002-.004V3.8v-.005-.001-.006l.001-.006V3.78v-.005-.002-.005-.001l.001-.005v-.001-.012-.001l.001-.005v-.002-.005-.006a3.705 3.705 0 01.002-.02v-.005-.002V3.7l.001-.006.001-.013v-.007a4.457 4.457 0 01.002-.031h.001v-.007l.001-.006.002-.025v-.007c.029-.322.091-.633.183-.928zM3.525 0v1c-.359 0-.706.088-1.03.262L2.021.381A3.19 3.19 0 013.137.024h.006l.005-.001.039-.005h.006l.005-.001h.006L3.21.015h.006A3.197 3.197 0 013.25.011h.012L3.265.01a.227.227 0 01.006 0L3.278.01l.02-.002h.014l.004-.001H3.328l.004-.001h.008l.013-.001h.012l.002-.001h.018l.003-.001h.003a.729.729 0 00.006 0h.011l.004-.001H3.442L3.445 0H3.507L3.511 0h.014z"
                                            ></path>
                                        </g>
                                        <text
                                            fill="#b4b4b4"
                                            data-name="Add product"
                                            fontFamily="Roboto"
                                            fontSize="16"
                                            transform="translate(41 26)"
                                        >
                                            <tspan x="0" y="0">
                                                Add product
        </tspan>
                                        </text>
                                        <g
                                            fill="none"
                                            stroke="#b4b4b4"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            data-name="Icon feather-plus-circle"
                                            transform="translate(10 8)"
                                        >
                                            <path
                                                d="M20.676 11.838A8.838 8.838 0 1111.838 3a8.838 8.838 0 018.838 8.838z"
                                                data-name="Tracé 210"
                                            ></path>
                                            <path d="M11.838 8.303v7.07" data-name="Tracé 211"></path>
                                            <path d="M8.303 11.838h7.07" data-name="Tracé 212"></path>
                                        </g>
                                    </svg>
                                    {
                                        ShowPopup &&

                                        <div style={{
                                            background: "rgb(0, 158, 227)",
                                            color: "rgb(255, 255, 255)",
                                            padding: "10px 30px",
                                            position: "absolute",
                                            borderRadius: "15px",
                                            boxShadow: "0 0 5px #000",
                                            fontFamily: "poppins",
                                            fontWeight: "lighter",
                                            fontSize: "14px",
                                            bottom: -55,
                                            width: 200
                                        }}><span style={{ position: "absolute", height: 10, width: 10, transform: "rotate(45deg) translateX(-50%)", top: -3, background: "rgb(0, 158, 227)", }} />You need to add a generic response before adding any products!</div>
                                    }
                                </Fragment>
                        }
                    </div>

                </div>
            </form>}
            {
                showEntity &&
                <EntityForm setReponseGeneric={setReponseGeneric} setproductId={setproductId} entityHandelSubmit={entityHandelSubmit} selectedEntent={props.selectedEntent} setEntetysVal={setEntetysVal} entetyVal={entetyVal} setReponseSpecefic={setReponseSpecefic} reponseSpecefic={reponseSpecefic} setShowEntity={setShowEntity} productExist={productExist} setProductExist={setProductExist} />
            }
        </div >
    )
}

const mapStateToProps = (state, owenProps) => {
    const porject = state.allProjects.find(el => el.post.idPost == owenProps.match.params.idpost)
    return {
        allProjects: state.allProjects,
        entitys: state.entitys,
        porject,
        fb: state.fbdata.tokenDetail.userID,
        show: state.toggleIntentForm.find(el => el.name == owenProps.selectedEntent) && state.toggleIntentForm.find(el => el.name == owenProps.selectedEntent).show,
        modelAddCategory: state.showAddCategory
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllEntitys: (fbid) => dispatch(getAllEntity(fbid)),
        addproduct: (data, idproject) => dispatch(addproduct(data, idproject)),
        rmProduct: (data, idproject) => dispatch(removeProduct(data, idproject)),
        updateProduct: (data, idproject) => dispatch(updateproduct(data, idproject)),
        updateReponseGeneric: (data, idproject) => dispatch(updateReponseGeneric(data, idproject)),
        addReponseGeneric: (data, idproject) => dispatch(addReponseGeneric(data, idproject)),
        removeEntity: (uId, data) => dispatch(removeEntityProject(uId, data)),
        getAlllProjects: () => dispatch(getConnectedPagesProject()),
        togglePopup: (toggle) => dispatch(togglePopup(toggle)),
        toggleIntent: (toggle) => dispatch(toggleIntent(toggle)),
        showCategoryPoppup: () => dispatch(showCategoryPoppup()),
        hideCategoryPoppup: () => dispatch(hideCategoryPoppup()),
        checkProduct: (data, idproject) => dispatch(checkProduct(data, idproject))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(IntentContainerTable))

import React, {useState, useRef, useEffect} from 'react';

import {
    Row,
    Col,
    Image,
    OverlayTrigger,
    Overlay,
    Popover,
    Form,
} from 'react-bootstrap';
import Picker from 'emoji-picker-react';
import OutsideClickHandler from 'react-outside-click-handler';

import Keyboard from 'react-simple-keyboard';
import layout from "simple-keyboard-layouts/build/layouts/arabic";
import ReactTooltip from 'react-tooltip';
import Swal from 'sweetalert2/dist/sweetalert2.js';

// Translations
import { trans } from '../../../Translations';

import { IoIosCall } from 'react-icons/io';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { BsLink45Deg } from 'react-icons/bs';
import { IoIosClose } from 'react-icons/io';
import {ReactComponent as Arabic} from '../../../assets/images/home/Arabic.svg';
import {ReactComponent as ArabicInverse} from '../../../assets/images/home/arabic01.svg';
import {ReactComponent as Emoticon} from '../../../assets/images/home/emoticon.svg';
import {ReactComponent as EmoticonInverse} from '../../../assets/images/home/emoticon01.svg';

const Tag = require('../../../assets/images/home/Tag.svg');
const TagInverse = require('../../../assets/images/home/tag01.svg');

export default function WizardMiracleInput(props) {

    let {
        lang,
        label,
        response,
        handleResponse,
        showTags,
        handleTags,
        showEmojis,
        handleEmojis,
        showKeyboard,
        handleKeyboard,
        BtnType,
        handleBtnType,
        BtnTitle,
        handleBtnTitle,
        BtnValue,
        handleBtnValue,
        Btns,
        handleBtns,
        platform,
        changeBtnColor,
    } = props;

    
    const keyboard = useRef(null);

    const [BtnPop, setBtnPop] = useState(false);
    const [BtnUpdatePop, setBtnUpdatePop] = useState(false);
    const [BtnUpdatePopTarget, setBtnUpdatePopTarget] = useState(null);
    const BtnUpdateRef = useRef(null);
    const [BtnUpdateIndex, setBtnUpdateIndex] = useState(null);
    const [BtnUpdateType, setBtnUpdateType] = useState('');
    const [BtnUpdateTitle, setBtnUpdateTitle] = useState('');
    const [BtnUpdateValue, setBtnUpdateValue] = useState('');
    const [cursorPos, setCursorPos] = useState(0);
    const [cursorDone, setCursorDone] = useState(null);

    
    // Popup Config :
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'wizard-pages-active-btn py-3 px-3',
        },
        buttonsStyling: false
    });

    // render Functions :
    const Tags = () => (
        <div className="popover-tags" >
            <Col lg={12}>
                <Row className="pl-1 my-2">
                    {platform === "facebook"
                    &&
                    // Update the cursor position =>>>
                    <Col xs={12} className="d-flex mb-1 mt-2">
                        <p className="my-auto mr-auto wizard-config-tag" onClick={() => { handleResponse(resp => resp.substring(0, cursorPos) + '##FIRST_NAME##' + resp.substring(cursorPos)); handleTags(!showTags); }}>{trans[lang].wizardMiracleInput.firstName}</p>
                    </Col>
                    }

                    {platform === "facebook"
                    &&
                    <Col xs={12} className="d-flex mb-1">
                        <p className="my-auto mr-auto wizard-config-tag" onClick={() => { handleResponse(resp => resp.substring(0, cursorPos) + '##LAST_NAME##' + resp.substring(cursorPos)); handleTags(!showTags); }}>{trans[lang].wizardMiracleInput.lastName}</p>
                    </Col>
                    }
                    
                    <Col xs={12} className="d-flex mb-1">
                        <p className="my-auto mr-auto wizard-config-tag" onClick={() => { handleResponse(resp => resp.substring(0, cursorPos) + '##FULL_NAME##' + resp.substring(cursorPos)); handleTags(!showTags); }}  >{trans[lang].wizardMiracleInput.fullName}</p>
                    </Col>

                    <Col xs={12} className="m-auto d-flex mb-2">
                        <p className="my-auto mr-auto wizard-config-tag" onClick={() => { handleResponse(resp => resp.substring(0, cursorPos) + '##PAGE_NAME##' + resp.substring(cursorPos)); handleTags(!showTags);  }}>{trans[lang].wizardMiracleInput.pageName}</p>
                    </Col> 
                </Row>
            </Col>
        </div>
    );

    const BtnsPopover = (
        <Popover id="popover-quick-replies">
          <Popover.Content style={{boxShadow: '0px 6px 10px #00000014'}}>
            <Row className="justify-content-center">
                <Col md={12}>
                    <Row>
                        <Col md={12} className="d-flex p-0" ><IoIosClose className="ml-auto mr-1" color={'#9F9F9F'} size={'25'} style={{cursor: 'pointer'}} onClick={() => setBtnPop(false)} /></Col>
                        <Col md={12} className="mt-2 mb-3">
                            <Form.Control id="liste-Btn-miracle" as="select" onChange={(e) => handleBtnType(e.target.value)} defaultValue={BtnType} style={{backgroundColor:'#E4E6EB'}}>
                                <option value="web_url">{trans[lang].wizardMiracleInput.url}</option>
                                <option value="phone_number">{trans[lang].wizardMiracleInput.call}</option>
                            </Form.Control>
                        </Col>
                        
                        <Col md={12} className="mt-2">
                            <Row className="d-flex">
                                <Col md={12}>
                                    <Form.Control 
                                        id="liste-Btn-miracle"
                                        type={"text"} 
                                        onChange={(e) => handleBtnTitle(e.target.value)} 
                                        value={BtnTitle}  
                                        placeholder={trans[lang].wizardMiracleInput.btnTitle}
                                        maxLength="20"
                                    />
                                </Col>

                                <Col md={12} className="d-flex">
                                    <p className="ml-auto wizard-config-input-feedback">{trans[lang].wizardMiracleInput.remainingChars}{20 - BtnTitle.length}</p>
                                </Col>
                            </Row>
                        </Col>

                        <Col md={12} className="mb-2">
                            <Form.Control 
                                id="liste-Btn-miracle"
                                type={BtnType === "web_url" ? "text" : "number"} 
                                onChange={(e) => handleBtnValue(e.target.value)} 
                                value={BtnValue} 
                                placeholder={BtnType === "web_url" ? trans[lang].wizardMiracleInput.urlPlaceholder : trans[lang].wizardMiracleInput.phonePlaceholder} 
                            />
                        </Col>
                    </Row>
                </Col>

                <Col md={11} className="d-flex pl-1">
                    <div className="wizard-pages-active-btn py-1 px-4" onClick={() => addNewBtn()}>
                        {trans[lang].wizardMiracleInput.ok}
                    </div>
                </Col>   
            </Row>
          </Popover.Content>
        </Popover>
    );

    const BtnsUpdatePopover = () => (
        <Popover id="popover-quick-replies">
          <Popover.Content style={{boxShadow: '0px 6px 10px #00000014'}}>
            <Row className="justify-content-center">
                <Col md={12}>
                    <Row>
                    <Col md={12} className="d-flex p-0" ><IoIosClose className="ml-auto mr-1" color={'#9F9F9F'}   size={'25'} style={{cursor: 'pointer'}} onClick={() => setBtnUpdatePop(false)} /></Col>
                        <Col md={12} className="mt-2 mb-3">
                            <Form.Control id="liste-Btn-miracle" as="select" onChange={(e) => setBtnUpdateType(e.target.value)} defaultValue={BtnUpdateType} style={{backgroundColor:'#E4E6EB'}}>
                                <option value="web_url">{trans[lang].wizardMiracleInput.url}</option>
                                <option value="phone_number">{trans[lang].wizardMiracleInput.call}</option>
                            </Form.Control>
                        </Col>
                        
                        <Col md={12} className="mt-2">
                            <Row className="d-flex">
                                <Col md={12}>
                                    <Form.Control
                                        id="liste-Btn-miracle" 
                                        type={"text"} 
                                        onChange={(e) => setBtnUpdateTitle(e.target.value)} 
                                        value={BtnUpdateTitle}  
                                        placeholder={trans[lang].wizardMiracleInput.btnTitle}
                                        maxLength="20" 
                                    />
                                </Col>

                                <Col md={12} className="d-flex">
                                    <p className="ml-auto wizard-config-input-feedback">{trans[lang].wizardMiracleInput.remainingChars}{20 - BtnUpdateTitle.length}</p>
                                </Col>
                            </Row>
                        </Col>

                        <Col md={12} className="mb-2">
                            <Form.Control 
                                id="liste-Btn-miracle"
                                type={BtnType === "web_url" ? "text" : "number"} 
                                onChange={(e) => setBtnUpdateValue(e.target.value)} 
                                value={BtnUpdateValue} 
                                placeholder={BtnUpdateType === "web_url" ? trans[lang].wizardMiracleInput.urlPlaceholder : trans[lang].wizardMiracleInput.phonePlaceholder} 
                            />
                        </Col>
                    </Row>
                </Col>

                <Col md={11} className="d-flex pl-1">
                    <div className="wizard-pages-active-btn py-2 px-4" onClick={() => updateBtn()}>
                       {trans[lang].wizardMiracleInput.ok}
                    </div>
                </Col>   
            </Row>
                
          </Popover.Content>
        </Popover>
    );

    const popup = (message) => ( swalWithBootstrapButtons.fire({ title: `${message}`,confirmButtonText: trans[lang].wizardMiracleInput.retry }) );

    // Functions :
    const addNewBtn = () => {
        let newBtns = [...Btns];
    
        if(BtnType === "web_url") {
            let objectFb = {
                type: "web_url",
                url: BtnValue,
                title: BtnTitle,
                webview_height_ratio: "tall",
            } 

            if(BtnTitle === "") {
                popup(trans[lang].wizardMiracleInput.errBtnTitle);
            } else if (BtnValue === "") {
                popup(trans[lang].wizardMiracleInput.errBtnUrl);
            } else {
                newBtns.push(objectFb);
                // update new Btns :
                handleBtns(newBtns);
                // reset
                resetBtns();
            }
        } else {
            let objectFb = {
                type: "phone_number",
                title: BtnTitle,
                payload: BtnValue,
            };

            if(BtnTitle === "") {
                popup(trans[lang].wizardMiracleInput.errBtnTitle);
            } else if (BtnValue === "") {
                popup(trans[lang].wizardMiracleInput.errBtnPhone);
            } else {
                newBtns.push(objectFb);
                // update new Btns :
                handleBtns(newBtns);
                // reset
                resetBtns();
            }
        }

    };

    const updateBtn = () => {
        let newBtns = [...Btns];
        let newType = [...BtnUpdateType].join('');
        let newTitle = [...BtnUpdateTitle].join('');
        let newValue = [...BtnUpdateValue].join('');

        if(newType === "web_url") {
            newBtns[BtnUpdateIndex].type = BtnUpdateType;
            newBtns[BtnUpdateIndex].title = newTitle;
            newBtns[BtnUpdateIndex].url = newValue;
            handleBtns(newBtns);
            setBtnUpdatePop(false);
        } else {
            newBtns[BtnUpdateIndex].type = BtnUpdateType;
            newBtns[BtnUpdateIndex].title = newTitle;
            newBtns[BtnUpdateIndex].payload = newValue;
            handleBtns(newBtns);
            setBtnUpdatePop(false);
        };
    };

    const deleteBtn = (index) => {
        let newBtns = [...Btns];
        newBtns.splice(index,1);
        handleBtns(newBtns);
    };

    const resetBtns = () => {
        handleBtnType('web_url');
        handleBtnTitle('');
        handleBtnValue('');
        setBtnPop(false);
        // setBtnUpdatePop(false);
    };

    const handleUpdatePopover = (e,btn,indexBtn) => {
        setBtnUpdatePopTarget(e.target);
        setBtnPop(false);
        setBtnUpdatePop(false);

        if(btn.type === "web_url") {
            setBtnUpdateType("web_url");
            setBtnUpdateIndex(indexBtn);
            setBtnUpdateTitle(btn.title);
            setBtnUpdateValue(btn.url);
            setBtnUpdatePop(true);
        } else {
            setBtnUpdateType("phone_number");
            setBtnUpdateIndex(indexBtn);
            setBtnUpdateTitle(btn.title);
            setBtnUpdateValue(btn.payload);
            setBtnUpdatePop(true);
        }
    };

    // Set cursor to the last position
    useEffect(() => {
        if(props.response.length && !cursorDone) {
            setCursorPos(props.response.length);
            setCursorDone(true);
        } 
        
        if(props.response.length && cursorDone) {
            setCursorPos(props.response.length + 1);
        }
    },[props.response]);


    return (
        <Row className="mx-0 px-2">

            <Col lg={12} className="mx-0 px-2 d-flex">
                <label className="wizard-config-textarea-label my-2">{label}</label>
            </Col>

            <Col lg={12} className="px-2 mx-0">
            <div className="wizard-intent-miracle-box">
                {showTags && Tags()}
                <Row className="mb-1 mx-0 pt-1 px-2">
                    <Col lg={12} />

                    <Col lg={1} className="d-flex p-0">
                        <Image 
                            src={showTags ? TagInverse : Tag} 
                            onClick={() => handleTags(!showTags)} 
                            className="my-auto mr-auto my-agents-msgs-tiny-icon" 
                            style={{ width: '19px', cursor: 'pointer'}} 
                        />
                    </Col>                                

                    <Col lg={1} className="d-flex p-0">
                        {showEmojis ? 
                        <EmoticonInverse width={20} height={20} style={{cursor: 'pointer'}} onClick={() => handleEmojis(!showEmojis)} className="my-auto mr-auto my-agents-msgs-tiny-icon" />
                        : 
                        <Emoticon width={20} height={20} style={{cursor: 'pointer'}} onClick={() => handleEmojis(!showEmojis)} className="my-auto mr-auto my-agents-msgs-tiny-icon" />
                        }
                    </Col>
        
                    <Col lg={1} className="d-flex p-0">
                        {showKeyboard ? 
                        <ArabicInverse width={20} height={20} style={{cursor: 'pointer'}} onClick={() => handleKeyboard(!showKeyboard)} className="my-auto mr-auto my-agents-msgs-tiny-icon" />
                        : 
                        <Arabic width={20} height={20} style={{cursor: 'pointer'}} onClick={() => handleKeyboard(!showKeyboard)} className="my-auto mr-auto my-agents-msgs-tiny-icon" />
                        }
                    </Col>
                
                    <Col lg={8}>
                        {showKeyboard &&
                            <div className="wizard-config-keyboard-container">
                                <Keyboard 
                                    keyboardRef={r => {keyboard.current = r; keyboard.current.setInput(response);}}
                                    onChange={(input) => handleResponse(input)}
                                    onKeyPress={(key) => key === "{enter}" && handleKeyboard(false)}
                                    layout={layout} 
                                />
                            </div>
                        }

                        {showEmojis &&
                            <div className="wizard-config-emoji-container" >
                                <OutsideClickHandler onOutsideClick={() => handleEmojis(false)}>
                                    <Picker onEmojiClick={(e,obj) => { handleResponse(resp => resp.substring(0, cursorPos) + obj.emoji + resp.substring(cursorPos)); setCursorPos(cursorPos + 2) }} />
                                </OutsideClickHandler>
                            </div>
                        } 
                    </Col>
                </Row>

                <Row>
                    <Col lg={12} className="mx-0 pt-2">
                        <textarea
                            onChange={(e) => { handleResponse(e.target.value); if(keyboard.current) { keyboard.current.setInput(e.target.value); } }} 
                            placeholder={trans[lang].wizardMiracleInput.textAreaPlaceholder}
                            onKeyPress={(e) => { setCursorPos(e.target.selectionStart + 1); changeBtnColor && changeBtnColor(true); }}
                            onClick={(e) => { setCursorPos(e.target.selectionStart); }}
                            value={response} 
                            className="wizard-config-textarea w-100 py-0" 
                            rows="5"
                            maxLength="640"
                        />
                    </Col>
                </Row>

                <Row >
                    <Col lg={12} className="my-0 py-0">
                        <hr style={{height: '2px', borderColor: '#B4B4B4', margin: '1px'}} />
                    </Col>
                </Row>

                {platform === "facebook"
                &&
                <Row className="mx-0">
                    <Col lg={12}>
                        <Row>
                            {Btns.map((btn,indexBtn) => 
                                <Col key={indexBtn} lg={3} className="mx-1">
                                    <Row className="wizard-config-quick-replies-btn my-1 py-1 d-flex">
                                        {btn.type === "web_url" 
                                        ? 
                                        <BsLink45Deg color={'#fff'} size={15} className="ml-1 mr-auto my-auto" onClick={(e) => handleUpdatePopover(e,btn,indexBtn)}/>
                                        :
                                        <IoIosCall color={'#fff'} size={15} className="ml-1 mr-auto my-auto" onClick={(e) => handleUpdatePopover(e,btn,indexBtn) }/>
                                        }
                                        <p className={btn.type === "web_url" ? "mr-auto my-auto" : "ml-1 mr-auto my-auto" } data-for='quickReplyTip' data-tip={btn.title} onClick={(e) => {handleUpdatePopover(e,btn,indexBtn)}}>{btn.type === "web_url" ? "url" : "call"}</p>
                                        <AiOutlineCloseCircle className="ml-auto my-auto mr-1" color={"white"} size={"15"} style={{cursor: 'pointer'}} onClick={() => deleteBtn(indexBtn)} />
                                    </Row>
                                    <ReactTooltip id='quickReplyTip' textColor='#fff' backgroundColor='#009EE3' />
                                </Col>
                            )}
                            {Btns.length < 3
                            && 
                            <OverlayTrigger trigger="click" placement="right" show={BtnPop} overlay={BtnsPopover} >
                                <Col lg={3} className="wizard-config-quick-replies-btn m-1 py-1 d-flex px-0" onClick={() => {setBtnUpdatePop(false); setBtnPop(prevState => prevState ? false : true);}}>
                                    <p className="m-auto">{trans[lang].wizardMiracleInput.addBtn}</p>
                                </Col>
                            </OverlayTrigger>
                            }

                            <div ref={BtnUpdateRef}>
                                <Overlay show={BtnUpdatePop} target={BtnUpdatePopTarget} placement="right" container={BtnUpdateRef.current}>
                                   {BtnsUpdatePopover()}
                                </Overlay>
                            </div>

                        </Row>
                    </Col>
                </Row> 
                }
               </div>
            </Col>
        </Row>
    )
}

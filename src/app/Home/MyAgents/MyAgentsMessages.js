import React, { useEffect, useState, useRef, } from 'react';

import  {
    Col,
    Row,
    Image,
    Form,
    OverlayTrigger,
    Overlay,
} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { getLogs, answerComment} from '../../../redux/actions/myAgentsActions';
import moment from 'moment';
import Slider from '@material-ui/core/Slider';
import Calendar from 'react-calendar';
import Picker from 'emoji-picker-react';
import OutsideClickHandler from 'react-outside-click-handler';
import Keyboard from 'react-simple-keyboard';
import layout from "simple-keyboard-layouts/build/layouts/arabic";
import ReactTooltip from 'react-tooltip';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import Lottie from 'react-lottie';
import OwnerCheckbox from '../Pages/OwnerCheckbox';

// Translations
import { trans } from '../../../Translations';

import notFoundAnimationData from '../../../assets/json/not-found.json';
import { BiSearch } from 'react-icons/bi'; 
import { BsLink45Deg } from 'react-icons/bs';
import { IoIosClose,IoIosCall } from 'react-icons/io'; 
import { AiOutlineEllipsis, AiFillClockCircle,AiOutlineCloseCircle } from 'react-icons/ai'; 
import { MdPhone, MdEmail } from 'react-icons/md'; 
import { FaBirthdayCake, FaHome } from 'react-icons/fa'; 
import { RiMapPin2Fill } from 'react-icons/ri'; 



import {ReactComponent as Messenger} from '../../../assets/images/home/messenger.svg';
import {ReactComponent as Check} from '../../../assets/images/home/check.svg';

const Calendar_icon = require('../../../assets/images/home/calendar.svg');
const Calendar_icon_active = require('../../../assets/images/home/calendar-active.svg');

const Preferences = require('../../../assets/images/home/preferences.svg');
const Preferences_active = require('../../../assets/images/home/preferences_active.svg');
const IMODO_PROFILE_ICON = require('../../../assets/images/home/full-bulle-imodo.png');

const Arabic = require ('../../../assets/images/home/Arabic.svg');
const ArabicInverse = require('../../../assets/images/home/arabic01.svg');
const Emoticon = require ('../../../assets/images/home/emoticon.svg');
const EmoticonInverse = require('../../../assets/images/home/emoticon01.svg');

const Tag = require('../../../assets/images/home/Tag.svg');
const TagInverse = require('../../../assets/images/home/tag01.svg');


// const LETTER_ICON = require('../../../assets/images/home/3a.png');
// const EMO_ICON = require('../../../assets/images/home/emo.png');
// const BALISE_ICON = require('../../../assets/images/home/balise.png');


function MyAgentsMessages(props) {

    let {
        lang,
        agentsSelectedProject,
        agentsProjectLogs,
        agentsCommentsMatched,
        agentsCommentsNotMatched,
        socialMediaPageSelected,
        intentsMatched,
        intentsNotMatched,

        // Functions:
        getLogs,
        answerComment,
    } = props;

    // Popup Config :
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'wizard-pages-active-btn py-3 px-3',
        },
        buttonsStyling: false
    });

    const defaultOptionsNotFound = {
        loop: true,
        autoplay: true, 
        animationData: notFoundAnimationData,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
    };


    const keyboard = useRef(null);
    let history = useHistory();

    const [filter,setFilter] = useState('matched');
    const [choosenComment, setChoosenComment] = useState(null);
    const [answerChoosenComment, setAnswerChoosenComment] = useState('');
    const [Btns, setBtns] = useState([]);
    const [BtnPop, setBtnPop] = useState(false);
    const [BtnUpdatePop, setBtnUpdatePop] = useState(false);
    const [BtnUpdatePopTarget, setBtnUpdatePopTarget] = useState(null);
    const BtnUpdateRef = useRef(null);
    const [BtnUpdateIndex, setBtnUpdateIndex] = useState(null);
    const [BtnUpdateType, setBtnUpdateType] = useState('');
    const [BtnUpdateTitle, setBtnUpdateTitle] = useState('');
    const [BtnUpdateValue, setBtnUpdateValue] = useState('');
    
    const [BtnType, handleBtnType] = useState('web_url');
    const [BtnTitle, handleBtnTitle] = useState('');
    const [BtnValue, handleBtnValue] = useState('');

    const [showFilter,setShowFilter] = useState(false);
    
    const [filterMatchedValue, setFilterMatchedValue] = useState('');
    const [filtredIntents, setFiltredIntents] = useState([]);
    const [SliderValue, setSliderValue] = useState([18, 82]);
    
    const [filterNotMatchedValue, setFilterNotMatchedValue] = useState('');
    const [filtredIntentsNotMatched, setFiltredIntentsNotMatched] = useState([]);
    const [SliderNotMatchedValue, setSliderNotMatchedValue] = useState([10, 80]);

    const [noResultsMatched, setNoResultsMatched] = useState(false);
    const [noResultsNotMatched, setNoResultsNotMatched] = useState(false);

    const [filterDate, setFilterDate] = useState(new Date());
    const [filterDateNotMatched, setFilterDateNotMatched] = useState(new Date());
    const [showDateFilter, setShowDateFilter] = useState(false);

    const [cursorPos, setCursorPos] = useState(0);
    const [showTags, setShowTags] = useState(false);
    const [showEmojis,setShowEmojis] = useState(false);
    const [showKeyboard, setShowKeyboard] = useState(false);

    // STATE:
    const[search, setSearch] = useState("");
    // const[searchEnabled, setSearchEnabled] = useState(false);
    

    const searchMatched = (name) => {
        setSearch(name);
        setFiltredIntents([]);
        let resultfiltred = [];
    
        if(socialMediaPageSelected.platform === "facebook") {

            resultfiltred = agentsCommentsMatched.filter(intent => {
                let intentLowercase = `${(intent.publisher.first_name).toLowerCase()} ${(intent.publisher.last_name).toLowerCase()}`;
                let searchLowercase = name.toLowerCase();
                return intentLowercase.indexOf(searchLowercase) > -1;
            });

            if(resultfiltred.length === 0) { 
                setNoResultsMatched(true); 
            } else { 
                setNoResultsMatched(false); 
            }
            setFiltredIntents(resultfiltred);

        } else {
            resultfiltred = agentsCommentsMatched.filter(intent => {
                let intentLowercase = "";
                if(intent.publisher.hasOwnProperty('name')) { intentLowercase = (intent.publisher.name).toLowerCase() };
                if(intent.publisher.hasOwnProperty('username')) { intentLowercase = (intent.publisher.username).toLowerCase() };
               
                let searchLowercase = name.toLowerCase();
                return intentLowercase.indexOf(searchLowercase) > -1;
            });

            if(resultfiltred.length === 0) { 
                setNoResultsMatched(true); 
            } else { 
                setNoResultsMatched(false); 
            }
            setFiltredIntents(resultfiltred);
        }
    };

    const searchNotMatched = (name) => {
        setSearch(name);
        setFiltredIntents([]);        
        let resultfiltredMsg = [];
        // console.log("Filter NOT Matched", agentsCommentsMatched);
        
        resultfiltredMsg = agentsCommentsNotMatched.filter(intent => {
            let intentMsgLowercase = intent.message.toLowerCase();
            let searchLowercase = name.toLowerCase();
            return intentMsgLowercase.indexOf(searchLowercase) > -1;
        });
        if(resultfiltredMsg.length === 0) { 
            setNoResultsNotMatched(true); 
        } else { 
            setNoResultsNotMatched(false); 
        }
        setFiltredIntentsNotMatched(resultfiltredMsg);
    };

    const goToComment = (Page, comment) => {

        if(Page.platform === "facebook") {
            let linkToGo = `https://graph.facebook.com/v8.0/${comment.comment_id}?fields=permalink_url&access_token=${Page.accessToken}`;
            axios.get(linkToGo)
            .then((res) => 
                // console.log("Lets go facebook ", res.data)
                window.open(res.data.permalink_url, '_blank')
            );
        } else {
            let linkToGo = `https://graph.facebook.com/v8.0/${agentsProjectLogs[0].post.idPost}?fields=permalink&access_token=${Page.accessToken}`;
            axios.get(linkToGo)
            .then((res) => 
                // console.log("Lets go instagram ", res.data)
                window.open(res.data.permalink, '_blank')
            );
        };
    }

    const handleDateFilter = (date) => {
        setFilterDate(date);
        let choosenDate = moment(date);

        let filtredMatched = agentsCommentsMatched.filter((matched) => 
            moment(matched.created_time).isSame(choosenDate, 'day') 
        );
        // console.log("Filtred =>", filtredMatched);

        if(filtredMatched.length === 0) { 
            setNoResultsMatched(true); 
        } else { 
            setNoResultsMatched(false); 
        }
        setFiltredIntents(filtredMatched);


        setShowDateFilter(false);
    };

    const handleDateFilterNotMatched = (date) => {
        setFilterDateNotMatched(date);
        let choosenDate = moment(date);

        let filtredNotMatched = agentsCommentsNotMatched.filter((notMatched) => 
            moment(notMatched.created_time).isSame(choosenDate, 'day') 
        );
        // console.log("Filtred NOT MATCHED =>", filtredNotMatched);

        if(filtredNotMatched.length === 0) { 
            setNoResultsNotMatched(true); 
        } else { 
            setNoResultsNotMatched(false); 
        }
        setFiltredIntentsNotMatched(filtredNotMatched);

        setShowDateFilter(false);
    };

    const resetFilters = () => {
        setFilterMatchedValue('');
        setFiltredIntents([]);
        setSliderValue([18,82]);
        setNoResultsMatched(false);

        setFilterNotMatchedValue('');
        setFiltredIntentsNotMatched([]);
        setSliderNotMatchedValue([10,81]);
        setNoResultsNotMatched(false);

        setSearch("");

        setShowFilter(false);
    };

    const handleSliderChange = (event, newValue) => {
        setSliderValue(newValue);
        setFilterMatchedValue('');
        
        setTimeout(() => {
            let filtredMatched = agentsCommentsMatched.filter((matched) => matched.intent.find((intent) => (intent.score * 100).toFixed(0) > newValue[0] && (intent.score * 100).toFixed(0) <= newValue[1] ))
            if(filtredMatched.length === 0) { 
                setNoResultsMatched(true); 
            } else { 
                setNoResultsMatched(false); 
            }
            setFiltredIntents(filtredMatched);
        },500);
    };

    const handleSliderNotMatchedChange = (event, newValue) => {
        setSliderNotMatchedValue(newValue);
        setFilterNotMatchedValue('');
        
        setTimeout(() => {
            let filtredNotMatched = agentsCommentsNotMatched.filter((notMatched) => notMatched.intent.find((intent) => (intent.score * 100).toFixed(0) > newValue[0] && (intent.score * 100).toFixed(0) <= newValue[1] ))
            
            if(filtredNotMatched.length === 0) { 
                setNoResultsNotMatched(true); 
            } else { 
                setNoResultsNotMatched(false); 
            }

            setFiltredIntentsNotMatched(filtredNotMatched);
        },500);

    };

    const sliderValueText = (value) => {
        return `${value}%`;
    };

    const sliderNotMatchedValueText = (value) => {
        return `${value}%`;
    };

    const handleFilterIntentMatched = (e) => {
        setFilterMatchedValue(e.target.value);
        setFilterNotMatchedValue('');
        
        
        if(e.target.value === "all") {
            setFiltredIntents([]);
            setShowFilter(false);
        } else {
            let filtredIntentsFinal = agentsCommentsMatched.filter((matched) => matched.intent.find((intent) => intent.intent === e.target.value));
            setFiltredIntents(filtredIntentsFinal);
            setShowFilter(false);
        }
    };

    const handleFilterIntentNotMatched = (e) => {
        setFilterNotMatchedValue(e.target.value);
        setFilterMatchedValue('');

        if(e.target.value === "all") {
            setFiltredIntentsNotMatched([]);
            setShowFilter(false);
        } else {
            let filtredIntentsFinal = agentsCommentsNotMatched.filter((notMatched) => notMatched.intent.find((intent) => intent.intent === e.target.value));
            setFiltredIntentsNotMatched(filtredIntentsFinal);
            setShowFilter(false);
        }
    };

    const resetTags = () => {
        setShowTags(false);
        setShowEmojis(false);
        setShowKeyboard(false);
    };

    const deleteBtn = (index) => {
        let newBtns = [...Btns];
        newBtns.splice(index,1);
        setBtns(newBtns);
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

    const popup = (message) => (swalWithBootstrapButtons.fire({ title: `${message}`, confirmButtonText: trans[lang].myAgentsMsg.popupConfirm }));

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
                popup(trans[lang].myAgentsMsg.btnTitleMsg);
            } else if (BtnValue === "") {
                popup(trans[lang].myAgentsMsg.btnUrlMsg);
            } else {
                newBtns.push(objectFb);
                // update new Btns :
                setBtns(newBtns);
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
                popup(trans[lang].myAgentsMsg.btnTitleMsg);
            } else if (BtnValue === "") {
                popup(trans[lang].myAgentsMsg.btnPhoneMsg);
            } else {
                newBtns.push(objectFb);
                // update new Btns :
                setBtns(newBtns);
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
            setBtns(newBtns);
            setBtnUpdatePop(false);
        } else {
            newBtns[BtnUpdateIndex].type = BtnUpdateType;
            newBtns[BtnUpdateIndex].title = newTitle;
            newBtns[BtnUpdateIndex].payload = newValue;
            setBtns(newBtns);
            setBtnUpdatePop(false);
        };
    };

    const resetBtns = () => {
        handleBtnType('web_url');
        handleBtnTitle('');
        handleBtnValue('');
        setBtnPop(false);
        // setBtnUpdatePop(false);
    };

    // RENDERING FUNCTIONS: 
    const Tags = (
        <div className="popover-tags-my-agents">
                <Col lg={12}>
                    <Row className="pl-1 my-2">
                        {socialMediaPageSelected.platform === "facebook"
                        &&
                        <>
                            <Col xs={12} className="d-flex mb-1 mt-2">
                                <p className="my-auto mr-auto wizard-config-tag" onClick={() => { setAnswerChoosenComment(resp => resp.substring(0, cursorPos) + '##FIRST_NAME##' + resp.substring(cursorPos)); setShowTags(!showTags); }}>{trans[lang].wizardMiracleInput.firstName}</p>
                            </Col>
                            
                            <Col xs={12} className="d-flex mb-1">
                                <p className="my-auto mr-auto wizard-config-tag" onClick={() => { setAnswerChoosenComment(resp => resp.substring(0, cursorPos) + '##LAST_NAME##' + resp.substring(cursorPos)); setShowTags(!showTags); }}>{trans[lang].wizardMiracleInput.lastName}</p>
                            </Col>
                        </>
                        }

                        <Col xs={12} className="d-flex mb-1">
                            <p className="my-auto mr-auto wizard-config-tag" onClick={() => { setAnswerChoosenComment(resp => resp.substring(0, cursorPos) + '##FULL_NAME##' + resp.substring(cursorPos)); setShowTags(!showTags); }}>{trans[lang].wizardMiracleInput.fullName}</p>
                        </Col>

                        <Col xs={12} className="m-auto d-flex mb-2">
                            <p className="my-auto mr-auto wizard-config-tag" onClick={() => { setAnswerChoosenComment(resp => resp.substring(0, cursorPos) + '##PAGE_NAME##' + resp.substring(cursorPos)); setShowTags(!showTags);  }}>{trans[lang].wizardMiracleInput.pageName}</p>
                        </Col> 
                    </Row>
                </Col>
            </div>
    );

    const BtnsPopover = () => (
        <div className="show-button-myAgents">
                <Row className="justify-content-center">
                    <Col md={12}>
                        <Row>
                            <Col md={12} className="d-flex p-0" ><IoIosClose className="ml-auto mr-1" color={'#9F9F9F'} size={'25'} style={{cursor: 'pointer'}} onClick={() => setBtnPop(false)} /></Col>
                            <Col md={12} className="mt-2 mb-3">
                                <Form.Control id="liste-Btn-miracle" as="select" onChange={(e) => handleBtnType(e.target.value)} defaultValue={BtnType} style={{backgroundColor:'#E4E6EB '}} >
                                    <option value="web_url">URL</option>
                                    <option value="phone_number">CALL</option>
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
                                            placeholder="Title" 
                                            maxLength="20"
                                        />
                                    </Col>

                                    <Col md={12} className="d-flex">
                                        <p className="ml-auto wizard-config-input-feedback">Remaining characters: {20 - BtnTitle.length}</p>
                                    </Col>
                                </Row>
                            </Col>

                            <Col md={12} className="mb-2">
                                <Form.Control 
                                    id="liste-Btn-miracle"
                                    type={BtnType === "web_url" ? "text" : "number"} 
                                    onChange={(e) => handleBtnValue(e.target.value)} 
                                    value={BtnValue} 
                                    placeholder={BtnType === "web_url" ? "www.example.com" : "(+216) 99 999 999"} 
                                />
                            </Col>
                        </Row>
                    </Col>

                    <Col md={11} className="d-flex pl-1">
                        <div className="wizard-pages-active-btn py-1 px-4" onClick={() => addNewBtn()}>
                            OK
                        </div>
                    </Col>   
                </Row>
            </div>
    );

    const BtnsUpdatePopover = () => (
        // <Popover id="popover-quick-replies">
        //   <Popover.Content>
        <div className="show-button-myAgents">
            <Row className="justify-content-center">
                <Col md={12}>
                    <Row>
                    <Col md={12} className="d-flex p-0" ><IoIosClose className="ml-auto mr-1" color={'#9F9F9F'}   size={'25'} style={{cursor: 'pointer'}} onClick={() => setBtnUpdatePop(false)} /></Col>
                        <Col md={12} className="mt-2 mb-3">
                            <Form.Control id="liste-Btn-miracle" as="select" onChange={(e) => setBtnUpdateType(e.target.value)} defaultValue={BtnUpdateType} style={{backgroundColor:'#E4E6EB'}}>
                                <option value="web_url">URL</option>
                                <option value="phone_number">CALL</option>
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
                                        placeholder="Title"
                                        maxLength="20" 
                                    />
                                </Col>

                                <Col md={12} className="d-flex">
                                    <p className="ml-auto wizard-config-input-feedback">Remaining characters: {20 - BtnUpdateTitle.length}</p>
                                </Col>
                            </Row>
                        </Col>

                        <Col md={12} className="mb-2">
                            <Form.Control 
                                id="liste-Btn-miracle"
                                type={BtnType === "web_url" ? "text" : "number"} 
                                onChange={(e) => setBtnUpdateValue(e.target.value)} 
                                value={BtnUpdateValue} 
                                placeholder={BtnUpdateType === "web_url" ? "www.example.com" : "(+216) 99 999 999"} 
                            />
                        </Col>
                    </Row>
                </Col>

                <Col md={11} className="d-flex pl-1">
                    <div className="wizard-pages-active-btn py-2 px-4" onClick={() => updateBtn()}>
                       OK
                    </div>
                </Col>   
            </Row>
        </div>
        //   </Popover.Content>
        // </Popover>
    );

    const renderDate = (date) => {
        let newDate = moment(date).format("DD/MM/YYYY");
        let newTime = moment(date).format("h:mm");
        return `${newDate} ${newTime}`;
    };

    useEffect(() => {
        if(agentsSelectedProject) {
            // console.log("Selected proj", agentsSelectedProject);
            getLogs(agentsSelectedProject.post.idPost,socialMediaPageSelected)
        }
    },[]);
    
    useEffect(() => {
        if(!agentsSelectedProject) {
            history.push('my-agents');
        } 
    },[agentsSelectedProject]);

    useEffect(() => {
        if(agentsCommentsMatched.length > 0) {
            setChoosenComment(agentsCommentsMatched[0]);
        } 
    },[agentsCommentsMatched]);

    useEffect(() => {
        if(agentsCommentsMatched.length > 0 && filter === "matched") {
            setChoosenComment(agentsCommentsMatched[0]);
        } 
        
        if(agentsCommentsNotMatched.length > 0 && filter !== "matched") {
            setChoosenComment(agentsCommentsNotMatched[0]);
        }
    },[filter]);

    useEffect(() => {
        if(answerChoosenComment.length) {
            setCursorPos(answerChoosenComment.length + 1)
        };
    },[answerChoosenComment]);

    
    return (
        <Row style={{height: 'auto', background: '#f9f9f9'}}>
            {!agentsProjectLogs 
            ?
            <Col lg={12} className="d-flex">
                <p>{trans[lang].myAgentsMsg.loading}</p>
            </Col>
            :
            <>
            <Col lg={3}>
                <Row style={{marginTop : '135px'}}>
                    { 
                    socialMediaPageSelected
                    &&
                    <Col lg={12}>
                        <Row className="d-flex mr-auto px-3 py-1 mb-1">
                            <div className="d-flex flex-column mr-3">
                                <Image src={socialMediaPageSelected.picture_url} className="mr-auto my-auto" style={{maxWidth: '38px', borderRadius: '50%'}} />
                            </div>
                            {socialMediaPageSelected.name.length > 14
                            ?
                            <p className="mr-auto my-auto wizard-pages-page-title-autoWizard1" >{socialMediaPageSelected.name.substring(0,14) + "..."}</p> 
                            :
                            <p className="mr-auto my-auto wizard-pages-page-title-autoWizard1" >{socialMediaPageSelected.name}</p> 
                            }
                        </Row>
                    </Col>
                    }

                    {/* my agents Selected Post */}
                    { 
                    agentsSelectedProject && agentsSelectedProject.post.hasOwnProperty("message")
                    &&
                    <Col lg={12}>
                        <Col className="d-flex">
                            <Row className="d-flex mr-auto px-3 py-2 mb-3 wizard-post-selection-container">
                                <div className="d-flex flex-column mr-3">
                                    {agentsSelectedProject.post.picture
                                    ?
                                    <Image src={agentsSelectedProject.post.picture} className="mr-auto my-auto" style={{maxWidth: '38px'}} />
                                    :
                                    <Image src={socialMediaPageSelected.picture_url} className="mr-auto my-auto" style={{maxWidth: '38px'}} />
                                    }
                                </div>

                                <p className="mr-auto my-auto wizard-pages-page-title-autoWizard2" >
                                    {agentsSelectedProject.post.hasOwnProperty("message") && agentsSelectedProject.message && agentsSelectedProject.message.length > 14 
                                    ? 
                                    // props.wizardSelectedPost.message
                                    agentsSelectedProject.message.substring(0,14) + "..." 
                                    :
                                    agentsSelectedProject.post.hasOwnProperty("message") && agentsSelectedProject.message && agentsSelectedProject.message.length < 14 
                                    ?
                                    agentsSelectedProject.message
                                    :
                                    socialMediaPageSelected.name
                                    }
                                </p>  
                            </Row>
                        </Col>
                    </Col>
                    }

                    <Col lg={12} className="p-0">
                        <p className="my-agents-msgs-title" >{trans[lang].myAgentsMsg.receivedComments}</p>
                    </Col>

                    <Col lg={12}>
                        <Row className="justify-content-center">
                            <Col lg={6} className={filter === "matched" ? "my-agents-msgs-matched-btn" : "my-agents-msgs-not-matched-btn"} onClick={() => { setChoosenComment(null); setFilter('matched'); setSearch(""); }}>
                                {trans[lang].myAgentsMsg.matched}
                            </Col>
                            <Col lg={6} className={filter === "not-matched" ? "my-agents-msgs-matched-btn" : "my-agents-msgs-not-matched-btn"} onClick={() => {setChoosenComment(null); setFilter('not-matched'); setSearch(""); }}>
                                {trans[lang].myAgentsMsg.notMatched}
                            </Col>
                        </Row>
                    </Col>

                    <Col lg={12}>
                        <Row className="mb-3 justify-content-end ">
                            <Col lg={6}>
                                <Row className="mt-2">
                                    <Col lg={6} className="p-0">
                                        <div  className="pages-filter-box d-flex py-1 px-1 mr-1" style={{ cursor: 'pointer', border: showDateFilter ? '1px solid #E5007D' : '1px solid #D7DAE2'}} onClick={() => { setShowFilter(false); setShowDateFilter(!showDateFilter); }}>
                                            <Image src={showDateFilter ? Calendar_icon_active : Calendar_icon} className={"my-auto mr-1 ml-2"} style={{width: '15px', height: '15px'}} />
                                            <p className={"my-auto"} style={{fontSize: '13px', color : showDateFilter ? '#E5007D' : '#B4B4B4'}}>{trans[lang].myAgentsMsg.date}</p>
                                        </div>

                                        {showDateFilter 
                                        &&
                                        <div className="pop-up-calender-myAgents">
                                            <Calendar
                                                onChange={filter === "matched" ? handleDateFilter : handleDateFilterNotMatched}
                                                value={filter === "matched" ? filterDate : filterDateNotMatched}
                                            />
                                        </div>
                                        }
                                    </Col>

                                    <Col lg={6} className="p-0">
                                        <div className="pages-filter-box d-flex py-1 px-1 ml-1" style={{ cursor: filter === "matched" ? 'pointer' : 'not-allowed', border: showFilter ? '1px solid #E5007D' : '1px solid #D7DAE2'}} onClick={() => { if(filter === "matched") { setShowDateFilter(false); setShowFilter(!showFilter); }}}>
                                            <Image src={showFilter ? Preferences_active : Preferences} className={"my-auto mr-1 ml-2"} style={{width: '15px', height: '15px'}} />
                                            <p className={"my-auto"} style={{fontSize: '13px', color : showFilter ? '#E5007D' : '#B4B4B4'}} >{trans[lang].myAgentsMsg.filter}</p>
                                    
                                        </div>

                                        {showFilter 
                                        &&
                                        <div className="pop-up-filter-myAgents">
                                        <Col lg={12}>
                                            <Row>
                                                <Col lg={12}>
                                                    <p className="pop-up-filter-myAgents-titre mb-2" >{trans[lang].myAgentsMsg.filterIntent}</p>
                                                </Col>

                                                <Col lg={12} className="d-flex">
                                                    <Form.Control className="pop-up-filter-myAgents-select" as="select" defaultValue={''} onChange={filter === "matched" ? handleFilterIntentMatched : handleFilterIntentNotMatched} value={filter === "matched" ? filterMatchedValue : filterNotMatchedValue } >
                                                        <option value="all">{trans[lang].myAgentsMsg.chooseIntent}</option>
                                                        {filter === "matched"
                                                        ?
                                                        intentsMatched.map((intent) => 
                                                            <option value={intent}>{intent}</option>
                                                        )
                                                        :
                                                        intentsNotMatched.map((intent) => 
                                                            <option value={intent}>{intent}</option>
                                                        )
                                                        }
                                                    </Form.Control>
                                                </Col>
                                            </Row>
                                            
                                            <Row className="mt-1">
                                                <Col lg={12}>
                                                    <p className="pop-up-filter-myAgents-titre mb-2 mt-4">{trans[lang].myAgentsMsg.matchedScore}</p>
                                                </Col>

                                                <Col lg={12} className="d-flex">
                                                    <Slider
                                                        value={filter === "matched" ? SliderValue : SliderNotMatchedValue}
                                                        onChange={filter === "matched" ? handleSliderChange : handleSliderNotMatchedChange}
                                                        valueLabelDisplay="auto"
                                                        aria-labelledby="range-slider"
                                                        getAriaValueText={filter === "matched" ? sliderValueText : sliderNotMatchedValueText}
                                                    />
                                                </Col>

                                                <Col lg={12} className="d-flex flex-row">
                                                    <span style={{width: '40px',border: '1px solid #D3D3D3', borderRadius: '5px' ,fontSize: '12px' }} className="mr-auto py-1 text-center">
                                                        {filter === "matched" ? SliderValue[0] : SliderNotMatchedValue[0]}%
                                                    </span>

                                                    <span style={{width: '40px',border: '1px solid #D3D3D3', borderRadius: '5px',fontSize: '12px' }} className="ml-auto py-1 text-center">
                                                        {filter === "matched" ? SliderValue[1] : SliderNotMatchedValue[1]}%
                                                    </span>
                                                </Col>
                                                
                                                <Col lg={12} className="d-flex flex-row mt-3">
                                                    <div className="wizard-pages-inactive-btn  py-2 px-4 mr-auto my-auto" onClick={() => resetFilters()}>
                                                        {trans[lang].myAgentsMsg.reset}
                                                    </div>

                                                    <div className="wizard-pages-active-btn py-2 px-4  ml-auto my-auto" onClick={() => setShowFilter(false)}>
                                                        {trans[lang].myAgentsMsg.applyFilter}
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Col>
                                        </div>
                                        }
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Col>

            <Col lg={12}>
                <div>
                    {/* IF COMMENTS MATCHED.length == 0 || COMMENTS NOT MATCHED.length == 0 */}
                    {filter ==="matched" && agentsCommentsMatched.length === 0
                    ?
                    <>
                    <Col lg={12} className="d-flex" style={{backgroundColor: '#F9F9F9' }}>
                            <Lottie options={defaultOptionsNotFound} width={200} className="m-auto" />
                    </Col>

                    <Col lg={12} className="d-flex mt-5" style={{backgroundColor: '#F9F9F9' }}>
                        <p className="m-auto home-big-title">{trans[lang].myAgentsMsg.noResultsMatched}</p>
                    </Col>
                    </>
                    :                
                    filter === "not-matched" && agentsCommentsNotMatched.length === 0
                    ?
                    <>
                    <Col lg={12} className="d-flex" style={{backgroundColor: '#F9F9F9' }}>
                        <Lottie options={defaultOptionsNotFound} width={200} className="m-auto" /*height={400}*/ />
                    </Col>

                    <Col lg={12} className="d-flex mt-5" style={{backgroundColor: '#F9F9F9' }}>
                        <p className="m-auto home-big-title">{trans[lang].myAgentsMsg.noResultsNotMatched}</p>
                    </Col>
                    </>
                    :
                    <Row>
                    {/* BLOC 1: (WE HAVE DATA) */}        
                    <Col lg={3} className="p-0">
                        <div className="pt-3 pb-5 Bloc-Scroll" style={{ height: "480px" }}>
                        
                        {/* SEARCH BAR */}
                        <Row className="m-0 justify-content-center">
                            <Col lg={1} className="d-flex p-0" ><BiSearch color={"#BCBCCB"} size={"20"} className="m-auto"  /></Col>
                            <Col lg={11} className="d-flex p-0" ><Form.Control type="text" value={search} onChange={(e) => filter === "matched" ? searchMatched(e.target.value) : searchNotMatched(e.target.value)} className="my-auto mr-auto my-agents-search-input" placeholder={filter === "matched" ? trans[lang].myAgentsMsg.searchByName : trans[lang].myAgentsMsg.searchByMsg} /></Col>        
                        </Row>

                        {/* MATCHED */}
                        {filter === "matched" && noResultsMatched
                        ?
                        <div className="d-flex"> <p className="m-auto">{trans[lang].myAgentsMsg.noResultsSorry}</p> </div>
                        :
                        filter === "matched" && filtredIntents.length > 0
                        ?
                        filtredIntents.map((comment,indexComment) => 
                        <>
                        <Row  
                            className="pt-3 pb-5  justify-content-center" 
                            style={{cursor: 'pointer',backgroundColor: choosenComment && choosenComment.comment_id === comment.comment_id ? '#F2F2F2' : '#fff'}}
                            key={comment.comment_id+indexComment} 
                            onClick={() => setChoosenComment(comment)}
                        >
                            <Col lg={12} className="" style={{backgroundColor: choosenComment && choosenComment.comment_id === comment.comment_id ? '#F2F2F2' : '#fff'}}>
                                <Row>
                                    <Col lg={7} className="d-flex">
                                        {comment.publisher.hasOwnProperty('picture')
                                        &&
                                        <Image src={comment.publisher.picture.data.url} className={"my-auto mx-1"} style={{maxWidth: '40px', borderRadius: '50%'}} />
                                        }

                                        {comment.publisher.hasOwnProperty('profile_picture_url')
                                        &&
                                        <Image src={comment.publisher.profile_picture_url} className={"my-auto mx-1"} style={{maxWidth: '40px', borderRadius: '50%'}} />
                                        }

                                        {comment.publisher.hasOwnProperty('first_name') && comment.publisher.hasOwnProperty('last_name')
                                        && 
                                        <p className="my-auto ml-2 my-agents-msg-name">{comment.publisher.first_name} {comment.publisher.last_name}</p>
                                        }
                                        {comment.publisher.hasOwnProperty('name')
                                        && 
                                        <p className="my-auto ml-2 my-agents-msg-name">{comment.publisher.name}</p>
                                        }
                                        {comment.publisher.hasOwnProperty('username')
                                        && 
                                        <p className="my-auto ml-2 my-agents-msg-name">{comment.publisher.username}</p>
                                        }
                                    </Col>

                                    <Col lg={5} className="d-flex p-0">
                                        <p className="my-auto my-agents-msg-date ml-2">{renderDate(comment.created_time)}</p>
                                    </Col>
                                </Row>
                            </Col>
                            
                            <Col lg={12} className="d-flex pl-5 ">
                                <p className="my-agents-msg-desc mt-2">{comment.message}</p>
                            </Col>

                            <Col lg={12} className="px-1 mb-1 mt-3">
                                <Row className="mx-0">
                                    <Col lg={10}>
                                        {comment.intent && comment.intent.length > 0 &&
                                        comment.intent.map((intent,index) => 
                                            <Col key={index} lg={12} className="d-flex p-0"> 
                                                {
                                                intent.hasOwnProperty("intent")
                                                &&
                                                intent.intent.includes("Probablement")
                                                ?
                                                <p className="ml-3 mr-auto my-auto my-agents-msg-intent">Probably: {intent.intent.replace("Probablement ", "")}</p>
                                                :
                                                <p className="ml-3 mr-auto my-auto my-agents-msg-intent">{(intent.score * 100).toFixed(0)}% {trans[lang].myAgentsMsg.intent} {intent.intent}</p>
                                                }
                                            </Col>
                                        )}
                                    </Col>
                                                
                                    <Col lg={2} className="d-flex p-0">
                                        <div className="my-auto mr-3">
                                            <OwnerCheckbox checked={choosenComment && choosenComment.comment_id === comment.comment_id} />
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <hr  style={{borderBottom: '1px solid #818E94', opacity: '0.1',padding: '0',margin: '0px auto',width:'85%'}} />
                        
                        </>
                        )
                        :
                        filter === "matched" && agentsCommentsMatched && agentsCommentsMatched.length > 0 &&
                        agentsCommentsMatched.map((comment,indexComment) => 
                        <>
                        <Row  
                            className="py-3  justify-content-center" 
                            style={{cursor: 'pointer',backgroundColor: choosenComment && choosenComment.comment_id === comment.comment_id ? '#F2F2F2' : '#fff'}}
                            key={comment.comment_id+indexComment} 
                            onClick={() => {setChoosenComment(comment) }}
                        >
                            <Col lg={12} className="" style={{backgroundColor: choosenComment && choosenComment.comment_id === comment.comment_id ? '#F2F2F2' : '#fff'}}>
                                <Row>
                                    <Col lg={7} className="d-flex">
                                        {comment.publisher.hasOwnProperty('picture')
                                        &&
                                        <Image src={comment.publisher.picture.data.url} className={"my-auto mx-1"} style={{maxWidth: '40px', borderRadius: '50%'}} />
                                        }

                                        {comment.publisher.hasOwnProperty('profile_picture_url')
                                        &&
                                        <Image src={comment.publisher.profile_picture_url} className={"my-auto mx-1"} style={{maxWidth: '40px', borderRadius: '50%'}} />
                                        }

                                        {comment.publisher.hasOwnProperty('first_name') && comment.publisher.hasOwnProperty('last_name')
                                        && 
                                        <p className="my-auto ml-2 my-agents-msg-name">{comment.publisher.first_name} {comment.publisher.last_name}</p>
                                        }
                                    
                                        {comment.publisher.hasOwnProperty('name')
                                        && 
                                        <p className="my-auto ml-2 my-agents-msg-name">{comment.publisher.name}</p>
                                        }
                                        {comment.publisher.hasOwnProperty('username')
                                        && 
                                        <p className="my-auto ml-2 my-agents-msg-name">{comment.publisher.username}</p>
                                        }
                                    </Col>

                                    <Col lg={5} className="d-flex p-0">
                                        <p className="my-auto my-agents-msg-date ml-2">{renderDate(comment.created_time)}</p>
                                    </Col>
                                </Row>
                            </Col>
                            
                            <Col lg={12} className="d-flex pl-5 ">
                                <p className="my-agents-msg-desc mt-2">{comment.message}</p>
                            </Col>
                            
                            <Col lg={12} className="px-1 mb-1 mt-3">
                                <Row className="mx-0">
                                    <Col lg={10}>
                                        {comment.intent && comment.intent.length > 0 &&
                                        comment.intent.map((intent,index) => 
                                            <Col key={index} lg={12} className="d-flex p-0"> 
                                                {
                                                intent.hasOwnProperty("intent")
                                                &&
                                                intent.intent.includes("Probablement")
                                                ?
                                                <p className="ml-3 mr-auto my-auto my-agents-msg-intent">Probably: {intent.intent.replace("Probablement ", "")}</p>
                                                :
                                                <p className="ml-3 mr-auto my-auto my-agents-msg-intent">{(intent.score * 100).toFixed(0)}% Intent: {intent.intent}</p>
                                                }
                                                {/* <p className="ml-3 mr-auto my-auto my-agents-msg-intent">{(intent.score * 100).toFixed(0)}% Intent: {intent.intent}</p> */}
                                            </Col>  
                                        )}
                                    </Col>
                                                
                                    <Col lg={2} className="d-flex p-0">
                                        <div className="my-auto mr-3">
                                            <OwnerCheckbox checked={choosenComment && choosenComment.comment_id === comment.comment_id} />
                                        </div>
                                    </Col>
                                </Row>
                            </Col>


                        </Row>

                        <hr  style={{borderBottom: '1px solid #818E94', opacity: '0.1',padding: '0',margin: '0px auto',width:'85%'}} />
                        
                        </>
                        )}
                        
                        {/* NOT MATCHED */}
                        {filter === "not-matched" && noResultsNotMatched
                        ?
                        <div className="d-flex"> <p className="m-auto">{trans[lang].myAgentsMsg.noResultsSorry}</p> </div>
                        :
                        filter === "not-matched" && filtredIntentsNotMatched.length > 0
                        ?
                        filtredIntentsNotMatched.map((comment,indexComment) =>  
                        <>
                        <Row  
                            className="pt-3 pb-5  justify-content-center" 
                            style={{cursor: 'pointer',backgroundColor: choosenComment && choosenComment.comment_id === comment.comment_id ? '#F2F2F2' : '#fff'}}
                            key={comment.comment_id+indexComment} 
                            onClick={() => setChoosenComment(comment)}
                        >
                            <Col lg={12} style={{cursor: 'pointer',backgroundColor: choosenComment && choosenComment.comment_id === comment.comment_id ? '#F2F2F2' : '#fff'}}>
                                <Row>
                                    <Col lg={7} className="d-flex">
                                        {comment.publisher.hasOwnProperty('picture')
                                        &&
                                        <Image src={comment.publisher.picture.data.url} className={"my-auto mx-1"} style={{maxWidth: '40px', borderRadius: '50%'}} />
                                        }
                                        
                                        {comment.publisher.hasOwnProperty('profile_picture_url')
                                        &&
                                        <Image src={comment.publisher.profile_picture_url} className={"my-auto mx-1"} style={{maxWidth: '40px', borderRadius: '50%'}} />
                                        }
                
                                        {comment.publisher.hasOwnProperty('first_name') && comment.publisher.hasOwnProperty('last_name')
                                        && 
                                        <p className="my-auto ml-2 my-agents-msg-name">{comment.publisher.first_name} {comment.publisher.last_name}</p>
                                        }
                                        {comment.publisher.hasOwnProperty('name')
                                        && 
                                        <p className="my-auto ml-2 my-agents-msg-name">{comment.publisher.name}</p>
                                        }
                                        {comment.publisher.hasOwnProperty('username')
                                        && 
                                        <p className="my-auto ml-2 my-agents-msg-name">{comment.publisher.username}</p>
                                        }
                                    </Col>

                                    <Col lg={5} className="d-flex p-0">
                                        <p className="my-auto my-agents-msg-date ml-2">{renderDate(comment.created_time)}</p>
                                    </Col>
                                </Row>
                            </Col>
                            
                            <Col lg={12} className="d-flex pl-5 ">
                                <p className="my-agents-msg-desc mt-2">{comment.message}</p>
                            </Col>
                            
                            <Col lg={12} className="px-1 mb-1 mt-3">
                                <Row className="mx-0">
                                    <Col lg={10}>
                                        {comment.intent && comment.intent.length > 0 &&
                                        comment.intent.map((intent,index) => 
                                            <Col key={index} lg={12} className="d-flex p-0"> 
                                                {
                                                intent.hasOwnProperty("intent")
                                                &&
                                                intent.intent.includes("Probablement")
                                                ?
                                                <p className="ml-3 mr-auto my-auto my-agents-msg-intent">Probably: {intent.intent.replace("Probablement ", "")}</p>
                                                :
                                                <p className="ml-3 mr-auto my-auto my-agents-msg-intent">{(intent.score * 100).toFixed(0)}% {trans[lang].myAgentsMsg.intent} {intent.intent}</p>
                                                }
                                                {/* <p className="ml-3 mr-auto my-auto my-agents-msg-intent">{(intent.score * 100).toFixed(0)}% Intent: {intent.intent}</p> */}
                                            </Col>
                                        )}
                                    </Col>
                                                
                                    <Col lg={2} className="d-flex p-0">
                                        <div className="my-auto mr-3">
                                            <OwnerCheckbox checked={choosenComment && choosenComment.comment_id === comment.comment_id} />
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <hr  style={{borderBottom: '1px solid #818E94', opacity: '0.1',padding: '0',margin: '0px auto',width:'85%'}} />
                        </>
                        )
                        :
                        filter === "not-matched" && agentsCommentsNotMatched && agentsCommentsNotMatched.length > 0 &&
                        agentsCommentsNotMatched.map((comment,indexComment) =>  
                        <>
                        <Row  
                            className="pt-3 pb-5  justify-content-center" 
                            style={{cursor: 'pointer',backgroundColor: choosenComment && choosenComment.comment_id === comment.comment_id ? '#F2F2F2' : '#fff'}}
                            key={comment.comment_id+indexComment} 
                            onClick={() => setChoosenComment(comment) }
                        >
                            <Col lg={12} style={{cursor: 'pointer',backgroundColor: choosenComment && choosenComment.comment_id === comment.comment_id ? '#F2F2F2' : '#fff'}}>
                                <Row>
                                    <Col lg={7} className="d-flex">
                                        {comment.publisher.hasOwnProperty('picture')
                                        &&
                                        <Image src={comment.publisher.picture.data.url} className={"my-auto mx-1"} style={{maxWidth: '40px', borderRadius: '50%'}} />
                                        }
                                        
                                        {comment.publisher.hasOwnProperty('profile_picture_url')
                                        &&
                                        <Image src={comment.publisher.profile_picture_url} className={"my-auto mx-1"} style={{maxWidth: '40px', borderRadius: '50%'}} />
                                        }
                
                                        {comment.publisher.hasOwnProperty('first_name') && comment.publisher.hasOwnProperty('last_name')
                                        && 
                                        <p className="my-auto ml-2 my-agents-msg-name">{comment.publisher.first_name} {comment.publisher.last_name}</p>
                                        }
                                        {comment.publisher.hasOwnProperty('name')
                                        && 
                                        <p className="my-auto ml-2 my-agents-msg-name">{comment.publisher.name}</p>
                                        }
                                        {comment.publisher.hasOwnProperty('username')
                                        && 
                                        <p className="my-auto ml-2 my-agents-msg-name">{comment.publisher.username}</p>
                                        }
                                    </Col>

                                    <Col lg={5} className="d-flex p-0">
                                        <p className="my-auto my-agents-msg-date ml-2">{renderDate(comment.created_time)}</p>
                                    </Col>
                                </Row>
                            </Col>
                            
                            <Col lg={12} className="d-flex pl-5 ">
                                <p className="my-agents-msg-desc mt-2">{comment.message}</p>
                            </Col>
                            
                            <Col lg={12} className="px-1 mb-1 mt-3">
                                <Row className="mx-0">
                                    <Col lg={10}>
                                        {comment.intent && comment.intent.length > 0 &&
                                        comment.intent.map((intent,index) => 
                                            <Col key={index} lg={12} className="d-flex p-0"> 
                                                {
                                                intent.hasOwnProperty("intent")
                                                &&
                                                intent.intent.includes("Probablement")
                                                ?
                                                <p className="ml-3 mr-auto my-auto my-agents-msg-intent">Probably: {intent.intent.replace("Probablement ", "")}</p>
                                                :
                                                <p className="ml-3 mr-auto my-auto my-agents-msg-intent">{(intent.score * 100).toFixed(0)}% Intent: {intent.intent}</p>
                                                }
                                            </Col>
                                        )}
                                    </Col>
                                                
                                    <Col lg={2} className="d-flex p-0">
                                        <div className="my-auto mr-3">
                                            <OwnerCheckbox checked={choosenComment && choosenComment.comment_id === comment.comment_id} />
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <hr  style={{borderBottom: '1px solid #818E94', opacity: '0.1',padding: '0',margin: '0px auto',width:'85%'}} />
                        </>
                        )}
                        </div>
                    </Col>
                    
                    {choosenComment 
                    &&
                    <>
                    {/* BLOC 2 */}
                    <Col lg={5} className="mx-4 p-0">
                        <div style={{ boxShadow: '1px 1px 2px #00000005', backgroundColor : 'white',paddingBottom: '12px'}}>
                            <div className="d-flex px-4 py-3" style={{backgroundColor: 'white'}}>
                                <Row className="mr-auto d-flex">
                                    {choosenComment.publisher.hasOwnProperty('picture')
                                    &&
                                    <Image src={choosenComment.publisher.picture.data.url} className={"mt-auto"} style={{maxWidth: '50px', borderRadius: '50%'}} />  
                                    }

                                    {choosenComment.publisher.hasOwnProperty('profile_picture_url')
                                    &&
                                    <Image src={choosenComment.publisher.profile_picture_url} className={"mt-auto"} style={{maxWidth: '50px', borderRadius: '50%'}} />  
                                    }
                                
                                    {choosenComment.publisher.hasOwnProperty('first_name') && choosenComment.publisher.hasOwnProperty('last_name')
                                    && 
                                    <p className="my-auto ml-2 my-agents-msg-name">{choosenComment.publisher.first_name} {choosenComment.publisher.last_name}</p>
                                    }
                                    {choosenComment.publisher.hasOwnProperty('name')
                                    && 
                                    <p className="my-auto ml-2 my-agents-msg-name">{choosenComment.publisher.name}</p>
                                    }
                                    {choosenComment.publisher.hasOwnProperty('username')
                                    && 
                                    <p className="my-auto ml-2 my-agents-msg-name">{choosenComment.publisher.username}</p>
                                    }
                                </Row>

                                <Row className="ml-auto d-flex">
                                    {socialMediaPageSelected.platform === "facebook"
                                    ?
                                    <>
                                    <Messenger data-for='respFb' data-tip={trans[lang].myAgentsMsg.respOnFb}  className={"my-auto mr-3"} width="23" height="20" color={"#E5007D"} style={{cursor: 'pointer'}} onClick={() => goToComment(socialMediaPageSelected,choosenComment)}/>
                                    <ReactTooltip id='respFb' textColor='#fff' backgroundColor='#009EE3' />
                                    </>
                                    :
                                    <>
                                    <Messenger data-for='respInsta' data-tip={trans[lang].myAgentsMsg.respOnInsta}  className={"my-auto mr-3"} width="23" height="20" color={"#E5007D"} style={{cursor: 'pointer'}} onClick={() => goToComment(socialMediaPageSelected,choosenComment)}/>
                                    <ReactTooltip id='respInsta' textColor='#fff' backgroundColor='#009EE3' />
                                    </>
                                    }
                                    <IoIosClose color={"#A4AFB7"} size={"28"} className="my-auto" />
                                </Row>
                            </div>
                            <hr  style={{borderBottom: '2px solid #818E94', opacity: '0.1',padding: '0',margin: '0'}} />
                            
                            {choosenComment 
                            &&
                            <>
                            {/* BULLE GRIS */}
                            {choosenComment.message 
                            &&
                            <Row className="justify-content-start mx-0">
                                <Col lg={10}>
                                    <Row className="mt-5 mb-3">
                                        <Col lg={2} className="d-flex">
                                            {choosenComment.publisher.hasOwnProperty('picture')
                                            &&
                                            <Image src={choosenComment.publisher.picture.data.url} className={"mt-auto"} style={{maxWidth: '50px', borderRadius: '50%'}} />  
                                            }

                                            {choosenComment.publisher.hasOwnProperty('profile_picture_url')
                                            &&
                                            <Image src={choosenComment.publisher.profile_picture_url} className={"mt-auto"} style={{maxWidth: '50px', borderRadius: '50%'}} />  
                                            }
                                        </Col>

                                        <Col lg={8}>
                                            <div className="my-agents-msgs-bulle">
                                                <p className="my-agents-msgs-bulle-text">{choosenComment.message}</p>
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            }
                            
                            {/* BULLE BLEU */}
                            {filter === "matched" 
                            && choosenComment.hasOwnProperty('intent') &&  choosenComment.intent
                            ?
                            choosenComment.intent.reverse().map((msg, i) => 
                            msg.hasOwnProperty('resp') && msg.resp &&
                            <Row key={i} className="justify-content-end mx-0">
                                <Col lg={10}>
                                    <Row className="mt-3 justify-content-end mx-0">
                                        <Col lg={8} className="p-0">
                                            <div className="my-agents-msgs-bulle-inverse">
                                                <p className="my-agents-msgs-bulle-text-inverse">{msg.resp}</p>
                                            </div>
                                        </Col>

                                        <Col lg={2} className="d-flex">
                                            <Image src={IMODO_PROFILE_ICON} className={"mt-auto"} style={{maxWidth: '50px'}} />
                                        </Col>
                                    </Row>
                                </Col>

                                <Col lg={10}>
                                    <Row className="mt-1 justify-content-end mx-0">
                                        <Col lg={8} className="p-0">
                                            {
                                            msg.hasOwnProperty('buttons') && 
                                            msg.buttons 
                                            && 
                                            msg.buttons.length < 2 
                                            ?
                                            msg.buttons.map((btn, ind) => 
                                                <div key={ind} data-for='btnTip' data-tip={btn.type === "web_url" ? btn.url : btn.payload} className="button-message-facebook d-flex mb-1">
                                                    <p className="m-auto">{btn.title}</p>
                                                </div>
                                            )
                                            :
                                            msg.hasOwnProperty('buttons') && 
                                            msg.buttons 
                                            &&
                                            <div className="group-btns-facebook">
                                                {msg.buttons.map((btn,ind) => 
                                                <div key={ind} data-for='btnTip' data-tip={btn.type === "web_url" ? btn.url : btn.payload} className={`btn-group-facebook${ind} d-flex`} style={{borderBottom: ind < msg.buttons.length - 1 && "1px solid #caccd2" }}>
                                                    <p className="m-auto">{btn.title}</p>
                                                </div>
                                                )}
                                            </div>
                                            }
                                            <ReactTooltip id='btnTip' textColor='#fff' backgroundColor='#E5007D' />
                                        </Col>

                                        <Col lg={2} className="d-flex">
                                            {/* <Image src={IMODO_PROFILE_ICON} className={"mt-auto"} style={{maxWidth: '50px'}} /> */}
                                        </Col>
                                    </Row>
                                </Col> 
                            </Row>
                            )
                            :
                            filter === "not-matched" && 
                            choosenComment.hasOwnProperty('manuelAnswer') && 
                            choosenComment.manuelAnswer && choosenComment.manuelAnswer.length > 0
                            &&
                            <Row className="justify-content-end mx-0">
                                <Col lg={10}>
                                    <Row className="mt-3 justify-content-end mx-0">
                                        <Col lg={8} className="p-0">
                                            <div className="my-agents-msgs-bulle-inverse">
                                                <p className="my-agents-msgs-bulle-text-inverse">{choosenComment.manuelAnswer}</p>
                                            </div>
                                        </Col>

                                        <Col lg={2} className="d-flex">
                                            <Image src={IMODO_PROFILE_ICON} className={"mt-auto"} style={{maxWidth: '50px'}} />
                                        </Col>
                                    </Row>

                                </Col>
                                
                                
                                <Col lg={10}>
                                    <Row className="mt-1 justify-content-end mx-0">
                                        <Col lg={8} className="p-0">
                                            {
                                            choosenComment.hasOwnProperty('buttons') && 
                                            choosenComment.buttons 
                                            && 
                                            choosenComment.buttons.length < 0 
                                            ?
                                            choosenComment.buttons.map((btn, ind) => 
                                                <div key={ind} data-for='btnTip' data-tip={btn.type === "web_url" ? btn.url : btn.payload} className="button-message-facebook d-flex mb-1">
                                                    <p className="m-auto">{btn.title}</p>
                                                </div>
                                            )
                                            :
                                            <div className="group-btns-facebook">
                                                {choosenComment.buttons.map((btn,ind) => 
                                                <div key={ind} data-for='btnTip' data-tip={btn.type === "web_url" ? btn.url : btn.payload} className={`btn-group-facebook${ind} d-flex`} style={{borderBottom: ind < choosenComment.buttons.length - 1 && "1px solid #caccd2" }}>
                                                    <p className="m-auto">{btn.title}</p>
                                                </div>
                                                )}
                                            </div>
                                            }
                                            <ReactTooltip id='btnTip' textColor='#fff' backgroundColor='#E5007D' />
                                        </Col>

                                        <Col lg={2} className="d-flex">
                                            {/* <Image src={IMODO_PROFILE_ICON} className={"mt-auto"} style={{maxWidth: '50px'}} /> */}
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            }
                            </> 
                            }

                            <Row className="mt-5 mx-0">
                            
                                <Col lg={12} >
                                    <hr  style={{borderBottom: '2px solid #818E94', opacity: '0.1',margin: '10px auto',width: '100%'}} />
                                </Col>

                                <Col lg={3}>
                                    <Row className="justify-content-around">
                                    
                                        <div className="d-flex">
                                            <OverlayTrigger trigger="click" placement="top" show={showTags} overlay={Tags}>
                                                <Image src={showTags ? TagInverse : Tag} onClick={() => {resetTags(); setShowTags(!showTags)}} className="my-auto ml-2 my-agents-msgs-tiny-icon" />
                                            </OverlayTrigger>  
                                        </div>                                

                                        <div className="d-flex">
                                            <Image src={showEmojis ? EmoticonInverse : Emoticon } className="m-auto my-agents-msgs-tiny-icon" onClick={(e) => { if(filter === "not-matched" && choosenComment && !choosenComment.treated) {resetTags(); setShowEmojis(!showEmojis);} }} />
                                        </div>

                                        <div className="d-flex">
                                            <Image src={showKeyboard ? ArabicInverse : Arabic } className="m-auto my-agents-msgs-tiny-icon" onClick={(e) => { if(filter === "not-matched" && choosenComment && !choosenComment.treated) {resetTags(); setShowKeyboard(!showKeyboard);} }} />
                                        </div>
                                    </Row>


                                    {showKeyboard &&
                                        <div className="my-agents-keyboard-container">
                                            <Keyboard 
                                                // layout={layout} 
                                                // onChange={(input) => setAnswerChoosenComment(resp => resp.substring(0, cursorPos) + input.charAt(input.length - 1) + resp.substring(cursorPos))}
                                                keyboardRef={r => {keyboard.current = r; keyboard.current.setInput(answerChoosenComment);}}
                                                onChange={(input) => setAnswerChoosenComment(input)}
                                                onKeyPress={(key) => key === "{enter}" && setShowKeyboard(false)}
                                                layout={layout} 
                                            />
                                        </div>
                                    }

                                    {showEmojis &&
                                        <div className="my-agents-emoji-container">
                                            <OutsideClickHandler onOutsideClick={() => setShowEmojis(false)}>
                                                <Picker onEmojiClick={(e,obj) =>{ setAnswerChoosenComment(resp => resp.substring(0, cursorPos) + obj.emoji + resp.substring(cursorPos)); setCursorPos(cursorPos + 2) }} />
                                            </OutsideClickHandler>
                                        </div>
                                    } 
                                </Col>

                                <Col lg={6} className="d-flex p-0">
                                    <input 
                                        className="my-auto" 
                                        type="text"  
                                        placeholder={filter === "matched" ? "Treated" : choosenComment && choosenComment.treated ? "Sent !" : "Your Message..."} 
                                        style={{border: 0}} 
                                        onKeyDown={(e) => { setCursorPos(e.target.selectionStart); if(e.key === "Enter") { answerComment(socialMediaPageSelected,agentsSelectedProject,choosenComment,answerChoosenComment,Btns).then((res) => { console.log("res answer", res.data.data); setChoosenComment(res.data.data); setAnswerChoosenComment(''); setBtns([]); })}  }} 
                                        onChange={(e) => { setAnswerChoosenComment(e.target.value); if(keyboard.current) { keyboard.current.setInput(e.target.value); }  } }    
                                        onClick={(e) => setCursorPos(e.target.selectionStart)}
                                        value={answerChoosenComment}    
                                        disabled={filter === "matched" || choosenComment && choosenComment.treated === true}
                                        style={{
                                            fontFamily: 'Poppins Light',
                                            outline: 'none',
                                            border: '0',
                                            fontSize: '12px',
                                            width: '100%'
                                        }}
                                    />
                                </Col>

                                <Col lg={3} className="d-flex">
                                    {filter === "matched"
                                    ?
                                    <button type="button" className="button-myAgents-traite m-auto d-flex" >
                                        <Check className={"my-auto mr-2"} color={""}  width="14" height="14" />
                                        Treated
                                    </button>
                                    :
                                    <button 
                                        type="button" 
                                        className="button-myAgents-traite m-auto d-flex" 
                                        onClick={() => choosenComment && !choosenComment.treated && answerComment(socialMediaPageSelected,agentsSelectedProject,choosenComment,answerChoosenComment,Btns).then((res) => { setChoosenComment(res.data.data); setAnswerChoosenComment(''); setBtns([]);}) }
                                        style={{
                                            background: choosenComment && choosenComment.treated
                                            ?
                                            "#B4B4B4"
                                            :
                                            "#E5007D"
                                        }} 
                                    >
                                    {choosenComment && choosenComment.treated ? "Sent !" : "Send"}
                                    </button>
                                    }
                                </Col>
                                
                                <Col lg={12} >
                                    <hr  style={{borderBottom: '2px solid #818E94', opacity: '0.1',margin: '10px auto',width: '100%'}} />
                                </Col>

                                <Col lg={12}>
                                {socialMediaPageSelected.platform === "facebook" && filter === "not-matched" && choosenComment && !choosenComment.treated
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
                                            <Col lg={3} className="wizard-config-quick-replies-btn m-1 py-1 d-flex px-0" onClick={() => {setBtnUpdatePop(false); setBtnPop(!BtnPop);}}>
                                                <p className="m-auto">{trans[lang].myAgentsMsg.addBtn}</p>
                                            </Col>
                                            }
                                            {BtnPop && BtnsPopover() }

                                            <div ref={BtnUpdateRef}>
                                                <Overlay show={BtnUpdatePop} target={BtnUpdatePopTarget} placement="right" container={BtnUpdateRef.current}>
                                                    {BtnsUpdatePopover()}
                                                </Overlay>
                                            </div>
                                        </Row>
                                    </Col>
                                </Row> 
                                }
                                </Col>
                            </Row>
                        </div>
                    </Col>

                    {/* BLOC 3 */}
                    <Col lg={3} >
                            <Row style={{backgroundColor : 'white',borderRadius: '5px',boxShadow: '0px 1px 2px #00000029'}}>

                            <Col lg={12} className="d-flex px-4 py-3" style={{backgroundColor: 'white'}}>
                                <Row className="mr-auto d-flex">
                                    {choosenComment.publisher.hasOwnProperty('picture')
                                    &&
                                    <Image src={choosenComment.publisher.picture.data.url} className={"mt-auto"} style={{maxWidth: '50px', borderRadius: '50%'}} />  
                                    }
                                    
                                    {choosenComment.publisher.hasOwnProperty('profile_picture_url')
                                    &&
                                    <Image src={choosenComment.publisher.profile_picture_url} className={"mt-auto"} style={{maxWidth: '50px', borderRadius: '50%'}} />  
                                    }
                                    
                                    {choosenComment.publisher.hasOwnProperty('first_name') && choosenComment.publisher.hasOwnProperty('last_name')
                                    && 
                                    <p className="my-auto ml-2 my-agents-msg-name">{choosenComment.publisher.first_name} {choosenComment.publisher.last_name}</p>
                                    }
                                    {choosenComment.publisher.hasOwnProperty('name')
                                    && 
                                    <p className="my-auto ml-2 my-agents-msg-name">{choosenComment.publisher.name}</p>
                                    }
                                    {choosenComment.publisher.hasOwnProperty('username')
                                    && 
                                    <p className="my-auto ml-2 my-agents-msg-name">{choosenComment.publisher.username}</p>
                                    }
                                </Row>

                                <Row className="ml-auto d-flex">
                                    <AiOutlineEllipsis color={"#A4AFB7"} size={"32"} className="my-auto" />
                                </Row>
                            </Col>
                            <hr  style={{borderBottom: '2px solid #818E94', opacity: '0.1',padding: '0',margin: '0',width: '100%'}} />

                            <Col lg={12} className="d-flex">
                                <p className="my-agents-profile-black-text mt-4">{trans[lang].myAgentsMsg.about}</p>
                            </Col>

                            <Col lg={12} className="">
                                <Row className="justify-content-between">
                                    <Col lg={9} className="">
                                        <p className="my-agents-profile-gray-text">{trans[lang].myAgentsMsg.about}</p>
                                    </Col>
                                    <Col lg={3} className="d-flex">
                                        <p className="my-agents-profile-blue-text ml-auto">{trans[lang].myAgentsMsg.edit}</p>
                                    </Col>
                                </Row>
                            </Col>

                            <Col lg={12} className="d-flex my-1">
                                    <MdPhone color={"#B4B4B4"} size={"25"} className="my-auto mr-3" />
                                    <p className="my-auto my-agents-profile-black-text">{trans[lang].myAgentsMsg.phoneNumber}</p>
                            </Col>

                            <Col lg={12} className="d-flex my-1">
                                <MdEmail color={"#B4B4B4"} size={"25"} className="my-auto mr-3" />
                                <p className="my-auto my-agents-profile-black-text">{trans[lang].myAgentsMsg.email}</p>
                            </Col>

                            <Col lg={12} className="d-flex my-1">
                                <FaBirthdayCake color={"#B4B4B4"} size={"25"} className="my-auto mr-3" />
                                <p className="my-auto my-agents-profile-black-text">{trans[lang].myAgentsMsg.birthday}</p>
                            </Col>

                            <Col lg={12} className="d-flex my-1">
                                <FaHome color={"#B4B4B4"} size={"25"} className="my-auto mr-3" />
                                <p className="my-auto my-agents-profile-black-text">{trans[lang].myAgentsMsg.adresse}</p>
                            </Col>

                            <Col lg={12} className="">
                                <Row className="mt-3">
                                    <Col lg={8} className="">
                                    <p className="my-agents-profile-gray-text">{trans[lang].myAgentsMsg.facebook}</p>
                                    </Col>
                                    <Col lg={4} className="d-flex">
                                        <p className="my-agents-profile-blue-text ml-auto">{trans[lang].myAgentsMsg.viewProfile}</p>
                                    </Col>
                                </Row>
                            </Col>

                            <Col lg={12} className="d-flex">
                                <AiFillClockCircle color={"#B4B4B4"} size={"25"} className="my-auto mr-3" />
                                <p className="my-agents-profile-gray-text my-auto" >{trans[lang].myAgentsMsg.localTime} 16:16</p>
                            </Col>

                            <Col lg={12} className="d-flex mb-5">
                                <RiMapPin2Fill color={"#B4B4B4"} size={"25"} className="my-auto mr-3" />
                                <p className="my-agents-profile-gray-text mr-3 my-auto">{trans[lang].myAgentsMsg.livesIn}</p>
                                <p className="my-agents-profile-blue-text  my-auto">Tunis, Tunisia</p>
                            </Col>
                            </Row>
                        </Col>
                    </>
                    }
                    </Row>
                    }
            </div>
            </Col>
            </>
            }
        </Row>
    )
};

const mapStateToProps = (state) => {
    return {
        lang : state.socialMediaR.lang,
        socialMediaPageSelected : state.socialMediaR.socialMediaPageSelected,
        agentsProjects: state.agentsR.agentsProjects,
        agentsSelectedProject: state.agentsR.agentsSelectedProject,
        agentsProjectLogs: state.agentsR.agentsProjectLogs,
        agentsCommentsMatched: state.agentsR.agentsCommentsMatched,
        agentsCommentsNotMatched: state.agentsR.agentsCommentsNotMatched,
        intentsMatched: state.agentsR.intentsMatched,
        intentsNotMatched: state.agentsR.intentsNotMatched,
    }
};
export default connect(mapStateToProps, { getLogs, answerComment })(MyAgentsMessages);


import React, { useEffect, Fragment, useState } from 'react'
import TopMenu from '../components/TopMenu'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { nlptest, trainagent, unTrained, removechatAction, setsubmited } from '../actions'
import { sendMessage, } from '../sockets/chat'
import { chatAction } from '../actions/index'
import Chat from '../components/Chat'
import Loader from 'react-loader-spinner'
import ActivateAgent from '../components/ActivateAgent'
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
import layout from "simple-keyboard-layouts/build/layouts/arabic";
import { v4 as uuidv4 } from 'uuid';
import { store } from '..'

function TestAgent(props) {
    const [showKeyBoard, setshowKeyBoard] = useState(false)

    const [showlive, setshowlive] = useState(false)
    const [answerCommentMsg, setanswerCommentMsg] = useState('')

    const onChange = (input) => {
        console.log("Input changed", input);
        setanswerCommentMsg(input)
    }

    const onKeyPress = (button) => {
        console.log("Button pressed", button);
        if (button.toString() == "{enter}") {
            setshowKeyBoard(false)
        }
    }


    useEffect(() => {

        props.unTrainedAgent()
        if (!props.porject.trained) {
            props.train(props.porject)
        }
        console.log("test Agent", props.porject.post.page.idPage, props.porject.post.idPost)
        const data = {
            idProject: props.porject._id,
            intents: props.porject.intents.map(el => el.name),
            entiti: props.porject.entities.filter(el => el.default == false).map(el => el.name),
            idPost: props.porject.post.idPost,
            idPage: props.porject.post.page.idPage
        }
        console.log("datafiltred ", data)
        props.trainAgent(data)
        // .then(() => getMessage(props.chat, setsubmited))

    }, [])
    const handelSubmit = (e) => {
        e.preventDefault()
        if (!e.target.message.value) return;
        let obj = {
            message: { text: e.target.message.value, dateSend: Date.now().toString() },
            idPost: props.porject.post.idPost

        }
        props.setsubmited(true)
        sendMessage(obj)
        e.currentTarget.reset()
    }
    function getUnique(arr) {

        // // store the comparison  values in array
        // const unique = arr.map(e => e["send"]["text"])

        //     // store the indexes of the unique objects
        //     .map((e, i, final) => final.indexOf(e) === i && i)

        //     // eliminate the false indexes & return unique objects
        //     .filter((e) => arr[e]).map(e => arr[e]);
        // console.log("unique ", unique)
        // return unique;


        var b = arr.filter(function (item, pos, arr) {
            // Always keep the 0th element as there is nothing before it
            // Then check if each element is different than the one before it
            return pos === 0 || item["response"]["text"] !== arr[pos - 1]["response"]["text"];
        });

        return b
    }
    return (
        <div style={{ position: 'relative' }}>
            <TopMenu />
            {
                props.getPost.hasOwnProperty("idPost") &&
                <div style={{ position: 'absolute', top: 120, left: 20, background: "#fff", padding: 20, display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: "0 0 10px lightgray" }}>
                    {props.getPost.full_picture && <img src={props.getPost.full_picture} alt="" style={{ marginRight: 10, width: 51 }} />}
                    <span style={{ fontSize: 17, color: "#3B5998" }}>{props.getPost.hasOwnProperty("message") ? (props.getPost.message.length < 15 ? props.getPost.message : props.getPost.message.slice(0, 15) + "...") : "Timeline Post"}</span>
                </div>
            }
            <div style={{ paddingLeft: 30, paddingRight: 30, paddingTop: 30 }}>
                <h1 style={{ fontSize: 30, color: "rgba(45, 47, 57, 1)", textAlign: "center" }}>iModo Wizard</h1>
                <svg style={{
                    marginTop: 50,
                    marginBottom: 50,
                    marginLeft: "auto",
                    marginRight: "auto",
                    display: "block"
                }} xmlns="http://www.w3.org/2000/svg" width="828" height="63" viewBox="0 0 828 63">
                    <g id="Groupe_1164" data-name="Groupe 1164" transform="translate(-684 -251)">
                        <g id="step" transform="translate(-509 -438)">
                            <text id="Page_Selection" data-name="Page Selection" transform="translate(1249 747)" fill="#e5007d" font-size="15" font-family="Poppins-Medium, Poppins" font-weight="500"><tspan x="-55.898" y="0">Page Selection</tspan></text>
                            <circle id="Ellipse" cx="19" cy="19" r="19" transform="translate(1230 689)" fill="#e5007d" opacity="0.25" />
                            <path id="Line" d="M0,0H1V180H0Z" transform="translate(1457.702 708.5) rotate(90)" fill="#e5007d" />
                            <path id="Icon_awesome-check" data-name="Icon awesome-check" d="M4.94,15.21.213,10.483a.727.727,0,0,1,0-1.028L1.241,8.426a.727.727,0,0,1,1.028,0L5.454,11.61l6.82-6.82a.727.727,0,0,1,1.028,0l1.028,1.028a.727.727,0,0,1,0,1.028L5.968,15.21A.727.727,0,0,1,4.94,15.21Z" transform="translate(1242.001 698.423)" fill="#fff" />
                        </g>
                        <g id="step-2" data-name="step" transform="translate(-273 -438)">
                            <text id="Post_Selection" data-name="Post Selection" transform="translate(1249 747)" fill="#e5007d" font-size="15" font-family="Poppins-Medium, Poppins" font-weight="500"><tspan x="-52.68" y="0">Post Selection</tspan></text>
                            <circle id="Ellipse-2" data-name="Ellipse" cx="19" cy="19" r="19" transform="translate(1230 689)" fill="#e5007d" opacity="0.25" />
                            <path id="Line-2" data-name="Line" d="M0,0H1V180H0Z" transform="translate(1457.702 708.5) rotate(90)" fill="#e5007d" />
                            <path id="Icon_awesome-check-2" data-name="Icon awesome-check" d="M4.94,15.21.213,10.483a.727.727,0,0,1,0-1.028L1.241,8.426a.727.727,0,0,1,1.028,0L5.454,11.61l6.82-6.82a.727.727,0,0,1,1.028,0l1.028,1.028a.727.727,0,0,1,0,1.028L5.968,15.21A.727.727,0,0,1,4.94,15.21Z" transform="translate(1242.001 698.423)" fill="#fff" />
                        </g>
                        <g id="step-3" data-name="step" transform="translate(-37 -438)">
                            <text id="Automation_config" data-name="Automation config" transform="translate(1249 747)" fill="#e5007d" font-size="15" font-family="Poppins-Medium, Poppins" font-weight="500"><tspan x="-70.628" y="0">Automation config</tspan></text>
                            <circle id="Ellipse-3" data-name="Ellipse" cx="19" cy="19" r="19" transform="translate(1230 689)" fill="#e5007d" opacity="0.25" />
                            <path id="Line-3" data-name="Line" d="M0,0H1V180H0Z" transform="translate(1457.702 708.5) rotate(90)" fill="#e5007d" />
                            <path id="Icon_awesome-check-3" data-name="Icon awesome-check" d="M4.94,15.21.213,10.483a.727.727,0,0,1,0-1.028L1.241,8.426a.727.727,0,0,1,1.028,0L5.454,11.61l6.82-6.82a.727.727,0,0,1,1.028,0l1.028,1.028a.727.727,0,0,1,0,1.028L5.968,15.21A.727.727,0,0,1,4.94,15.21Z" transform="translate(1242.001 698.423)" fill="#fff" />
                        </g>
                        <g id="step-4" data-name="step" transform="translate(199 -438)">
                            <text id="Test_validation" data-name="Test &amp; validation" transform="translate(1249 747)" fill="#e5007d" font-size="15" font-family="Poppins-Medium, Poppins" font-weight="500"><tspan x="-63.217" y="0">Test &amp; validation</tspan></text>
                            <circle id="Ellipse-4" data-name="Ellipse" cx="19" cy="19" r="19" transform="translate(1230 689)" fill="#e5007d" opacity="0.25" />
                            <text id="_4" data-name="4" transform="translate(1249 714)" fill="#e5007d" font-size="16" font-family="Poppins-SemiBold, Poppins" font-weight="600"><tspan x="-5.288" y="0">4</tspan></text>
                        </g>
                    </g>
                </svg>
                {/* <Chat response={"el.response"} send={"el.send"} /> */}
                <div style={{ background: '#fff', paddingTop: 40, paddingLeft: 70, paddingRight: 70, paddingBottom: 40, width: "70%", margin: "auto" }}>
                    <h3>Test Interaction</h3>
                    {
                        showlive &&
                        <ActivateAgent porject={props.porject} setshowlive={() => setshowlive(false)} />
                    }
                    {props.trained ?
                        <Fragment>
                            <div style={{
                                height: "400px",
                                border: "1px solid lightgray",
                                margin: "30px auto",
                                padding: "30px",
                                position: "relative",
                                overflowY: "scroll",
                                width: "60%"

                            }}>
                                {
                                    props.submited &&
                                    <div className="loaderStyle">
                                        <Loader
                                            type="Puff"
                                            color="#E5007D"
                                            height={100}
                                            width={100}
                                            visible={props.submited}
                                        />
                                    </div>
                                }
                                {props.messages.map(el => <Chat key={uuidv4()} response={el.response} send={el.send} />)}
                            </div>
                            <form onSubmit={handelSubmit} style={{
                                width: "68%",
                                margin: "auto"
                            }}>
                                {showKeyBoard &&
                                    <div style={{
                                        position: "absolute",
                                        bottom: "25%",

                                    }}>
                                        <Keyboard
                                            onChange={onChange}
                                            onKeyPress={onKeyPress}
                                            layout={layout}
                                        />
                                    </div>
                                }
                                <span style={{
                                    transform: "translateY(5px)",
                                    zIndex: 1000,
                                    position: "absolute",
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
                                <input type="text" style={{
                                    height: "75px",
                                    width: "100%",
                                    border: "1px solid lightgray",
                                    padding: "0 20px 0 60px",
                                    display: "block",
                                    boxSizing: "border-box"
                                }} placeholder="Your Message..." name="message" disabled={props.submited} value={answerCommentMsg} onChange={(e) => setanswerCommentMsg(e.target.value)} />
                                <div style={{ textAlign: "center" }}>
                                    <button type="submit" style={{
                                        border: "none",
                                        background: "transparent",
                                        padding: 0,
                                        margin: 0,
                                        marginTop: "30px",
                                        cursor: "pointer"
                                    }}>
                                        <svg style={{
                                            marginLeft: "auto",
                                            marginRight: "auto",
                                            display: "block",
                                        }} xmlns="http://www.w3.org/2000/svg" width="153" height="40" viewBox="0 0 153 40">
                                            <g id="Button" transform="translate(-675 -531)">
                                                <rect id="Rectangle_1551" data-name="Rectangle 1551" width="153" height="40" rx="4" transform="translate(675 531)" fill="#4080ff" />
                                                <text id="Test_interaction" data-name="Test interaction" transform="translate(688 557)" fill="#fff" font-size="16" font-family="Poppins-SemiBold, Poppins" font-weight="600"><tspan x="0" y="0">Test interaction</tspan></text>
                                            </g>
                                        </svg>
                                    </button>
                                </div>
                            </form>
                            <div style={{
                                display: "flex",
                                justifyContent: "space-between",
                                marginTop: "50px"
                            }}>
                                <div onClick={() => { props.history.goBack(); props.removechatAction() }}>

                                    <svg xmlns="http://www.w3.org/2000/svg" width="125" height="50" viewBox="0 0 125 50">
                                        <g id="Button" transform="translate(-1376 -914)">
                                            <rect id="Rectangle_1549" data-name="Rectangle 1549" width="125" height="50" rx="4" transform="translate(1376 914)" fill="#e4e6eb" />
                                            <text id="Back" transform="translate(1416 946)" fill="#818e94" font-size="20" font-family="Roboto-Bold, Roboto" font-weight="700"><tspan x="0" y="0">Back</tspan></text>
                                        </g>
                                    </svg>

                                </div>
                                {
                                    !props.porject.live &&
                                    <div onClick={() => { setshowlive(true); props.removechatAction() }}>

                                        <svg xmlns="http://www.w3.org/2000/svg" width="122" height="50" viewBox="0 0 122 50">
                                            <g id="Button" transform="translate(-1427 -914)">
                                                <rect id="Rectangle_1549" data-name="Rectangle 1549" width="122" height="50" rx="4" transform="translate(1427 914)" fill="#e5007d" />
                                                <text id="Next" transform="translate(1467 946)" fill="#fff" font-size="20" font-family="Roboto-Bold, Roboto" font-weight="700"><tspan x="0" y="0">Finish</tspan></text>
                                            </g>
                                        </svg>

                                    </div>
                                }
                                {
                                    props.porject.live &&
                                    <div onClick={() => props.removechatAction()}>
                                        <div onClick={() => { props.history.push(`/dachboard/agent/?page=${props.match.params.id}`) }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="122" height="50" viewBox="0 0 122 50">
                                                <g id="Button" transform="translate(-1427 -914)">
                                                    <rect id="Rectangle_1549" data-name="Rectangle 1549" width="122" height="50" rx="4" transform="translate(1427 914)" fill="#e5007d" />
                                                    <text id="Next" transform="translate(1460 946)" fill="#fff" font-size="20" font-family="Roboto-Bold, Roboto" font-weight="700"><tspan x="0" y="0">Update</tspan></text>
                                                </g>
                                            </svg>
                                        </div>
                                    </div>
                                }
                            </div>
                        </Fragment> :
                        <div style={{ textAlign: "center" }}>
                            <Loader
                                type="Puff"
                                color="#E5007D"
                                height={100}
                                width={100}
                                visible={!props.trained}
                            />
                        </div>
                    }

                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state, owenProps) => {
    const porject = state.allProjects.find(el => el.post.idPost == owenProps.match.params.idpost)
    const post = state.allPosts.find(el => el.idPost == owenProps.match.params.idpost) ? state.allPosts.find(el => el.idPost == owenProps.match.params.idpost) : state.allpages.find(el => el.idPage == owenProps.match.params.idpost)
    console.log("posssst", post)
    return {
        porject,
        messages: state.messages,
        getPost: post,
        trained: state.trainagent,
        submited: state.submited
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        train: (projet, id) => dispatch(nlptest(projet, id)),
        trainAgent: (data) => dispatch(trainagent(data)),
        chat: (message) => dispatch(chatAction(message)),
        unTrainedAgent: () => dispatch(unTrained()),
        removechatAction: () => dispatch(removechatAction()),
        setsubmited: (sub) => dispatch(setsubmited(sub))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TestAgent))

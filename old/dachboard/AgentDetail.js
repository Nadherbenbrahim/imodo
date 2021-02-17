import React, { Fragment } from 'react'
import TopMenu from '../components/TopMenu'
import { connect } from 'react-redux'
import { getComments, answerComment } from '../actions'
import { useEffect } from 'react'
import { withRouter, Link } from 'react-router-dom'
import CommentsMatch from '../components/CommentsMatch'
import CommentsNotMatch from '../components/CommentsNotMatch'
import { useState } from 'react'
import Loader from 'react-loader-spinner'
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
import layout from "simple-keyboard-layouts/build/layouts/arabic";


function AgentDetail(props) {
    const [show, setshow] = useState(true)
    const [eventVal, setEventVal] = useState(null)
    const [submited, setSubmited] = useState(false)
    const [showKeyBoard, setshowKeyBoard] = useState(false)
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
        console.log('id ', props.post)
        props.comments(props.match.params.id)
    }, [])
    const handelSubmit = (e) => {
        e.preventDefault()
        let obj = {
            logs: eventVal,
            post: props.post,
            answer: e.target.answer.value
        }
        console.log(obj)
        setSubmited(true)
        props.answer(obj)
            .then(() => props.comments(props.match.params.id))
            .then(() => {
                setEventVal(null)
                console.log("eventVal ", eventVal)
                setSubmited(false)
            })
    }
    return (
        <div>
            <TopMenu />
            <div style={{ padding: 50 }}>
                {
                    props.post.hasOwnProperty("idPost") &&
                    <div style={{ width: 165, width: "fit-content", background: "#fff", padding: 20, display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: "0 0 10px lightgray" }}>
                        {props.post.full_picture && <img src={props.post.full_picture} alt="" style={{ marginRight: 10, width: 51 }} />}
                        <span style={{ fontSize: 17, color: "#3B5998" }}>{props.post.hasOwnProperty("message") ? (props.post.message.length < 15 ? props.post.message : props.post.message.slice(0, 15) + "...") : "Timeline Post"}</span>
                    </div>
                }
                {
                    props.post.hasOwnProperty("idPage") &&
                    <div style={{ width: 165, width: "fit-content", background: "#fff", padding: 20, display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: "0 0 10px lightgray" }}>
                        <img src={'https://graph.facebook.com/v3.2/' + props.post.idPage + '/picture?access_token=' + props.post.access_token} alt="page thumbnail" style={{ marginRight: 10, width: 51 }} />
                        <span style={{ fontSize: 17, color: "#3B5998" }}>{props.post.name}</span>
                    </div>
                }
                <br />
                <h3>List Recieved Messages</h3>
                <div style={{ display: 'flex' }}>
                    <div className="comments" style={{ flex: 2 }}>
                        {
                            show ?
                                <CommentsMatch comments={props.commentResponse} setshow={setshow} handelClick={(val) => setEventVal(val)} eventVal={eventVal} /> :
                                <CommentsNotMatch comments={props.commentResponse} setshow={setshow} handelClick={(val) => { setEventVal(val); console.log(val) }} eventVal={eventVal} />
                        }
                    </div>

                    <div className="chat" style={{ flex: 2.5, margin: "0 30px" }}>
                        {
                            eventVal &&
                            <Fragment>
                                <div style={{ height: 400, background: "#fff", padding: 20, margin: 0, position: 'relative', boxSizing: "border-box" }}>
                                    <div style={{
                                        position: "absolute", width: "100%", padding: 20, display: 'flex', justifyContent: 'space-between', boxSizing: "border-box", left: 0, right: 0, top: 0, alignItems: "center", boxShadow: "0 1px 3px lightgrey"
                                    }}>
                                        <div style={{
                                            display: "flex",
                                            alignItems: "center"
                                        }}>
                                            <img src={`https://graph.facebook.com/v3.2/${eventVal.publisher.id}/picture`} style={{ width: 40, height: 40, borderRadius: '50%' }} />
                                            <span style={{ marginLeft: 10, fontFamily: "poppins", fontSize: 14, color: "#818E94", fontWeight: "bolder" }}>{eventVal.publisher.name}</span>
                                        </div>

                                        <a className="facebookAncre" href={props.post.hasOwnProperty('permalink_url') ? props.post.permalink_url + "?comment_id=" + eventVal.comment_id.split('_')[1] : `https://www.facebook.com/${props.match.params.id}/?comment_id=${eventVal.comment_id.split('_')[1]}`} target="_blank" style={{
                                            position: "absolute",
                                            right: 60
                                        }}>     <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="32"
                                            height="28.316"
                                            viewBox="0 0 32 28.316"
                                        >
                                                <path
                                                    fill="#e5007d"
                                                    stroke="#e5137d"
                                                    strokeWidth="2"
                                                    d="M1.487 10.279L11.8 1.372a1.407 1.407 0 012.325 1.064v4.691C23.537 7.234 31 9.121 31 18.04a11.978 11.978 0 01-4.883 9.031 1.044 1.044 0 01-1.645-1.092c2.657-8.5-1.26-10.753-10.347-10.883v5.151a1.407 1.407 0 01-2.325 1.065L1.487 12.406a1.407 1.407 0 010-2.129z"
                                                    data-name="Icon awesome-reply"
                                                ></path>
                                            </svg></a>
                                        <span style={{
                                            position: "absolute",
                                            background: "rgb(0, 158, 227)",
                                            color: "rgb(255, 255, 255)",
                                            padding: "11px 20px",
                                            borderRadius: "4px",
                                            fontFamily: "poppins",
                                            fontWeight: "lighter",
                                            fontSize: "12px",
                                            boxShadow: "0 0 10px lightgrey",
                                            right: "0",
                                            top: "-21px",
                                            display: "none"
                                        }}>Response en facebook</span>
                                        <svg onClick={() => setEventVal(null)}
                                            style={{ cursor: 'pointer' }}
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="14.252"
                                            height="14.252"
                                            viewBox="0 0 14.252 14.252"
                                        >
                                            <g fill="#a4afb7" transform="translate(-502.6 -121.6)">
                                                <path
                                                    d="M0 0H17.995V2.159H0z"
                                                    data-name="Rectangle 145"
                                                    transform="rotate(45 105.278 669.336)"
                                                ></path>
                                                <path
                                                    d="M0 0H17.995V2.159H0z"
                                                    data-name="Rectangle 146"
                                                    transform="rotate(135 232.926 168.607)"
                                                ></path>
                                            </g>
                                        </svg>
                                    </div>
                                    <div style={{
                                        position: "absolute", right: 0, left: 0, bottom: 50
                                    }}>
                                        {eventVal.manuelAnswer && eventVal.manuelAnswer.length > 0 &&
                                            <div>
                                                <div style={{
                                                    display: "flex", justifyContent: "space-between", alignItems: "center",
                                                    float: 'left',
                                                    marginLeft: 10
                                                }}>
                                                    <img src={`https://graph.facebook.com/v3.2/${eventVal.publisher.id}/picture`} style={{ width: 40, height: 40, borderRadius: '50%' }} />
                                                    <div style={{
                                                        background: "#EDF0F5", padding: "5px 3px", fontSize: 14, padding: "10px", borderRadius: "20px", borderBottomLeftRadius: 0, maxWidth: 250, marginLeft: 10
                                                    }}>
                                                        <span style={{ color: "#000", }}>{eventVal.message}</span>
                                                    </div>
                                                </div>
                                                <div style={{ clear: "both" }} />
                                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", float: "right", marginRight: 10 }}>

                                                    <div className="response" style={{ background: "#3B86FF", padding: "10px", fontSize: 14, borderRadius: "20px", marginRight: 10, borderBottomRightRadius: 0, maxWidth: 250 }}><span style={{ color: "#fff", }}>{eventVal.manuelAnswer}</span>
                                                    </div>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="60"
                                                        height="60"
                                                        viewBox="0 0 60 60"
                                                    >
                                                        <g data-name="Groupe 1090" transform="translate(-1381 -751)">
                                                            <circle
                                                                cx="30"
                                                                cy="30"
                                                                r="30"
                                                                fill="#e5007d"
                                                                data-name="Ellipse 42"
                                                                transform="translate(1381 751)"
                                                            ></circle>
                                                            <circle
                                                                cx="5"
                                                                cy="5"
                                                                r="5"
                                                                fill="#5ee2a0"
                                                                data-name="Circle Sign (Vivid Purple)"
                                                                transform="translate(1424 798)"
                                                            ></circle>
                                                            <g
                                                                fill="#fff"
                                                                data-name="Groupe 1089"
                                                                transform="translate(1392.999 762)"
                                                            >
                                                                <path
                                                                    d="M-130.782-95.665a2.06 2.06 0 00-2.057 2.057v.12a2.06 2.06 0 002.057 2.058 2.06 2.06 0 002.057-2.058v-.12a2.06 2.06 0 00-2.057-2.057z"
                                                                    data-name="Tracé 127"
                                                                    transform="translate(160.459 110.664)"
                                                                ></path>
                                                                <path
                                                                    d="M-149.9-95.665a2.059 2.059 0 00-2.057 2.057v.12a2.06 2.06 0 002.057 2.058 2.06 2.06 0 002.057-2.058v-.12a2.059 2.059 0 00-2.057-2.057z"
                                                                    data-name="Tracé 128"
                                                                    transform="translate(173.264 110.664)"
                                                                ></path>
                                                                <path
                                                                    d="M-169.027-95.665a2.06 2.06 0 00-2.057 2.057v.12a2.06 2.06 0 002.057 2.058 2.06 2.06 0 002.057-2.058v-.12a2.06 2.06 0 00-2.057-2.057z"
                                                                    data-name="Tracé 129"
                                                                    transform="translate(186.07 110.664)"
                                                                ></path>
                                                                <path
                                                                    d="M-198.078-141.069A18.371 18.371 0 00-216.45-122.7v12.247h2.892l5.733 6.74v-6.74h15.871a12.247 12.247 0 0012.248-12.247 18.372 18.372 0 00-18.372-18.369zm-4.729 19.969h-.84v-3.241a1.742 1.742 0 00-1.74-1.741 1.742 1.742 0 00-1.74 1.741v3.241h-.84v-3.241a1.743 1.743 0 00-1.741-1.741 1.743 1.743 0 00-1.741 1.741v3.241h-.84v-3.241a2.583 2.583 0 012.581-2.581 2.578 2.578 0 012.16 1.174 2.578 2.578 0 012.16-1.174 2.583 2.583 0 012.581 2.581zm6.308-2.793a2.91 2.91 0 01-2.907 2.907 2.91 2.91 0 01-2.907-2.907v-.12a2.91 2.91 0 012.907-2.907 2.91 2.91 0 012.907 2.907zm6.317-.12v2.913h-.84v-.752a2.9 2.9 0 01-2.067.866 2.91 2.91 0 01-2.911-2.908v-.12a2.91 2.91 0 012.907-2.907 2.9 2.9 0 012.067.865v-3.868h.84zm6.317.12a2.91 2.91 0 01-2.907 2.907 2.91 2.91 0 01-2.907-2.907v-.12a2.91 2.91 0 012.907-2.907 2.91 2.91 0 012.907 2.907z"
                                                                    data-name="Tracé 130"
                                                                    transform="translate(216.45 141.069)"
                                                                ></path>
                                                            </g>
                                                        </g>
                                                    </svg>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                    {
                                        submited &&
                                        <div style={{ position: 'absolute', top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                                            <Loader
                                                type="Puff"
                                                color="#E5007D"
                                                height={100}
                                                width={100}
                                                visible={submited}
                                            />
                                        </div>
                                    }
                                </div>
                                <hr style={{
                                    width: "90%",
                                    margin: 0,
                                    borderColor: "lightgray",
                                    margin: "auto"
                                }} />
                                {!eventVal.treated &&
                                    <form onSubmit={handelSubmit} style={{
                                        background: "#fff",
                                        padding: "0 35px 25px 35px",
                                        position: "relative"
                                    }}>
                                        <input type="text" name="answer" style={{
                                            width: "100%",
                                            border: "none",
                                            padding: "25px",
                                            outline: "none",
                                            boxSizing: "border-box",
                                            paddingLeft: 60
                                        }} placeholder="Your Message..." value={answerCommentMsg} disabled={submited} onChange={(e) => setanswerCommentMsg(e.target.value)} required />
                                        <div style={{ textAlign: 'right' }}>
                                            {showKeyBoard &&
                                                <div style={{
                                                    position: "absolute",
                                                    bottom: "107%",

                                                }}>
                                                    <Keyboard
                                                        onChange={onChange}
                                                        onKeyPress={onKeyPress}
                                                        layout={layout}
                                                    />
                                                </div>
                                            }
                                            <span style={{
                                                transform: "translateY(-70px)",
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
                                            <button type="submit" disabled={submited} style={{
                                                border: "none",
                                                background: "transparent",
                                                outline: "none",
                                            }}>
                                                <svg style={{ cursor: 'pointer' }} xmlns="http://www.w3.org/2000/svg" width="122" height="50" viewBox="0 0 122 50">
                                                    <g id="Button" transform="translate(-1427 -914)">
                                                        <rect id="Rectangle_1549" data-name="Rectangle 1549" width="122" height="50" rx="4" transform="translate(1427 914)" fill="#e5007d" />
                                                        <text id="Next" transform="translate(1455 946)" fill="#fff" font-size="20" font-family="Roboto-Bold, Roboto" font-weight="700"><tspan x="0" y="0">Submit</tspan></text>
                                                    </g>
                                                </svg>
                                            </button>
                                        </div>
                                    </form>
                                }
                                {
                                    eventVal.treated &&
                                    <div style={{
                                        background: "#fff",
                                        padding: "10px 35px 25px 35px",
                                        textAlign: "right"
                                    }}>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="100"
                                            height="38"
                                            data-name="Composant 8 – 12"
                                            viewBox="0 0 100 38"
                                        >
                                            <rect
                                                width="100"
                                                height="38"
                                                fill="#149545"
                                                data-name="Rectangle 1550"
                                                rx="4"
                                            ></rect>
                                            <text
                                                fill="#fff"
                                                fontFamily="Roboto-Medium, Roboto"
                                                fontSize="15"
                                                fontWeight="500"
                                                transform="translate(61 24)"
                                            >
                                                <tspan x="-19.332" y="0">
                                                    Traité
        </tspan>
                                            </text>
                                            <path
                                                fill="#fff"
                                                d="M4.94 15.21L.213 10.483a.727.727 0 010-1.028l1.028-1.029a.727.727 0 011.028 0l3.185 3.184 6.82-6.82a.727.727 0 011.028 0l1.028 1.028a.727.727 0 010 1.028L5.968 15.21a.727.727 0 01-1.028 0z"
                                                data-name="Icon awesome-check"
                                                transform="translate(20 9.423)"
                                            ></path>
                                        </svg></div>
                                }
                            </Fragment>
                        }
                    </div>
                    {
                        eventVal &&
                        <div style={{ flex: 1.3, padding: 20, background: "#fff", alignSelf: "end", boxShadow: "0 1px 3px lightgrey" }}>
                            <div style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "flex-start"
                            }}>
                                <img src={`https://graph.facebook.com/v3.2/${eventVal.publisher.id}/picture`} style={{ width: 40, height: 40, borderRadius: '50%' }} />
                                <span style={{ marginLeft: 10, fontFamily: "poppins", fontSize: 14, color: "#818E94", fontWeight: "bolder" }}>{eventVal.publisher.name}</span>
                            </div>
                            <div>
                                <p style={{ marginBottom: 0 }}>About</p>
                                <p style={{
                                    marginTop: 0,
                                    fontWeight: "lighter",
                                    color: "gray",
                                    fontSize: "14px"
                                }}>Added Detail</p>
                            </div>
                            <div style={{ margin: "10px 0" }}>
                                <div style={{ marginRight: 20, width: 30, display: "inline-block" }}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fill="#b4b4b4"
                                            d="M19.43 14.133l-4.375-1.875a.938.938 0 00-1.094.27l-1.938 2.367A14.479 14.479 0 015.1 7.973l2.369-1.937a.935.935 0 00.27-1.094L5.863.567A.944.944 0 004.789.024L.727.962A.938.938 0 000 1.875 18.123 18.123 0 0018.125 20a.938.938 0 00.914-.727l.938-4.063a.949.949 0 00-.547-1.078z"
                                            data-name="Icon awesome-phone-alt"
                                        ></path>
                                    </svg>
                                </div>
                                <span style={{ fontSize: "15px" }} >+ Phone number</span>
                            </div>
                            <div style={{ margin: "10px 0" }}>
                                <div style={{ marginRight: 20, width: 30, display: "inline-block" }}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="15.714"
                                        viewBox="0 0 20 15.714"
                                    >
                                        <path
                                            fill="#b4b4b4"
                                            d="M20.345 5.625H4.155a1.91 1.91 0 00-1.9 1.9v11.9a1.91 1.91 0 001.9 1.9h16.19a1.91 1.91 0 001.9-1.9V7.53a1.91 1.91 0 00-1.9-1.905zm-.238 4.048l-7.857 5.238-7.857-5.238v-1.9l7.857 5.238 7.857-5.238z"
                                            data-name="Icon ionic-md-mail"
                                            transform="translate(-2.25 -5.625)"
                                        ></path>
                                    </svg>
                                </div>
                                <span style={{ fontSize: "15px" }}>+ Email</span>
                            </div>
                            <div style={{ margin: "10px 0" }}>
                                <div style={{ marginRight: 20, width: 30, display: "inline-block" }}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="22.857"
                                        viewBox="0 0 20 22.857"
                                    >
                                        <path
                                            fill="#b4b4b4"
                                            d="M20 17.143c-1.251 0-1.4-1.429-3.326-1.429s-2.09 1.429-3.337 1.429-1.4-1.429-3.337-1.429c-1.913 0-2.108 1.429-3.326 1.429-1.257 0-1.393-1.429-3.337-1.429S1.254 17.143 0 17.143v-3.572a2.143 2.143 0 012.143-2.143h.714V5h2.857v6.429h2.857V5h2.857v6.429h2.857V5h2.857v6.429h.714A2.143 2.143 0 0120 13.571zm0 5.714H0v-4.286c1.936 0 2.088-1.429 3.337-1.429s1.4 1.429 3.337 1.429c1.913 0 2.108-1.429 3.326-1.429 1.257 0 1.393 1.429 3.337 1.429s2.088-1.429 3.337-1.429c1.227 0 1.4 1.429 3.326 1.429zM4.286 4.286a1.424 1.424 0 01-1.429-1.429C2.857 1.473 4.286 1.83 4.286 0c.536 0 1.429 1.317 1.429 2.5s-.637 1.786-1.429 1.786zm5.714 0a1.424 1.424 0 01-1.429-1.429C8.571 1.473 10 1.83 10 0c.536 0 1.429 1.317 1.429 2.5S10.792 4.286 10 4.286zm5.714 0a1.424 1.424 0 01-1.429-1.429c0-1.384 1.429-1.027 1.429-2.857.536 0 1.429 1.317 1.429 2.5s-.636 1.786-1.429 1.786z"
                                            data-name="Icon awesome-birthday-cake"
                                        ></path>
                                    </svg>
                                </div>
                                <span style={{ fontSize: "15px" }}>+ Birth day</span>
                            </div>
                            <div style={{ margin: "10px 0" }}>
                                <div style={{ marginRight: 20, width: 30, display: "inline-block" }}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="15.553"
                                        viewBox="0 0 20 15.553"
                                    >
                                        <path
                                            fill="#b4b4b4"
                                            d="M9.734 6.288l-6.4 5.272v5.69a.556.556 0 00.556.556l3.891-.01a.556.556 0 00.553-.556v-3.322a.556.556 0 01.556-.556h2.222a.556.556 0 01.556.556v3.321a.556.556 0 00.556.557l3.889.011a.556.556 0 00.556-.556v-5.694l-6.4-5.268a.423.423 0 00-.535-.001zm10.111 3.584l-2.9-2.393V2.67a.417.417 0 00-.417-.417h-1.946a.417.417 0 00-.417.417v2.521l-3.108-2.557a1.667 1.667 0 00-2.118 0L.15 9.872a.417.417 0 00-.056.587l.886 1.076a.417.417 0 00.587.057l8.167-6.727a.423.423 0 01.531 0l8.167 6.727a.417.417 0 00.587-.056l.885-1.076a.417.417 0 00-.059-.588z"
                                            data-name="Icon awesome-home"
                                            transform="translate(.001 -2.254)"
                                        ></path>
                                    </svg>
                                </div>
                                <span style={{ fontSize: "15px" }}>+ Adresse</span>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between", margin: "20px 0" }}>
                                <span style={{
                                    fontWeight: "lighter",
                                    color: "gray",
                                    fontSize: "14px"
                                }}>Facebook</span>
                                {/* <a href={"https://www.facebook.com/profile.php?id=" + eventVal.publisher.id} target="_blank" style={{
                                    color: "rgb(38, 128, 235)",
                                    fontWeight: "lighter",
                                    fontSize: "14px",
                                    textDecoration: "none"
                                }}>View profile</a> */}
                            </div>
                            <div style={{ margin: "10px 0" }}>
                                <div style={{ marginRight: 20, width: 30, display: "inline-block" }}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fill="#b4b4b4"
                                            d="M13.375 3.375a10 10 0 1010 10 10 10 0 00-10-10zm.673 10.865a.675.675 0 01-.673.673H8.76a.673.673 0 110-1.346h3.94V7.221a.673.673 0 111.346 0z"
                                            data-name="Icon ionic-ios-time"
                                            transform="translate(-3.375 -3.375)"
                                        ></path>
                                    </svg>
                                </div>
                                <span style={{
                                    fontSize: "15px", fontWeight: "lighter",
                                    color: "gray",
                                    fontSize: "14px"
                                }}>Locale Time {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                            </div>
                            <div style={{ margin: "10px 0" }}>
                                <div style={{ marginRight: 20, width: 30, display: "inline-block" }}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="15"
                                        height="21.429"
                                        viewBox="0 0 15 21.429"
                                    >
                                        <path
                                            fill="#b4b4b4"
                                            d="M15 3a7.5 7.5 0 00-7.5 7.5c0 5.625 7.5 13.929 7.5 13.929s7.5-8.3 7.5-13.929A7.5 7.5 0 0015 3zm0 10.179a2.679 2.679 0 112.679-2.679A2.68 2.68 0 0115 13.179z"
                                            data-name="Icon material-location-on"
                                            transform="translate(-7.5 -3)"
                                        ></path>
                                    </svg>
                                </div>
                                <span style={{ fontSize: "15px", color: "rgb(38, 128, 235)" }}><span style={{
                                    fontWeight: "lighter",
                                    color: "gray",
                                    fontSize: "14px"
                                }}>Lives in</span> Tunis, Tunisia</span>
                            </div>
                        </div>
                    }
                </div>
                <br />
                <div onClick={() => { props.history.goBack() }}>

                    <svg xmlns="http://www.w3.org/2000/svg" width="125" height="50" viewBox="0 0 125 50">
                        <g id="Button" transform="translate(-1376 -914)">
                            <rect id="Rectangle_1549" data-name="Rectangle 1549" width="125" height="50" rx="4" transform="translate(1376 914)" fill="#e4e6eb" />
                            <text id="Back" transform="translate(1416 946)" fill="#818e94" font-size="20" font-family="Roboto-Bold, Roboto" font-weight="700"><tspan x="0" y="0">Back</tspan></text>
                        </g>
                    </svg>

                </div>
            </div>
        </div>
    )
}
const mapDispatchToProps = (dispatch) => {

    return {
        comments: (id) => dispatch(getComments(id)),
        answer: (data) => dispatch(answerComment(data))
    }
}

const mapStateToProps = (state, props) => {
    const post = state.allPosts.find(el => el.idPost === props.match.params.id) || state.allpages.find(el => el.idPage === props.match.params.id)
    return {
        commentResponse: state.comments,
        post,
        fb: state.auth.user
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AgentDetail))

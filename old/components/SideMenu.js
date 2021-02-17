import React, { useState } from 'react'
import {
    NavLink,
    useRouteMatch,
    Link,
    withRouter
} from 'react-router-dom'
import { connect } from 'react-redux';
function SideMenu(props) {
    // const [state, setstate] = useState(useRouteMatch().path)
    const match = useRouteMatch();
    return (
        <>
            <div style={{ flex: 1.2, height: 100 + 'vh' }}></div>
            <div style={{ width: 15 + '%', paddingLeft: 100, display: 'flex', flexDirection: 'column', height: 100 + 'vh', position: 'fixed', zIndex: 10, justifyContent: 'inherit', boxShadow: '1px 1px 2px rgba(0, 0, 0, 0.051)', background: '#fff' }}>
                <div className="logo" style={{ marginTop: 20 }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="95.75" height="63.963" viewBox="0 0 95.75 63.963">
                        <g id="logo" transform="translate(-158.177 -138.584)">
                            <g id="Groupe_1" data-name="Groupe 1" transform="translate(186.894 138.584)">
                                <path id="Tracé_1" data-name="Tracé 1" d="M326.293,166.291a8.852,8.852,0,0,0-8.842,8.842V185.4H320.5V175.133a5.793,5.793,0,1,1,11.586,0V185.4h3.049V175.133A8.852,8.852,0,0,0,326.293,166.291Z" transform="translate(-307.406 -159.548)" fill="#d8006b" />
                                <path id="Tracé_2" data-name="Tracé 2" d="M295.335,138.584a19.159,19.159,0,0,0-19.159,19.159v12.772h3.016l5.979,7.03v-7.03h16.55a12.772,12.772,0,0,0,12.772-12.772A19.159,19.159,0,0,0,295.335,138.584Zm6.386,28.821H279.286v-9.662a16.048,16.048,0,0,1,32.1,0A9.673,9.673,0,0,1,301.721,167.4Z" transform="translate(-276.176 -138.584)" fill="#d8006b" />
                            </g>
                            <g id="Groupe_2" data-name="Groupe 2" transform="translate(158.177 172.445)">
                                <path id="Tracé_3" data-name="Tracé 3" d="M175.564,338.869h-2.83V327.952a5.863,5.863,0,0,0-11.726,0v10.917h-2.83V327.952a8.693,8.693,0,1,1,17.387,0Z" transform="translate(-158.177 -309.15)" fill="#d8006b" />
                                <path id="Tracé_4" data-name="Tracé 4" d="M235.375,338.869h-2.831V327.952a5.863,5.863,0,1,0-11.725,0v10.917h-2.83V327.952a8.693,8.693,0,1,1,17.386,0Z" transform="translate(-203.433 -309.15)" fill="#d8006b" />
                                <rect id="Rectangle_2" data-name="Rectangle 2" width="2.831" height="29.719" transform="translate(71.64)" fill="#d8006b" />
                                <path id="Tracé_5" data-name="Tracé 5" d="M393.506,319.286a9.8,9.8,0,0,0-9.791,9.791v.4a9.792,9.792,0,1,0,19.583,0v-.4A9.8,9.8,0,0,0,393.506,319.286Zm6.93,10.195a6.93,6.93,0,1,1-13.86,0v-.4a6.93,6.93,0,0,1,13.86,0Z" transform="translate(-328.828 -309.171)" fill="#d8006b" />
                                <path id="Tracé_6" data-name="Tracé 6" d="M306.067,319.286a9.8,9.8,0,0,0-9.792,9.791v.4a9.792,9.792,0,1,0,19.583,0v-.4A9.8,9.8,0,0,0,306.067,319.286ZM313,329.481a6.93,6.93,0,1,1-13.859,0v-.4a6.93,6.93,0,0,1,13.859,0Z" transform="translate(-262.667 -309.171)" fill="#d8006b" />
                                <path id="Tracé_7" data-name="Tracé 7" d="M480.946,319.286a9.8,9.8,0,0,0-9.792,9.791v.4a9.792,9.792,0,1,0,19.583,0v-.4A9.8,9.8,0,0,0,480.946,319.286Zm6.929,10.195a6.93,6.93,0,1,1-13.86,0v-.4a6.93,6.93,0,0,1,13.86,0Z" transform="translate(-394.987 -309.171)" fill="#d8006b" />
                            </g>
                        </g>
                    </svg>
                </div>
                <div className="wizardLink">
                    {
                        window.location.href.includes('wizard') ?
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="227"
                                height="78"
                                viewBox="0 0 227 78"
                            >
                                <defs>
                                    <filter
                                        id="a"
                                        width="227"
                                        height="78"
                                        x="0"
                                        y="0"
                                        filterUnits="userSpaceOnUse"
                                    >
                                        <feOffset dy="3"></feOffset>
                                        <feGaussianBlur result="blur" stdDeviation="3"></feGaussianBlur>
                                        <feFlood floodOpacity="0.161"></feFlood>
                                        <feComposite in2="blur" operator="in"></feComposite>
                                        <feComposite in="SourceGraphic"></feComposite>
                                    </filter>
                                </defs>
                                <g data-name="wizard button" transform="translate(-104 -798)">
                                    <g filter="url(#a)" transform="translate(104 798)">
                                        <rect
                                            width="209"
                                            height="60"
                                            fill="#e4e6eb"
                                            data-name="Rectangle 215"
                                            rx="5"
                                            transform="translate(9 6)"
                                        ></rect>
                                    </g>
                                    <g
                                        fill="#b4b4b4"
                                        data-name="Groupe 1017"
                                        transform="translate(133 815)"
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
                                    <text
                                        fill="#b4b4b4"
                                        data-name="Auto-moderation wizard"
                                        fontFamily="Roboto-Medium, Roboto"
                                        fontSize="16"
                                        fontWeight="500"
                                        transform="translate(241 830)"
                                    >
                                        <tspan x="-60.504" y="0">
                                            Auto-moderation
          </tspan>
                                        <tspan x="-23.668" y="18">
                                            wizard
          </tspan>
                                    </text>
                                </g>
                            </svg>
                            : <Link to={`/dachboard/wizard`}>
                                <svg xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" width="227" height="86.482" viewBox="0 0 227 86.482">
                                    <defs>
                                        <filter id="Rectangle_215" x="0" y="0" width="227" height="86.482" filterUnits="userSpaceOnUse">
                                            <feOffset dy="3" input="SourceAlpha" />
                                            <feGaussianBlur stdDeviation="3" result="blur" />
                                            <feFlood style={{ floodOpacity: 0.161 }} />
                                            <feComposite operator="in" in2="blur" />
                                            <feComposite in="SourceGraphic" />
                                        </filter>
                                    </defs>
                                    <g id="wizard_button" data-name="wizard button" transform="translate(-104 -797.518)">
                                        <g transform="matrix(1, 0, 0, 1, 104, 797.52)" filter="url(#Rectangle_215)">
                                            <rect id="Rectangle_215-2" data-name="Rectangle 215" width="209" height="68.482" rx="5" transform="translate(9 6)" fill="#e5007d" />
                                        </g>
                                        <g id="Groupe_1017" data-name="Groupe 1017" transform="translate(133 819.518)">
                                            <path id="Tracé_127" data-name="Tracé 127" d="M-130.782-95.665a2.06,2.06,0,0,0-2.057,2.057v.12a2.06,2.06,0,0,0,2.057,2.058,2.06,2.06,0,0,0,2.057-2.058v-.12A2.06,2.06,0,0,0-130.782-95.665Z" transform="translate(160.459 110.664)" fill="#fff" />
                                            <path id="Tracé_128" data-name="Tracé 128" d="M-149.9-95.665a2.059,2.059,0,0,0-2.057,2.057v.12a2.06,2.06,0,0,0,2.057,2.058,2.06,2.06,0,0,0,2.057-2.058v-.12A2.059,2.059,0,0,0-149.9-95.665Z" transform="translate(173.264 110.664)" fill="#fff" />
                                            <path id="Tracé_129" data-name="Tracé 129" d="M-169.027-95.665a2.06,2.06,0,0,0-2.057,2.057v.12a2.06,2.06,0,0,0,2.057,2.058,2.06,2.06,0,0,0,2.057-2.058v-.12A2.06,2.06,0,0,0-169.027-95.665Z" transform="translate(186.07 110.664)" fill="#fff" />
                                            <path id="Tracé_130" data-name="Tracé 130" d="M-198.078-141.069A18.371,18.371,0,0,0-216.45-122.7v12.247h2.892l5.733,6.74v-6.74h15.871A12.247,12.247,0,0,0-179.706-122.7,18.372,18.372,0,0,0-198.078-141.069Zm-4.729,19.969h-.84v-3.241a1.742,1.742,0,0,0-1.74-1.741,1.742,1.742,0,0,0-1.74,1.741v3.241h-.84v-3.241a1.743,1.743,0,0,0-1.741-1.741,1.743,1.743,0,0,0-1.741,1.741v3.241h-.84v-3.241a2.583,2.583,0,0,1,2.581-2.581,2.578,2.578,0,0,1,2.16,1.174,2.578,2.578,0,0,1,2.16-1.174,2.583,2.583,0,0,1,2.581,2.581Zm6.308-2.793a2.91,2.91,0,0,1-2.907,2.907,2.91,2.91,0,0,1-2.907-2.907v-.12a2.91,2.91,0,0,1,2.907-2.907,2.91,2.91,0,0,1,2.907,2.907Zm6.317-.12v2.913h-.84v-.752a2.9,2.9,0,0,1-2.067.866A2.91,2.91,0,0,1-196-123.894v-.12a2.91,2.91,0,0,1,2.907-2.907,2.9,2.9,0,0,1,2.067.865v-3.868h.84Zm6.317.12a2.91,2.91,0,0,1-2.907,2.907,2.91,2.91,0,0,1-2.907-2.907v-.12a2.91,2.91,0,0,1,2.907-2.907,2.91,2.91,0,0,1,2.907,2.907Z" transform="translate(216.45 141.069)" fill="#fff" />
                                        </g>
                                        <text id="Auto-moderation_wizard" data-name="Auto-moderation
                                    wizard" transform="translate(241 835)" fill="#fff" style={{ fontSize: 16, fontFamily: "Roboto-Medium, Roboto", fontWeight: 500 }}><tspan x="-60.504" y="0">Auto-moderation</tspan><tspan x="-23.668" y="18">wizard</tspan></text>
                                    </g>
                                </svg>
                            </Link>

                    }
                </div>
                <div className="menuLinks">
                    <NavLink to={`${match.path}/`} activeClassName="selected" exact>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20.123" height="20.123" viewBox="0 0 20.123 20.123">
                            <g id="grid-45" transform="translate(-1 -1)">
                                <path id="Tracé_188" data-name="Tracé 188" d="M9.311,1H1.437A.437.437,0,0,0,1,1.437V9.311a.437.437,0,0,0,.437.437H9.311a.437.437,0,0,0,.437-.437V1.437A.437.437,0,0,0,9.311,1Z" fill="#818e94" />
                                <path id="Tracé_189" data-name="Tracé 189" d="M35.311,1H27.437A.437.437,0,0,0,27,1.437V9.311a.437.437,0,0,0,.437.437h7.874a.437.437,0,0,0,.437-.437V1.437A.437.437,0,0,0,35.311,1Z" transform="translate(-14.626)" fill="#818e94" />
                                <path id="Tracé_190" data-name="Tracé 190" d="M9.311,27H1.437A.437.437,0,0,0,1,27.437v7.874a.437.437,0,0,0,.437.437H9.311a.437.437,0,0,0,.437-.437V27.437A.437.437,0,0,0,9.311,27Z" transform="translate(0 -14.626)" fill="#818e94" />
                                <path id="Tracé_191" data-name="Tracé 191" d="M35.311,27H27.437a.437.437,0,0,0-.437.437v7.874a.437.437,0,0,0,.437.437h7.874a.437.437,0,0,0,.437-.437V27.437A.437.437,0,0,0,35.311,27Z" transform="translate(-14.626 -14.626)" fill="#818e94" />
                            </g>
                        </svg>
                        <span>Home</span></NavLink>
                    {/* <NavLink to={`${match.path}/statistiques`} activeClassName="selected">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20.123" height="20.123" viewBox="0 0 20.123 20.123">
                        <g id="ic_poll_48px" transform="translate(-6 -6)">
                            <path id="Tracé_192" data-name="Tracé 192" d="M23.887,6H8.236A2.235,2.235,0,0,0,6,8.236V23.887a2.235,2.235,0,0,0,2.236,2.236H23.887a2.235,2.235,0,0,0,2.236-2.236V8.236A2.235,2.235,0,0,0,23.887,6ZM12.708,21.651H10.472V13.825h2.236Zm4.472,0H14.943V10.472h2.236Zm4.472,0H19.415V17.179h2.236Z" fill="#818e94" />
                        </g>
                    </svg>
                    <span>Statistiques</span></NavLink> */}
                    <NavLink to={`${match.path}/agent`} activeClassName="selected" exact>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20.526" height="20.55" viewBox="0 0 20.526 20.55">
                            <g id="layers-3" transform="translate(-3 -2.95)">
                                <path id="Tracé_193" data-name="Tracé 193" d="M23.281,30.077,21.668,29.1,14,33.694a1.379,1.379,0,0,1-.733.2,1.273,1.273,0,0,1-.733-.2L4.857,29.149l-1.613.977A.387.387,0,0,0,3,30.517a.513.513,0,0,0,.244.44l9.774,5.864a.635.635,0,0,0,.489,0l9.774-5.864a.518.518,0,0,0,0-.88Z" transform="translate(0 -13.37)" fill="#818e94" />
                                <path id="Tracé_194" data-name="Tracé 194" d="M23.281,22.077,21.668,21.1,14,25.694a1.379,1.379,0,0,1-.733.2,1.273,1.273,0,0,1-.733-.2L4.857,21.149l-1.613.977A.387.387,0,0,0,3,22.517a.513.513,0,0,0,.244.44l9.774,5.864a.635.635,0,0,0,.489,0l9.774-5.864a.518.518,0,0,0,0-.88Z" transform="translate(0 -9.28)" fill="#818e94" />
                                <path id="Tracé_195" data-name="Tracé 195" d="M23.281,8.888,13.507,3.023a.444.444,0,0,0-.489,0L3.244,8.888a.518.518,0,0,0,0,.88l9.774,5.864a.635.635,0,0,0,.489,0l9.774-5.864a.518.518,0,0,0,0-.88Z" fill="#818e94" />
                            </g>
                        </svg>
                        <span>My Agents</span></NavLink>
                    {/* <NavLink to={`${match.path}/posts`} activeClassName="selected">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                        <g id="ic_sms_48px" transform="translate(-4 -4)">
                            <path id="Tracé_196" data-name="Tracé 196" d="M22,4H6A1.991,1.991,0,0,0,4.01,6L4,24l4-4H22a2,2,0,0,0,2-2V6A2,2,0,0,0,22,4ZM11,13H9V11h2Zm4,0H13V11h2Zm4,0H17V11h2Z" fill="#818e94" />
                        </g>
                    </svg>
                    <span>Posts</span></NavLink> */}
                    <NavLink to={`${match.path}/entities`} activeClassName="selected" className="agentContainer" >
                        {props.popup && <div style={{
                            background: "rgb(0, 158, 227)",
                            color: "rgb(255, 255, 255)",
                            padding: "10px 30px",
                            position: "absolute",
                            borderRadius: "15px",
                            boxShadow: "0 0 5px #000",
                            fontFamily: "poppins",
                            fontWeight: "lighter",
                            fontSize: "14px",
                            top: 35
                        }}><span style={{ position: "absolute", height: 10, width: 10, transform: "rotate(45deg) translateX(-50%)", top: -3, background: "rgb(0, 158, 227)", }} />you have new products! <br /> you can add synonyms or organise them here</div>}
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                            <g id="preferences" transform="translate(-1 -1)">
                                <path id="Tracé_197" data-name="Tracé 197" d="M31.022,7h-10.6a.424.424,0,0,0,0,.848h10.6a.424.424,0,0,0,0-.848Z" transform="translate(-10.446 -3.457)" fill="#818e94" />
                                <path id="Tracé_198" data-name="Tracé 198" d="M7.359,1H3.967a.424.424,0,0,0-.424.424v2.12H1.424a.424.424,0,1,0,0,.848h2.12v2.12a.424.424,0,0,0,.424.424H7.359a.424.424,0,0,0,.424-.424V1.424A.424.424,0,0,0,7.359,1Z" fill="#818e94" />
                                <path id="Tracé_199" data-name="Tracé 199" d="M1.424,23h10.6a.424.424,0,1,1,0,.848H1.424a.424.424,0,1,1,0-.848Z" transform="translate(0 -12.424)" fill="#818e94" />
                                <path id="Tracé_200" data-name="Tracé 200" d="M31.424,17h3.391a.424.424,0,0,1,.424.424v2.12h2.12a.424.424,0,0,1,0,.848h-2.12v2.12a.424.424,0,0,1-.424.424H31.424A.424.424,0,0,1,31,22.511V17.424A.424.424,0,0,1,31.424,17Z" transform="translate(-16.783 -8.967)" fill="#818e94" />
                                <path id="Tracé_201" data-name="Tracé 201" d="M31.022,39h-10.6a.424.424,0,0,0,0,.848h10.6a.424.424,0,0,0,0-.848Z" transform="translate(-10.446 -21.391)" fill="#818e94" />
                                <path id="Tracé_202" data-name="Tracé 202" d="M7.359,33H3.967a.424.424,0,0,0-.424.424v2.12H1.424a.424.424,0,1,0,0,.848h2.12v2.12a.424.424,0,0,0,.424.424H7.359a.424.424,0,0,0,.424-.424V33.424A.424.424,0,0,0,7.359,33Z" transform="translate(0 -17.935)" fill="#818e94" />
                            </g>
                        </svg>
                        <span style={{ color: props.popup ? "#E5017D" : "#818E94" }}>Manage my products</span></NavLink>
                    {/* <NavLink to={`${match.path}/training`} activeClassName="selected">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                        <g id="compass-05" transform="translate(-1 -1)">
                            <path id="Tracé_203" data-name="Tracé 203" d="M11,1A10,10,0,1,0,21,11,10.011,10.011,0,0,0,11,1Zm4.747,5.823L13.139,12.91a.434.434,0,0,1-.228.228L6.823,15.747a.43.43,0,0,1-.171.035.435.435,0,0,1-.4-.606L8.861,9.09a.434.434,0,0,1,.228-.228l6.087-2.609a.435.435,0,0,1,.571.571Z" fill="#818e94" />
                            <circle id="Ellipse_2" data-name="Ellipse 2" cx="1" cy="1" r="1" transform="translate(9.966 10.034)" fill="#818e94" />
                        </g>
                    </svg>
                    <span>Training</span></NavLink> */}
                </div>
                <div></div>
            </div>
        </>
    )
}

export default withRouter(connect(state => ({
    popup: state.popupdate
}))(SideMenu))

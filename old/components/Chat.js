import React, { useEffect } from 'react'

function Chat(props) {
    useEffect(() => {

        console.log('chat', props)
    }, [])
    return (
        <div style={{ clear: "both" }}>
            <div className="send" style={{
                float: 'left', background: "#EDF0F5", padding: "5px 3px", fontSize: 14, padding: "10px", borderRadius: "20px", borderBottomLeftRadius: 0, maxWidth: 200
            }}><span style={{ color: "#000", }}>{props.send.text}</span></div>
            <div style={{ clear: "both" }} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", float: 'right', }}>
                <div className="response" style={{ background: "#3B86FF", padding: "10px", fontSize: 14, borderRadius: "20px", marginRight: 10, borderBottomRightRadius: 0, maxWidth: 200 }}><span style={{ color: "#fff", }}>{props.response.text == '' ? 'ne correspond pas à votre liste de réponses' : props.response.text}</span>
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
    )
}

export default Chat

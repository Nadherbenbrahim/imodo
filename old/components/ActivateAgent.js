import React from 'react'
import { connect } from 'react-redux'
import { goLive } from '../actions'
import { useHistory, useRouteMatch, useParams } from 'react-router-dom'

function ActivateAgent(props) {
    const { push } = useHistory()
    const { id } = useParams()
    const handelclick = () => {
        props.dispatch(goLive(props.porject))
            .then(() => {
                props.setshowlive()
                push(`/dachboard/agent/?page=${id}`)
            })
    }
    return (
        <div style={{ position: 'fixed', bottom: 50, right: 50, zIndex: 100 }}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="256"
                height="129"
                viewBox="0 0 256 129"
            >
                <g data-name="Groupe 1141" transform="translate(-1636 -774)">
                    <rect
                        width="256"
                        height="129"
                        fill="#e5007d"
                        data-name="Rectangle 1564"
                        rx="10"
                        transform="translate(1636 774)"
                    ></rect>
                    <g data-name="Groupe 1139" style={{ cursor: 'pointer' }} transform="translate(-2)" onClick={handelclick}>
                        <rect
                            width="166"
                            height="40"
                            fill="#fff"
                            data-name="Rectangle 1565"
                            rx="5"
                            transform="translate(1681 793)"
                        ></rect>
                        <text
                            fill="#e5007d"
                            data-name="Activate Now"
                            fontFamily="Poppins-SemiBold, Poppins"
                            fontSize="15"
                            fontWeight="600"
                            transform="translate(1761 819)"
                        >
                            <tspan x="-50.408" y="0">
                                Activate Now
            </tspan>
                        </text>
                    </g>
                    <g data-name="Groupe 1140" style={{ cursor: 'pointer' }} transform="translate(0 50)" onClick={() => push(`/dachboard/agent/?page=${id}`)}>
                        <g
                            fill="none"
                            stroke="#fff"
                            strokeWidth="1"
                            data-name="Rectangle 1565"
                            transform="translate(1679 793)"
                        >
                            <rect width="166" height="40" stroke="none" rx="5"></rect>
                            <rect width="165" height="39" x="0.5" y="0.5" rx="4.5"></rect>
                        </g>
                        <text
                            fill="#fff"
                            data-name="Activate Later"
                            fontFamily="Poppins-SemiBold, Poppins"
                            fontSize="15"
                            fontWeight="600"
                            transform="translate(1762 819)"
                        >
                            <tspan x="-52.875" y="0">
                                Activate Later
            </tspan>
                        </text>
                    </g>
                </g>
            </svg>
        </div>
    )
}

export default connect(null)(ActivateAgent)

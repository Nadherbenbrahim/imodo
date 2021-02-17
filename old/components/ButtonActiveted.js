import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { goLive, getConnectedPagesProject } from '../actions'

function ButtonActiveted(props) {
    const [projectActiveted, useprojectActiveted] = useState(false)
    // console.log(props)
    useEffect(() => {

        // props.allposts.forEach(el => {
        //     props.allProjects.forEach(element => {
        //         if (el.idPost == element.post.idPost && element.live) {
        //             useprojectActiveted(true)
        //         }
        //     })
        // })
        // console.log(props.project)
        if (props.project) {
            if (props.project.live == true) {
                useprojectActiveted(true)
            } else if (props.project.live == false) {
                useprojectActiveted(false)
            }
        }
    }, [props.project])
    const handelClick = () => {
        if (props.project && props.project.trained == true) {
            props.live(props.project)
                .then(() => props.getPagePostProject())
        } else { alert("You didn't train this agent") }
    }
    return (
        <div>
            {
                projectActiveted ? <svg style={{ cursor: 'pointer' }} onClick={props.hasOwnProperty("agentPage") ? handelClick : () => console.log('not agent page')}
                    xmlns="http://www.w3.org/2000/svg"
                    width="120"
                    height="38"
                    data-name="Composant 17 – 9"
                    viewBox="0 0 120 38"
                >
                    <rect
                        width="120"
                        height="38"
                        fill="#e5137d"
                        data-name="Rectangle 1550"
                        rx="4"
                    ></rect>
                    <text
                        fill="#fff"
                        fontFamily="Poppins-SemiBold, Poppins"
                        fontSize="15"
                        fontWeight="600"
                        transform="translate(74 24)"
                    >
                        <tspan x="-37.08" y="0">
                            Active
        </tspan>
                    </text>
                </svg> : <svg style={{ cursor: 'pointer' }} onClick={props.hasOwnProperty("agentPage") ? handelClick : () => console.log('not agent page')}
                    xmlns="http://www.w3.org/2000/svg"
                    width="120"
                    height="38"
                    data-name="Composant 17 – 8"
                    viewBox="0 0 120 38"
                >
                        <rect
                            width="120"
                            height="38"
                            fill="#818e94"
                            data-name="Rectangle 1550"
                            opacity="0.4"
                            rx="4"
                        ></rect>
                        <text
                            fill="#818e94"
                            data-name="Not active"
                            fontFamily="Poppins-SemiBold, Poppins"
                            fontSize="15"
                            fontWeight="600"
                            transform="translate(60 24)"
                        >
                            <tspan x="-38.707" y="0">
                                Not active
        </tspan>
                        </text>
                    </svg>
            }
        </div>
    )
}

const mapDispatchToProps = (dispatch) => ({
    live: (project) => dispatch(goLive(project)),
    getPagePostProject: () => dispatch(getConnectedPagesProject()),
})

export default connect(null, mapDispatchToProps)(ButtonActiveted)

import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Link, useRouteMatch, withRouter } from 'react-router-dom'
import { logoutAction } from '../actions'
function TopMenu(props) {
    const match = useRouteMatch()
    const [state, setstate] = useState(false)
    return (
        <div style={{ background: '#fff', height: 90, display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.161)" }}>
            <div className="links">
                <Link to={`${match.path}/news`}>News</Link>
                <Link to={`${match.path}/howto`}>How to use it ?</Link>
                <Link to={`${match.path}/documentation`}>Documentation</Link>
            </div>

            <div className="profile" onClick={() => setstate(!state)}>
                {
                    props.user.profilePictureUrl ?
                        <img src={props.user.profilePictureUrl} alt="profileImg" width='50' /> :
                        <svg style={{ borderRadius: '50%' }} xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60">
                            <g id="Groupe_1148" data-name="Groupe 1148" transform="translate(-23622 140)">
                                <rect id="Rectangle_1567" data-name="Rectangle 1567" width="60" height="60" transform="translate(23622 -140)" fill="#e4e6eb" />
                                <g id="Groupe_1146" data-name="Groupe 1146" transform="translate(23110.27 -341.028)">
                                    <path id="Tracé_425" data-name="Tracé 425" d="M542.106,214.028A16.376,16.376,0,0,0,525.73,230.4v10.917h2.578l5.111,6.008v-6.008h14.147A10.917,10.917,0,0,0,558.482,230.4,16.376,16.376,0,0,0,542.106,214.028Zm5.459,24.634H528.388V230.4a13.718,13.718,0,0,1,27.435,0A8.268,8.268,0,0,1,547.565,238.662Z" transform="translate(0 0)" fill="#b4b4b4" />
                                    <g id="Groupe_1145" data-name="Groupe 1145" transform="translate(532.251 222.431)">
                                        <path id="Tracé_426" data-name="Tracé 426" d="M558.6,254.666h-1.746v-6.737a3.618,3.618,0,0,0-7.236,0v6.737h-1.746v-6.737a5.365,5.365,0,1,1,10.729,0Z" transform="translate(-547.875 -242.564)" fill="#b4b4b4" />
                                        <path id="Tracé_427" data-name="Tracé 427" d="M589.108,254.666h-1.746v-6.737a3.618,3.618,0,0,0-7.235,0v6.737H578.38v-6.737a5.364,5.364,0,1,1,10.728,0Z" transform="translate(-569.398 -242.564)" fill="#b4b4b4" />
                                    </g>
                                </g>
                            </g>
                        </svg>

                }
                <svg className="arrowSvg" xmlns="http://www.w3.org/2000/svg" width="11.909" height="7.369" viewBox="0 0 11.909 7.369">
                    <path id="Down" d="M1712,56l4.54,4.54,4.54-4.54" transform="translate(-1710.586 -54.586)" fill="none" stroke="#818e94" style={{ strokeLinecap: "round", strokeWidth: 2 }} />
                </svg>
                {
                    state &&
                    <li onClick={() => props.logout()}>Log Out</li>
                }
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    user: state.auth.user || {}
})

const mapDispatchTopProps = (dispatch, owenProps) => {

    return {
        logout: () => dispatch(logoutAction(owenProps))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchTopProps)(TopMenu))

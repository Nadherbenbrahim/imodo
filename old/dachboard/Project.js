import React, { useState, useEffect } from 'react'
import { withRouter, Link, useLocation, useHistory } from 'react-router-dom'
import TopMenu from '../components/TopMenu'
import IntentContainer from '../components/IntentContainer'
import { connect } from 'react-redux'
import { addProject, getallIntents, getConnectedPagesProject, removechatAction, } from '../actions'
function useQuery() {
    return new URLSearchParams(useLocation().search);
}
function Project(props) {
    let query = useQuery()
    const { push } = useHistory()
    // let match = useRouteMatch();
    // const [loader, setloader] = useState(true)
    useEffect(() => {
        props.getAllIntent(props.match.params.id === props.match.params.idpost)
            .then(() => props.addProject({ post: props.getPost, name: props.getPost.hasOwnProperty("idPost") ? props.getPost.idPost : props.getPost.idPage }))
            .then(() => props.getAlllProjects())
            .then(() => props.removechatAction())

        // console.log(props.getPost, props.match.params.idpost)
        // console.log(props.allDefaultIntents)
    }, [])
    // if (loader) return <h1>Loading</h1>
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
                    <g id="Groupe_1147" data-name="Groupe 1147" transform="translate(-684 -251)">
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
                            <text id="_3" data-name="3" transform="translate(1249 714)" fill="#e5007d" font-size="16" font-family="Poppins-SemiBold, Poppins" font-weight="600"><tspan x="-4.792" y="0">3</tspan></text>
                            <path id="Line-3" data-name="Line" d="M0,0H1V180H0Z" transform="translate(1457.702 708.5) rotate(90)" fill="#e9e9f0" />
                        </g>
                        <g id="step-4" data-name="step" transform="translate(199 -438)">
                            <text id="Test_validation" data-name="Test &amp; validation" transform="translate(1249 747)" fill="#b4b4b4" font-size="15" font-family="Poppins-Medium, Poppins" font-weight="500"><tspan x="-63.217" y="0">Test &amp; validation</tspan></text>
                            <circle id="Ellipse-4" data-name="Ellipse" cx="19" cy="19" r="19" transform="translate(1230 689)" fill="#b4b4b4" opacity="0.25" />
                            <text id="_4" data-name="4" transform="translate(1249 714)" fill="#818e94" font-size="16" font-family="Poppins-SemiBold, Poppins" font-weight="600"><tspan x="-5.288" y="0">4</tspan></text>
                        </g>
                    </g>
                </svg>
                <div style={{ background: '#fff', paddingTop: 40, paddingLeft: 70, paddingRight: 70, paddingBottom: 40, width: "70%", margin: "auto" }}>
                    <IntentContainer intent={props.allDefaultIntents} />
                    <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: "50px"
                    }}>
                        <div>
                            <span onClick={() => query.get("project") ? push(`/dachboard/agent/?page=${props.match.params.id}`) : props.history.goBack()} style={{ cursor: 'pointer' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="125" height="50" viewBox="0 0 125 50">
                                    <g id="Button" transform="translate(-1376 -914)">
                                        <rect id="Rectangle_1549" data-name="Rectangle 1549" width="125" height="50" rx="4" transform="translate(1376 914)" fill="#e4e6eb" />
                                        <text id="Back" transform="translate(1416 946)" fill="#818e94" font-size="20" font-family="Roboto-Bold, Roboto" font-weight="700"><tspan x="0" y="0">Back</tspan></text>
                                    </g>
                                </svg>
                            </span>
                        </div>
                        <div>
                            {props.porject && !props.porject.trained &&
                                < svg xmlns="http://www.w3.org/2000/svg" width="200" height="50" viewBox="0 0 125 50"><g id="Button" transform="translate(-1376 -914)"><rect id="Rectangle_1549" data-name="Rectangle 1549" width="150" height="50" rx="4" transform="translate(1376 914)" fill="#e4e6eb"></rect><text id="Back" transform="translate(1405 946)" fill="#818e94" font-size="20" font-family="Roboto-Bold, Roboto" font-weight="700"><tspan x="0" y="0">Save Draft</tspan></text></g></svg>
                            }
                            {props.porject && props.porject.intents.length > 0 &&

                                <Link to={`/dachboard/wizard/${props.match.params.mode}/${props.match.params.id}/project/${props.match.params.idpost}/test`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="122" height="50" viewBox="0 0 122 50">
                                        <g id="Button" transform="translate(-1427 -914)">
                                            <rect id="Rectangle_1549" data-name="Rectangle 1549" width="122" height="50" rx="4" transform="translate(1427 914)" fill="#e5007d" />
                                            <text id="Next" transform="translate(1467 946)" fill="#fff" font-size="20" font-family="Roboto-Bold, Roboto" font-weight="700"><tspan x="0" y="0">Next</tspan></text>
                                        </g>
                                    </svg>
                                </Link>

                            }
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

const mapStateToProps = (state, owenProps) => {
    const post = state.allPosts.find(el => el.idPost == owenProps.match.params.idpost) ? state.allPosts.find(el => el.idPost == owenProps.match.params.idpost) : state.allpages.find(el => el.idPage == owenProps.match.params.idpost)
    const porject = state.allProjects.find(el => el.post.idPost == owenProps.match.params.idpost)
    return {
        porject,
        getPost: post,
        allDefaultIntents: state.allIntents
    }
}

const mapDispatchToProps = (dispatch) => {
    // alert(JSON.stringify(owenProps.getPost))
    return {
        addProject: (post) => dispatch(addProject(post)),
        getAllIntent: (check) => dispatch(getallIntents(check)),
        getAlllProjects: () => dispatch(getConnectedPagesProject()),
        removechatAction: () => dispatch(removechatAction())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Project))

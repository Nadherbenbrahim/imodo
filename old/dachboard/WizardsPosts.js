import React, { useEffect, useState } from 'react'
import TopMenu from '../components/TopMenu'
import { connect } from 'react-redux'
import { getConnectedPagesProject, getConnectedPagesPosts } from '../actions'
import { withRouter, Link } from 'react-router-dom'
import ButtonActiveted from '../components/ButtonActiveted'

function WizardsPosts(props) {


    useEffect(() => {
        props.getPagePostProject()
        props.getPagePosts()
    }, [])
    return (
        <div>
            <TopMenu />
            <div style={{ paddingLeft: 30, paddingRight: 30, paddingTop: 30 }}>
                <h1 style={{ fontSize: 30, color: "rgba(45, 47, 57, 1)", textAlign: "center" }}>iModo Wizard</h1>
                <svg style={{
                    marginTop: 50,
                    marginBottom: 50,
                    marginLeft: "auto",
                    marginRight: "auto",
                    display: "block"
                }}
                    xmlns="http://www.w3.org/2000/svg"
                    width="828"
                    height="63"
                    viewBox="0 0 828 63"
                >
                    <g data-name="Groupe 1144" transform="translate(-684 -251)">
                        <g transform="translate(-509 -438)">
                            <text
                                fill="#e5007d"
                                data-name="Page Selection"
                                fontFamily="Poppins-Medium, Poppins"
                                fontSize="15"
                                fontWeight="500"
                                transform="translate(1249 747)"
                            >
                                <tspan x="-55.898" y="0">
                                    Page Selection
            </tspan>
                            </text>
                            <circle
                                cx="19"
                                cy="19"
                                r="19"
                                fill="#e5007d"
                                opacity="0.25"
                                transform="translate(1230 689)"
                            ></circle>
                            <path
                                fill="#e5007d"
                                d="M0 0h1v180H0z"
                                transform="rotate(90 374.601 1083.101)"
                            ></path>
                            <path
                                fill="#fff"
                                d="M4.94 15.21L.213 10.483a.727.727 0 010-1.028l1.028-1.029a.727.727 0 011.028 0l3.185 3.184 6.82-6.82a.727.727 0 011.028 0l1.028 1.028a.727.727 0 010 1.028L5.968 15.21a.727.727 0 01-1.028 0z"
                                data-name="Icon awesome-check"
                                transform="translate(1242.001 698.423)"
                            ></path>
                        </g>
                        <g data-name="step" transform="translate(-273 -438)">
                            <text
                                fill="#e5007d"
                                data-name="Post Selection"
                                fontFamily="Poppins-Medium, Poppins"
                                fontSize="15"
                                fontWeight="500"
                                transform="translate(1249 747)"
                            >
                                <tspan x="-52.68" y="0">
                                    Post Selection
            </tspan>
                            </text>
                            <circle
                                cx="19"
                                cy="19"
                                r="19"
                                fill="#e5007d"
                                data-name="Ellipse"
                                opacity="0.25"
                                transform="translate(1230 689)"
                            ></circle>
                            <text
                                fill="#e5007d"
                                data-name="2"
                                fontFamily="Poppins-SemiBold, Poppins"
                                fontSize="16"
                                fontWeight="600"
                                transform="translate(1249 714)"
                            >
                                <tspan x="-4.592" y="0">
                                    2
            </tspan>
                            </text>
                            <path
                                fill="#e9e9f0"
                                d="M0 0h1v180H0z"
                                data-name="Line"
                                transform="rotate(90 374.601 1083.101)"
                            ></path>
                        </g>
                        <g data-name="step" transform="translate(-37 -438)">
                            <text
                                fill="#b4b4b4"
                                data-name="Automation config"
                                fontFamily="Poppins-Medium, Poppins"
                                fontSize="15"
                                fontWeight="500"
                                transform="translate(1249 747)"
                            >
                                <tspan x="-70.628" y="0">
                                    Automation config
            </tspan>
                            </text>
                            <circle
                                cx="19"
                                cy="19"
                                r="19"
                                fill="#b4b4b4"
                                data-name="Ellipse"
                                opacity="0.25"
                                transform="translate(1230 689)"
                            ></circle>
                            <text
                                fill="#818e94"
                                data-name="3"
                                fontFamily="Poppins-SemiBold, Poppins"
                                fontSize="16"
                                fontWeight="600"
                                transform="translate(1249 714)"
                            >
                                <tspan x="-4.792" y="0">
                                    3
            </tspan>
                            </text>
                            <path
                                fill="#e9e9f0"
                                d="M0 0h1v180H0z"
                                data-name="Line"
                                transform="rotate(90 374.601 1083.101)"
                            ></path>
                        </g>
                        <g data-name="step" transform="translate(199 -438)">
                            <text
                                fill="#b4b4b4"
                                data-name="Test &amp; validation"
                                fontFamily="Poppins-Medium, Poppins"
                                fontSize="15"
                                fontWeight="500"
                                transform="translate(1249 747)"
                            >
                                <tspan x="-63.217" y="0">
                                    Test &amp; validation
            </tspan>
                            </text>
                            <circle
                                cx="19"
                                cy="19"
                                r="19"
                                fill="#b4b4b4"
                                data-name="Ellipse"
                                opacity="0.25"
                                transform="translate(1230 689)"
                            ></circle>
                            <text
                                fill="#818e94"
                                data-name="4"
                                fontFamily="Poppins-SemiBold, Poppins"
                                fontSize="16"
                                fontWeight="600"
                                transform="translate(1249 714)"
                            >
                                <tspan x="-5.288" y="0">
                                    4
            </tspan>
                            </text>
                        </g>
                    </g>
                </svg>

                <div style={{ background: '#fff', paddingTop: 40, paddingLeft: 70, paddingRight: 70, paddingBottom: 40, width: "70%", margin: "auto" }}>
                    <h2 style={{
                        fontFamily: "Poppins",
                        fontStyle: "normal",
                        fontWeight: "bold",
                        fontSize: 16,
                        color: "rgba(75,79,86,1)",
                        marginBottom: 40
                    }}>Select one or many posts to active the iModo moderation.</h2>

                    <table style={{ width: "100%" }}>
                        <thead>
                            <tr>
                                <th>Post</th>
                                <th>Type</th>
                                <th>Published</th>
                                <th>Agent status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                [...props.allposts].sort((a, b) => new Date(b.created_time) - new Date(a.created_time)).map(el => new Date(el.created_time).getFullYear() == 2020 && new Date(el.created_time).getMonth() >= 1 && <tr key={el._id}>
                                    <td style={{ display: "flex", alignItems: "center" }}>{el.hasOwnProperty('full_picture') ? <img src={el.full_picture} alt="page thumbnail" style={{ width: 40, height: 40 }} /> : <img src={'https://graph.facebook.com/v3.2/' + props.pageDetail.idPage + '/picture?access_token=' + props.pageDetail.access_token} alt="page thumbnail" style={{ width: 40, height: 40 }} />} <Link style={{ marginLeft: 20, fontSize: 14, color: props.allProjects.find(Element => Element.post.idPost == el.idPost) && props.allProjects.find(Element => Element.post.idPost == el.idPost).live ? "gray" : "#3B5998", textDecoration: "none", pointerEvents: props.allProjects.find(Element => Element.post.idPost == el.idPost) && props.allProjects.find(Element => Element.post.idPost == el.idPost).live ? 'none' : 'auto' }} to={`/dachboard/wizard/${props.match.params.mode}/${props.match.params.id}/project/${el.idPost}`}>{el.hasOwnProperty('message') ? el.message.slice(0, el.message.length <= 15 ? el.message.length : 15) + '...' : 'Timeline Post'}</Link></td>
                                    <td>{el.hasOwnProperty('full_picture') ? <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 20 20"
                                    >
                                        <g transform="translate(-3 -3)">
                                            <path
                                                fill="#b4b4b4"
                                                d="M23 20.778V5.222A2.229 2.229 0 0020.778 3H5.222A2.229 2.229 0 003 5.222v15.556A2.229 2.229 0 005.222 23h15.556A2.229 2.229 0 0023 20.778zM9.111 14.667l2.778 3.344L15.778 13l5 6.667H5.222z"
                                                data-name="Tracé 208"
                                            ></path>
                                        </g>
                                    </svg> :
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fill="#b4b4b4"
                                                d="M12.758 7.242a5.934 5.934 0 01.014 8.382l-.014.014-2.625 2.625a5.937 5.937 0 01-8.4-8.4l1.453-1.446a.624.624 0 011.066.414 7.2 7.2 0 00.379 2.059.629.629 0 01-.148.649l-.511.511a2.813 2.813 0 103.952 4l2.625-2.625a2.812 2.812 0 000-3.978 2.926 2.926 0 00-.4-.335.626.626 0 01-.271-.492 1.556 1.556 0 01.452-1.16l.822-.822a.628.628 0 01.8-.068 5.956 5.956 0 01.8.672zm5.505-5.506a5.944 5.944 0 00-8.4 0L7.242 4.361l-.014.014a5.939 5.939 0 00.816 9.054.628.628 0 00.8-.068l.822-.822a1.556 1.556 0 00.457-1.164.626.626 0 00-.271-.492 2.926 2.926 0 01-.4-.335 2.812 2.812 0 010-3.978l2.625-2.625a2.813 2.813 0 113.952 4l-.511.511a.629.629 0 00-.148.649 7.2 7.2 0 01.379 2.059.624.624 0 001.066.414l1.449-1.449a5.944 5.944 0 000-8.4z"
                                                data-name="Icon awesome-link"
                                            ></path>
                                        </svg>
                                    }</td>
                                    <td><span>{new Date(el.created_time).toLocaleDateString()}</span><br />
                                        <span style={{ fontSize: 12, color: "#B4B4B4" }}>{new Date(el.created_time).toLocaleTimeString()}</span></td>
                                    <td> {props.allProjects.find(Element => Element.post.idPost == el.idPost) && props.allProjects.find(Element => Element.post.idPost == el.idPost).live ? <span style={{ color: "#E5137D" }}>Active</span> : <span style={{ color: "#818E94" }}>Not Active</span>}</td>
                                </tr>
                                )
                            }

                        </tbody>
                    </table>
                    <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: "50px"
                    }}>
                        <div onClick={() => props.history.goBack()}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="125" height="50" viewBox="0 0 125 50">
                                <g id="Button" transform="translate(-1376 -914)">
                                    <rect id="Rectangle_1549" data-name="Rectangle 1549" width="125" height="50" rx="4" transform="translate(1376 914)" fill="#e4e6eb" />
                                    <text id="Back" transform="translate(1416 946)" fill="#818e94" font-size="20" font-family="Roboto-Bold, Roboto" font-weight="700"><tspan x="0" y="0">Back</tspan></text>
                                </g>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        pageDetail: state.selectedPageReducer,
        allposts: state.allPosts,
        allProjects: state.allProjects
    }
}

const mapDispatchToProps = (dispatch, owenProps) => {
    return {
        getPagePostProject: () => dispatch(getConnectedPagesProject()),
        getPagePosts: () => dispatch(getConnectedPagesPosts(owenProps.match.params.id)),
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WizardsPosts))

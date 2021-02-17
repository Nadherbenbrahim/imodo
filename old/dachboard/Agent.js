import React, { useEffect, useState } from 'react'
import TopMenu from '../components/TopMenu'
import { connect } from 'react-redux'
import { getAllConnectedPages, getConnectedPagesProject, getConnectedPagesPosts, removeProject, selectedPage } from '../actions'
import PageCart from '../components/PageCart'
import ButtonActiveted from '../components/ButtonActiveted'
import { Link, useLocation } from 'react-router-dom'

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function Agent(props) {
    const [seletedPage, setSelectedPage] = useState(null)
    let query = useQuery()

    useEffect(() => {
        // console.log(query.get("page"))
        props.getallConnectedPage()
            .then(() => props.getPagePostProject())
            .then(() => query.get("page") ? handelClick(query.get("page")) : console.log('noparams'))
    }, [])

    const handelClick = (idPage) => {
        console.log(idPage)
        props.getPagePosts(idPage)
            .then(() => {
                const selectedPage = props.allConnectedPages.find(el => el.idPage == idPage)
                console.log('selectedpafe**** ', seletedPage)
                setSelectedPage(selectedPage)
            })
    }

    const removePorjuctHandler = (idPost) => {
        const project = props.allProjects.find(el => el.post.idPost == idPost)
        props.removeProject(project)
            .then(() => props.getPagePostProject())
    }
    return (
        <div>
            <TopMenu />
            <div style={{ paddingLeft: 30, paddingRight: 30, paddingTop: 30 }}>
                <h2 style={{ fontSize: 30, color: "rgba(45, 47, 57, 1)" }}>Pages connected</h2>
                <div className="pagecarts">
                    {[...props.allConnectedPages].sort((a, b) => {
                        var x = a.name.toLowerCase();
                        var y = b.name.toLowerCase();
                        if (x < y) { return -1; }
                        if (x > y) { return 1; }
                        return 0;
                    }).map(el => <div key={el._id} onClick={() => { handelClick(el.idPage); console.log('shadow ', selectedPage) }} style={{ cursor: "pointer", border: `2px solid ${seletedPage && seletedPage.idPage === el.idPage ? "#E5007D" : "transparent"}` }}><PageCart key={el._id} name={el.name} connected={el.isConnected} page={el} show={false} /> </div>)}
                </div>
                <br /><br />
                {/* {!selectedPage && <div style={{ background: '#fff', paddingTop: 40, paddingLeft: 70, paddingRight: 70, paddingBottom: 40, textAlign: "center" }}><h2>Select a Page...</h2></div>} */}
                {seletedPage &&
                    <><h2>Projets liste</h2>
                        <div style={{ background: '#fff', paddingTop: 40, paddingLeft: 70, paddingRight: 70, paddingBottom: 40 }}>
                            <table style={{ width: "100%", }}>
                                <thead>
                                    <tr>
                                        <th>Picture</th>
                                        <th>Message</th>
                                        <th>Type</th>
                                        {/* <th>Published</th> */}
                                        <th>Status</th>
                                        <th>Edit project</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        props.allProjects.filter(el => el.post.page.idPage == seletedPage.idPage).sort((a, b) => new Date(b.createDate) - new Date(a.createDate)).map(el => <tr key={el._id}>
                                            {/* <td style={{ display: "flex", alignItems: "center" }}><img src={'https://graph.facebook.com/v3.2/' + seletedPage.idPage + '/picture?access_token=' + seletedPage.access_token} alt="page thumbnail" style={{ width: 40 }} /> <Link style={{ marginLeft: 20, fontSize: 14, color: "#3B5998", textDecoration: "none" }}>Timeline {el.hasOwnProperty('picture') ? 'Photo' : 'Post'}</Link></td> */}
                                            <td style={{ display: "flex", alignItems: "center" }}>{el.post.hasOwnProperty('full_picture') ? <img src={el.post.full_picture} alt="page thumbnail" style={{ width: 40, height: 40 }} /> : <img src={'https://graph.facebook.com/v3.0/' + seletedPage.idPage + '/picture?access_token=' + seletedPage.access_token} alt="page thumbnail" style={{ width: 40, height: 40 }} />} </td>
                                            <td>{el.post.hasOwnProperty('message') ? el.post.message.slice(0, el.post.message.length <= 15 ? el.post.message.length : 15) + '...' : el.post.idPost !== el.post.page.idPage ? 'Timeline Post' : el.post.page.name}</td>
                                            <td>{el.post.idPost !== el.post.page.idPage ? <svg
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
                                                <svg viewBox="0 0 496.26 496.26" width={20} height={20}>
                                                    <path
                                                        d="M302.765 20.395H45.458C20.536 20.395.26 40.67.26 65.592c0 329.751-1.925 309.456 4.692 316.073 96.335 96.334 90.227 90.74 93.596 92.406 4.818 2.418-8.366 1.692 204.216 1.692 24.922 0 45.198-20.275 45.198-45.197V65.592c.001-24.922-20.275-45.197-45.197-45.197zM89.679 421.137l-34.791-34.791h34.791zm226.284 9.429c0 7.277-5.92 13.197-13.198 13.197H121.679v-73.418c0-8.837-7.164-16-16-16H32.26V65.592c0-7.277 5.92-13.197 13.198-13.197h257.307c7.277 0 13.198 5.92 13.198 13.197zM422.112 65.592v364.975c0 24.922-20.276 45.197-45.198 45.197-8.836 0-16-7.163-16-16s7.164-16 16-16c7.277 0 13.198-5.92 13.198-13.197V65.592c0-7.277-5.92-13.197-13.198-13.197-8.836 0-16-7.163-16-16s7.164-16 16-16c24.922 0 45.198 20.275 45.198 45.197zm74.148 0v364.975c0 24.922-20.275 45.197-45.198 45.197-8.836 0-16-7.163-16-16s7.164-16 16-16c7.277 0 13.198-5.92 13.198-13.197V65.592c0-7.277-5.92-13.197-13.198-13.197-8.836 0-16-7.163-16-16s7.164-16 16-16c24.923 0 45.198 20.275 45.198 45.197z"
                                                        data-original="#000000"
                                                        className="prefix__active-path"
                                                        data-old_color="#000000"
                                                        fill="#818E94"
                                                    />
                                                </svg>
                                            }</td>
                                            {/* <td><span>{new Date(el.created_time).toLocaleDateString()}</span><br />
                                                <span style={{ fontSize: 12, color: "#B4B4B4" }}>{new Date(el.created_time).toLocaleTimeString()}</span></td> */}
                                            <td> {el.trained ? <ButtonActiveted project={el} seletedPage={seletedPage} agentPage={true} /> :
                                                <svg style={{ cursor: 'auto' }}
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
                                                        data-name="Draft"
                                                        fontFamily="Poppins-SemiBold, Poppins"
                                                        fontSize="15"
                                                        fontWeight="600"
                                                        transform="translate(60 24)"
                                                    >
                                                        <tspan x="-20.707" y="0">
                                                            Draft
        </tspan>
                                                    </text>
                                                </svg>
                                            }</td>
                                            <td>
                                                {
                                                    el.trained &&

                                                    <Link to={`/dachboard/agent/${el.post.idPost}`} title="Check comments">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="27"
                                                            height="27"
                                                            viewBox="0 0 27 27"
                                                        >
                                                            <path
                                                                fill="none"
                                                                stroke="#e5137d"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth="2"
                                                                d="M26 17.667a2.778 2.778 0 01-2.778 2.778H6.556L1 26V3.778A2.778 2.778 0 013.778 1h19.444A2.778 2.778 0 0126 3.778z"
                                                                data-name="Icon feather-message-square"
                                                            ></path>
                                                        </svg>
                                                    </Link>
                                                }
                                                <Link style={{ cursor: 'pointer' }} title="Update Agent" to={`/dachboard/wizard/${el.post.idPost !== el.post.page.idPage ? 'monitorPost' : 'monitorPage'}/${seletedPage.idPage}/project/${el.post.idPost}?project=${el.post.idPost}`}>

                                                    <svg style={{ cursor: 'pointer', margin: "0 15px" }}
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="27.241"
                                                        height="27"
                                                        viewBox="0 0 27.241 27"
                                                    >
                                                        <g
                                                            fill="none"
                                                            stroke="#e5137d"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            data-name="Icon feather-edit"
                                                            transform="translate(-2 -1.818)"
                                                        >
                                                            <path
                                                                d="M14.01 5.797H5.447A2.447 2.447 0 003 8.244v17.127a2.447 2.447 0 002.447 2.447h17.127a2.447 2.447 0 002.447-2.447v-8.564"
                                                                data-name="Tracé 420"
                                                            ></path>
                                                            <path
                                                                d="M22.913 3.691A2.979 2.979 0 0127.127 7.9L13.784 21.247l-5.618 1.405 1.4-5.618z"
                                                                data-name="Tracé 421"
                                                            ></path>
                                                        </g>
                                                    </svg>
                                                </Link>
                                                <svg style={{ cursor: 'pointer' }} onClick={() => removePorjuctHandler(el.post.idPost)}
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="27"
                                                    height="28.786"
                                                    viewBox="0 0 27 28.786"
                                                >
                                                    <g
                                                        fill="none"
                                                        stroke="#e5137d"
                                                        strokeLinecap="square"
                                                        strokeMiterlimit="10"
                                                        strokeWidth="2"
                                                        transform="translate(-3 -1)"
                                                    >
                                                        <path
                                                            d="M26.322 9.143V27a1.786 1.786 0 01-1.786 1.786H8.465A1.786 1.786 0 016.679 27V9.143"
                                                            data-name="Tracé 429"
                                                        ></path>
                                                        <path
                                                            d="M0 0L0 10"
                                                            data-name="Ligne 25"
                                                            transform="translate(17 13.786)"
                                                        ></path>
                                                        <path
                                                            d="M0 0L0 10"
                                                            data-name="Ligne 26"
                                                            transform="translate(12 13.786)"
                                                        ></path>
                                                        <path
                                                            d="M0 0L0 10"
                                                            data-name="Ligne 27"
                                                            transform="translate(21 13.786)"
                                                        ></path>
                                                        <path d="M12.036 6.464V2h8.929v4.464" data-name="Tracé 430"></path>
                                                        <path
                                                            d="M25 0L0 0"
                                                            data-name="Ligne 28"
                                                            transform="translate(4 6.786)"
                                                        ></path>
                                                    </g>
                                                </svg>
                                            </td>
                                        </tr>
                                        )
                                    }

                                </tbody>
                            </table>
                        </div></>
                }
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    // let posts = []
    // state.allPosts.forEach(el => {
    //     state.allProjects.forEach(Element => {
    //         if (Element.post.idPost == el.idPost) {
    //             posts.push(el)
    //         }
    //     })
    // })
    // console.log('posts has project ', posts)
    return {
        allConnectedPages: state.allConnectedPages,
        // allposts: posts,
        allProjects: state.allProjects
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getallConnectedPage: () => dispatch(getAllConnectedPages()),
        getPagePostProject: () => dispatch(getConnectedPagesProject()),
        getPagePosts: (pageid) => dispatch(getConnectedPagesPosts(pageid)),
        removeProject: (project) => dispatch(removeProject(project))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Agent)

import React, { useState } from 'react'
import TopMenu from '../components/TopMenu'
import { connect } from 'react-redux'
import { getAllPagesAction, getAllEntity, getConnectedPagesProject, getConnectedPagesPosts, pageIntents } from '../actions'
import PageCart from '../components/PageCart'
import { PieChart } from 'react-minimal-pie-chart';
import { useEffect } from 'react'
import Stats from '../components/Stats'
// import { store } from '../index'
const bg = {
    0: '#009EE3',
    1: '#01096F',
    2: '#E5007D',
    3: '#E60A17',
    4: '#139216'
}
function Home(props) {

    const [clickedPage, setclickedPage] = useState(null)
    const [date, setdate] = useState([])
    const [dateProject, setdateProject] = useState([])

    useEffect(() => {
        props.getpages()
            .then(() => props.getPagePostProject())
            .then(() => props.getAllEntity(props.fb))
    }, [])

    useEffect(() => {
        console.log(clickedPage, props.allposts)
        props.getConnectedPagesPosts(clickedPage)
            .then(() => { dateFilter("last Week"); dateFilterProject("3 post") })
    }, [clickedPage])

    const dateFilter = (val) => {
        const dt = new Date();

        if (val == "last 30 Days") {
            dt.setMonth(dt.getMonth() - 1);
            const newdat = props.intentPage.filter(el => new Date(el.date[0]) >= dt)
            setdate(newdat)
        } else if (val == "last Week") {
            dt.setDate(dt.getDay() - 7);
            const newdat = props.intentPage.filter(el => new Date(el.date[0]) >= dt)
            setdate(newdat)
        } else {
            setdate(props.intentPage)
        }
    }

    const dateFilterProject = (val) => {
        const dt = new Date();

        if (val == "last 30 Days") {
            dt.setMonth(dt.getMonth() - 1);
            const newdat = props.allprojects.filter(el => new Date(el.createDate) >= dt)
            setdateProject(newdat)
        } else {
            setdateProject(props.allprojects.filter(el => clickedPage == el.post.page.idPage && el.live).slice(0, 3))
        }
    }

    const handelclick = (idpage) => {
        props.pageIntents(idpage)
            .then(() => {
                setclickedPage(idpage)
            })
    }


    return (<>
        <TopMenu />
        <div style={{ paddingLeft: 30, paddingRight: 30, paddingTop: 30 }}>
            <h2 style={{ fontSize: 30, color: "rgba(45, 47, 57, 1)" }}>All Pages</h2>
            <div className="pagecarts">
                {props.allpages ?
                    [...props.allpages].sort((a, b) => {
                        var x = a.name.toLowerCase();
                        var y = b.name.toLowerCase();
                        if (x < y) { return -1; }
                        if (x > y) { return 1; }
                        return 0;
                    }).map(el => <PageCart handelclick={handelclick} show={true} key={el._id} name={el.name} connected={el.isConnected} page={el} clickedPage={clickedPage} />) :
                    <h1>loading</h1>
                }
            </div>
            {clickedPage &&
                <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <h2 style={{ fontSize: 30, color: "rgba(45, 47, 57, 1)" }}>Most requested intents</h2>
                        <select style={{
                            background: "transparent",
                            border: "none",
                            outline: "none",
                            color: "gray",
                            cursor: "pointer"
                        }} onChange={(e) => dateFilter(e.target.value)}>
                            <option value="last Week" selected>last Week</option>
                            <option value="last 30 Days">last 30 Days</option>
                        </select>
                    </div>
                    <div style={{ background: "#fff", padding: 20, display: "flex", justifyContent: "space-between", }}>
                        <div style={{ flex: 2 }}>
                            <table>
                                <tr>
                                    <th>Intents</th>
                                    <th style={{ textAlign: 'right' }}>Total</th>
                                </tr>
                                {
                                    date.map((el, i) => i < 5 && <tr key={i}>
                                        <td><span style={{ padding: "10px 20px", background: bg[i], borderRadius: 20, color: "#fff" }}>{el.name}</span></td>
                                        <td style={{ textAlign: 'right' }}><span>{el.occ}</span></td>
                                    </tr>)
                                }

                            </table>
                        </div>
                        {
                            date.filter(el => el.occ !== 0).length > 0 ?
                                <div style={{ flex: 1, padding: 30 }}>
                                    <PieChart
                                        data={date.map((el, i) => i < 5 && ({ title: el.name, value: el.occ, color: bg[i] }))}
                                    />
                                </div> :
                                <div style={{ flex: 1, padding: 30 }}>
                                    <PieChart
                                        data={[
                                            { title: "No data", value: 1, color: '#BABABA' },
                                        ]}
                                    />
                                </div>
                        }
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <h2 style={{ fontSize: 30, color: "rgba(45, 47, 57, 1)" }}>Modo Post</h2>
                        <select style={{
                            background: "transparent",
                            border: "none",
                            outline: "none",
                            color: "gray",
                            cursor: "pointer"
                        }} onChange={(e) => dateFilterProject(e.target.value)}>
                            <option value="last 3" selected>last 3 posts</option>
                            <option value="last 30 Days">last 30 Days</option>
                        </select>
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap" }}>
                        {
                            dateProject.map((el, i) => clickedPage == el.post.page.idPage && el.live &&
                                <div key={el._id} style={{ flex: "25%", background: "#fff", display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "column", boxShadow: "0 0 10px lightgray", margin: "20px 30px" }}>
                                    {el.post.full_picture ? <img src={el.post.full_picture} alt="" style={{ width: "100%" }} /> : <div style={{
                                        display: "flex",
                                        width: "100%",
                                        height: "100%",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        paddingTop: 15
                                    }}><svg xmlns="http://www.w3.org/2000/svg" width="95.75" height="63.963" viewBox="0 0 95.75 63.963">
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
                                        </svg></div>}

                                    <Stats postId={el} />

                                </div>
                            )
                        }
                    </div>
                </div>
            }
        </div>
    </>
    )

}

const mapStateToProps = (state) => ({
    fb: state.fbdata.tokenDetail.userID,
    allpages: state.allpages,
    allposts: state.allPosts,
    allprojects: state.allProjects,
    intentPage: state.intentPage,
    comments: state.comments
})

const mapDispatchToProps = (dispatch) => {
    return {
        getPagePostProject: () => dispatch(getConnectedPagesProject()),
        getpages: () => dispatch(getAllPagesAction()),
        getAllEntity: (id) => dispatch(getAllEntity(id)),
        getConnectedPagesPosts: (id) => dispatch(getConnectedPagesPosts(id)),
        pageIntents: (id) => dispatch(pageIntents(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)

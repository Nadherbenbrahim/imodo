import React, { useEffect } from 'react'
import TopMenu from '../components/TopMenu'
import { connect } from 'react-redux'
import { getAllConnectedPages, selectedPage } from '../actions/index'
import { Link } from 'react-router-dom'
function WizardsHome(props) {
    // const [checkedPage, setCheckedPage]=useState(null)
    useEffect(() => {
        props.getConnctedPages()
    }, [])
    const handelChange = (e) => {
        const { value } = e.target;
        const pageChecked = props.connectedPages.find(el => el.idPage == value)
        console.log("page checked ", pageChecked)
        props.selectedPage(pageChecked)
    }
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
                    <g data-name="Groupe 1143" transform="translate(-684 -251)">
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
                            <text
                                fill="#e5007d"
                                data-name="1"
                                fontFamily="Poppins-SemiBold, Poppins"
                                fontSize="16"
                                fontWeight="600"
                                transform="translate(1249 714)"
                            >
                                <tspan x="-2.896" y="0">
                                    1
            </tspan>
                            </text>
                            <path
                                fill="#e9e9f0"
                                d="M0 0h1v180H0z"
                                transform="rotate(90 374.601 1083.101)"
                            ></path>
                        </g>
                        <g data-name="step" transform="translate(-273 -438)">
                            <text
                                fill="#b4b4b4"
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
                                fill="#b4b4b4"
                                data-name="Ellipse"
                                opacity="0.25"
                                transform="translate(1230 689)"
                            ></circle>
                            <text
                                fill="#818e94"
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
                <div style={{
                    background: '#fff', paddingTop: 40, paddingLeft: 70, paddingRight: 70, paddingBottom: 40, width: "70%", margin: "auto"
                }}>
                    <h2 style={{
                        fontFamily: "Poppins",
                        fontStyle: "normal",
                        fontWeight: "bold",
                        fontSize: 16,
                        color: "rgba(75,79,86,1)",
                        marginBottom: 40
                    }}>Select a page to moderate.</h2>
                    <div style={{ paddingLeft: 50, paddingRight: 50 }}>
                        <h2 style={{
                            fontFamily: "Poppins",
                            fontStyle: "normal",
                            fontWeight: "bold",
                            fontSize: 18,
                            color: "rgba(28,28,27,1)"
                        }}>All Pages ({props.connectedPages.length})</h2>
                        <div>
                            {
                                props.connectedPages.map(el => <div key={el._id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 0", borderBottom: "1px solid lightgray" }}>
                                    <div style={{
                                        display: "flex",
                                        alignItems: "center",

                                    }}>
                                        <img src={'https://graph.facebook.com/v3.2/' + el.idPage + '/picture?access_token=' + el.access_token} alt="page thumbnail" style={{ width: 40 }} />
                                        <span style={{
                                            fontFamily: "Roboto",
                                            fontStyle: "normal",
                                            fontWeight: "normal",
                                            fontSize: "16px",
                                            color: "rgba(75,79,86,1)",
                                            marginLeft: 30
                                        }}> {el.name.length <= 10 ? el.name.trim() : el.name.trim().slice(0, 10) + '...'}</span>
                                    </div>
                                    <input type="radio" name="connectedPages" value={el.idPage} onChange={handelChange} defaultChecked={props.connectedPage._id == el._id} />
                                </div>)

                            }

                        </div>
                    </div>
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
                        <div>
                            {
                                props.connectedPage._id ?
                                    <Link to={props.match.params.mode == "monitorPost" ? `/dachboard/wizard/${props.match.params.mode}/${props.connectedPage.idPage}/` : `/dachboard/wizard/${props.match.params.mode}/${props.connectedPage.idPage}/project/${props.connectedPage.idPage}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="122" height="50" viewBox="0 0 122 50">
                                            <g id="Button" transform="translate(-1427 -914)">
                                                <rect id="Rectangle_1549" data-name="Rectangle 1549" width="122" height="50" rx="4" transform="translate(1427 914)" fill="#e5007d" />
                                                <text id="Next" transform="translate(1467 946)" fill="#fff" font-size="20" font-family="Roboto-Bold, Roboto" font-weight="700"><tspan x="0" y="0">Next</tspan></text>
                                            </g>
                                        </svg>
                                    </Link> :

                                    <svg xmlns="http://www.w3.org/2000/svg" width="122" height="50" viewBox="0 0 122 50">
                                        <g id="Button" transform="translate(-1427 -914)">
                                            <rect id="Rectangle_1549" data-name="Rectangle 1549" width="122" height="50" rx="4" transform="translate(1427 914)" fill="#e4e6eb" />
                                            <text id="Next" transform="translate(1467 946)" fill="#b4b4b4" font-size="20" font-family="Roboto-Bold, Roboto" font-weight="700"><tspan x="0" y="0">Next</tspan></text>
                                        </g>
                                    </svg>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapDispatchToprops = (dispatch) => {
    return {
        getConnctedPages: () => dispatch(getAllConnectedPages()),
        selectedPage: (page) => dispatch(selectedPage(page))
    }
}

const mapStateToProps = (state) => {
    return {
        connectedPages: state.allConnectedPages,
        connectedPage: state.selectedPageReducer,
    }
}

export default connect(mapStateToProps, mapDispatchToprops)(WizardsHome)

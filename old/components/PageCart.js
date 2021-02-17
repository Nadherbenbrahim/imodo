import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { connectPage, deconnectPage, getAllPagesAction } from '../actions'

// fb icon:
// const fb_icon = require('../assets/images/home/fb-icon.png');

function PageCart(props) {
    const [fanCount, setfanCount] = useState(0)
    const [showBtn, setshowBtn] = useState(false)
    useEffect(() => {
        fetch(`https://graph.facebook.com/${props.page.idPage}?access_token=${props.page.access_token}&fields=name,likes,fan_count`)
            .then(res => res.json())
            .then(data => {
                setfanCount(data.fan_count)
            })
    }, [])
    return (
        <div style={{ marginBottom: 30, cursor: "pointer", border: props.clickedPage == props.page.idPage && props.connected ? "2px solid rgb(229, 0, 125)" : "none" }} onClick={() => props.hasOwnProperty("handelclick") && props.connected ? props.handelclick(props.page.idPage) : console.log('other page')}>
            {
                props.connected ?
                    <svg style={{
                        position: "absolute",
                        top: "25px",
                        left: "25px"
                    }} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                        <path id="Icon_awesome-link" data-name="Icon awesome-link" d="M12.758,7.242a5.934,5.934,0,0,1,.014,8.382l-.014.014-2.625,2.625a5.937,5.937,0,0,1-8.4-8.4L3.186,8.417a.624.624,0,0,1,1.066.414,7.2,7.2,0,0,0,.379,2.059.629.629,0,0,1-.148.649l-.511.511a2.813,2.813,0,1,0,3.952,4l2.625-2.625a2.812,2.812,0,0,0,0-3.978,2.926,2.926,0,0,0-.4-.335.626.626,0,0,1-.271-.492A1.556,1.556,0,0,1,10.33,7.46l.822-.822a.628.628,0,0,1,.8-.068,5.956,5.956,0,0,1,.8.672Zm5.505-5.506a5.944,5.944,0,0,0-8.4,0L7.242,4.361l-.014.014a5.939,5.939,0,0,0,.816,9.054.628.628,0,0,0,.8-.068l.822-.822a1.556,1.556,0,0,0,.457-1.164.626.626,0,0,0-.271-.492,2.926,2.926,0,0,1-.4-.335,2.812,2.812,0,0,1,0-3.978l2.625-2.625a2.813,2.813,0,1,1,3.952,4l-.511.511a.629.629,0,0,0-.148.649,7.2,7.2,0,0,1,.379,2.059.624.624,0,0,0,1.066.414l1.449-1.449a5.944,5.944,0,0,0,0-8.4Z" transform="translate(0 0)" fill="#e5007d" />
                    </svg> :
                    <svg style={{
                        position: "absolute",
                        top: "25px",
                        left: "25px"
                    }}
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                    >
                        <path
                            fill="#b4b4b4"
                            d="M11.878 15.856a.469.469 0 010 .663l-1.745 1.745a5.937 5.937 0 01-8.4-8.4l1.748-1.742a.469.469 0 01.663 0l1.547 1.546a.469.469 0 010 .663l-1.745 1.745a2.812 2.812 0 003.977 3.977l1.745-1.745a.469.469 0 01.663 0l1.547 1.547zM9.668 5.691a.469.469 0 00.663 0l1.745-1.745a2.812 2.812 0 013.977 3.977l-1.744 1.745a.469.469 0 000 .663l1.547 1.547a.469.469 0 00.663 0l1.745-1.745a5.937 5.937 0 00-8.4-8.4L8.122 3.481a.469.469 0 000 .663l1.546 1.547zm9.173 14.034l.884-.884a.937.937 0 000-1.326L2.484.275a.937.937 0 00-1.326 0l-.884.884a.937.937 0 000 1.326l17.242 17.24a.938.938 0 001.326 0z"
                            data-name="Icon awesome-unlink"
                        ></path>
                    </svg>
            }
            {
                props.show &&
                <div onClick={() => setshowBtn(!showBtn)} style={{
                    alignItems: 'flex-end',
                    width: 20,
                    marginLeft: 'auto',
                    cursor: 'pointer'
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                        <g id="Groupe_673" data-name="Groupe 673" transform="translate(-902 -749)">
                            <path id="dots-horizontal" d="M16,12a2,2,0,1,1,2,2,2,2,0,0,1-2-2m-6,0a2,2,0,1,1,2,2,2,2,0,0,1-2-2M4,12a2,2,0,1,1,2,2A2,2,0,0,1,4,12Z" transform="translate(898 745)" fill="#818e94" />
                            <rect id="Rectangle_211" data-name="Rectangle 211" width="16" height="16" transform="translate(902 749)" fill="none" />
                        </g>
                    </svg>
                </div>
            }
            {showBtn &&
                <div onClick={() => setshowBtn(false)}>

                    {props.connected ?
                        <button onClick={() => props.disconnect(props.page).then(() => props.getAllPagesAction())}>Disconnect Your page</button> :
                        <button onClick={() => props.connect(props.page).then(() => props.getAllPagesAction())}>Connect Your page</button>
                    }
                </div>
            }
            <div style={{
                width: "100%",
                textAlign: 'center'
            }} >
                <div style={{display:'inline-grid'}}>
                    <img src={'https://graph.facebook.com/v3.2/' + props.page.idPage + '/picture?access_token=' + props.page.access_token} alt="page thumbnail" style={{ borderRadius: 50 + "%" }} />
                    {/* <img src={fb_icon} alt="fb_icon" style={{width: '20px', marginLeft: '30px', marginTop: '-12px'}} /> */}
                </div>
                <h2 style={{ fontSize: 18, color: "rgba(45, 47, 57, 1)", marginTop: 25, marginBottom: 25 }}>{props.name}</h2>
                <span style={{
                    fontFamily: 'Poppins',
                    fontStyle: 'normal',
                    fontWeight: 'bold',
                    fontSize: 36,
                    color: "rgba(45,47,57,1)",
                    display: "block"
                }}>{fanCount}</span>
                <span style={{
                    fontFamily: 'Poppins',
                    fontStyle: 'normal',
                    fontWeight: 'normal',
                    fontSize: 14,
                    color: "rgba(129,142,148,1)",
                    display: "block"
                }}
                >Total Fans</span>
            </div>
        </div >
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        connect: (page) => dispatch(connectPage(page)),
        disconnect: (page) => dispatch(deconnectPage(page)),
        getAllPagesAction: () => dispatch(getAllPagesAction()),
    }
}

export default connect(null, mapDispatchToProps)(PageCart)

import React from 'react'
import Comment from './Comment'

function CommentsNotMatch(props) {
    return (
        <div>
            <div style={{ marginBottom: 30 }}>
                <span style={{ cursor: 'pointer', background: "#E9E9EB", width: "44%", padding: 10, color: "#818E94", display: "inline-block", textAlign: "center", fontSize: 13, margin: 0, fontFamily: "Poppins" }} onClick={() => props.setshow(true)}>Matched</span>
                <span style={{
                    cursor: 'pointer', background: "#E5007D", width: "44%", padding: 10, color: "#fff", display: "inline-block", textAlign: "center", fontSize: 13, margin: 0, fontFamily: "Poppins"
                }}>Not matched</span>
            </div>
            <div style={{ height: 470, overflowY: "scroll" }}>
                {
                    props.comments.length > 0 && [...props.comments[0].events].reverse().filter(el => props.comments[0].idPage !== el.publisher.id).map(el => (!el.success && <Comment bg={props.eventVal && props.eventVal._id === el._id ? "#F2F2F2" : "#FFF"} handelClick={props.handelClick} comment={el} key={el._id} />))
                }
            </div>
        </div>
    )
}

export default CommentsNotMatch

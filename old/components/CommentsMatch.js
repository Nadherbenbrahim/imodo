import React from 'react'
import Comment from './Comment'

function CommentsMatch(props) {
    return (
        <div>
            <div style={{ marginBottom: 30 }}>
                <span style={{
                    cursor: 'pointer', background: "#E5007D", width: "42%", padding: 10, color: "#fff", display: "inline-block", textAlign: "center", fontSize: 13, margin: 0, fontFamily: "Poppins"
                }}>Matched</span>
                <span style={{ cursor: 'pointer', background: "#E9E9EB", width: "42%", padding: 10, color: "#818E94", display: "inline-block", textAlign: "center", fontSize: 13, margin: 0, fontFamily: "Poppins" }} onClick={() => props.setshow(false)}>Not matched</span>
            </div>
            <div style={{ height: 470, overflowY: "scroll" }}>
                {
                    props.comments.length > 0 && [...props.comments[0].events].reverse().map(el => (el.success && < Comment comment={el} key={el._id} bg={props.eventVal && props.eventVal._id === el._id ? "#F2F2F2" : "#FFF"} handelClick={props.handelClick} />))
                }
            </div>
        </div>
    )
}

export default CommentsMatch

import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getComments } from '../actions'

function Stats(props) {
    useEffect(() => {
        props.comments(props.postId.post.postId)
    }, [])
    return (
        <div style={{ fontSize: 17, width: "100%", margin: "20px 0", display: "flex", alignItems: "center", justifyContent: "space-around" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                <span style={{ fontWeight: "bold" }}> {props.comments[0] ? props.comments[0].events.length : 0}</span>
                <span style={{ fontWeight: "lighter", color: "gray" }}>Comments</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                <span style={{ fontWeight: "bold" }}> {props.comments[0] ? props.comments[0].events.filter(el => el.success == true).length : 0}</span>
                <span style={{ fontWeight: "lighter", color: "gray" }}>Matched</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                <span style={{ fontWeight: "bold" }}>% {props.comments[0] ? (props.comments[0].events.filter(el => el.success == true).length * 100) / props.comments[0].events.length : 0}</span>
                <span style={{ fontWeight: "lighter", color: "gray" }}>Performance</span>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    comments: state.comments
})

const mapDispatchToProps = (dispatch) => {
    return {
        comments: (id) => dispatch(getComments(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Stats)

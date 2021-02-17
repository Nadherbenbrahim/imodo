import React from 'react'
import Popup from "reactjs-popup";

function Modal(props) {
    return (
        <Popup
            trigger={props.triggerModal}
            modal
            closeOnDocumentClick
        >
            {props.children}
        </Popup>
    )
}

export default Modal

import socket from "../sockets/chat"

const msgs = (state = [], action) => {
    switch (action.type) {
        case "ADDMESSAGE":
            return [...state, ...action.message]
        case "REMOVEMESSAGE":
            return []
        default:
            return state
    }

}
export default msgs
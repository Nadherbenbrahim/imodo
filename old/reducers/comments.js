
const comments = (state = [], action) => {
    switch (action.type) {
        case 'GETCOMMENTS':
            return action.payload
        default:
            return state
    }
}

export default comments
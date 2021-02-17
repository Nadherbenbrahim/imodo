const trainagent = (state = false, action) => {
    switch (action.type) {
        case 'AGENTTRAINED':
            return action.show
        case 'AGENTNOTTRAINED':
            return action.show
        default:
            return state
    }
}

export default trainagent
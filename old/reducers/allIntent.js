const initialState = []

const allIntent = (state = initialState, action) => {
    switch (action.type) {
        case 'GETALLINTENTS':
            return [...action.intents.data.data]
        default:
            return state
    }
}
export default allIntent
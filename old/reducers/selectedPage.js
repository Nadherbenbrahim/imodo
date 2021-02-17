const initialState = {}

const selectedPageReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'MONIRATEDPAGE':
            return action.page
        default:
            return state
    }
}
export default selectedPageReducer
const initialState = []

const allConnectedPages = (state = initialState, action) => {
    switch (action.type) {
        case 'GETALLCONNECTEDPAGES':
            return [...action.pages.data.data]
        default:
            return state
    }
}
export default allConnectedPages
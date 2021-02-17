const initialState = []

const allPages = (state = initialState, action) => {
    switch (action.type) {
        case 'GETALLPAGES':
            return action.pages.data.data
        case 'UPDATEPAGE':
            let updatedState = state.filter(el => el._id !== action.page.data.data._id)
            return [...updatedState, action.page.data.data]
        default:
            return state
    }
}
export default allPages
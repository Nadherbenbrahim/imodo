const initialState = []

const allPosts = (state = initialState, action) => {
    switch (action.type) {
        case 'GETALLCONNECTEDPAGESPOSTS':
            return action.posts.data.data
        default:
            return state
    }
}
export default allPosts
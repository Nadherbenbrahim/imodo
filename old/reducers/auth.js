const initialState = {}

const auth = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, ...action.user.data.data }
        case 'LOGOUT':
            return {}
        default:
            return state
    }
}
export default auth
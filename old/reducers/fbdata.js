const initialState = {}

const fbdata = (state = initialState, action) => {
    switch (action.type) {
        case 'FBDATA':
            return { ...state, ...action.fbdata }
        default:
            return state
    }
}
export default fbdata
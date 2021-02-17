const popupdate = (state = false, action) => {
    switch (action.type) {
        case 'TOGGLEPOPPUP':
            return !state
        default:
            return state
    }
}
export default popupdate
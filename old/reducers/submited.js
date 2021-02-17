const submited = (state = false, action) => {
    switch (action.type) {
        case "SUBMITD":
            return action.submit
        default:
            return state
    }

}
export default submited
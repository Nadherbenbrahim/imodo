function intentPage(state = [], action) {
    switch (action.type) {
        case "PAGEINTENTS":
            const newState = action.data.data.data.filter(el => el.name != 'None').sort((a, b) => b.occ - a.occ)
            return newState
        default:
            return state
    }
}

export default intentPage

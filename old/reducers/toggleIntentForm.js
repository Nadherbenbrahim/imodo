const toggleIntentForm = (state = [], action) => {
    switch (action.type) {
        case 'TOGGLEINTENT':
            return [...state.filter(el => el.name !== action.toggle.name), action.toggle]
        case 'EMPTYTOGGLEINTENT':
            return []
        default:
            return state
    }
}

export default toggleIntentForm
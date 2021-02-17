const initialState = []

const allProjects = (state = initialState, action) => {
    switch (action.type) {
        case 'GETALLCONNECTEDPAGESPROJECTS':
            return [...action.projects.data.data]
        case 'ADDPROJECTS':
            return [...state, ...action.projects.data.data]
        case 'ADDPRODUCTINPROJECT':
            const newState = state.filter(el => el._id !== action.product._id)
            return [...newState, action.product]
        case 'EDITPRODUCTINPROJECT':
            return [...state.filter(el => el._id !== action.product._id), action.product]
        case 'REMOVEPRODUCTINPROJECT':
            return [...state.filter(el => el._id !== action.product._id), action.product]
        default:
            return state
    }
}
export default allProjects
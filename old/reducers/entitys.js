const initialState = []

const entitys = (state = initialState, action) => {
    switch (action.type) {
        case 'GETALLENTITYS':
            // console.log('allentityreducer ', action.entitys.data.data.flat())
            return action.entitys.data.data.flat()
        case 'ADDENTITY':
            console.log('from reducer ', [...state, action.entitys])
            return [...state, action.entitys]
        default:
            return state
    }
}
export default entitys
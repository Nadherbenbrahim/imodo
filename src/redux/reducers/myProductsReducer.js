const initialState = {
    categories: null,
    categorySelected: null,
    productSelected: null,
}

const myProductsReducer = (state = initialState, action) => {

    switch (action.type) {
        
        case 'SELECT_PRODUCT' :
            return {
                ...state,
                productSelected: action.payload
            }

        case 'SELECT_CATEGORIE' :
            return {
                ...state,
                categorySelected: action.payload
            }

        case 'GET_CATEGORIES' :
            return {
                ...state,
                categories: action.payload
            }

        default:
            return state;
    }
}

export default myProductsReducer;


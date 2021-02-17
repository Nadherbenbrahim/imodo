
const initialState = {
    pricingInfos: [],
    paymentHistory: [],
    billingPlan: [],
    currency: {id: "", key: "", value: ""},
};

const billingReducer = (state = initialState, action) => {

    switch (action.type) {
      
        case 'GET_BILLING_PLAN' :
            return {
                ...state,
                billingPlan: action.payload,
            }

        case 'GET_PAYMENT_HISTORY' :
            return {
                ...state,
                paymentHistory: action.payload,
            }

        case 'DETECT_CURRENCY' :
            return {
                ...state,
                currency: action.payload,
            }

        case 'GET_PRICING_INFO' :
            return {
                ...state,
                pricingInfos: action.payload,
            }

        default:
            return state;
    }
}

export default billingReducer;


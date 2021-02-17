const initialState = {
    wizardIntentType: null,
    wizardStep : 0,
    wizardSelectedPage: null,
    wizardSelectedPost: null,
    wizardPagePosts: null,
    wizardIdProject: null,
    wizardExistingProject: null,
    wizardExistingProjectIntents: null,
    wizardActivePosts: null,
    wizardIntents: null,
    wizardReceivedMsg: null,
    wizardFinish: null,
    wizardConfigDone: null,

}

const wizardReducer = (state = initialState, action) => {

    switch (action.type) {

        case 'RESET_WIZARD_POST': 
            return {
                ...state,
                wizardSelectedPost: null,
        }

        case 'RESET_WIZARD_PAGE': 
            return {
                ...state,
                wizardSelectedPage: null,
        }
        
        case 'RESET_STEP_3': 
            return {
                ...state,
                wizardExistingProject: null,
                wizardExistingProjectIntents: null,
        }
        
        case 'FROM_MY_AGENTS_TO_STEP_3_WIZARD': 
            return {
                ...state,
                wizardStep: action.payload,
                wizardIdProject: action.payload1,
                wizardIntentType: action.payload2,
                wizardSelectedPage: action.payload3,
                wizardSelectedPost: action.payload4,
        }

        case 'RECEIVE_MSG_STEP_4': 
            return {
                ...state,
                wizardReceivedMsg: action.payload,
            }

        case 'IS_EXISTING_PROJECT': 
            return {
                ...state,
                wizardExistingProject: action.payload,
                wizardExistingProjectIntents: action.payload1,
            }

        case 'GET_ALL_WIZARD_INTENTS': 
            return {
                ...state,
                wizardIntents: action.payload
            }

        case 'ADD_ID_PROJECT': 
            return {
                ...state,
                wizardIdProject: action.payload
            }

        case 'GET_WIZARD_ACTIVE_POSTS': 
            return {
                ...state,
                wizardActivePosts: action.payload
            }

        case 'GET_WIZARD_PAGE_POSTS': 
            return {
                ...state,
                wizardPagePosts: action.payload
            }

        case 'SELECT_WIZARD_POST':
                return {
                    ...state,
                    wizardSelectedPost : action.payload,
                }

        case 'SELECT_WIZARD_PAGE':
                return {
                    ...state,
                    wizardSelectedPage : action.payload,
                }
        
        case 'NEXT_SPECIFIC_WIZARD_STEP':
            if(state.wizardStep < 4) {
                return {
                    ...state,
                    wizardStep : action.payload,
                }
            }

        case 'NEXT_WIZARD_STEP':
            if(state.wizardStep < 4) {
                return {
                    ...state,
                    wizardStep : state.wizardStep + 1,
                }
            }
        
        case 'PREV_WIZARD_STEP' :
            if(state.wizardStep > -1) {
                return {
                    ...state,
                    wizardStep : state.wizardStep - 1,
                    wizardSelectedPost: null,
                    wizardSelectedPage: null,
                }
            }

        case 'RESET_WIZARD_STEP' :
                return {
                    ...state,
                    wizardStep : 0,
                }
    
        case 'RESET_ALL_WIZARD' :
                return {
                    wizardIntentType: null,
                    wizardStep : 0,
                    wizardSelectedPage: null,
                    wizardSelectedPost: null,
                    wizardPagePosts: null,
                    wizardIdProject: null,
                    wizardActivePagePosts: null,
                    wizardIntents: null,
                }

        case 'SELECT_WIZARD_INTENT_TYPE' :
                return {
                    ...state,
                    wizardIntentType : action.payload,
                }
        
        default:
            return state;
    }
}

export default wizardReducer;


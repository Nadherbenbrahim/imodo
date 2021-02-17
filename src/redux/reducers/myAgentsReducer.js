// LOGS === Comments

const initialState = {
    agentsProjects: null,
    agentsSelectedProject: null,
    agentsProjectLogs: null,
    agentsCommentsMatched: [],
    agentsCommentsNotMatched: [],
    intentsMatched: [],
    intentsNotMatched: [],
};

const myAgentsReducer = (state = initialState, action) => {

    switch (action.type) {
      
        case 'RESET_LOGS_BY_PAGE' :
            return {
                ...state,
                agentsProjectLogs: null,
                agentsCommentsMatched: [],
                agentsCommentsNotMatched: [],
            }

        case 'GET_LOGS_BY_PAGE' :
            return {
                ...state,
                agentsProjectLogs: action.payload,
                agentsCommentsMatched: action.payload1,
                agentsCommentsNotMatched: action.payload2,
                intentsMatched: action.payload3,
                intentsNotMatched: action.payload4,
            }

        case 'SET_AGENTS_PROJECT' :
            return {
                ...state,
                agentsSelectedProject: action.payload,
            }

        case 'GET_PROJECT_BY_PAGE' :
            return {
                ...state,
                agentsProjects: action.payload,
            }

        default:
            return state;
    }
}

export default myAgentsReducer;


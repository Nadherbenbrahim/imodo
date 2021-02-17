const userChoiceLang = localStorage.getItem("modoLang");

const initialState = {
    // Modo Lang
    lang: userChoiceLang ? userChoiceLang : "en",

    allSocialPages: [],
    allSocialPagesFiltered: [],
    fbData: null,
    fbDataFiltered: null,
    instaData: null,
    instaDataFiltered: null,
    socialMediaPageSelected: null,
    PageEntities: null,
    dashboardData : [],
    dashboardPosts : [],
    teamMembers: [],
}

const socialMediaReducer = (state = initialState, action) => {

    switch (action.type) {

        case 'SET_LANG' :
            return {
                ...state,
                lang : action.payload,
            }

        case 'GET_TEAM' :
            return {
                ...state,
                teamMembers : action.payload,
            }

        case 'RESET_FILTER_PAGES' :
            return {
                ...state,
                allSocialPagesFiltered : [],
            }

        case 'FILTER_PAGES' :
            return {
                ...state,
                allSocialPagesFiltered : action.payload,
            }

        case 'GET_DASHBOARD_POSTS' :
            return {
                ...state,
                dashboardPosts : action.payload,
            }

        case 'GET_DASHBOARD' :
            return {
                ...state,
                dashboardData : action.payload,
            }

        case 'RESET_DASHBOARD' :
            return {
                ...state,
                dashboardData : [],
                dashboardPosts : [],
            }
        
        case 'GET_ENTITIES_OF_A_PAGE' :
            return {
                ...state,
                PageEntities : action.payload,
            }
        
        case 'SELECT_SOCIAL_MEDIA_PAGE' :
            return {
                ...state,
                socialMediaPageSelected : action.payload,
            }

        case 'RESET_SM_SELECTIONS' :
            return {
                ...state,
                socialMediaPageSelected : null,
                PageEntities : null,
            }

        case 'GET_FB_DATA' :
            return {
                ...state,
                fbData : action.payload,
                fbDataFiltered: action.payload2,
            }

        case 'GET_INSTA_DATA' :
            return {
                ...state,
                instaData : action.payload,
                instaDataFiltered : action.payload2,
            }
        
        case 'RESET_ALL_PAGES' :
            return {
                ...state,
                allSocialPages: []
            }

        case 'GET_ALL_PAGES' :
            return {
                ...state,
                allSocialPages: action.payload
            }

        default:
            return state;
    }
}

export default socialMediaReducer;


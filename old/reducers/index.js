import auth from './auth'
import { combineReducers } from 'redux'
import { loadingBarReducer } from 'react-redux-loading-bar'
import allpages from './allpages'
import fbdata from './fbdata'
import entitys from './entitys'
import allConnectedPages from './allConnectedPages'
import selectedPageReducer from './selectedPage'
import allProjects from './allProjects'
import allPosts from './allPosts'
import allIntent from './allIntent'
import messages from './msgs'
import trainagent from './trainagent'
import comments from './comments'
import popupdate from './productUpdatePopup'
import toggleIntentForm from './toggleIntentForm'
import showAddCategory from './showAddCategory'
import intentPage from './intentPage'
import submited from './submited'
const rootReducer = combineReducers({
    loadingBar: loadingBarReducer,
    auth,
    allpages,
    fbdata,
    entitys,
    allConnectedPages,
    selectedPageReducer,
    allProjects,
    allPosts,
    allIntents: allIntent,
    messages,
    trainagent,
    comments,
    popupdate,
    toggleIntentForm,
    showAddCategory,
    intentPage,
    submited
})

export default rootReducer
// import {createStore , applyMiddleware} from 'redux';
// import thunk from 'redux-thunk';
// import rootReducer from '../reducers';

// const initialState = {};

// const middleware = [thunk];

// const store = createStore(rootReducer,initialState,applyMiddleware(...middleware));

// export default store;


import {createStore , applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

// LOAD & GET LOCALSTORAGE STATE:

function saveToLocalStorage(state) {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    }
    catch(e) {
        console.log("Saving state to localStorage error",e);
    }
};

function loadFromLocalStorage(state) {
    try {
        const serializedState = localStorage.getItem('state');
        if(serializedState === null) return undefined;
        return JSON.parse(serializedState);
        
    }
    catch(e) {
        console.log("Loading state to localStorage error",e);
        return undefined;
    }
};

const middleware = [thunk];

const persistedState = loadFromLocalStorage();

const store = createStore(rootReducer,persistedState,applyMiddleware(...middleware));

store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;
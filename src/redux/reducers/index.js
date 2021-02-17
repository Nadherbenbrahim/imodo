import { combineReducers } from 'redux';
import socialMediaReducer from './socialMediaReducer';
import wizardReducer from './wizardReducer';
import myProductsReducer from './myProductsReducer';
import myAgentsReducer from './myAgentsReducer';
import billingReducer from './billingReducer';

const rootReducer = combineReducers({
   socialMediaR : socialMediaReducer,
   wizardR : wizardReducer,
   productsR : myProductsReducer,
   agentsR : myAgentsReducer,
   billingR : billingReducer,
});

export default rootReducer;
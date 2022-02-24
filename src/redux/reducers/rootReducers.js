import { combineReducers } from 'redux';
import { uiReducer } from '../reducers/uiReducer';

export const rootReducers = combineReducers({
    // auth : authReducer,
    ui   : uiReducer,
});
import { combineReducers } from 'redux';
import { uiReducer } from '../reducers/uiReducer';
import { authReducer } from './authReducer';
import { calendarReducer } from './calendarReducer';

export const rootReducers = combineReducers({
    auth : authReducer,
    ui   : uiReducer,
    calendar: calendarReducer
});
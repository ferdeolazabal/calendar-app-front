import { combineReducers } from 'redux';
import { uiReducer } from '../reducers/uiReducer';
import { calendarReducer } from './calendarReducer';

export const rootReducers = combineReducers({
    // auth : authReducer,
    ui   : uiReducer,
    calendar: calendarReducer
});
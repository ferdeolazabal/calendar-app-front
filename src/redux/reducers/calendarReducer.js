import moment from "moment";
import { types } from "../types/types";

const initialState = {
    events: [{
        title: 'Cumpleaños del jefe',
        start: moment().toDate(),
        end: moment().add( 2, 'hours').toDate(),
        bgcolor: '#f56954',
        notes: 'Comprar torta',
        user:{
            _id: '123',
            name: 'Juan'
        }
    }],
    activeEvent: null
};


export const calendarReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.eventActiveEvent:
            return {
                ...state,
                activeEvent: action.payload
            };

        case types.eventAddNew:
            return {
                ...state,
                events: [ ...state.events, action.payload ]
            };
        // case 'REMOVE_EVENT':
            // return {
            //     ...state,
            //     events: state.events.filter(event => event.id !== action.payload)
            // };
        // case 'UPDATE_EVENT':
            // return {
            //     ...state,
            //     events: state.events.map(event => {
            //     if (event.id === action.payload.id) {
            //         return action.payload;
            //     }
            //     return event;
            //     })
            // };
        default:
            return state;
    }
}

import { types } from "../types/types";

// {
//     id: new Date().getTime(),
//     title: 'Cumpleaños del jefe',
//     start: moment().toDate(),
//     end: moment().add( 2, 'hours').toDate(),
//     bgcolor: '#f56954',
//     notes: 'Comprar torta',
//     user:{
//         _id: '123',
//         name: 'Fernando'
//     }
// }


const initialState = {
    events: [],
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
        
        case types.eventClearActiveEvent:
            return {
                ...state,
                activeEvent: null
            }
        
        case types.eventUpdateEvent:
        return {
            ...state,
            events: state.events.map(event => (
            // @ts-ignore
            ( event.id === action.payload.id ) ? action.payload : event
            ))
        };
        
        case types.eventDeleteEvent:
            return {
                ...state,
                // @ts-ignore
                events: state.events.filter(event => (event.id !== state.activeEvent.id)),
                activeEvent: null
            };
        
        case types.eventLoaded:
            return {
                ...state,
                events: [ ...action.payload ]
            };
        
        case types.eventClearEvents:
            return {
                ...initialState
            }

        default:
            return state;
    }
}

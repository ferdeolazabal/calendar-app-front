import { types } from "../types/types";


export const eventAddNew = ( event ) => ({ 
    type: types.eventAddNew, 
    payload: event
});

export const eventActiveEvent = (event) => ({
    type: types.eventActiveEvent,
    payload: event
});
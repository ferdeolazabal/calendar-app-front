import { types } from "../types/types";


export const eventAddNew = ( event ) => ({ 
    type: types.eventAddNew, 
    payload: event
});

export const eventActiveEvent = ( event ) => ({
    type: types.eventActiveEvent,
    payload: event
});

export const eventClearActiveEvent = () => ({
    type: types.eventClearActiveEvent
});

export const eventUpdateEvent = ( event ) => ({
    type: types.eventUpdateEvent,
    payload: event
});

export const eventDeleteEvent = () => ({
    type: types.eventDeleteEvent,
});
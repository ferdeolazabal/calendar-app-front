import Swal from "sweetalert2";
import { prepareEvents } from "../../helpers/events-prepare";
import { fetchWithToken } from "../../helpers/fetch";
import { types } from "../types/types";

export const startAddNewEvent = ( event ) => {
    return async ( dispatch, getState ) => {

        const { uid, name } = getState().auth;
        try {

            const resp = await fetchWithToken( 'events', event, 'POST' );
            const body = await resp.json();

            if ( resp.ok ) {

                event.id = body.eventDB.id;
                event.user= { uid, name };

                dispatch( eventAddNew( event ) );
                Swal.fire(
                    'Good job!',
                    'Event added successfully!',
                    'success'
                )
            }
        } catch (error) {
            console.log( error );
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Hubo un error al crear el evento!',
            })
        };
    };
};


const eventAddNew = ( event ) => ({ 
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

export const eventStartUpdate = ( event ) => {
    return async ( dispatch ) => {
        try {
            const resp = await fetchWithToken( `events/${ event.id }`, event , 'PUT' );
            const body = await resp.json();

            if ( body.ok ) {
                dispatch( eventUpdateEvent( event ) );
                Swal.fire(
                    'Good job!',
                    'Event updated successfully!',
                    'success'
                )
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: body.msg,
                })
            }
        } catch (error) {
            console.log( error );
        };
    };
};

const eventUpdateEvent = ( event ) => ({
    type: types.eventUpdateEvent,
    payload: event
});

export const eventStartDelete = ( ) => {
    return async ( dispatch, getState ) => {

        const { id } = getState().calendar.activeEvent;

        try {
            const resp = await fetchWithToken( `events/${ id }`, {} , 'DELETE' );
            const body = await resp.json();

            if ( body.ok ) {
                dispatch( eventDeleteEvent() );
                Swal.fire(
                    'Good job!',
                    'Event deleted successfully!',
                    'success'
                )
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: body.msg,
                })
            }
        } catch (error) {
            console.log( error );
        };
    };
};

const eventDeleteEvent = () => ({
    type: types.eventDeleteEvent,
});

export const eventStartLoading = ( ) => {
    return async ( dispatch ) =>{

        try {
            const resp = await fetchWithToken( 'events' );
            const body = await resp.json();
            const events = prepareEvents( body.events );
            dispatch( eventLoaded( events ) );
        
        } catch (error) {
            console.log( error );
        };
    };
};

const eventLoaded = ( events ) => ({
    type: types.eventLoaded,
    payload: events
});

export const eventClearEvents = () => ({
    type: types.eventClearEvents
});
import { fetchNoToken, fetchWithToken } from "../../helpers/fetch";
import { types } from "../types/types";
import Swal from 'sweetalert2'


export const startLogin = ( email, password ) => {
    return async ( dispatch ) => {
        
        const resp = await fetchNoToken('auth', { email, password }, 'POST');
        const body = await resp.json();
        
        if ( body.ok ) {
            localStorage.setItem('token', body.token);
            // @ts-ignore
            localStorage.setItem('token-init-date', new Date().getTime() );
            
            dispatch( login( {
                uid: body.uid,
                name: body.name,
            } ) );

        } else {
            Swal.fire({
                title: 'Error',
                text: body.msg,
                icon: 'error',
            })
        };
    };
};

export const startRegister = ( email, password, name ) => {

    return async ( dispatch ) => {

        const resp = await fetchNoToken('auth/register', { email, password, name }, 'POST');
        const body = await resp.json();
        
        if ( body.ok ) {
            localStorage.setItem('token', body.token);
            // @ts-ignore
            localStorage.setItem('token-init-date', new Date().getTime() );
            
            dispatch( login( {
                uid: body.uid,
                name: body.name,
            } ) );

        } else {
            Swal.fire({
                title: 'Error',
                text: body.msg,
                icon: 'error',
            })
        };
    };
}; 

export const startChecking = () => {

    return async ( dispatch ) => {
        
        const resp = await fetchWithToken( 'auth/renew' );
        const body = await resp.json();
        
        if ( body.ok ) {
            localStorage.setItem('token', body.token);
            // @ts-ignore
            localStorage.setItem('token-init-date', new Date().getTime() );
            
            dispatch( login( {
                uid: body.uid,
                name: body.name,
            } ) );

        } else {
            dispatch( checkingFinish() );
        };
    };
};

const checkingFinish = () => ({
    type: types.authCheckingFinish
});

const login = ( user ) => ({
    type: types.authLogin,
    payload: user
});

export const startLogout = () => {
    return async ( dispatch ) => {
        localStorage.clear();
        dispatch( logout() );
    };
}

const logout = () => ({
    type: types.authLogout
});
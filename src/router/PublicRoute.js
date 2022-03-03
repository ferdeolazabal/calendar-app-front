import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

export const PublicRoute = ( { children } ) => {
    // @ts-ignore
    const { isAuthenticated } = useSelector( state => state.auth );

    return isAuthenticated 
            ? <Navigate to="/" />
            : children
};
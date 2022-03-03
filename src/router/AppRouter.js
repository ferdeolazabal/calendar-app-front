import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    BrowserRouter,
    Routes,
    Route,
    } from "react-router-dom";

import { LoginScreen } from '../components/auth/LoginScreen';
import CalendarScreen from '../components/calendar/CalendarScreen';
import { startChecking } from "../redux/actions/auth";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

export const AppRouter = () => {

    const dispatch = useDispatch();
    // @ts-ignore
    const { checking } = useSelector( state => state.auth );
    console.log(checking);
    useEffect(() => {
        dispatch( startChecking() );
    }, [  dispatch ] )
    

    if ( checking ) {
        return (
            <div className="nothing__main-content">
                <i className="fas fa-spinner fa-spin fa-4x"></i>
            </div>
        )
    };

    return (
        <BrowserRouter>
            <Routes>
                <Route path="login" element={
                    <PublicRoute>
                        <LoginScreen />
                    </PublicRoute>
                } />

                <Route path="/*" element={
                    <PrivateRoute>
                        <CalendarScreen />
                    </PrivateRoute>
                } /> 
                
            </Routes>

        </BrowserRouter>
    )
};

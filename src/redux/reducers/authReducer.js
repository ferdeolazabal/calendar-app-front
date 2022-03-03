import { types } from "../types/types";

const initialState = {
    isAuthenticated: false,
    checking: true,
    // user: {
    //     id: null,
    //     name: null,
    // }
};

export const authReducer = (state = initialState, action) => {

    switch (action.type) {

        case types.authLogin:
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                checking: false,
            };

        case types.authCheckingFinish:
            return {
                ...state,
                checking: false,
            };

        case types.authLogout:
            return {
                checking: false,
                isAuthenticated: false,
            };

        default:
            return state;
    };
};
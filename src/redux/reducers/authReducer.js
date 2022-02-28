
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
        case 'LOGIN':
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload
            };
        case 'LOGOUT':
            return {
                ...state,
                isAuthenticated: false,
                user: null
            };
        default:
            return state;
    }
};
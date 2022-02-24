import { types } from "../types/types";

const initialState = {
    modalOpen: false
};

export const uiReducer = ( state = initialState, action ) => {

    switch ( action.type ) {
        case types.uiOpenModal:
            return {
                ...state,
                modalOpen: true,
                modalType: action.modalType,
                modalProps: action.modalProps
            };
        case types.uiCloseModal:
            return {
                ...state,
                modalOpen: false,
                modalType: null,
                modalProps: null
            };
        default:
            return state;
    }
}
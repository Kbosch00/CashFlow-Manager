import {
    GET_WALLET_LIST_SUCCESS,
    GET_WALLET_LIST_FAIL,
    GET_WALLET_USER_LIST_SUCCESS,
    GET_WALLET_USER_LIST_FAIL,
    GET_WALLET_SUCCESS,
    GET_WALLET_FAIL,
    SET_WALLET_NULL
} from '../actions/wallet/types'

const initialState = {
    wallet_list: null,
    walletDetail: null,
    isLoading: true
};

export default function wallet(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_WALLET_LIST_SUCCESS:
            return {
                ...state,
                wallet_list: payload.wallets,
                isLoading: false
            };
        case GET_WALLET_LIST_FAIL:
            return {
                ...state,
                wallet_list: null,
                isLoading: false
            };
        case GET_WALLET_USER_LIST_SUCCESS:
            return {
                ...state,
                wallet_list: payload.wallets,
                isLoading: false
            };
        case GET_WALLET_USER_LIST_FAIL:
            return {
                ...state,
                wallet_list: null,
                isLoading: false
            };
        case GET_WALLET_SUCCESS:
            return {
                ...state,
                walletDetail: payload.wallets,
                isLoading: false
            };
        case GET_WALLET_FAIL:
            return {
                ...state,
                walletDetail: null,
                isLoading: false
            };
        case SET_WALLET_NULL:
            return {
                ...state,
                wallet_list: null,
                isLoading: false
            };

        default:
            return state;
    }
}
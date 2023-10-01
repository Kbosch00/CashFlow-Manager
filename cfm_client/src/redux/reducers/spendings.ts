import { GET_SPENDING_FAIL, GET_SPENDING_LIST_FAIL, GET_SPENDING_LIST_SUCCESS, GET_SPENDING_SUCCESS } from "../actions/spending/types"

const initialState = {
    spending_list: null,
    spending: null,
    isLoading: true
};

export default function spending(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_SPENDING_LIST_SUCCESS:
            return {
                ...state,
                spending_list: payload.spending,
                isLoading: false
            };
        case GET_SPENDING_LIST_FAIL:
            return {
                ...state,
                spending_list: null,
                isLoading: false
            };
        case GET_SPENDING_SUCCESS:
            return {
                ...state,
                spending: payload.spending,
                isLoading: false
            };
        case GET_SPENDING_FAIL:
            return {
                ...state,
                spending: null,
                isLoading: false
            };
        default:
            return state;
    }
}
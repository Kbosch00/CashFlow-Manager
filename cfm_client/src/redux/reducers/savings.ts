import { GET_SAVING_LIST_SUCCESS, GET_SAVING_LIST_FAIL, GET_SAVING_SUCCESS, GET_SAVING_FAIL } from "../actions/saving/types"

const initialState = {
    saving_list: null,
    saving: null,
    isLoading: true
};

export default function saving(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_SAVING_LIST_SUCCESS:
            return {
                ...state,
                saving_list: payload.savings,
                isLoading: false
            };
        case GET_SAVING_LIST_FAIL:
            return {
                ...state,
                saving_list: null,
                isLoading: false
            };
        case GET_SAVING_SUCCESS:
            return {
                ...state,
                saving: payload.savings,
                isLoading: false
            };
        case GET_SAVING_FAIL:
            return {
                ...state,
                saving: null,
                isLoading: false
            };
        default:
            return state;
    }
}
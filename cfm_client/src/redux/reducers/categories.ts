import {
    GET_CATEGORIES_SUCCESS,
    GET_CATEGORIES_FAIL,
    GET_CATEGORY_SUCCESS,
    GET_CATEGORY_FAIL
} from '../actions/category/types'

const initialState = {
    categories: null,
    category: null
}

export default function categories(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_CATEGORIES_SUCCESS:
            return {
                ...state,
                categories: payload.categories
            }
        case GET_CATEGORIES_FAIL:
            return {
                ...state,
                categories: null
            }
        case GET_CATEGORY_SUCCESS:
            return {
                ...state,
                category: payload.categories
            }
        case GET_CATEGORY_FAIL:
            return {
                ...state,
                category: null
            }
        default:
            return state
    }
}
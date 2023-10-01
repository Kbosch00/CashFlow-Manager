import axios from 'axios';
import {
    GET_CATEGORIES_SUCCESS,
    GET_CATEGORIES_FAIL,
    GET_CATEGORY_SUCCESS,
    GET_CATEGORY_FAIL
} from './types';


export const get_categories = () => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json'
        }
    };

    try {

        const res = await axios.get('http://127.0.0.1:8000/api/category/categories', config)

        if (res.status === 200) {
            dispatch({
                type: GET_CATEGORIES_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_CATEGORIES_FAIL
            });
        }

    } catch (err) {
        dispatch({
            type: GET_CATEGORIES_FAIL
        })
    }
}

export const get_category = (id: number) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`
        }
    };

    try {

        const res = await axios.get(`http://127.0.0.1:8000/api/category/${id}/category`, config)

        if (res.status === 200) {
            dispatch({
                type: GET_CATEGORY_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_CATEGORY_FAIL
            });
        }

    } catch (err) {
        dispatch({
            type: GET_CATEGORY_FAIL
        })
    }
}
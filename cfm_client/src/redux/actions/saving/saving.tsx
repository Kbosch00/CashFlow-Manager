import axios from "axios";
import { GET_SAVING_LIST_SUCCESS, GET_SAVING_LIST_FAIL, GET_SAVING_SUCCESS, GET_SAVING_FAIL, } from "./types"

export const get_savings_list = (id: number) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`
        }
    };

    try {

        const res = await axios.get(`http://127.0.0.1:8000/api/wallet/${id}/savings`, config)

        if (res.status === 200) {
            dispatch({
                type: GET_SAVING_LIST_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_SAVING_LIST_FAIL
            });
        }

    } catch (err) {
        dispatch({
            type: GET_SAVING_LIST_FAIL
        })
    }
}

export const get_saving_by_id = (id: number) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`
        }
    };

    try {

        const res = await axios.get(`http://127.0.0.1:8000/api/wallet/${id}/saving`, config)

        if (res.status === 200) {
            dispatch({
                type: GET_SAVING_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_SAVING_FAIL
            });
        }

    } catch (err) {
        dispatch({
            type: GET_SAVING_FAIL
        })
    }
}

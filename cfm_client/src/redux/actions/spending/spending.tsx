import axios from "axios";
import { GET_SPENDING_LIST_SUCCESS, GET_SPENDING_LIST_FAIL, GET_SPENDING_SUCCESS, GET_SPENDING_FAIL } from "./types"


export const get_spending_list = (id: number) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`
        }
    };

    try {

        const res = await axios.get(`http://127.0.0.1:8000/api/wallet/${id}/spendings`, config)

        if (res.status === 200) {
            dispatch({
                type: GET_SPENDING_LIST_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_SPENDING_LIST_FAIL
            });
        }

    } catch (err) {
        dispatch({
            type: GET_SPENDING_LIST_FAIL
        })
    }
}

export const get_spending_by_id = (id: number) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`
        }
    };

    try {

        const res = await axios.get(`http://127.0.0.1:8000/api/wallet/${id}/spending`, config)

        if (res.status === 200) {
            dispatch({
                type: GET_SPENDING_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_SPENDING_FAIL
            });
        }

    } catch (err) {
        dispatch({
            type: GET_SPENDING_FAIL
        })
    }
}
import axios from 'axios'
import {
  GET_WALLET_LIST_SUCCESS,
  GET_WALLET_LIST_FAIL,
  GET_WALLET_USER_LIST_SUCCESS,
  GET_WALLET_USER_LIST_FAIL,
  GET_WALLET_SUCCESS,
  GET_WALLET_FAIL
} from './types'

export const get_wallet_list = () => async dispatch => {
  const config = {
    headers: {
      'Accept': 'application/json',
      'Authorization': `JWT ${localStorage.getItem('access')}`
    }
  }

  try {
    const res = await axios.get(
      'http://127.0.0.1:8000/api/wallet/wallets',
      config
    )

    if (res.status === 200) {
      dispatch({
        type: GET_WALLET_LIST_SUCCESS,
        payload: res.data
      })
    } else {
      dispatch({
        type: GET_WALLET_LIST_FAIL
      })
    }
  } catch (error) {
    dispatch({ type: GET_WALLET_LIST_FAIL })
  }
}

export const get_wallet_user_list = () => async dispatch => {
  const config = {
    headers: {
      'Accept': 'application/json',
      'Authorization': `JWT ${localStorage.getItem('access')}`
    }
  }

  try {
    const res = await axios.get(
      'http://127.0.0.1:8000/api/wallet/wallets/user',
      config
    )

    if (res.status === 200) {
      dispatch({
        type: GET_WALLET_USER_LIST_SUCCESS,
        payload: res.data
      })
    } else {
      dispatch({
        type: GET_WALLET_USER_LIST_FAIL
      })
    }
  } catch (error) {
    dispatch({ type: GET_WALLET_USER_LIST_FAIL })
  }
}

export const get_wallet_by_id = (id: number) => async dispatch => {
  const config = {
    headers: {
      'Accept': 'application/json',
      'Authorization': `JWT ${localStorage.getItem('access')}`
    }
  }

  try {
    const res = await axios.get(
      `http://127.0.0.1:8000/api/wallet/wallets/${id}`,
      config
    )

    if (res.status === 200) {
      dispatch({
        type: GET_WALLET_SUCCESS,
        payload: res.data
      })
    } else {
      dispatch({
        type: GET_WALLET_FAIL
      })
    }
  } catch (error) {
    dispatch({ type: GET_WALLET_FAIL })
  }
}

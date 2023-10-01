import { combineReducers } from 'redux';
import auth from './auth';
import categories from './categories.ts'
import wallet from './wallets.ts';
import saving from './savings.ts';
import spending from './spendings.ts';

export default combineReducers({
    auth,
    categories,
    wallet,
    saving,
    spending,
})
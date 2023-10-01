import { configureStore } from "@reduxjs/toolkit";
//import thunk from "redux-thunk";
import { useDispatch } from "react-redux";
import rootReducer from './reducers'

const initialState = {};

const store = configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
    //devTools: process.env.NODE_ENV !== "production"
});

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;

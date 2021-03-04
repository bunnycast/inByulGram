import React, { createContext, useContext } from 'react';
import useReducerWithEffect, {
    UpdateWithSideEffect,
} from "use-reducer-with-side-effects/src";
import { getStorageItem, setStorageItem } from "./utils/useLocalStorage";


const AppContext = createContext();

const reducer = (prevState, action) => {
    const { type } = action;

    if ( type === SET_TOKEN ) {
        const { payload: jwtToken } = action;
        const newState = {...prevState, jwtToken, isAuthenticated: true, };
        return UpdateWithSideEffect( newState, (store, dispatch) => {
            setStorageItem("jwtToken", jwtToken);
        });
    } else if ( type === DELETE_TOKEN ) {
        const newState = { ...prevState, jwtToken:"", isAuthenticated: false, } ;
        return UpdateWithSideEffect(newState, (store, dispatch) => {
            setStorageItem("jwtToken", "");
        });
    }

    return prevState;
};

export const AppProvider = ({ children }) => {
    const jwtToken = getStorageItem("jwtToken", "");
    const [store, dispatch] = useReducerWithEffect(reducer, {
        jwtToken,
        isAuthenticated: jwtToken.length > 0
    });
    return (
        <AppContext.Provider value={{ store, dispatch }}>
            { children }
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);

//Actions
const SET_TOKEN = "APP/SET_TOKEN";
const DELETE_TOKEN = "APP/DELETE_TOKEN";

//Action Creators
export const setToken = token => ({ type: SET_TOKEN, payload:token });
export const deleteToken = () => ({ type: DELETE_TOKEN });
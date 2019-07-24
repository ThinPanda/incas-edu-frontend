import React, { useReducer } from "react";

const initialState = {
    count: 0,
    isLogin: false,
    username: null,
    userType: null,
};
const GlobalContext = React.createContext({});

function countReducer(state, action) {
    switch (action.type) {
        case "reset":
            return { ...state, count: initialState.count };
        case "increment":
            return { ...state, count: state.count + 1 };
        case "decrement":
            return { ...state, count: state.count - 1 };
        default:
            return { ...state, count: initialState.count };
    }
}

function loginReducer(state, action) {
    switch (action.type) {
        case "LOGIN":
            return { ...state, isLogin: true };
        case "LOGOUT":
            return { ...state, isLogin: false };
        default:
            return { ...state, isLogin: initialState.isLogin };
    }
}

function usernameReducer(state, action) {
    return { ...state, username: action.type };
}

function userTypeReducer(state, action) {
    switch (action.type) {
        case "ORDINARY":
            return { ...state, userType: "ORDINARY" };
        case "AGENCY":
            return { ...state, userType: "AGENCY" };
        case "ADMIN":
            return { ...state, userType: "ADMIN" };
        default:
            return { ...state, userType: initialState.userType };
    }
}

function reducer(state, action) {
    switch (action.operation) {
        case "count":
            return countReducer(state, action);
        case "login":
            return loginReducer(state, action);
        case "username":
            return usernameReducer(state, action);
        case "userType":
            return userTypeReducer(state, action);
        default:
            throw new Error();
    }
}


const ContextProvider = props => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <GlobalContext.Provider value={{ state, dispatch }}>
            {props.children}
        </GlobalContext.Provider>
    );
};

export { GlobalContext, ContextProvider };
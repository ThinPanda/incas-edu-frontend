import React, { useContext } from "react";
import { GlobalContext } from "../hooks/GlobalContext";

function Counter() {
    const { state, dispatch } = useContext(GlobalContext);
    return (
        <div>
            Counter Count: {state.count}
            <button onClick={() => dispatch({ operation: "count", type: "reset" })}>Reset</button>
            <button onClick={() => dispatch({ operation: "count", type: "increment" })}>+</button>
            <button onClick={() => dispatch({ operation: "count", type: "decrement" })}>-</button>
            <br/>
            <button onClick={() => dispatch({ operation: "login", type: "LOGIN" })}>点击登录</button>
            <button onClick={() => dispatch({ operation: "username", type: "panda" })}>用户名</button>
        </div>
    );
}

export default Counter;
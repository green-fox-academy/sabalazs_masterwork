import React, { useReducer, createContext } from "react";
import "./App.css";
import Login from "./components/Login";
import Order from "./components/Order";
import PasswordReset from "./components/PasswordReset";
import PreviousOrders from "./components/PreviousOrders";
import { SignUp } from "./components/SignUp";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from './components/PrivateRoute';

export const AuthContext = createContext();

const initialState = {
  isAuthenticated: !!localStorage.getItem('user'),
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: JSON.parse(localStorage.getItem('token')) || null,
};
const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null
      };
    default:
      return state;
  }
};
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (

    <Router>
      <AuthContext.Provider
        value={{
          state,
          dispatch
        }}
      >
        <Switch>
          <PrivateRoute path="/order" component={Order} />
          <PrivateRoute path="/previous-orders" component={PreviousOrders} />
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={Login} />
          <Route path="/password-reset" component={PasswordReset} />
        </Switch>
      </AuthContext.Provider>
    </Router>

  );
}
export default App;
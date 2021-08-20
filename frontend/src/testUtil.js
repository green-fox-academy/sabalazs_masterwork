import React, { useReducer } from 'react';
import { reducer } from './reducer';
import AuthContext from './AuthContext';

export default function ContextWrapper({ children, isAuthenticated = true }) {
  const initialState = {
    isAuthenticated: isAuthenticated,
    user: null,
    token: null,
    cart: [],
    alert: null,
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}

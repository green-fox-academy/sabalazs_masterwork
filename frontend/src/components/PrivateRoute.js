/* eslint-disable react/jsx-props-no-spreading */

import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../AuthContext';
import AdminNavigation from './admin/AdminNavigation';
import Feedback from './Feedback';
import Navigation from './Navigation';

export default function PrivateRoute({ component: Component, ...rest }) {
  const { state } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) => (state.isAuthenticated
        ? (
          <>
            {
              state.user.role === 'admin'
                ? <AdminNavigation {...props} />
                : <Navigation {...props} />
            }
            {state.alert && <Feedback />}
            <Component {...props} />
          </>
        )
        : <Redirect to="/login" />)}
    />
  );
}

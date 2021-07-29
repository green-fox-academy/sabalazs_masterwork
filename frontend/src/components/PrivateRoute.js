import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from "../App";
import Feedback from './Feedback';
import Navigation from './Navigation';

export default function PrivateRoute({ component: Component, ...rest }) {

    const { state } = useContext(AuthContext);

    return (
        <Route
            {...rest}
            render={props => {
                return state.isAuthenticated
                    ? <>
                        <Navigation {...props} />
                        {state.alert && <Feedback />}
                        <Component {...props} />
                    </>
                    : <Redirect to="/login" />
            }}
        >
        </Route>
    )
}

import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from "../App";
import AdminNavigation from './AdminNavigation';
import Feedback from './Feedback';
import Navigation from './Navigation';

export default function Dashboard() {
    const { state } = useContext(AuthContext);
    const history = useHistory();
    if (state.user.role === 'admin') history.push('/admin/orders');
    else history.push('/order');
    return null;
}

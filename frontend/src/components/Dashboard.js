import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from "../App";

export default function Dashboard() {
    const { state } = useContext(AuthContext);
    const history = useHistory();
    useEffect(() => {
        if (state.user.role === 'admin') history.push('/admin/orders');
        else history.push('/order');
    }, []);
    return (<></>);
}

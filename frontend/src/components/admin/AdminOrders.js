import React, { useState, useEffect, useContext } from 'react';
import { Container, ListGroup, ListGroupItem } from "react-bootstrap";
import fetchBackend from '../../utils/fetchBackend';
import { AuthContext } from '../../App';
import AdminOrdersTable from './AdminOrdersTable';

export default function AdminOrders () {

    const [orders, setOrders] = useState([]);
    const { dispatch, state } = useContext(AuthContext);
    useEffect(() => {
        dispatch({
            type: 'CLEAR_FEEDBACK'
        });
        fetchBackend(
            'GET',
            `api/orders`,
            undefined,
            state.token
        ).then(async (response) => {
            const data = await response.json();
            if (!response.ok) {
                const error = (data && data.message) || response.status;
                throw new Error(error);
            }
            setOrders(data.orders);
            console.log(data.orders);
        }).catch(error => {
            console.log(error);
            return dispatch({
                type: 'SET_FEEDBACK',
                payload: {
                    variant: 'danger',
                    message: 'Hoppá, valami elromlott. :( '
                }
            });
        });
    }, []);

    return (
        <Container>
            <h1 className='text-center my-5'>Rendelések</h1>
            <AdminOrdersTable orders={orders} setOrders={setOrders}/>
        </Container>
    );
};
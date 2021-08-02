import React, { useState, useEffect, useContext } from 'react';
import { Container, ListGroup, ListGroupItem } from "react-bootstrap";
import fetchBackend from '../utils/fetchBackend';
import { AuthContext } from '../App';
import OrdersTable from './OrdersTable';

export const PreviousOrders = () => {

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
            <h1>Rendeléseim</h1>
            <OrdersTable orders={orders}/>
        </Container>
    );
};
export default PreviousOrders;
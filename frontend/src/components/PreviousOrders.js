import React, { useState, useEffect, useContext } from 'react';
import { Container, ListGroup, ListGroupItem } from "react-bootstrap";
import fetchBackend from '../utils/fetchBackend';
import { AuthContext } from '../App';

export const PreviousOrders = () => {

    const [orders, setOrders] = useState([]);
    const { dispatch } = useContext(AuthContext);
    useEffect(() => {
        fetchBackend(
            'GET',
            'api/orders'
        ).then(async (response) => {
            const data = await response.json();
            if (!response.ok) {
                const error = (data && data.message) || response.status;
                throw new Error(error);
            }
            setOrders(data.orders);
            console.log(data.products);
        }).catch(error => {
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
            <h1>Korábbi rendeléseim</h1>
        </Container>
    );
};
export default PreviousOrders;
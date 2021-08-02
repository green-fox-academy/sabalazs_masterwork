import React, { useState, useEffect, useContext } from 'react';
import { Container, ListGroup, ListGroupItem } from "react-bootstrap";
import fetchBackend from '../../utils/fetchBackend';
import { AuthContext } from '../../App';
import AdminProductsTable from './AdminProductsTable';

export default function AdminProducts () {

    const [products, setProducts] = useState([]);
    const { dispatch, state } = useContext(AuthContext);
    useEffect(() => {
        dispatch({
            type: 'CLEAR_FEEDBACK'
        });
        fetchBackend(
            'GET',
            `api/products`,
            undefined,
            state.token
        ).then(async (response) => {
            const data = await response.json();
            if (!response.ok) {
                const error = (data && data.message) || response.status;
                throw new Error(error);
            }
            setProducts(data.products);
            console.log(data.products);
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
            <h1>Termékek</h1>
            <AdminProductsTable products={products}/>
        </Container>
    );
};
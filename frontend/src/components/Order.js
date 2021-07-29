import React, { useState, useEffect, useContext } from 'react';
import { Container, ListGroup, ListGroupItem } from "react-bootstrap";
import fetchBackend from '../utils/fetchBackend';
import ProductList from "./ProductList";
import { AuthContext } from '../App';
import Cart from './Cart';

export const Order = () => {

    const [products, setProducts] = useState([]);
    const { dispatch, state } = useContext(AuthContext);
    console.log(state.cart);
    useEffect(() => {
        fetchBackend(
            'GET',
            'api/products'
        ).then(async (response) => {
            const data = await response.json();
            console.log(data);
            if (!response.ok) {
                const error = (data && data.message) || response.status;
                throw new Error(error);
            }
            setProducts(data.products);
        }).catch(error => {
            console.log(error);
            return dispatch({
                type: 'SET_ERROR',
                payload: {
                    variant: 'danger',
                    message: 'Hoppá, valami elromlott. :( '
                }
            });
        });
    }, []);

    return (
        <>
            <h1 className='text-center my-5'>Mit szeretnél enni?</h1>
            {state.cart?.length > 0 && <Cart cart={state.cart} />}
            <Container>
                <ProductList products={products} />
            </Container>
        </>
    );
};
export default Order;
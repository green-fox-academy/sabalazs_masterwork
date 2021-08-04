import React, { useContext, useState, useEffect } from 'react';
import { Container, ListGroup, ListGroupItem, Col, Button, Row } from "react-bootstrap";
import { v4 as uuidv4 } from 'uuid';
import { Trash } from 'react-bootstrap-icons';
import { AuthContext } from '../App';
import { Link } from 'react-router-dom';
import fetchBackend from '../utils/fetchBackend';

export const Cart = () => {

    const { dispatch, state } = useContext(AuthContext);
    const { cart } = state;
    const [sum, setSum] = useState(0);

    useEffect(() => {
        const newSum = cart.reduce((accumulator, item) => accumulator + (item.price * item.quantity), 0);
        setSum(newSum);
    }, [cart]);

    function handleDelete(index) {
        dispatch({
            type: 'REMOVE_FROM_CART',
            payload: { index }
        });
    }
    function handleSubmit() {
        try {
            console.log(cart, sum);
            fetchBackend(
                'POST',
                'api/orders',
                {
                    items: cart,
                    sum: sum
                }
            ).then(async (response) => {
                const data = await response.json();
                if (!response.ok) {
                    const error = (data && data.message) || response.status;
                    throw new Error(error);
                }
                console.log(data);
                dispatch({
                    type: 'EMPTY_CART'
                });
                dispatch({
                    type: 'SET_FEEDBACK',
                    payload: {
                        variant: 'success',
                        message: (<>Köszönjük a rendelést! Rendelésed státuszát követheted {<Link to="/previous-orders">itt</Link>}.</>)
                    }
                });
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
            
        } catch (err) {
            dispatch({
                type: 'SET_FEEDBACK',
                payload: {
                    variant: 'danger',
                    message: 'Hoppá, valami elromlott. :( '
                }
            });
        }
    }

    return (
        <Container>
            <Row>
                <Col xs={12} sm={8} md={6} xl={4} className="m-auto">
                    <ListGroup>
                        {
                            cart.map((orderItem, index) => (
                                <ListGroupItem variant="primary" className="d-flex justify-content-between align-items-center" key={uuidv4()}>
                                    <span>{orderItem.quantity} db {orderItem.name}</span>
                                    <Button onClick={() => handleDelete(index)} variant="">
                                        <Trash />
                                    </Button>
                                </ListGroupItem>
                            )
                            )
                        }
                    </ListGroup>
                    <Row>
                        <span className="text-center my-2">Összesen: {sum},- Ft</span>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col xs={12} sm={8} md={6} xl={4} className="m-auto">
                    <Button size="lg" variant="success" className="w-100 mt-2 mb-4" onClick={handleSubmit}>
                        Küldés
                    </Button>
                </Col>
            </Row>
        </Container>
    )
};
export default Cart;
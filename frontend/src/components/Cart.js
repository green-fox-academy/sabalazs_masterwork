import React, { useContext } from 'react';
import { Container, ListGroup, ListGroupItem, Col, Button } from "react-bootstrap";
import { v4 as uuidv4 } from 'uuid';
import { Trash } from 'react-bootstrap-icons';
import { AuthContext } from '../App';

export const Cart = ({ cart }) => {

    const { dispatch } = useContext(AuthContext);

    function handleDelete(index) {
        dispatch({
            type: 'REMOVE_FROM_CART',
            payload: { index }
        });
    }

    return (
        <Container>
            <Col xs={12} sm={8} md={6} xl={4} className="m-auto">
                <ListGroup>
                    {
                        cart.map((orderItem, index) => (
                            <ListGroupItem variant="info" className="d-flex justify-content-between align-items-center" key={uuidv4()}>
                                <span>{orderItem.quantity} db {orderItem.name}</span>
                                <Button onClick={() => handleDelete(index)}>
                                    <Trash />
                                </Button>
                            </ListGroupItem>
                        )
                        )
                    }
                </ListGroup>
            </Col>
        </Container>
    )
};
export default Cart;
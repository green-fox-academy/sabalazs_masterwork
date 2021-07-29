import React from 'react';
import { Container, ListGroup, ListGroupItem } from "react-bootstrap";
import { v4 as uuidv4 } from 'uuid';

export const Cart = ({ cart }) => {
    return (
        <Container>
            <ListGroup>
                {
                    cart.map((orderItem) => (
                        <ListGroupItem key={uuidv4()}>
                            {orderItem.quantity} db {orderItem.name}
                        </ListGroupItem>
                        )
                    )
                }
            </ListGroup>
        </Container>
    )
};
export default Cart;
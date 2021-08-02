import React, { useState, useContext } from 'react';
import { Card, Row, Container, Button, InputGroup, FormControl } from 'react-bootstrap';
import { AuthContext } from '../App';
import { CartPlus } from 'react-bootstrap-icons';

export default function ProductCard({ product }) {

    const [quantity, setQuantity] = useState(1);

    const { dispatch } = useContext(AuthContext);

    function handleQuantityChange(e) {
        setQuantity(parseInt(e.currentTarget.value));
    }
    function handleAddCart(e) {
        dispatch({
            type: 'ADD_TO_CART',
            payload: {
                product: product._id,
                quantity: quantity,
                name: product.name,
                price: product.price
            }
        });
        setQuantity(1);
    }

    return (
        <>
            <Card
                className="p-1"
            >
                <Card.Header>
                    {product.name}
                </Card.Header>
                <Card.Body>
                    <Card.Title className="text-end">
                        {product.price},- Ft
                    </Card.Title>
                    <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
                    <Container className="mt-auto justify-content-end p-0">
                        <InputGroup className="mb-3">
                            <FormControl
                                aria-label="Mennyiség"
                                type="number"
                                value={quantity}
                                onChange={handleQuantityChange}
                                min={1}
                                max={10}
                            />
                            <Button
                                variant="primary"
                                className="w-50"
                                onClick={handleAddCart}
                            >
                                <CartPlus className="d-xs-block d-md-none" />
                                <span className="d-none d-md-block">Kosárba</span>
                            </Button>
                        </InputGroup>
                    </Container>
                </Card.Body>
            </Card>
        </>
    )
}

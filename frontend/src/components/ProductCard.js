import React, { useState, useContext } from 'react';
import { Card, Row, Container, Button, InputGroup, FormControl } from 'react-bootstrap';
import { AuthContext } from '../App';

export default function ProductCard({ product }) {

    const [quantity, setQuantity] = useState(1);

    const { dispatch } = useContext(AuthContext);

    function handleQuantityChange(e) {
        setQuantity(e.currentTarget.value);
    }
    function handleAddCart(e) {
        dispatch({
            type: 'ADD_TO_CART',
            payload: {
                product: product._id,
                quantity: quantity,
                name: product.name
            }
        });
        setQuantity(1);
    }

    return (
        <>
            <Card
                className="p-1"
            >
                <Container className="d-flex flex-column" style={{ "minHeight": '16rem' }}>
                    <Row>
                        <h6 className="p-2 w-100 text-center">
                            {product.name}
                        </h6>
                    </Row>
                    <Row className="my-auto">
                        <img
                            src={"holder.js/100px180"}
                            style={{ "objectFit": "contain", "width": "100%", "maxHeight": "9rem", "maxWidth": "10rem" }}
                            className="m-auto"
                        />
                    </Row>
                    <Row className="mt-auto justify-content-end">
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
                                Kosárba
                            </Button>
                        </InputGroup>
                    </Row>
                </Container>
            </Card>
        </>
    )
}

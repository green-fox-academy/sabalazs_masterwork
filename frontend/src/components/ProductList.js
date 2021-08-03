import React, { useState, useContext } from 'react';
import { Card, Col, Form, Row, Container } from 'react-bootstrap';
import ProductCard from './ProductCard';
import { AuthContext } from '../App';

export default function ProductList({ products }) {

    const { dispatch, state } = useContext(AuthContext);
    const { cart } = state;

    const [searchTerm, setSearchTerm] = useState('');
    function handleSearchChange(event) {
        setSearchTerm(event.currentTarget.value);
    }
    return (
        <Container>
            <Row>
                <Col xs={12} sm={8} md={6} xl={4} className="m-auto">
                    <Form.Control
                        type="text"
                        placeholder="Keresés..."
                        onChange={handleSearchChange}
                        className="my-1"
                    />
                </Col>
            </Row>
            <Row className="mt-3 no-gutters">

                {products
                    .filter(product => product.isAvailable)
                    .filter(product => !state.cart.filter(item => item.product === product._id).length)
                    .map((product) => {
                        if ((searchTerm.length < 1) || product.name.toLowerCase().includes(searchTerm.toLowerCase()))
                            return (
                                <Col xs={12} sm={6} md={4} lg={3} className="my-2 px-1" key={product.name}>
                                    <ProductCard product={product} />
                                </Col>
                            );
                    })}
            </Row>
        </Container>
    )
}

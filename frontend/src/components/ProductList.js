import React, { useState } from 'react';
import { Card, Col, Form, Row } from 'react-bootstrap';
import ProductCard from './ProductCard';

export default function ProductList({ products }) {

    const [searchTerm, setSearchTerm] = useState('');
    function handleSearchChange(event) {
        setSearchTerm(event.currentTarget.value);
    }
    return (
        <>
            <Row>
                <Col xs={12} sm={8} md={6} xl={4} className="m-auto">
                    <Form.Control
                        type="text"
                        placeholder="Keresés..."
                        onChange={handleSearchChange}
                        className="my-3"
                    />
                </Col>
            </Row>
            <Row className="mt-3 no-gutters">

                {products.map((product) => {

                    if ((searchTerm.length < 1) || product.name.toLowerCase().includes(searchTerm.toLowerCase()))
                        return (
                            <Col xs={6} md={4} lg={3} className="my-2 px-1" key={product.name}>
                                <ProductCard product={product} />
                            </Col>
                        );
                })}
            </Row>
        </>
    )
}

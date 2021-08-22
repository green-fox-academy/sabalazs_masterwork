import React, { useState, useContext } from 'react';
import {
  Card, Container, Button, InputGroup, FormControl, Badge,
} from 'react-bootstrap';
import { CartPlus } from 'react-bootstrap-icons';
import AuthContext from '../../AuthContext';
import placeholder from '../../placeholder-image.jpg';

export default function ProductCard({ product }) {
  const [quantity, setQuantity] = useState(1);

  const { dispatch } = useContext(AuthContext);

  function handleQuantityChange(e) {
    setQuantity(parseInt(e.currentTarget.value, 10));
  }
  function handleAddCart() {
    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        product: product._id,
        quantity,
        name: product.name,
        price: product.price,
      },
    });
    setQuantity(1);
  }

  return (
    <>
      <Card className="shadow mb-5 rounded" data-testid="product-card">
        <Card.Header>
          {product.name}
          {product.labels.map((label) => <Badge key={label} pill bg="info" className="mx-1">{label}</Badge>)}
        </Card.Header>
        <Card.Body>
          <Card.Title className="text-end">
            {product.price}
            ,- Ft
          </Card.Title>
          <Card.Img className="rounded-1 border-1 border-dark" variant="top" src={product.image?.url || placeholder} />
          <Container className="mt-auto justify-content-end p-0">
            <InputGroup className="my-4">
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
  );
}

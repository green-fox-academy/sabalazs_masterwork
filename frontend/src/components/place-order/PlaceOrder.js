import React, { useState, useEffect, useContext } from 'react';
import { Container } from 'react-bootstrap';
import fetchBackend from '../../utils/fetchBackend';
import ProductList from './ProductList';
import AuthContext from '../../AuthContext';
import Cart from './Cart';

export default function PlaceOrder() {
  const [products, setProducts] = useState([]);
  const { dispatch, state } = useContext(AuthContext);
  useEffect(() => {
    dispatch({
      type: 'CLEAR_FEEDBACK',
    });
    fetchBackend(
      'GET',
      'api/products',
    ).then(async (response) => {
      const data = await response.json();
      if (!response.ok) {
        const error = (data && data.message) || response.status;
        throw new Error(error);
      }
      setProducts(data.products);
    }).catch(() => dispatch({
      type: 'SET_FEEDBACK',
      payload: {
        variant: 'danger',
        message: 'Hoppá, valami elromlott. :( ',
      },
    }));
  }, []);

  return (
    <>
      <h1 className="text-center my-5">Mit süssünk neked?</h1>
      {state.cart?.length > 0 && <Cart />}
      <Container>
        <ProductList products={products} />
      </Container>
    </>
  );
}

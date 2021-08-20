import React from 'react';
import { useParams } from 'react-router-dom';
import ProductForm from './ProductForm';

export default function AdminEditProduct() {
  const { productId } = useParams();
  return (
    <>
      <h1 className="text-center my-5">Termék szerkesztése</h1>
      <ProductForm productId={productId} />
    </>
  );
}

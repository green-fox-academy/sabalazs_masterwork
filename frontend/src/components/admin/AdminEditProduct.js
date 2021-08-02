import React from 'react';
import ProductForm from './ProductForm';
import { useParams } from 'react-router-dom';

export default function AdminEditProduct() {    
  const { productId } = useParams();
    return (
        <>
            <h1 className='text-center my-5'>Termék szerkesztése</h1>
            <ProductForm productId={productId}/>
        </>
    );
};
import React, { useState, useContext } from 'react';
import { Table, Container, Button } from 'react-bootstrap';
import { AuthContext } from '../../App';
import { Trash, Pencil } from 'react-bootstrap-icons';
import { useHistory } from 'react-router-dom';

export default function AdminProductsTable({ products }) {

    const { dispatch, state } = useContext(AuthContext);
    const history = useHistory();

    function handleDelete(productId) {
        console.log('delete', productId)
    }
    function handleEdit(productId) {
        history.push(`/admin/edit-product/${productId}`);
    }

    return (
        <Container>
            <Table striped bordered hover responsive='xs'>
                <thead>
                    <tr>
                        <th>Név</th>
                        <th>Ár</th>
                        <th>Lehetőségek</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map((product) => (
                            <tr key={product._id}>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td className='d-flex justify-content-around'>
                                    <Button
                                        variant='primary'
                                        onClick={() => handleEdit(product._id)}
                                    ><Pencil />
                                    </Button>
                                    <Button
                                        variant='danger'
                                        onClick={() => handleDelete(product._id)}
                                    >
                                        <Trash />
                                    </Button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </Container>
    )
}
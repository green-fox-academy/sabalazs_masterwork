import React, { useState, useContext } from 'react';
import { Table, Container, Button } from 'react-bootstrap';
import { AuthContext } from '../../App';
import { Trash, Pencil } from 'react-bootstrap-icons';

export default function AdminProductsTable({ products }) {

    const { dispatch, state } = useContext(AuthContext);

    function getBgColor(status) {
        switch (status) {
            case 'pending': return 'bg-warning';
            case 'accepted': return 'bg-success';
            case 'fulfilled': return 'bg-light';
            case 'refused': return 'bg-danger';
        }
    }
    function getOrderStatus(status) {
        switch (status) {
            case 'pending': return 'Feldolgozás alatt';
            case 'accepted': return 'Átvehető';
            case 'fulfilled': return 'Átvéve';
            case 'refused': return 'Visszautasítva';
        }
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
                            <tr key={product.id}>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>
                                    <Button variant='primary'><Pencil /></Button>
                                    <Button variant='danger'><Trash /></Button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </Container>
    )
}
import React, { useState, useContext } from 'react';
import { Table, Container } from 'react-bootstrap';
import ProductCard from './ProductCard';
import { AuthContext } from '../App';

export default function AdminOrdersTable({ orders }) {

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
                        <th>Dátum</th>
                        <th>Vásárló</th>
                        <th>Összeg</th>
                        <th>Státusz</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orders.map((order) => (
                            <tr key={order.id}>
                                <td>{new Date(order.datePosted).toLocaleDateString()}</td>
                                <td>{order.customer.email}</td>
                                <td>{order.sum},- Ft</td>
                                <td className={getBgColor(order.status)}>{getOrderStatus(order.status)}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </Container>
    )
}

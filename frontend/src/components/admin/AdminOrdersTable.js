import React, { useState, useContext } from 'react';
import { Table, Container, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { AuthContext } from '../../App';
import { BagCheckFill, HourglassSplit, CheckCircleFill, XCircleFill } from 'react-bootstrap-icons';
import fetchBackend from '../../utils/fetchBackend';


export default function AdminOrdersTable({ orders, setOrders }) {

    const { dispatch, state } = useContext(AuthContext);

    function getBgColor(status) {
        switch (status) {
            case 'pending': return 'bg-warning';
            case 'accepted': return 'bg-success';
            case 'fulfilled': return 'bg-light';
            case 'refused': return 'bg-danger';
        }
    }
    function getIcon(status) {
        switch (status) {
            case 'pending': return <HourglassSplit />;
            case 'accepted': return <BagCheckFill />;
            case 'fulfilled': return <CheckCircleFill />;
            case 'refused': return <XCircleFill />;
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

    function handleChange(e, orderId, index) {
        const newStatus = e.currentTarget.value;
        fetchBackend(
            'PUT',
            `api/orders/${orderId}`,
            {
                status: newStatus
            },
            state.token
        ).then(async (response) => {
            const data = await response.json();
            if (!response.ok) {
                const error = (data && data.message) || response.status;
                throw new Error(error);
            }
            console.log(data);
            let ordersCopy = [...orders];
            let itemCopy = { ...orders[index] };
            itemCopy.status = newStatus;
            ordersCopy[index] = itemCopy;
            setOrders([...ordersCopy]);
        }).catch(error => {
            return dispatch({
                type: 'SET_FEEDBACK',
                payload: {
                    variant: 'danger',
                    message: 'Hoppá, valami elromlott. :( '
                }
            });
        });
    }

    return (
        <Container>
            <Table striped bordered hover responsive='xs'>
                <thead>
                    <tr>
                        <th>Vásárló</th>
                        <th>Dátum</th>
                        <th>Összeg</th>
                        <th>Státusz</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orders.map((order, index) => (
                            <tr key={order._id}>
                                <th>{order.customer.email}</th>
                                <td>{new Date(order.datePosted).toLocaleDateString()}</td>
                                <td>{order.sum},- Ft</td>
                                <td className='text-center'>
                                    <select
                                        className={`p-1 text-center ${getBgColor(order.status)}`}
                                        value={order.status}
                                        onChange={(e) => handleChange(e, order._id, index)}>
                                        <option value='pending'>Feldolgozás alatt</option>
                                        <option value='accepted'>Átvehető</option>
                                        <option value='fulfilled'>Átvéve</option>
                                        <option value='refused'>Visszautasítva</option>
                                    </select>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </Container>
    )
}

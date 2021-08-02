import React, { useState, useContext } from 'react';
import { Table, Container, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { AuthContext } from '../../App';
import { BagCheckFill, HourglassSplit, CheckCircleFill, XCircleFill } from 'react-bootstrap-icons';

export default function AdminOrdersTable({ orders }) {

    const { dispatch, state } = useContext(AuthContext);

    const renderTooltip = (status) => (
        <Tooltip id="button-tooltip">
         {getOrderStatus(status)}
        </Tooltip>
      );

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

    return (
        <Container>
            <Table striped bordered hover responsive='xs'>
                <thead>
                    <tr>
                        <th>Státusz</th>
                        <th>Dátum</th>
                        <th>Vásárló</th>
                        <th>Összeg</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orders.map((order) => (
                            <tr key={order.id}>
                                <td className={getBgColor(order.status)}>
                                    <OverlayTrigger
                                        placement="right"
                                        delay={{ show: 250, hide: 400 }}
                                        overlay={renderTooltip(order.status)}
                                    >
                                        {getIcon(order.status)}
                                    </OverlayTrigger>
                                </td>
                                <td>{new Date(order.datePosted).toLocaleDateString()}</td>
                                <td>{order.customer.email}</td>
                                <td>{order.sum},- Ft</td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </Container>
    )
}

import React, { useState, useContext } from 'react';
import { Table, Container, OverlayTrigger, Tooltip, Row, Col } from 'react-bootstrap';
import { AuthContext } from '../App';
import { BagCheckFill, HourglassSplit, CheckCircleFill, XCircleFill } from 'react-bootstrap-icons';
import OrderCard from './OrderCard';
import { v4 as uuidv4 } from 'uuid';

export default function OrdersTable({ orders }) {

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
            <Row className="mt-3 justify-content-center">
                {orders
                .filter((order) => order.status === 'accepted' || order.status === 'pending')
                .map((order) => {
                    return (
                        <Col xs={12} sm={6} md={4} lg={3} className="my-2 px-1" key={uuidv4()}>
                            <OrderCard order={order} />
                        </Col>
                    );
                })}
            </Row>
            <h2 className='mt-5 text-center'>Lezárt rendelések</h2>
            <Row className="mt-3 justify-content-center">
                {orders
                .filter((order) => order.status === 'fulfilled' || order.status === 'refused')
                .map((order) => {
                    return (
                        <Col xs={12} sm={6} md={4} lg={3} className="my-2 px-1" key={uuidv4()}>
                            <OrderCard order={order} />
                        </Col>
                    );
                })}
            </Row>
        </Container>
    )
}

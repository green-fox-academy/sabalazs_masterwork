import React, { useState, useContext } from 'react';
import { AuthContext } from '../App';
import { Card, Row, Col, Container, Table, OverlayTrigger, Tooltip, ListGroup, ListGroupItem } from 'react-bootstrap';
import { BagCheckFill, HourglassSplit, CheckCircleFill, XCircleFill } from 'react-bootstrap-icons';
import { v4 as uuidv4 } from 'uuid';

export default function OrderCard({ order }) {

    function getBgColor(status) {
        switch (status) {
            case 'pending': return 'warning';
            case 'accepted': return 'success';
            case 'fulfilled': return 'light';
            case 'refused': return 'danger';
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
    function getOrderStatusLabel(status) {
        switch (status) {
            case 'pending': return 'Feldolgozás alatt';
            case 'accepted': return 'Átvehető';
            case 'fulfilled': return 'Átvéve';
            case 'refused': return 'Visszautasítva';
        }
    }

    return (
        <>
            <Card
                className="text-center"
                bg={getBgColor(order.status)}
                text={getBgColor(order.status) === 'light' ? 'dark' : 'white'}
            >
                <Card.Header>
                    <p>{new Date(order.datePosted).toLocaleDateString()}</p>
                    {getOrderStatusLabel(order.status)}
                </Card.Header>
                <Card.Body>
                    <Card.Title>
                        {order.sum},- Ft
                    </Card.Title>                    
                    <ListGroup>
                            {
                                order.items.map((orderItem, index) => (
                                    <ListGroupItem className="d-flex justify-content-between align-items-center" key={uuidv4()}>
                                        <span>{orderItem.quantity} db {orderItem.product.name}</span>
                                    </ListGroupItem>
                                )
                                )
                            }
                        </ListGroup>
                </Card.Body>
            </Card>
        </>
    )
}

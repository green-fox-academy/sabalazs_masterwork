import React from 'react';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';

export default function OrderCard({ order }) {

    function getBgColor(status) {
        switch (status) {
            case 'pending': return 'warning';
            case 'accepted': return 'success';
            case 'fulfilled': return 'light';
            case 'refused': return 'danger';
            default: return '';
        }
    }
    function getOrderStatusLabel(status) {
        switch (status) {
            case 'pending': return 'Feldolgozás alatt';
            case 'accepted': return 'Átvehető';
            case 'fulfilled': return 'Átvéve';
            case 'refused': return 'Elutasítva';
            default: return '';
        }
    }

    return (
        <>
            <Card
                className="text-center shadow"
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
                                        <span>{orderItem.quantity} db {orderItem.name}</span>
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

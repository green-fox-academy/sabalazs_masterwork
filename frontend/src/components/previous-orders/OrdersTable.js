import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import OrderCard from './OrderCard';

export default function OrdersTable({ orders }) {
  return (
    <Container>
      <Row className="mt-3 justify-content-center">
        {orders
          .filter((order) => order.status === 'accepted' || order.status === 'pending')
          .map((order) => (
            <Col xs={12} sm={6} md={4} lg={3} className="my-2 px-1" key={uuidv4()}>
              <OrderCard order={order} />
            </Col>
          ))}
      </Row>
      <h2 className="mt-5 text-center">Lezárt rendelések</h2>
      <Row className="mt-3 justify-content-center">
        {orders
          .filter((order) => order.status === 'fulfilled' || order.status === 'refused')
          .map((order) => (
            <Col xs={12} sm={6} md={4} lg={3} className="my-2 px-1" key={uuidv4()}>
              <OrderCard order={order} />
            </Col>
          ))}
      </Row>
    </Container>
  );
}

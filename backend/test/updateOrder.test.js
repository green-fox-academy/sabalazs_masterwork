import request from 'supertest';
import mongoose from 'mongoose';
import app from '../src/app';
import connectDB from '../src/db';
import Order from '../src/models/Order';
import User from '../src/models/User';
import Product from '../src/models/Product';

let userId; let productId; let
  orderId;
beforeEach(async () => {
  connectDB();
  userId = await User.create({
    email: 'firstuser@email.xyz',
    password: 'Password123',
  });
  productId = await Product.create({
    name: 'Vajas croissant',
    price: 800,
  });
  const order = await Order.create({
    customer: userId,
    items: [
      {
        product: productId,
        quantity: 1,
      },
    ],
    sum: 800,
  });
  orderId = order._id;
});

afterEach(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
});

describe('PUT /api/orders/:orderId - ', () => {
  test('with valid data, it updates order status', async () => {
    await request(app)
      .put(`/api/orders/${orderId}`)
      .send({
        status: 'fulfilled',
      })
      .expect(200)
      .then((response) => {
        const updatedOrder = response.body;
        expect(updatedOrder.status).toEqual('fulfilled');
      });
  });
  test('with invalid orderid, it returns a corresponding error', async () => {
    await request(app)
      .put('/api/orders/60f3ff92c1e3603cacd42014')
      .send({
        status: 'fulfilled',
      })
      .expect(400)
      .then((response) => {
        expect(response.body.message).toEqual('Validation error: Invalid order ID.');
      });
  });
  test('with invalid order status, it returns a corresponding error', async () => {
    await request(app)
      .put(`/api/orders/${orderId}`)
      .send({
        status: 'invalid status',
      })
      .expect(400)
      .then((response) => {
        expect(response.body.message).toEqual('Validation error: Invalid order status.');
      });
  });
});

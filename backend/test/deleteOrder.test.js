import request from 'supertest';
import mongoose from 'mongoose';
import app from '../src/app';
import connectDB from '../src/db';
import Order from '../src/models/Order';
import User from '../src/models/User';
import Product from '../src/models/Product';

let userId;
let productId;
let order;
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
  order = await Order.create({
    customer: userId,
    items: [
      {
        product: productId,
        quantity: 1,
      },
    ],
    sum: 800,
  });
});

afterEach(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
});

describe('DELETE /api/orders/:orderId - ', () => {
  test('given valid order ID, it deletes the order', async () => {
    await request(app)
      .delete(`/api/orders/${order._id}`)
      .expect(200)
      .then(async (response) => {
        const updatedOrder = response.body;
        expect(updatedOrder.status).toEqual(order.status);
        expect(await Order.findById(order._id)).toBeFalsy();
      });
  });
});

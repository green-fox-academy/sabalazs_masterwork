import request from 'supertest';
import mongoose from 'mongoose';
import app from '../src/app';
import connectDB from '../src/db';
import Order from '../src/models/Order';
import User from '../src/models/User';
import Product from '../src/models/Product';

const user1 = {
  email: 'firstuser@email.xyz',
  password: 'Password123',
};
const user2 = {
  email: 'seconduser@email.xyz',
  password: 'Password123',
};
const product = {
  name: 'Vajas croissant',
  price: 800,
};
const numberOfTestItems = 10;
let token;

beforeEach(async () => {
  connectDB();
  const user1Id = await User.create(user1);
  const user2Id = await User.create(user2);
  const productId = await Product.create(product);
  const results = [];
  for (let i = 1; i <= numberOfTestItems; i += 1) {
    results.push(Order.create({
      customer: i % 2 ? user1Id : user2Id,
      items: [
        {
          product: productId,
          quantity: i,
          name: product.name,
          price: product.price,
        },
      ],
      sum: (i) * product.price,
    }));
  }
  await Promise.all(results);
  const admin = {
    email: 'xyz@xyz.xyz',
    password: 'Password123456789',
    role: 'admin',
  };
  await User.create(admin);
  token = await request(app)
    .post('/api/auth')
    .send(admin)
    .then(async (response) => response.body.token);
});

afterEach(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
});

describe('GET /api/orders - Gets', () => {
  test('first page of orders with default order and pagination', async () => {
    await request(app)
      .get('/api/orders')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .then((response) => {
        const data = response.body;
        expect(data.numberOfPages).toEqual(numberOfTestItems / 10);
        expect(data.orders.length).toEqual(10);
        expect(data.orders[0].customer.email).toEqual(user1.email);
        expect(data.orders[1].customer.email).toEqual(user2.email);
      });
  });
});

import request from 'supertest';
import mongoose from 'mongoose';
import app from '../src/app';
import connectDB from '../src/db';
import Product from '../src/models/Product';
import User from '../src/models/User';

let token;
let productId;
beforeEach(async () => {
  connectDB();
  const product = await Product.create({
    name: 'Vajas croissant',
    price: 800,
  });
  productId = product.id;
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

describe('PUT /api/products/:productId - ', () => {
  test('with valid data, it updates product price', async () => {
    await request(app)
      .put(`/api/products/${productId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        price: 1500,
      })
      .expect(200)
      .then((response) => {
        const updatedProduct = response.body;
        expect(updatedProduct.price).toEqual(1500);
      });
  });
});

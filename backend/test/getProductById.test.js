import request from 'supertest';
import mongoose from 'mongoose';
import app from '../src/app';
import connectDB from '../src/db';
import Product from '../src/models/Product';
import User from '../src/models/User';

let token;
let product1Response;
let product2Response;
beforeEach(async () => {
  connectDB();
  product1Response = await Product.create({
    name: 'Vajas croissant 1',
    price: 1000,
  });
  product2Response = await Product.create({
    name: 'Vajas croissant 2',
    price: 200,
  });

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

describe('GET /api/products/{id}', () => {
  test('returns corresponding product', async () => {
    await request(app)
      .get(`/api/products/${product1Response.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .then((response) => {
        const data = response.body;
        expect(data.name).toEqual('Vajas croissant 1');
        expect(data.price).toEqual(1000);
      });
    await request(app)
      .get(`/api/products/${product2Response.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .then((response) => {
        const data = response.body;
        expect(data.name).toEqual('Vajas croissant 2');
        expect(data.price).toEqual(200);
      });
  });
});

import request from 'supertest';
import mongoose from 'mongoose';
import app from '../src/app';
import Product from '../src/models/Product';
import User from '../src/models/User';
import connectDB from '../src/db';

let token;
beforeEach(async () => {
  connectDB();
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
const data = {
  name: 'Vajas croissant',
  price: 800,
};

describe('POST /api/products - Create product with', () => {
  test('valid data should respond with 201, and id', async () => {
    await request(app)
      .post('/api/products')
      .set('Authorization', `Bearer ${token}`)
      .send(data)
      .expect(201)
      .then((response) => {
        expect(response.body.id).toBeTruthy();
      });
  });
  test('valid data should create a document in db', async () => {
    await request(app)
      .post('/api/products')
      .set('Authorization', `Bearer ${token}`)
      .send(data);
    await Product.findOne({ name: data.name })
      .then((result) => {
        expect(result).toBeTruthy();
      });
  });
  test('missing name should respond with 400, and corresponding error message', async () => {
    const invalidData = {
      price: 800,
    };
    await request(app)
      .post('/api/products')
      .set('Authorization', `Bearer ${token}`)
      .send(invalidData)
      .expect(400)
      .then((response) => {
        expect(response.body.message).toBe('Validation error: Missing name field.');
      });
  });
  test('missing price should respond with 400, and corresponding error message, without creating the document', async () => {
    const invalidData = {
      name: 'Vajas croissant',
    };
    await request(app)
      .post('/api/products')
      .set('Authorization', `Bearer ${token}`)
      .send(invalidData)
      .expect(400)
      .then((response) => {
        expect(response.body.message).toBe('Validation error: Missing or invalid price field.');
      });
    await Product.findOne({ name: data.name })
      .then((result) => {
        expect(result).toBeFalsy();
      });
  });
  test('a product name that already exists, it should respond with 400, and corresponding error message', async () => {
    await request(app)
      .post('/api/products')
      .set('Authorization', `Bearer ${token}`)
      .send(data);

    await request(app)
      .post('/api/products')
      .set('Authorization', `Bearer ${token}`)
      .send(data)
      .expect(409)
      .then((response) => {
        expect(response.body.message).toBe('Validation error: A product with the same name already exists.');
      });
  });
});

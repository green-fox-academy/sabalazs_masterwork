import request from 'supertest';
import mongoose from 'mongoose';
import app from '../src/app';
import User from '../src/models/User';
import connectDB from '../src/db';
import ProductLabel from '../src/models/ProductLabel';

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
  name: 'laktózmentes',
};

describe('POST /api/labels - Create label with', () => {
  test('valid data should create label', async () => {
    await request(app)
      .post('/api/labels')
      .set('Authorization', `Bearer ${token}`)
      .send(data)
      .expect(201)
      .then((response) => {
        expect(response.body.id).toBeTruthy();
      });
    await ProductLabel.findOne({ name: data.name })
      .then((result) => {
        expect(result).toBeTruthy();
      });
  });
  test('missing name should respond with 400, and corresponding error message', async () => {
    const invalidData = {
      name: '',
    };
    await request(app)
      .post('/api/labels')
      .set('Authorization', `Bearer ${token}`)
      .send(invalidData)
      .expect(400)
      .then((response) => {
        expect(response.body.message).toBe('Validation error: Missing label name.');
      });
  });
});

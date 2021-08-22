import request from 'supertest';
import mongoose from 'mongoose';
import app from '../src/app';
import connectDB from '../src/db';
import User from '../src/models/User';
import ProductLabel from '../src/models/ProductLabel';

let token;

beforeEach(async () => {
  await connectDB();
  const label1 = {
    name: 'laktózmentes',
  };
  const label2 = {
    name: 'akciós',
  };
  await ProductLabel.create(label1);
  await ProductLabel.create(label2);
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

describe('GET /api/labels - Gets', () => {
  test('labels', async () => {
    await request(app)
      .get('/api/labels')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .then((response) => {
        const data = response.body;
        expect(data.length).toEqual(2);
        expect(data[0].name).toEqual('laktózmentes');
        expect(data[1].name).toEqual('akciós');
      });
  });
});

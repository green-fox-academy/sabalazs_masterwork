import request from 'supertest';
import mongoose from 'mongoose';
import app from '../src/app';
import connectDB from '../src/db';
import User from '../src/models/User';

const user1 = {
  email: 'firstuser@email.xyz',
  password: 'Password123',
};
const user2 = {
  email: 'seconduser@email.xyz',
  password: 'Password123',
};
let user1Response;
let user2Response;
let token;

beforeEach(async () => {
  connectDB();
  user1Response = await User.create(user1);
  user2Response = await User.create(user2);
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

describe('GET /api/users/{id} -', () => {
  test('Returns corresponding user', async () => {
    await request(app)
      .get(`/api/users/${user1Response.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .then((response) => {
        const data = response.body;
        expect(data._id).toEqual(user1Response.id);
        expect(data.email).toEqual(user1.email);
        expect(data.role).toEqual('customer');
      });
    await request(app)
      .get(`/api/users/${user2Response.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .then((response) => {
        const data = response.body;
        expect(data._id).toEqual(user2Response.id);
        expect(data.email).toEqual(user2.email);
        expect(data.role).toEqual('customer');
      });
  });
});

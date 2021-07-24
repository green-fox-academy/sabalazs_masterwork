import request from 'supertest';
import mongoose from 'mongoose';
import app from '../src/app';
import connectDB from '../src/db';
import User from '../src/models/User';

let token;
let userId;
beforeEach(async () => {
  connectDB();
  const user = await User.create({
    email: 'firstuser@email.xyz',
    password: 'Password123'
  });
  userId = user.id;
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

describe('PUT /api/users/:userId - ', () => {
  test('with valid data, it updates user role', async () => {
    await request(app)
      .put(`/api/users/${userId}`)
      .send({
        role: 'admin',
      })
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .then((response) => {
        const updatedUser = response.body;
        expect(updatedUser.role).toEqual('admin');
      });
  });
});

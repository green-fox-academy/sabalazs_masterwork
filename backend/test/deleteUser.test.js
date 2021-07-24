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
    password: 'Password123',
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

describe('DELETE /api/users/:userId - ', () => {
  test('given valid user ID, it deletes the user', async () => {
    await request(app)
      .delete(`/api/users/${userId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .then(async () => {
        expect(await User.findById(userId)).toBeFalsy();
      });
  });
});

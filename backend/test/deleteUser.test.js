import request from 'supertest';
import mongoose from 'mongoose';
import app from '../src/app';
import connectDB from '../src/db';
import User from '../src/models/User';

let userId;
beforeEach(async () => {
  connectDB();
  const user = await User.create({
    email: 'firstuser@email.xyz',
    password: 'Password123',
  });
  userId = user.id;
});

afterEach(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
});

describe('DELETE /api/users/:userId - ', () => {
  test('given valid user ID, it deletes the user', async () => {
    await request(app)
      .delete(`/api/users/${userId}`)
      .expect(200)
      .then(async (response) => {
        expect(await User.findById(userId)).toBeFalsy();
      });
  });
});

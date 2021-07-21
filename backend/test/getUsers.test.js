import request from 'supertest';
import mongoose from 'mongoose';
import app from '../src/app';
import connectDB from '../src/db';
import User from '../src/models/User';


beforeEach(async () => {
  connectDB();
  await User.create({
    email: 'Afirstuser@email.xyz',
    password: 'Password123',
  });
  await User.create({
    email: 'Bseconduser@email.xyz',
    password: 'Password123',
  });
  await User.create({
    email: 'Cthirduser@email.xyz',
    password: 'Password123',
    role: 'admin',
  });
});

afterEach(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
});

describe('GET /api/users - Gets', () => {
  test('list of users with default order and pagination', async () => {
    await request(app)
      .get('/api/users')
      .expect(200)
      .then((response) => {
        const data = response.body;
        expect(data.numberOfDoc).toEqual(3);
        expect(data.users.length).toEqual(3);
        expect(data.users[0].email).toEqual('Afirstuser@email.xyz');
        expect(data.users[1].email).toEqual('Bseconduser@email.xyz');
        expect(data.users[2].email).toEqual('Cthirduser@email.xyz');
      });
  });
  test('list of users filtered by role', async () => {
    await request(app)
      .get('/api/users?roleToFilterBy=customer')
      .expect(200)
      .then((response) => {
        const data = response.body;
        expect(data.numberOfDoc).toEqual(3);
        expect(data.users.length).toEqual(2);
        data.users.forEach((user) => expect(user.role).toEqual('customer'));
      });
  });
});

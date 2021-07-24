import request from 'supertest';
import mongoose from 'mongoose';
import app from '../src/app';
import connectDB from '../src/db';
import User from '../src/models/User';

let token;
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

describe('GET /api/users - ', () => {
  test('list of users with default order and pagination', async () => {
    await request(app)
      .get('/api/users')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .then((response) => {
        const data = response.body;
        expect(data.numberOfDoc).toEqual(4);
        expect(data.users.length).toEqual(4);
        expect(data.users[0].email).toEqual('Afirstuser@email.xyz');
        expect(data.users[1].email).toEqual('Bseconduser@email.xyz');
        expect(data.users[2].email).toEqual('Cthirduser@email.xyz');
      });
  });
  test('list of users filtered by role', async () => {
    await request(app)
      .get('/api/users?roleToFilterBy=customer')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .then((response) => {
        const data = response.body;
        expect(data.numberOfDoc).toEqual(4);
        expect(data.users.length).toEqual(2);
        data.users.forEach((user) => expect(user.role).toEqual('customer'));
      });
  });
  test('without token, returns Authorization error', async () => {
    await request(app)
      .get('/api/users?roleToFilterBy=customer')
      .expect(401)
      .then((response) => {
        const data = response.body;
        expect(data.message).toEqual("Authentication error: No token found.");
      });
  });
  test('with customer token, returns Forbidden', async () => {
    const user = {
      email: 'customerxyz@xyz.xyz',
      password: 'Password123456789',
      role: 'customer',
    };
    await User.create(user);
    token = await request(app)
      .post('/api/auth')
      .send(user)
      .then(async (response) => response.body.token);
    await request(app)
      .get('/api/users?roleToFilterBy=customer')
      .set('Authorization', `Bearer ${token}`)
      .expect(403)
      .then((response) => {
        const data = response.body;
        expect(data.message).toEqual("Authorization error: Unauthorized");
      });
  });
});

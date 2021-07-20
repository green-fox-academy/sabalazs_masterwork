import request from 'supertest';
import mongoose from 'mongoose';
import app from '../src/app';
import User from '../src/models/User';
import connectDB from '../src/db';

beforeEach(() => {
  connectDB();
});

afterEach(async () => {
  await User.deleteMany();
  await mongoose.connection.close();
});

describe('POST /api/auth - Login with ', () => {
  test('valid credentials should respond with 200 and token', async () => {
    const data = {
      email: 'example@example.com',
      password: 'Asdfghjkl',
    };

    await User.create(data);

    await request(app)
      .post('/api/auth')
      .send(data)
      .expect(200)
      .then((response) => {
        expect(response.body.token).toBeTruthy();
      });
  });

  test('invalid password should respond with 401 and corresponding error message', async () => {
    const data = {
      email: 'example@example.com',
      password: 'Asdfghjkl',
    };
    const invalidData = {
      email: 'example@example.com',
      password: 'invalidpassword',
    };

    await User.create(data);

    await request(app)
      .post('/api/auth')
      .send(invalidData)
      .expect(401)
      .then((response) => {
        expect(response.body.message).toBe('Authentication error: Invalid password.');
      });
  });

  test('invalid email should respond with 401 and corresponding error message', async () => {
    const data = {
      email: 'example@example.com',
      password: 'Asdfghjkl',
    };
    const invalidData = {
      email: 'nonexisting@email.com',
      password: 'Asdfghjkl',
    };

    await User.create(data);

    await request(app)
      .post('/api/auth')
      .send(invalidData)
      .expect(401)
      .then((response) => {
        expect(response.body.message).toBe('Authentication error: Email is not recognized.');
      });
  });
});

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

describe('POST /api/users - Registration with ', () => {

  test('valid data should respond with 201, and id', async () => {
    const data = {
      email: 'example@example.com',
      password: 'Asdfghjkl',
    };

    await request(app)
      .post('/api/users')
      .send(data)
      .expect(201)
      .then((response) => {
        expect(response.body.id).toBeTruthy();
      });
  });

  test('valid data should create a document in db', async () => {
    const data = {
      email: 'example@example.com',
      password: 'Asdfghjkl',
    };

    await request(app)
      .post('/api/users')
      .send(data)

    await User.findOne({ email: data.email })
      .then((result) => {
        expect(result).toBeTruthy();
      });
  });

  test('missing password should respond with 400, and corresponding error message', async () => {
    const data = {
      email: 'example@example.com'
    };

    await request(app)
      .post('/api/users')
      .send(data)
      .expect(400)
      .then((response) => {
        expect(response.body.message).toBe("Validation error: Missing password field.");
      });
  });

  test('missing email should respond with 400, and corresponding error message', async () => {
    const data = {
      password: 'Asdfghjkl'
    };

    await request(app)
      .post('/api/users')
      .send(data)
      .expect(400)
      .then((response) => {
        expect(response.body.message).toBe("Validation error: Missing email field.");
      });
  });

  test('invalid email format should respond with 400, and corresponding error message', async () => {
    const data = {
      email: 'exampleexample.com',
      password: 'Asdfghjkl'
    };

    await request(app)
      .post('/api/users')
      .send(data)
      .expect(400)
      .then((response) => {
        expect(response.body.message).toBe("Validation error: Invalid email format.");
      });
  });

  test('invalid password format should respond with 400, and corresponding error message', async () => {
    const data = {
      email: 'example@example.com',
      password: 'password'
    };

    await request(app)
      .post('/api/users')
      .send(data)
      .expect(400)
      .then((response) => {
        expect(response.body.message).toBe("Validation error: Password must contain both lower case and upper case characters.");
      });
  });

  test('invalid password format should respond with 400, and corresponding error message', async () => {
    const data = {
      email: 'example@example.com',
      password: 'p'
    };

    await request(app)
      .post('/api/users')
      .send(data)
      .expect(400)
      .then((response) => {
        expect(response.body.message).toBe("Validation error: Password must be at least 8 characters long.");
      });
  });

  test('an email already registered, should respond with 400, and and corresponding error message', async () => {
    const data = {
      email: 'example@example.com',
      password: 'Asdfghjkl',
    };

    await request(app)
      .post('/api/users')
      .send(data);

    await request(app)
      .post('/api/users')
      .send(data)
      .then((response) => {
        expect(response.body.message).toBe("Validation error: Email is already registered.");
      });
  });
});

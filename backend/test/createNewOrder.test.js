import request from 'supertest';
import mongoose from 'mongoose';
import app from '../src/app';
import Order from '../src/models/Order';
import User from '../src/models/Order';
import Product from '../src/models/Order';
import connectDB from '../src/db';

beforeEach(() => {
    connectDB();
});

afterEach(async () => { 
    await mongoose.connection.db.dropDatabase();
});

describe('POST /api/orders - Creating new order ', () => {

    test('valid data should respond with 201, and id', async () => {
        const user = {
            email: 'example2@example.com',
            password: 'Asdfghjkl',
        };
        let userId;
        await request(app)
            .post('/api/users')
            .send(user)
            .then((response) => {
                userId = response.body.id;
            });
        const product = {
            "name": "Vajas croissant 2",
            "price": 800
          };
        let productId;
        await request(app)
            .post('/api/products')
            .send(product)
            .then((response) => {
                productId = response.body.id;
            });

        const order = {
            "customer": userId,
            "items": [
                {
                    "product": productId,
                    "quantity": 1
                }
            ],
            "sum": 800
        };

        await request(app)
            .post('/api/orders')
            .send(order)
            .expect(201)
            .then((response) => {
                expect(response.body.id).toBeTruthy();
            });
    });

});

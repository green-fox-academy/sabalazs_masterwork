import request from 'supertest';
import mongoose from 'mongoose';
import app from '../src/app';
import connectDB from '../src/db';
import Order from '../src/models/Order';

beforeEach(() => {
    connectDB();
});

afterEach(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
});

const user = {
    email: 'example2@example.com',
    password: 'Asdfghjkl',
};
const product = {
    "name": "Vajas croissant 3",
    "price": 800
};
const quantity = 1;
const correctSum = quantity * product.price;
const incorrectSum = 0;

describe('POST /api/orders - Creating new order with', () => {

    test('valid data should respond with 201, and id and save order to db', async () => {
        let userId;
        await request(app)
            .post('/api/users')
            .send(user)
            .then((response) => {
                userId = response.body.id;
            });
        
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
                    "quantity": quantity
                }
            ],
            "sum": correctSum
        };
    
        let orderId;
        await request(app)
            .post('/api/orders')
            .send(order)
            .expect(201)
            .then((response) => {
                orderId = response.body.id;
                expect(orderId).toBeTruthy();
            });
    
        await Order.findOne({ _id: orderId })
            .populate('customer')
            .populate('items.product')
            .then((result) => {
                console.log(JSON.stringify(result));
                expect(result).toBeTruthy();
                expect(result.customer.email).toEqual(user.email);
                expect(result.items.length).toEqual(order.items.length);
                expect(result.items[0].name).toEqual(order.items[0].name);
                expect(result.items[0].sum).toEqual(order.items[0].sum);
            });
    });

    test('invalid order sum should respond with 400, and corresponding error message', async () => {
        let userId;
        await request(app)
            .post('/api/users')
            .send(user)
            .then((response) => {
                userId = response.body.id;
            });
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
                    "quantity": quantity
                }
            ],
            "sum": incorrectSum
        };

        await request(app)
            .post('/api/orders')
            .send(order)
            .expect(400)
            .then((response) => {
                expect(response.body.message).toBe('Validation error: Wrong sum.');
            });
    });

});

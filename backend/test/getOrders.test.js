import request from 'supertest';
import mongoose from 'mongoose';
import app from '../src/app';
import connectDB from '../src/db';
import Order from '../src/models/Order';
import User from '../src/models/User';
import Product from '../src/models/Product';

const user1 = {
    email: 'firstuser@email.xyz',
    password: 'Password123',
};
const user2 = {
    email: 'seconduser@email.xyz',
    password: 'Password123',
};
const product = {
    "name": "Vajas croissant",
    "price": 800
};
const numberOfTestItems = 20;

beforeEach(async () => {
    connectDB();
    let user1Id = await User.create(user1);
    let user2Id = await User.create(user2);
    let productId = await Product.create(product);
    for (let i = 0; i < numberOfTestItems; i++) {
        await Order.create({
            "customer": i % 2 ? user1Id : user2Id,
            "items": [
                {
                    "product": productId,
                    "quantity": i + 1
                }
            ],
            "sum": (i + 1) * product.price
        });
    }
});

afterEach(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
});

describe('GET /api/orders - Gets', () => {
    test('first page of orders with default order and pagination', async () => {
        await request(app)
            .get('/api/orders')
            .expect(200)
            .then((response) => {
                const data = response.body;
                expect(data.numberOfDoc).toEqual(numberOfTestItems);
                expect(data.orders.length).toEqual(20);
                expect(data.orders[0].customer.email).toEqual(user2.email);
                expect(data.orders[1].customer.email).toEqual(user1.email);
                data.orders.forEach((order, index) => {
                    expect(order.items[0].quantity).toEqual(index + 1);
                });
            });
    });

    test('orders sorted by email, descending', async () => {
        await request(app)
            .get(`/api/orders?sortBy=customer.email&sortDirection=-1`)
            .expect(200)
            .then((response) => {
                const data = response.body;
                expect(data.numberOfDoc).toEqual(numberOfTestItems);
                expect(data.orders.length).toEqual(20);
                data.orders.forEach((order, index) => {
                    if (index < 10) {
                        expect(order.customer.email).toEqual(user2.email);
                    } else {
                        expect(order.customer.email).toEqual(user1.email);
                    }
                });
            });
    });

    test('second page of orders sorted by sum, ascending, with a limit of 5', async () => {
        await request(app)
            .get(`/api/orders?sortBy=sum&sortDirection=1&pageNumber=1&itemsPerPage=5`)
            .expect(200)
            .then((response) => {
                const data = response.body;
                expect(data.numberOfDoc).toEqual(numberOfTestItems);
                expect(data.orders.length).toEqual(5);
                expect(data.orders[0].sum).toEqual((5 + 1) * 800);
                expect(data.orders[0].sum <= data.orders[1].sum).toBeTruthy();
                expect(data.orders[1].sum <= data.orders[2].sum).toBeTruthy();
                expect(data.orders[2].sum <= data.orders[3].sum).toBeTruthy();
                expect(data.orders[3].sum <= data.orders[4].sum).toBeTruthy();
            });
    });
});

import request from 'supertest';
import mongoose from 'mongoose';
import app from '../src/app';
import connectDB from '../src/db';
import Order from '../src/models/Order';
import User from '../src/models/User';
import Product from '../src/models/Product';

let token;
let userId;
let productId;
let productName;
let productPrice;
beforeEach(async () => {
  connectDB();
  const user = await User.create({
    email: 'firstuser@email.xyz',
    password: 'Password123',
  });
  token = await request(app)
    .post('/api/auth')
    .send({
      email: 'firstuser@email.xyz',
      password: 'Password123',
    })
    .then(async (response) => response.body.token);
  userId = user.id;
  const product = await Product.create({
    name: 'Vajas croissant',
    price: 800,
  });
  productId = product.id;
  productName = product.name;
  productPrice = product.price;
});

afterEach(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
});

const quantity = 1;
const correctSum = quantity * 800;
const incorrectSum = 0;

describe('POST /api/orders - Creating new order with', () => {
  test('valid data should respond with 201, and id and save order to db', async () => {
    const order = {
      customer: userId,
      items: [
        {
          product: productId,
          quantity,
          name: productName,
          price: productPrice,
        },
      ],
      sum: correctSum,
    };

    let orderId;
    await request(app)
      .post('/api/orders')
      .set('Authorization', `Bearer ${token}`)
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
        expect(result).toBeTruthy();
        expect(result.customer.email).toEqual('firstuser@email.xyz');
        expect(result.items.length).toEqual(order.items.length);
        expect(result.items[0].name).toEqual(order.items[0].name);
        expect(result.items[0].sum).toEqual(order.items[0].sum);
      });
  });

  test('invalid order sum should respond with 400, and corresponding error message', async () => {
    const order = {
      customer: userId,
      items: [
        {
          product: productId,
          quantity,
          name: productName,
          price: productPrice,
        },
      ],
      sum: incorrectSum,
    };

    await request(app)
      .post('/api/orders')
      .set('Authorization', `Bearer ${token}`)
      .send(order)
      .expect(400)
      .then((response) => {
        expect(response.body.message).toBe('Validation error: Wrong sum.');
      });
  });
});

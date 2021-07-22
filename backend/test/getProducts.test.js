import request from 'supertest';
import mongoose from 'mongoose';
import app from '../src/app';
import connectDB from '../src/db';
import Product from '../src/models/Product';


beforeEach(async () => {
  connectDB();
  await Product.create({
    name: 'Vajas croissant 1',
    price: 1000,
});
  await Product.create({
    name: 'Vajas croissant 2',
    price: 200,
});
  await Product.create({
    name: 'Vajas croissant 3',
    price: 800,
});
});

afterEach(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
});

describe('GET /api/products - Gets', () => {
  test('list of products with default order and pagination', async () => {
    await request(app)
      .get('/api/products')
      .expect(200)
      .then((response) => {
        const data = response.body;
        expect(data.numberOfDoc).toEqual(3);
        expect(data.products.length).toEqual(3);
        expect(data.products[0].price).toEqual(1000);
        expect(data.products[1].price).toEqual(800);
        expect(data.products[2].price).toEqual(200);
      });
  });
});

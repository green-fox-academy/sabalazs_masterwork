import request from 'supertest';
import mongoose from 'mongoose';
import app from '../src/app';
import connectDB from '../src/db';
import Product from '../src/models/Product';

let productId;
beforeEach(async () => {
  connectDB();
  const product = await Product.create({
    name: 'Vajas croissant',
    price: 800,
});
  productId = product.id;
});

afterEach(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
});

describe('DELETE /api/products/:productId - ', () => {
  test('given valid product ID, it deletes the user', async () => {    
    expect(await Product.findById(productId)).toBeTruthy();
    await request(app)
      .delete(`/api/products/${productId}`)
      .expect(200)
      .then(async () => {
        expect(await Product.findById(productId)).toBeFalsy();
      });
  });
});

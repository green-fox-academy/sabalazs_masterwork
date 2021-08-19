/* eslint-disable no-underscore-dangle */
import Product from '../models/Product';
import validateObjectId from '../utils/validateObjectId';
import ValidationError from '../utils/ValidationError';

export const productsService = {

  async createNew(product) {
    await this.validate(product);
    const result = await Product.create(product);
    return {
      id: result._id,
    };
  },
  async getList() {
    const result = await Product.find().populate('image');
    return result;
  },
  async getNumberOfDocs() {
    const result = await Product.find().countDocuments();
    return result;
  },
  async getOne(id) {
    validateObjectId(id);
    const product = await Product.findOne({ _id: id });
    return product;
  },
  async updateOne(id, updatedProduct) {
    const updatableFields = ['name', 'price', 'isAvailable', 'image', 'labels'];
    validateObjectId(id);
    const product = await Product.findById(id);
    if (!product) {
      throw new ValidationError('Product not found.');
    }
    const fieldsToBeUpdated = Object.keys(updatedProduct);
    fieldsToBeUpdated.forEach((field) => {
      if (!updatableFields.includes(field)) throw new Error(`Not allowed to update ${field}`);
      product[field] = updatedProduct[field];
    });
    await product.save();
    const result = await Product.findById(id);
    return result;
  },
  async deleteOne(productId) {
    validateObjectId(productId);
    const product = await Product.findOneAndDelete({ _id: productId });
    if (!product) {
      throw new ValidationError('Product not found.');
    }
    return product;
  },
  async validate(product) {
    if (!product.name) {
      throw new ValidationError('Missing name field.');
    }
    if (!(product.price > 0)) {
      throw new ValidationError('Missing or invalid price field.');
    }
    if (await Product.exists({ name: product.name })) {
      throw new ValidationError('A product with the same name already exists.', 409);
    }
  },
};

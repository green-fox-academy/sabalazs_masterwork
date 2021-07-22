/* eslint-disable no-underscore-dangle */
import Product from '../models/Product';
import ValidationError from '../utils/ValidationError';

export const productsService = {

  async createNew(product) {
    await this.validate(product);
    const result = await Product.create(product);
    return {
      id: result._id,
    };
  },
  async getList(categoryToFilterBy, sortBy, sortDirection, pageNumber, itemsPerPage) {
    const result = await Product
      .find(categoryToFilterBy ? { category: categoryToFilterBy } : {})
      .sort({ [sortBy]: sortDirection })
      .skip(itemsPerPage * pageNumber)
      .limit(Number(itemsPerPage));
    return result;
  },
  async getNumberOfDocs() {
    const result = await Product.find().countDocuments();
    return result;
  },
  async getOne(id) {
    const product = await Product.findOne({ _id: id });
    return product;
  },
  async updateOne(id, updatedProduct) {
    const product = await Product.findById(id);
    const fieldsToBeUpdated = Object.keys(updatedProduct);
    fieldsToBeUpdated.forEach((field) => {
      product[field] = updatedProduct[field];
    });
    await product.save();
    const result = await Product.findById(id);
    return result;
  },
  async deleteOne(productId) {
    const data = await Product.findOneAndDelete({ _id: productId });
    if (!data) {
      throw new ValidationError('Invalid product ID.');
    }
    return data;
  },

  async validate(product) {
    if (!product.name) {
      throw new ValidationError('Missing name field.');
    }
    if (!(product.price >= 0)) {
      throw new ValidationError('Missing or invalid price field.');
    }
    if (await Product.exists({ name: product.name })) {
      throw new ValidationError('A product with the same name already exists.', 409);
    }
  },
};

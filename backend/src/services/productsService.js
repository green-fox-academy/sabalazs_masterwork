/* eslint-disable no-underscore-dangle */
import Product from '../models/Product';

export const productsService = {

  async createNew(product) {
    await this.validate(product);
    const result = await Product.create(product);
    return {
      id: result._id,
    };
  },

  async validate(product) {
    //TODO
  },
};

/* eslint-disable no-underscore-dangle */
import Order from '../models/Order';

export const ordersService = {

  async createNew(order) {
    await this.validate(order);
    const result = await Order.create(order);
    return {
      id: result._id,
    };
  },

  async validate(order) {
    //TODO
    return;
  },
};

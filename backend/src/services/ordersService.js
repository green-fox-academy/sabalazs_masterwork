/* eslint-disable no-underscore-dangle */
import Order from '../models/Order';
import Product, { ProductSchema } from '../models/Product';
import ValidationError from '../utils/ValidationError';

export const ordersService = {
  async createNew(order) {
    await this.validate(order);
    const result = await Order.create(order);
    return {
      id: result._id,
    };
  },
  async getList(sortBy, sortDirection, pageNumber, itemsPerPage) {
  /*  const result = await Order
      .find()
      .populate('items.product', 'name')
      .populate({
        path: 'customer',
        select: 'email',
        options: { sort: { [sortBy]: [sortDirection] } }
      })
      .skip(pageNumber * itemsPerPage)
      .limit(Number(itemsPerPage)); */
    const result = await Order
    .aggregate([
      {
        $lookup:
          {
            from: "users",
            localField: "customer",
            foreignField: "_id",
            as: "customer"
          }
     },
     { $unwind: '$customer' },
     { $sort : { [sortBy]: sortDirection } },
     { $skip: pageNumber * itemsPerPage },
     { $limit : itemsPerPage },
    ]);
    return result;
  },
  async getNumberOfDocs() {
    const result = await Order.find().countDocuments();
    return result;
  },
  async validate(order) {
    if (!order.customer) {
      throw new ValidationError('Missing customer.');
    }
    if (order.items.length < 1) {
      throw new ValidationError('Missing items.');
    }
    let sum = 0;
    for (const item of order.items) {
      await Product.findOne({ _id: item.product })
        .then((product) => {
          sum += product.price * item.quantity;
        });
    }
    if (order.sum !== sum) {
      throw new ValidationError('Wrong sum.');
    }
  },
};

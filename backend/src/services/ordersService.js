/* eslint-disable no-underscore-dangle */
import mongoose from 'mongoose';
import Order from '../models/Order';
import Product from '../models/Product';
import ValidationError from '../utils/ValidationError';

export const ordersService = {
  async createNew(order) {
    await this.validate(order);
    const result = await Order.create(order);
    return {
      id: result._id,
    };
  },
  async getList(user, sortBy, sortDirection, pageNumber, itemsPerPage) {
    let result;
    if (user.role === 'admin') {
      result = await Order.aggregate([
        {
          $lookup: {
            from: 'users',
            localField: 'customer',
            foreignField: '_id',
            as: 'customer',
          },
        },
        { $unwind: '$customer' },
        { $unset: 'customer.password' },
        { $sort: { [sortBy]: sortDirection } },
        { $skip: (pageNumber - 1) * itemsPerPage },
        { $limit: itemsPerPage },
      ]);
    } else {
      result = await Order.aggregate([
        { $match: { customer: mongoose.Types.ObjectId(user.id) } },
        {
          $lookup: {
            from: 'users',
            localField: 'customer',
            foreignField: '_id',
            as: 'customer',
          },
        },
        { $unwind: '$customer' },
        { $unset: 'customer.password' },
        { $sort: { [sortBy]: sortDirection } },
        { $skip: (pageNumber - 1) * itemsPerPage },
        { $limit: itemsPerPage },
      ]);
    }
    return result;
  },
  async updateOne(orderId, data) {
    const order = await Order.findById(orderId);
    if (!order) {
      throw new ValidationError('Invalid order ID.');
    }
    if (!['pending', 'accepted', 'refused', 'fulfilled'].includes(data.status)) {
      throw new ValidationError('Invalid order status.');
    }
    order.status = data.status;
    await order.save();
    const updatedOrder = await Order.findById(orderId);
    return updatedOrder;
  },
  async deleteOne(orderId) {
    const data = await Order.findOneAndDelete({ _id: orderId });
    if (!data) {
      throw new ValidationError('Invalid order ID.');
    }
    return data;
  },
  async numberOfPages(user, itemsPerPage) {
    let result;
    if (user.role === 'admin') {
      const numberOfDocs = await Order.find().countDocuments();
      result = Math.ceil(numberOfDocs / itemsPerPage);
    } else {
      const numberOfDocs = await Order.find({ customer: user.id }).countDocuments();
      result = Math.ceil(numberOfDocs / itemsPerPage);
    }
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

    const results = [];
    order.items.forEach((item) => {
      results.push(Product.findOne({ _id: item.product }).then((product) => {
        sum += product.price * item.quantity;
      }));
    });
    await Promise.all(results);

    if (order.sum !== sum) {
      throw new ValidationError('Wrong sum.');
    }
  },
};

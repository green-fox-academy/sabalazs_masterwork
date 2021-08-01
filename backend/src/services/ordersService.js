/* eslint-disable no-underscore-dangle */
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
    console.log(user);
    let result;
    if (user.role === 'admin') {
      result = await Order
        .aggregate([
          {
            $lookup:
            {
              from: 'users',
              localField: 'customer',
              foreignField: '_id',
              as: 'customer',
            },
          },
          { $unwind: '$customer' },
          { $sort: { [sortBy]: sortDirection } },
          { $skip: pageNumber * itemsPerPage },
          { $limit: itemsPerPage },
        ]);      
    } else {
      console.log(await Order.find({ customer: user.id }));
      //console.log(await Order.aggregate([{ $match: { $expr: { customer: user.id } } }]));
      //console.log(await Order.aggregate([{ $match: { customer: user.id } }]));
      result = await Order
        .aggregate([
          //{ $match: { customer: user.id } },
          {
            $lookup:
            {
              from: 'users',
              localField: 'customer',
              foreignField: '_id',
              as: 'customer',
            },
          },
          { $unwind: '$customer' },
          { $sort: { [sortBy]: sortDirection } },
          { $skip: pageNumber * itemsPerPage },
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
  async getNumberOfDocs(user) {
    console.log(user);
    let result;
    if (user.role === 'admin') {
      result = await Order.find().countDocuments();
    } else {
      result = await Order.find({ customer: user.id }).countDocuments();
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

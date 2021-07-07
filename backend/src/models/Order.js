import mongoose from 'mongoose';
import User from './User';
import OrderItem from './OrderItem';

const OrderSchema = new mongoose.Schema({
  customer: User,
  items: [OrderItem],
  sum: Number,
  status: {
    type: String,
    enum: ['pending', 'accepted', 'refused', 'fulfilled'],
    default: 'pending',
  },
  datePosted: Date,
});

const Order = mongoose.model('Order', OrderSchema);

export default Order;

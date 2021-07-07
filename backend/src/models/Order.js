import mongoose from 'mongoose';
import User from './User';
import OrderItem from './OrderItem';

const OrderSchema = new mongoose.Schema({
    customer: {
        type: User,
        required: true,
    },
    items: {
        type: [OrderItem],
        required: true,
    },
    // TODO: sum validation
    sum: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'refused', 'fulfilled'],
        default: 'pending',
        required: true,
    },
    datePosted: Date,
});

const Order = mongoose.model('Order', OrderSchema);

export default Order;

import mongoose from 'mongoose';
import { UserSchema } from './User';
import { OrderItemSchema } from './OrderItem';

const OrderSchema = new mongoose.Schema({
    customer: {
        type: UserSchema,
        required: true,
    },
    items: {
        type: [OrderItemSchema],
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

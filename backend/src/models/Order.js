import mongoose from 'mongoose';
import { UserSchema } from './User';

const OrderSchema = new mongoose.Schema({
    customer: {
        type: String,
        required: true,
    },
    items: {
        type: [{
            product: {
                type: String,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
        }],
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

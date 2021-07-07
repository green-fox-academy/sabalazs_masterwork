import mongoose from 'mongoose';
import { ProductSchema } from './Product';

const OrderItemSchema = new mongoose.Schema({
    product: {
        type: ProductSchema,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
});

const OrderItem = mongoose.model('OrderItem', OrderItemSchema);

export { OrderItemSchema };
export default OrderItem;

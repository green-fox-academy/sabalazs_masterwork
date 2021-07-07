import mongoose from 'mongoose';
import Product from './Product';

const OrderItemSchema = new mongoose.Schema({
    product: {
        type: Product,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
  });
  
  const OrderItem = mongoose.model('OrderItem', OrderItemSchema);
  
  export default OrderItem;
  
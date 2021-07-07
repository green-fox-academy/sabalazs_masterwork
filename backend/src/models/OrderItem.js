import mongoose from 'mongoose';
import Product from './Product';

const OrderItemSchema = new mongoose.Schema({
    product: Product,
    quantity: Number,
  });
  
  const OrderItem = mongoose.model('OrderItem', OrderItemSchema);
  
  export default OrderItem;
  
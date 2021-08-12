import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
  },
  isAvailable: {
    type: Boolean,
    default: true,
    required: false,
  },
  image: {
    type: mongoose.Schema.ObjectId,
    ref: 'ProductImage',
    required: false,
  },
  labels: [String],
});

const Product = mongoose.model('Product', ProductSchema);

export { ProductSchema };
export default Product;

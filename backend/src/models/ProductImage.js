import mongoose from 'mongoose';

const ProductImageSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
  product: {
    type: mongoose.Schema.ObjectId,
    ref: 'Product',
    required: true,
    unique: true,
  },
});

const ProductImage = mongoose.model('ProductImage', ProductImageSchema);

export default ProductImage;

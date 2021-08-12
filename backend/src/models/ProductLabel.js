import mongoose from 'mongoose';

const ProductLabelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  }
});

const ProductLabel = mongoose.model('ProductLabel', ProductLabelSchema);

export default ProductLabel;
import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  items: {
    type: [{
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    }],
    required: true,
  },
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

OrderSchema.pre('save', async function () {
  this.datePosted = new Date();
});

const Order = mongoose.model('Order', OrderSchema);

export default Order;

import mongoose from 'mongoose';
import ValidationError from './ValidationError';

export default function validateObjectId(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ValidationError('Invalid ID.');
  }
}

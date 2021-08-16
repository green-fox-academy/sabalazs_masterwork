/* eslint-disable no-underscore-dangle */
import ProductLabel from '../models/ProductLabel';
import validateObjectId from '../utils/validateObjectId';
import ValidationError from '../utils/ValidationError';

export const productLabelsService = {
  async createNew(label) {
    await this.validate(label);
    const result = await ProductLabel.create(label);
    return {
      id: result._id,
    };
  },
  async getList() {
    const result = await ProductLabel.find();
    return result;
  },
  async deleteOne(labelId) {
    validateObjectId(labelId);
    const data = await ProductLabel.findOneAndDelete({ _id: labelId });
    if (!data) {
      throw new ValidationError('Label not found.');
    }
    return data;
  },
  async validate(label) {
    if (!label.name) {
      throw new ValidationError('Missing label name.');
    }
    const labelExists = await ProductLabel.findOne({ name: label.name });
    if (labelExists) {
      throw new ValidationError('This label already exists.');
    }
  },
};

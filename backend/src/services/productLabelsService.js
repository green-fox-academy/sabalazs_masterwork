/* eslint-disable no-underscore-dangle */
import ProductLabel from '../models/ProductLabel';
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
    let result;
    result = await ProductLabel.find();
    return result;
  },
  async deleteOne(labelId) {
    const data = await ProductLabel.findOneAndDelete({ _id: labelId });
    if (!data) {
      throw new ValidationError('Invalid label ID.');
    }
    return data;
  },
  async validate(label) {
    if (!label.name) {
      throw new ValidationError('Missing label name.');
    }
  },
};

/* eslint-disable no-underscore-dangle */
import isEmail from 'validator/lib/isEmail';
import User from '../models/User';
import ValidationError from '../utils/ValidationError';

export const usersService = {

  async createNew(user) {
    await this.validate(user);
    const result = await User.create(user);
    return {
      id: result._id,
    };
  },
  async getList(roleToFilterBy, sortBy, sortDirection, pageNumber, itemsPerPage) {
    const result = await User
      .find(roleToFilterBy ? { role: roleToFilterBy } : {})
      .sort({ [sortBy]: sortDirection })
      .skip(itemsPerPage * pageNumber)
      .limit(Number(itemsPerPage));
    return result;
  },
  async getNumberOfDocs() {
    const result = await User.find().countDocuments();
    return result;
  },
  async getOne(id) {
    const user = await User.findOne({ _id: id });
    return user;
  },
  async updateOne(id, updatedUser) {
    const user = await User.findById(id);
    const fieldsToBeUpdated = Object.keys(updatedUser);
    fieldsToBeUpdated.forEach((field) => {
      user[field] = updatedUser[field];
    });
    await user.save();
    const result = await User.findById(id);
    return result;
  },
  async deleteOne(userId) {
    const data = await User.findOneAndDelete({ _id: userId });
    if (!data) {
      throw new ValidationError('Invalid user ID.');
    }
    return data;
  },
  async validate(user) {
    if (!user.password) {
      throw new ValidationError('Missing password field.');
    }
    if (!user.email) {
      throw new ValidationError('Missing email field.');
    }
    if (!isEmail(user.email)) {
      throw new ValidationError('Invalid email format.');
    }
    if (await User.exists({ email: user.email })) {
      throw new ValidationError('Email is already registered.', 409);
    }
    if (user.password.length < 8) {
      throw new ValidationError('Password must be at least 8 characters long.');
    }
    if (user.password === user.password.toUpperCase()
      || user.password === user.password.toLowerCase()) {
      throw new ValidationError('Password must contain both lower case and upper case characters.');
    }
  },
};

/* eslint-disable no-underscore-dangle */
import isEmail from 'validator/lib/isEmail';
import User from '../models/User';
import validateObjectId from '../utils/validateObjectId';
import ValidationError from '../utils/ValidationError';

export const usersService = {

  async createNew(user) {
    await this.validate(user);
    const result = await User.create(user);
    return {
      id: result._id,
    };
  },
  async getOne(id) {
    validateObjectId(id);
    const result = await User.findOne({ _id: id });
    if (!result) {
      throw new ValidationError('User not found.');
    }
    return result;
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

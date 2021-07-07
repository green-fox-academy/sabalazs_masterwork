/* eslint-disable no-underscore-dangle */
import isEmail from 'validator/lib/isEmail';
import User from '../models/User';
import ValidationError from '../utils/ValidationError';
import AuthenticationError from '../utils/AuthenticationError';

export const authService = {

  async register(email, password) {
    await this.validate(email, password, true);
    const result = await User.create({ email, password });
    return {
      id: result._id,
    };
  },

  async login(email, password) {
    await this.validate(email, password);

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      throw new AuthenticationError('Email is not recognized.');
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      throw new AuthenticationError('Invalid password.');
    }

    const token = await user.createToken();

    return { token };
  },

  async validate(email, password, isReg) {
    if (!password) {
      throw new ValidationError('Missing password field.');
    }
    if (!email) {
      throw new ValidationError('Missing email field.');
    }
    if (!isEmail(email)) {
      throw new ValidationError('Invalid email format.');
    }

    if (isReg) {
      if (await User.exists({ email })) {
        throw new ValidationError('Email is already registered.', 409);
      }
      if (password.length < 8) {
        throw new ValidationError('Password must be at least 8 characters long.');
      }
      if (password === password.toUpperCase()
                || password === password.toLowerCase()) {
        throw new ValidationError('Password must contain both lower case and upper case characters.');
      }
    }
  },
};

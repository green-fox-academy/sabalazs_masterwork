import User from '../models/User';
import AuthenticationError from '../utils/AuthenticationError';

export const authService = {
  async login(email, password) {

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
};

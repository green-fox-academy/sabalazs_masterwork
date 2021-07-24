import jwt from 'jsonwebtoken';
import AuthenticationError from '../utils/AuthenticationError';

export default function tokenCheck(req, res, next) {
  console.log('foo');
  let token;
  if (req.headers.authorization) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    const err = new AuthenticationError('No token found.');
    return next(err);
  }
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    const error = new AuthenticationError('Invalid Token');
    return next(error);
  }
  return next();
}

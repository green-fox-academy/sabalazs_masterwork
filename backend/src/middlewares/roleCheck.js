import AuthorizationError from '../utils/AuthorizationError';

export default function roleCheck(req, res, next) {
  if (!(req.user.role === 'admin')) {
    const err = new AuthorizationError();
    return next(err);
  }
  return next();
}

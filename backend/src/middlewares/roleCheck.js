import AuthorizationError from '../utils/AuthorizationError';

export default function roleCheck(req, res, next) {
  console.log(req.user.role);
  console.log(!(req.user.role === 'admin'));
  if (!(req.user.role === 'admin')) {
    const err = new AuthorizationError();
    return next(err);
  }
  return next();
}

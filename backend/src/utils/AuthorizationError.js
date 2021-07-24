export default class AuthorizationError extends Error {
  constructor(message = 'Unauthorized', status = 403) {
    super(message);
    this.name = 'Authorization error';
    this.status = status;
  }
}

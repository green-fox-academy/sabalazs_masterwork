/* global jest */
const bcryptMock = jest.mock('bcryptjs', () => ({
  genSalt: jest.fn(() => true),
  hash: jest.fn((password) => password),
  compare: jest.fn((enteredPassword, dbPassword) => enteredPassword === dbPassword),
}));

export default bcryptMock;

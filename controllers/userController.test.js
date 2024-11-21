const { registerUser, loginUser, blockUsers, unblockUsers, deleteUsers } = require('./userController');
const User = require('../models/user');

test('registerUser should create a new user', async () => {
  const req = { body: { name: 'John', email: 'john@example.com', password: 'password123' } };
  const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

  await registerUser(req, res);

  expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ token: expect.any(String), user: expect.any(Object) }));
});

test('loginUser should log in an existing user', async () => {
  const registerReq = { body: { name: 'John', email: 'john@example.com', password: 'password123' } };
  const registerRes = { json: jest.fn(), status: jest.fn().mockReturnThis() };
  await registerUser(registerReq, registerRes);

  const req = { body: { email: 'john@example.com', password: 'password123' } };
  const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

  await loginUser(req, res);

  expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ token: expect.any(String), user: expect.any(Object) }));
});

test('blockUsers should block users', async () => {
  const registerReq = { body: { name: 'John', email: 'john@example.com', password: 'password123' } };
  const registerRes = { json: jest.fn(), status: jest.fn().mockReturnThis() };
  await registerUser(registerReq, registerRes);

  const user = await User.findOne({ where: { email: 'john@example.com' } });
  const req = { body: { ids: [user.id] } };
  const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

  await blockUsers(req, res);

  expect(res.json).toHaveBeenCalledWith({ message: 'Users blocked successfully' });
});

test('unblockUsers should unblock users', async () => {
  const registerReq = { body: { name: 'John', email: 'john@example.com', password: 'password123' } };
  const registerRes = { json: jest.fn(), status: jest.fn().mockReturnThis() };
  await registerUser(registerReq, registerRes);

  const user = await User.findOne({ where: { email: 'john@example.com' } });
  await User.update({ status: 'blocked' }, { where: { id: user.id } });

  const req = { body: { ids: [user.id] } };
  const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

  await unblockUsers(req, res);

  expect(res.json).toHaveBeenCalledWith({ message: 'Users unblocked successfully' });
});

test('deleteUsers should delete users', async () => {
  const registerReq = { body: { name: 'John', email: 'john@example.com', password: 'password123' } };
  const registerRes = { json: jest.fn(), status: jest.fn().mockReturnThis() };
  await registerUser(registerReq, registerRes);

  const user = await User.findOne({ where: { email: 'john@example.com' } });
  const req = { body: { ids: [user.id] } };
  const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

  await deleteUsers(req, res);

  expect(res.json).toHaveBeenCalledWith({ message: 'Users deleted successfully' });
});

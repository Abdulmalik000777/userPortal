const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.blockUsers = async (req, res) => {
  const { ids } = req.body;
  try {
    const usersToBlock = await User.findAll({ where: { id: ids } });
    if (!usersToBlock || usersToBlock.length === 0) {
      return res.status(404).json({ message: 'User(s) not found' });
    }
    await User.update({ status: 'blocked' }, { where: { id: ids } });
    res.json({ message: 'Users blocked successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error blocking users', error });
  }
};

exports.unblockUsers = async (req, res) => {
  const { ids } = req.body;
  try {
    const usersToUnblock = await User.findAll({ where: { id: ids } });
    if (!usersToUnblock || usersToUnblock.length === 0) {
      return res.status(404).json({ message: 'User(s) not found' });
    }
    await User.update({ status: 'active' }, { where: { id: ids } });
    res.json({ message: 'Users unblocked successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error unblocking users', error });
  }
};

exports.deleteUsers = async (req, res) => {
  const { ids } = req.body;
  try {
    const usersToDelete = await User.findAll({ where: { id: ids } });
    if (!usersToDelete || usersToDelete.length === 0) {
      return res.status(404).json({ message: 'User(s) not found' });
    }
    await User.destroy({ where: { id: ids } });
    res.json({ message: 'Users deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting users', error });
  }
};

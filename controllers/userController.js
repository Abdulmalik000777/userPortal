const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Implement functions: registerUser, loginUser, getUsers, blockUser, unblockUser, deleteUser

module.exports = { registerUser, loginUser, getUsers, blockUser, unblockUser, deleteUser };

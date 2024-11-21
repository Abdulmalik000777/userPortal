const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authMiddleware = async (req, res, next) => {
  const authHeader = req.header('Authorization');
  console.log('Authorization Header:', authHeader);  // Log the authorization header

  if (!authHeader) {
    console.log('No token provided');  // Log if no token is provided
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded Token:', decoded);  // Log the decoded token

    const user = await User.findByPk(decoded.id);
    console.log('Fetched User from Token ID:', user);  // Log the fetched user

    if (!user) {
      console.log('User not found');  // Log if user is not found
      return res.status(401).json({ message: 'User not found' });
    }

    if (user.status === 'blocked') {
      console.log('User is blocked');  // Log if user is blocked
      return res.status(401).json({ message: 'Authorization denied' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log('Token is not valid:', error);  // Log any errors
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = authMiddleware;

const express = require('express');
const jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/verifyToken');
const db = require('../config/database');
const router = express.Router();

// User unblock endpoint
router.patch('/unblock', verifyToken, (req, res) => {
  const { ids } = req.body;

  if (!ids || ids.length === 0) {
    return res.status(400).json({ message: 'No user IDs provided' });
  }

  const query = 'UPDATE users SET status = ? WHERE id IN (?)';
  db.query(query, ['active', ids], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to unblock users', error: err });
    }
    res.status(200).json({ message: 'Users unblocked successfully' });
  });
});

module.exports = router;

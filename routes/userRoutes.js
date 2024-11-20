const express = require('express');
const { registerUser, loginUser, getUsers, blockUser, unblockUser, deleteUser } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

// Protect the following routes with authentication middleware
router.use(authMiddleware);

router.get('/', getUsers);
router.patch('/block', blockUser);
router.patch('/unblock', unblockUser);
router.delete('/delete', deleteUser);

module.exports = router;

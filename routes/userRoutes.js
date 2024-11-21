// routes/userRoutes.js
const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, userController.getUsers);
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.patch('/block', authMiddleware, userController.blockUser);
router.patch('/unblock', authMiddleware, userController.unblockUser);
router.delete('/delete', authMiddleware, userController.deleteUser);

module.exports = router;

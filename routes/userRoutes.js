const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, userController.getUsers);
router.get('/all', authMiddleware, userController.getAllUsers);
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.patch('/block', authMiddleware, userController.blockUsers);
router.patch('/unblock', authMiddleware, userController.unblockUsers);
router.delete('/delete', authMiddleware, userController.deleteUsers);

module.exports = router;

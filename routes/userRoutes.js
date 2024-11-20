const express = require('express');
const { registerUser, loginUser, getUsers, blockUser, unblockUser, deleteUser } = require('../controllers/userController');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/', getUsers);
router.patch('/block', blockUser);
router.patch('/unblock', unblockUser);
router.delete('/delete', deleteUser);

module.exports = router;

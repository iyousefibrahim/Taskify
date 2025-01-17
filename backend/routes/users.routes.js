const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');
const verifyToken = require('../middlewares/verifyToken');

router.get('/:id', verifyToken, usersController.getUserById);
router.post('/login', usersController.login);
router.post('/register', usersController.register);
module.exports = router;
const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');

router.get('/:id', usersController.getUserById);
router.post('/login', usersController.login);
router.post('/register', usersController.register);
module.exports = router;
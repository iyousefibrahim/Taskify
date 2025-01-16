const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/tasks.controller');
const verifyToken = require('../middlewares/verifyToken');

router.get('/', verifyToken, tasksController.getAllTasks);
router.get('/:id', verifyToken, tasksController.getTaskById);
router.post('/', verifyToken, tasksController.createTask);
router.patch('/:id', verifyToken, tasksController.updateTaskById);
router.delete('/:id', verifyToken, tasksController.deleteTaskById);

module.exports = router;
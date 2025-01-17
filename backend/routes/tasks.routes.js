const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/tasks.controller');
const verifyToken = require('../middlewares/verifyToken');

router.get('/', verifyToken, tasksController.getAllUserTasks);
router.get('/:id', verifyToken, tasksController.getTaskById);
router.post('/', verifyToken, tasksController.createTask);
router.patch('/:id', verifyToken, tasksController.updateTaskById);
router.delete('/:id', verifyToken, tasksController.deleteTaskById);
router.patch('/:id/complete', verifyToken, tasksController.markComplete);

module.exports = router;
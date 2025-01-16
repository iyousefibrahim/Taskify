const Task = require('../models/task.model');
const asyncWrapper = require('../middlewares/asyncWrapper');
const AppError = require('../utils/appError');

exports.getAllTasks = asyncWrapper(async (req, res, next) => {

    const tasks = await Task.find().select('-__v');

    if (tasks.length === 0) {
        const error = AppError.create('No Tasks Found!', 404);
        return next(error);
    }

    res.status(200).json({
        status: 'success',
        results: tasks.length,
        data: { tasks },
    });

});

exports.getTaskById = asyncWrapper(async (req, res, next) => {

    const id = req.params.id;
    const task = await Task.findById(id).select("-__v");

    if (!task) {
        const error = AppError.create('No Task Found!', 404);
        return next(error);
    }

    res.status(200).json({
        status: 'success',
        data: {
            task
        }
    });

});

exports.createTask = asyncWrapper(async (req, res, next) => {

    const task = await Task.create({
        name: req.body.name,
        description: req.body.description,
        completed: req.body.completed
    });

    res.status(201).json({
        status: 'success',
        data: { task }
    });

});

exports.updateTaskById = asyncWrapper(async (req, res, next) => {

    const id = req.params.id;
    const task = await Task.findByIdAndUpdate(
        id,
        {
            name: req.body.name,
            description: req.body.description,
            completed: req.body.completed
        },
        {
            new: true,
            runValidators: true
        }
    );

    res.status(200).json({
        status: 'success',
        data: { task }
    });

});

exports.deleteTaskById = asyncWrapper(async (req, res, next) => {

    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);

    if (!task) {
        const error = AppError.create('No Task Found with this ID!', 404);
        return next(error);
    }

    res.status(204).json({
        status: 'success',
        data: null
    });

});

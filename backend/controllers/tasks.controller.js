const Task = require('../models/task.model');
const asyncWrapper = require('../middlewares/asyncWrapper');
const AppError = require('../utils/appError');
const mongoSanitize = require('mongo-sanitize');

exports.getAllUserTasks = asyncWrapper(async (req, res, next) => {

    const options = {
        page: req.query.page || 1,
        limit: 10,
        sort: { createdAt: -1 },
    };

    const tasks = await Task.paginate(
        { createdBy: req.user.id },
        options
    );

    if (tasks.docs.length === 0) {
        const error = AppError.create('No Tasks Found for this user!', 404);
        return next(error);
    }

    res.status(200).json({
        status: 'success',
        results: tasks.docs.length,
        totalPages: tasks.totalPages,
        totalResults: tasks.totalDocs,
        data: { tasks: tasks.docs },
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

    const sanitizedBody = mongoSanitize(req.body);

    if (!sanitizedBody.name || !sanitizedBody.description) {
        const error = AppError.create('Name and description are required', 400);
        return next(error);
    }

    const userId = req.user.id;
    const task = await Task.create({
        name: sanitizedBody.name,
        description: sanitizedBody.description,
        completed: sanitizedBody.completed || false,
        createdBy: userId
    });

    res.status(201).json({
        status: 'success',
        data: { task }
    });
});

exports.updateTaskById = asyncWrapper(async (req, res, next) => {

    const sanitizedBody = mongoSanitize(req.body);

    if (!sanitizedBody.name && !sanitizedBody.description && sanitizedBody.completed === undefined) {
        const error = AppError.create('At least one field (name, description, completed) is required to update', 400);
        return next(error);
    }

    const id = req.params.id;
    const task = await Task.findByIdAndUpdate(
        id,
        {
            name: sanitizedBody.name,
            description: sanitizedBody.description,
            completed: sanitizedBody.completed
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

exports.markComplete = asyncWrapper(async (req, res, next) => {

    const { id } = req.params;

    const task = await Task.findByIdAndUpdate(
        id,
        { completed: true },
        { new: true, runValidators: true }
    );

    if (!task) {
        return next(AppError.create('No Task Found with this ID!', 404));
    }

    res.status(200).json({
        status: 'success',
        data: { task }
    });

});
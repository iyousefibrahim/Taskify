const bcryptjs = require('bcryptjs');
const AppError = require('../utils/appError');
const asyncWrapper = require('../middlewares/asyncWrapper');
const User = require('../models/user.model');

exports.getUserById = asyncWrapper(async (req, res, next) => {

    const id = req.params.id;
    const user = await User.findById(id).select('-password -rePassword');

    if (!user) {
        const error = AppError.create('No User Found!', 404);
        return next(error);
    }

    res.status(200).json({
        status: 'success',
        data: {
            user
        }
    });

});

exports.register = asyncWrapper(async (req, res, next) => {
    const { firstName, lastName, email, password } = req.body;

    const isExists = await User.findOne({ email });
    if (isExists) {
        const error = AppError.create('User Already Exists!', 400);
        return next(error);
    }

    const hashedPassword = await bcryptjs.hash(password, 12);

    const user = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        rePassword: hashedPassword
    });

    // Hide Password & rePassword from the response
    user.password = undefined;
    user.rePassword = undefined;

    res.status(201).json({
        status: 'success',
        data: {
            user
        }
    });
});

exports.login = asyncWrapper(async (req, res, next) => {

    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await bcryptjs.compare(password, user.password))) {
        const error = AppError.create('Invalid Email or Password!', 401);
        return next(error);
    }

    user.password = undefined;
    user.rePassword = undefined;

    res.status(200).json({
        status: 'success',
        message: 'User Logged In Successfully!',
        data: {
            user
        }
    });

});